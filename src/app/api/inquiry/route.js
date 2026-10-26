import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Storage paths (read-only safe for Vercel/serverless)
const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'data')
  : path.join(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const OUTBOX_FILE = path.join(DATA_DIR, 'email_outbox.json');

// ============================================================================
// RATE LIMITING & IP FLOOD PROTECTION (In-Memory Sliding Window)
// ============================================================================
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 inquiries per minute per IP
const BAN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes ban for abuse
const BAN_THRESHOLD = 15; // >15 requests in 1 min triggers ban

// IP tracking stores
const ipRequestLogs = new Map(); // ip -> array of timestamps
const ipBannedUntil = new Map(); // ip -> timestamp

// Auto cleanup every 5 minutes to prevent memory leaks under stress
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of ipRequestLogs.entries()) {
      const active = timestamps.filter((t) => now - t < WINDOW_MS);
      if (active.length === 0) {
        ipRequestLogs.delete(ip);
      } else {
        ipRequestLogs.set(ip, active);
      }
    }
    for (const [ip, unbanTime] of ipBannedUntil.entries()) {
      if (now > unbanTime) {
        ipBannedUntil.delete(ip);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  return '127.0.0.1';
}

function checkRateLimit(ip) {
  const now = Date.now();

  // 1. Check if temporarily banned
  const banExpires = ipBannedUntil.get(ip);
  if (banExpires && now < banExpires) {
    const retryAfter = Math.ceil((banExpires - now) / 1000);
    return {
      allowed: false,
      status: 429,
      retryAfter,
      message: 'Too many requests from this IP. Temporary cooldown active.',
    };
  }

  // 2. Sliding window check
  const timestamps = (ipRequestLogs.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  ipRequestLogs.set(ip, timestamps);

  if (timestamps.length > BAN_THRESHOLD) {
    const banUntil = now + BAN_WINDOW_MS;
    ipBannedUntil.set(ip, banUntil);
    return {
      allowed: false,
      status: 429,
      retryAfter: Math.ceil(BAN_WINDOW_MS / 1000),
      message: 'Unusual traffic detected. Cooldown enforced for 15 minutes.',
    };
  }

  if (timestamps.length > MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      status: 429,
      retryAfter: 60,
      message: 'Please wait a moment before submitting another inquiry.',
    };
  }

  return { allowed: true };
}

// ============================================================================
// INPUT SANITIZATION & DEFENSIVE HELPERS
// ============================================================================
function sanitizeInput(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // Strip angle brackets
    .trim()
    .slice(0, maxLen);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidPhone(phone) {
  if (typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  // Must have at least 7 digits and at most 16 digits
  return digits.length >= 7 && digits.length <= 16;
}

// ============================================================================
// STORAGE & EMAIL HANDLERS
// ============================================================================
function ensureDataFiles() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(INQUIRIES_FILE)) {
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
    if (!fs.existsSync(OUTBOX_FILE)) {
      fs.writeFileSync(OUTBOX_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    // Graceful fallback in read-only serverless runtimes
  }
}

function saveInquiryRecord(inquiry) {
  try {
    ensureDataFiles();
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const list = JSON.parse(raw || '[]');
      // Keep maximum 500 records on disk to prevent unbounded disk growth
      list.unshift(inquiry);
      if (list.length > 500) list.length = 500;
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('File storage warning:', err?.message);
  }
}

function recordEmailOutbox(emailRecord) {
  try {
    ensureDataFiles();
    if (fs.existsSync(OUTBOX_FILE)) {
      const raw = fs.readFileSync(OUTBOX_FILE, 'utf-8');
      const outbox = JSON.parse(raw || '[]');
      outbox.unshift(emailRecord);
      if (outbox.length > 500) outbox.length = 500;
      fs.writeFileSync(OUTBOX_FILE, JSON.stringify(outbox, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Outbox log warning:', err?.message);
  }
}

async function sendInquiryEmail(inquiry) {
  const recipient = process.env.INQUIRY_RECEIVER_EMAIL || 'afgmarbles@gmail.com';
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const safeName = escapeHtml(inquiry.name);
  const safePhone = escapeHtml(inquiry.phone);
  const safeProject = escapeHtml(inquiry.projectTitle);
  const safeStone = escapeHtml(inquiry.stone);
  const safeMessage = escapeHtml(inquiry.message || '');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0d5c1; border-radius: 12px; background: #fdfbf7;">
      <h2 style="color: #7c4d28; margin-top: 0; border-bottom: 2px solid #b0823e; padding-bottom: 12px;">New Marble Inquiry [${escapeHtml(inquiry.id)}]</h2>
      <p style="font-size: 14px; color: #555;">Received on: <strong>${new Date(inquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</strong></p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%;">Client Name:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Mobile / WhatsApp:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            <a href="tel:${safePhone}" style="color: #7c4d28; font-weight: bold;">${safePhone}</a>
            &nbsp;(<a href="https://wa.me/${safePhone.replace(/[^0-9]/g, '')}" target="_blank" style="color: #25D366;">Open in WhatsApp</a>)
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Selected Project:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #14110e; font-weight: bold;">${safeProject}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Preferred Marble:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeStone}</td>
        </tr>
        ${safeMessage ? `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Message:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeMessage}</td>
        </tr>` : ''}
      </table>
      
      <p style="font-size: 12px; color: #888; text-align: center; margin-top: 30px;">A.F.G Marble &amp; Arts Official Automated Lead Dispatch · Makrana, Rajasthan</p>
    </div>
  `;

  const emailRecord = {
    inquiryId: inquiry.id,
    to: recipient,
    subject: `🔔 New Marble Inquiry: ${inquiry.name} (${inquiry.projectTitle || inquiry.stone})`,
    html: htmlContent,
    timestamp: new Date().toISOString(),
    status: 'pending',
  };

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"A.F.G Marble Inquiry" <${smtpUser}>`,
        to: recipient,
        subject: emailRecord.subject,
        html: htmlContent,
      });

      emailRecord.status = 'sent';
      recordEmailOutbox(emailRecord);
      return { sent: true };
    } catch (err) {
      console.error('SMTP send error:', err?.message);
      emailRecord.status = 'error';
      emailRecord.error = err?.message;
      recordEmailOutbox(emailRecord);
      return { sent: false, error: err?.message };
    }
  } else {
    emailRecord.status = 'recorded_in_outbox';
    recordEmailOutbox(emailRecord);
    return { sent: true, note: 'Saved to email outbox queue' };
  }
}

// ============================================================================
// POST /api/inquiry — BULLETPROOF SUBMISSION HANDLER
// ============================================================================
export async function POST(request) {
  try {
    // 1. Payload size defense (< 128KB max)
    const rawCl = request.headers.get('content-length');
    if (rawCl && parseInt(rawCl, 10) > 131072) {
      return NextResponse.json(
        { success: false, error: 'Payload too large.' },
        { status: 413 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseErr) {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    // 2. IP extraction & Rate limiting
    const ip = getClientIp(request);
    const limitCheck = checkRateLimit(ip);
    if (!limitCheck.allowed) {
      return NextResponse.json(
        { success: false, error: limitCheck.message },
        {
          status: limitCheck.status,
          headers: { 'Retry-After': String(limitCheck.retryAfter) },
        }
      );
    }

    const {
      name,
      phone,
      projectTitle,
      stone,
      message,
      image,
      _hp_check, // Honeypot field for bot detection
    } = body || {};

    // 3. Honeypot check — bots fill hidden fields; reject silently
    if (_hp_check && typeof _hp_check === 'string' && _hp_check.trim().length > 0) {
      return NextResponse.json({
        success: true,
        inquiryId: `AFG-${Date.now().toString().slice(-6)}`,
        message: 'Inquiry received.',
      });
    }

    // 4. Strict input sanitization & validation
    const cleanName = sanitizeInput(name, 100);
    const cleanPhone = sanitizeInput(phone, 30);
    const cleanProject = sanitizeInput(projectTitle, 150) || 'Makrana Pure White Creation';
    const cleanStone = sanitizeInput(stone, 120) || 'Makrana Pure White Marble';
    const cleanMessage = sanitizeInput(message, 1500);

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid full name.' },
        { status: 400 }
      );
    }

    if (!cleanPhone || !isValidPhone(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid phone or WhatsApp number with country code.' },
        { status: 400 }
      );
    }

    // Safe image reference (string URL only, prevent base64 data bombs)
    let safeImage = null;
    if (typeof image === 'string' && image.length < 500 && (image.startsWith('/') || image.startsWith('http'))) {
      safeImage = image;
    }

    const inquiryId = `AFG-${Date.now().toString().slice(-6)}`;
    const inquiry = {
      id: inquiryId,
      name: cleanName,
      phone: cleanPhone,
      projectTitle: cleanProject,
      stone: cleanStone,
      message: cleanMessage,
      image: safeImage,
      ip: ip.slice(0, 45), // Store client IP hash/prefix for audit
      createdAt: new Date().toISOString(),
    };

    // 5. Persist record & Dispatch email
    saveInquiryRecord(inquiry);
    await sendInquiryEmail(inquiry);

    // 6. WhatsApp direct concierge URL
    const cleanWaNumber = '917597417274';
    const waText = `*NEW INQUIRY [${inquiry.id}]*\n• *Name:* ${inquiry.name}\n• *Mobile:* ${inquiry.phone}\n• *Project:* ${inquiry.projectTitle}\n• *Marble:* ${inquiry.stone}${inquiry.message ? `\n• *Message:* ${inquiry.message}` : ''}\n\n_Sent via A.F.G Marble & Arts Official Portal_`;
    const whatsappUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waText)}`;

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Inquiry successfully registered!',
      whatsappUrl,
    });
  } catch (error) {
    console.error('Inquiry API Error:', error?.message);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error. Please contact us via WhatsApp.' },
      { status: 500 }
    );
  }
}

// ============================================================================
// GET /api/inquiry — CONFIDENTIAL CLIENT DATA PROTECTION
// ============================================================================
export async function GET(request) {
  // Prevent public leakage of client personal phone numbers and identities!
  const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-token');
  const adminSecret = process.env.ADMIN_SECRET;

  const isAuthorized =
    adminSecret &&
    authHeader &&
    (authHeader === adminSecret || authHeader === `Bearer ${adminSecret}`);

  if (!isAuthorized) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Confidential lead data is protected.' },
      { status: 401 }
    );
  }

  try {
    ensureDataFiles();
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const inquiries = JSON.parse(raw || '[]');
      return NextResponse.json({ success: true, count: inquiries.length, inquiries });
    }
    return NextResponse.json({ success: true, count: 0, inquiries: [] });
  } catch (err) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}

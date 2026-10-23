import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Use /tmp in serverless/Vercel environments where process.cwd() is read-only
const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'data')
  : path.join(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const OUTBOX_FILE = path.join(DATA_DIR, 'email_outbox.json');

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
    console.warn('File storage skipped in read-only environment:', err?.message);
  }
}

function saveInquiryRecord(inquiry) {
  try {
    ensureDataFiles();
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const list = JSON.parse(raw || '[]');
      list.unshift(inquiry);
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Failed to save inquiry to file:', err);
  }
}

function recordEmailOutbox(emailRecord) {
  try {
    ensureDataFiles();
    if (fs.existsSync(OUTBOX_FILE)) {
      const raw = fs.readFileSync(OUTBOX_FILE, 'utf-8');
      const outbox = JSON.parse(raw || '[]');
      outbox.unshift(emailRecord);
      fs.writeFileSync(OUTBOX_FILE, JSON.stringify(outbox, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Failed to log email to outbox:', err);
  }
}

async function sendInquiryEmail(inquiry) {
  const recipient = process.env.INQUIRY_RECEIVER_EMAIL || 'afgmarbles@gmail.com';
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0d5c1; border-radius: 12px; background: #fdfbf7;">
      <h2 style="color: #7c4d28; margin-top: 0; border-bottom: 2px solid #b0823e; padding-bottom: 12px;">New Marble Inquiry [${inquiry.id}]</h2>
      <p style="font-size: 14px; color: #555;">Received on: <strong>${new Date(inquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</strong></p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%;">Client Name:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${inquiry.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Mobile / WhatsApp:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            <a href="tel:${inquiry.phone}" style="color: #7c4d28; font-weight: bold;">${inquiry.phone}</a>
            &nbsp;(<a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}" target="_blank" style="color: #25D366;">Open in WhatsApp</a>)
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Selected Project:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #14110e; font-weight: bold;">${inquiry.projectTitle || 'General Inquiry'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Preferred Marble:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${inquiry.stone || 'Makrana Pure White Marble'}</td>
        </tr>
        ${inquiry.message ? `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Message:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${inquiry.message}</td>
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
      console.error('SMTP send error:', err);
      emailRecord.status = 'error';
      emailRecord.error = err.message;
      recordEmailOutbox(emailRecord);
      return { sent: false, error: err.message };
    }
  } else {
    // Record into outbox store when direct SMTP env isn't provided
    emailRecord.status = 'recorded_in_outbox';
    recordEmailOutbox(emailRecord);
    return { sent: true, note: 'Saved to email outbox queue' };
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, projectTitle, stone, message, image } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name and Mobile Number are required.' },
        { status: 400 }
      );
    }

    const inquiryId = `AFG-${Date.now().toString().slice(-6)}`;
    const inquiry = {
      id: inquiryId,
      name: name.trim(),
      phone: phone.trim(),
      projectTitle: projectTitle?.trim() || 'Makrana Pure White Creation',
      stone: stone?.trim() || 'Makrana Pure White Marble',
      message: message?.trim() || '',
      image: image || null,
      createdAt: new Date().toISOString(),
    };

    // 1. Save to server-side JSON storage
    saveInquiryRecord(inquiry);

    // 2. Dispatch/Record Email Notification
    await sendInquiryEmail(inquiry);

    // 3. Construct direct prefilled WhatsApp URL
    const cleanPhone = '917597417274';
    const waText = `*NEW INQUIRY [${inquiry.id}]*\n• *Name:* ${inquiry.name}\n• *Mobile:* ${inquiry.phone}\n• *Project/Marble:* ${inquiry.projectTitle}\n• *Marble Material:* ${inquiry.stone}${inquiry.message ? `\n• *Message:* ${inquiry.message}` : ''}\n\n_Sent via A.F.G Marble & Arts Official Portal_`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Inquiry successfully registered!',
      whatsappUrl,
    });
  } catch (error) {
    console.error('Inquiry API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    ensureDataFiles();
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    const inquiries = JSON.parse(raw || '[]');
    return NextResponse.json({ success: true, count: inquiries.length, inquiries });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

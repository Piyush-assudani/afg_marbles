'use client';
import Link from 'next/link';
import { ShieldCheck, Award, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenCookies = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.afgOpenCookieSettings) {
      window.afgOpenCookieSettings();
    }
  };

  return (
    <footer
      className="footer"
      id="footer"
      style={{
        background: 'radial-gradient(ellipse at top center, #181410 0%, #0d0b09 70%, #090806 100%)',
        color: '#f5efe6',
        padding: 'clamp(70px, 8vw, 110px) 0 40px',
        borderTop: '2px solid rgba(197, 160, 89, 0.35)',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      <div className="sec-container">
        {/* ============ PRE-FOOTER: ROYAL ATELIER COMMISSION BANNER (DARK LUXURY IMPERIAL THEME) ============ */}
        <div
          className="footer-royal-banner"
          style={{
            background: 'linear-gradient(145deg, #1f1913 0%, #14110d 60%, #0e0c09 100%)',
            border: '1.5px solid rgba(197, 160, 89, 0.38)',
            borderRadius: '20px',
            padding: 'clamp(32px, 4.5vw, 52px)',
            marginBottom: '64px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '28px' }}>
            <div style={{ maxWidth: '720px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span style={{ color: '#c5a059', display: 'grid', placeItems: 'center' }}>
                  <Award size={14} />
                </span>
                <span style={{ color: '#c5a059', fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  A.F.G MARBLE &amp; ARTS · SILAWAT GUILD SINCE 1987
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.4vw, 38px)', color: '#fffdf9', margin: '0 0 14px', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                Commission Your Sacred Devotional Sanctuary
              </h3>
              <p style={{ fontSize: '14.5px', color: '#c7b9a5', margin: 0, lineHeight: 1.7 }}>
                Whether you are envisioning a private villa pooja sanctum, a monumental Nagara temple, an estate cascading fountain, or a royal garden chhatri — our generational Silawat master sthapatis guide your commission from virgin quarry bedrock selection to consecrated doorstep assembly.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href="https://wa.me/917597417274?text=Namaste%20AFG%20Marble,%20I%20would%20like%20to%20consult%20with%20a%20master%20sthapati%20for%20a%20bespoke%20marble%20mandir%20or%20fountain%20commission."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #0e8a79 0%, #086b5e 100%)',
                  color: '#ffffff',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(14, 138, 121, 0.4)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span>Direct Sthapati WhatsApp</span>
                <ArrowRight size={14} />
              </a>

              <Link
                href="/bespoke-consultation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 26px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#edd7a8',
                  border: '1.5px solid rgba(197, 160, 89, 0.55)',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'background 0.25s ease, border-color 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(197, 160, 89, 0.15)';
                  e.currentTarget.style.borderColor = '#d4af37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.55)';
                }}
              >
                <span>Request Free 2D CAD Blueprint</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Four Imperial Quality Hallmarks in Dark Theme */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '22px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(197, 160, 89, 0.22)'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#c5a059', display: 'grid', placeItems: 'center', marginTop: '2px' }}>
                <CheckCircle2 size={16} />
              </span>
              <div>
                <strong style={{ fontSize: '13.5px', color: '#fffdf9', display: 'block', marginBottom: '3px' }}>
                  100% Makrana Calcite
                </strong>
                <span style={{ fontSize: '12px', color: '#a69888', lineHeight: 1.5, display: 'block' }}>
                  Taj Mahal stratum (99.2% CaCO₃). Non-porous, zero yellowing under abhishek.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#c5a059', display: 'grid', placeItems: 'center', marginTop: '2px' }}>
                <CheckCircle2 size={16} />
              </span>
              <div>
                <strong style={{ fontSize: '13.5px', color: '#fffdf9', display: 'block', marginBottom: '3px' }}>
                  100% Yard Pre-Assembly
                </strong>
                <span style={{ fontSize: '12px', color: '#a69888', lineHeight: 1.5, display: 'block' }}>
                  Full dry-joint erection in Jaipur yard with live 4K video inspection before freight.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#c5a059', display: 'grid', placeItems: 'center', marginTop: '2px' }}>
                <CheckCircle2 size={16} />
              </span>
              <div>
                <strong style={{ fontSize: '13.5px', color: '#fffdf9', display: 'block', marginBottom: '3px' }}>
                  ISPM-15 Timber Crating
                </strong>
                <span style={{ fontSize: '12px', color: '#a69888', lineHeight: 1.5, display: 'block' }}>
                  Fumigated pine crates, 50mm shock foam cradles, and full marine transit insurance.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#c5a059', display: 'grid', placeItems: 'center', marginTop: '2px' }}>
                <CheckCircle2 size={16} />
              </span>
              <div>
                <strong style={{ fontSize: '13.5px', color: '#fffdf9', display: 'block', marginBottom: '3px' }}>
                  White-Glove Global Setup
                </strong>
                <span style={{ fontSize: '12px', color: '#a69888', lineHeight: 1.5, display: 'block' }}>
                  Dedicated master artisan crew dispatched for turnkey installation across 28+ nations.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============ MAIN MULTI-COLUMN ARCHITECTURAL DIRECTORY ============ */}
        <div
          className="footer-directory-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.1fr 1.1fr',
            gap: '44px 30px',
            marginBottom: '54px'
          }}
        >
          {/* Col 1: Brand Authority & Silawat Lineage */}
          <div>
            <Link
              href="/"
              onClick={handleScrollToTop}
              className="footer-logo"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '18px', textDecoration: 'none', cursor: 'pointer' }}
            >
              <img
                src="/afg-logo-white.svg"
                alt="A.F.G Marble And Art"
                width={56}
                height={22}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/afg-logo.svg';
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontFamily: 'var(--display)', fontSize: '15.5px', fontWeight: 600, letterSpacing: '0.14em', color: '#ffffff', lineHeight: 1.1 }}>
                  A.F.G MARBLE AND ART
                </span>
                <span style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: '10px', color: '#c5a059', letterSpacing: '0.08em' }}>
                  Crafting Divine Spaces In Marble
                </span>
              </div>
            </Link>

            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#b5a695', marginBottom: '22px' }}>
              Imperial Silawat master sculptors since 1987. Descendants of the royal stone guilds of Rajasthan, sculpting consecrated marble mandirs, palatial fountains, and monumental architecture in authentic 99.2% Makrana calcite bedrock.
            </p>

            <div style={{
              padding: '14px 18px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '10px',
              borderLeft: '3px solid #c5a059',
              border: '1px solid rgba(197, 160, 89, 0.25)',
              marginBottom: '18px'
            }}>
              <strong style={{ fontSize: '12px', color: '#edd7a8', display: 'block', marginBottom: '3px' }}>
                Direct Sthapati Consultation Desk
              </strong>
              <span style={{ fontSize: '12.5px', color: '#ffffff' }}>
                Phone / WhatsApp: <strong>+91 7597417274</strong>
              </span>
              <span style={{ fontSize: '11.5px', color: '#a69888', display: 'block', marginTop: '2px' }}>
                Email: info@afgmarbel.com
              </span>
            </div>

            <span style={{ fontSize: '11.5px', color: '#8c7d6e', display: 'block' }}>
              Makrana Quarry Works · Jaipur Master Atelier Yard
            </span>
          </div>

          {/* Col 2: Master Collections */}
          <div>
            <h4 style={{ fontSize: '11.5px', letterSpacing: '0.2em', color: '#c5a059', textTransform: 'uppercase', marginBottom: '18px', fontWeight: 700, paddingBottom: '7px', borderBottom: '1px solid rgba(197, 160, 89, 0.22)' }}>
              Master Collections
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <li><Link href="/pooja-sanctums" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Bespoke Pooja Sanctums</Link></li>
              <li><Link href="/pooja-sanctums" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Luxury Villa Mandirs</Link></li>
              <li><Link href="/palatial-fountains" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Palatial Estate Fountains</Link></li>
              <li><Link href="/heritage-chhatris" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Heritage Chhatris &amp; Pavilions</Link></li>
              <li><Link href="/marble-deities" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Consecrated Marble Deities</Link></li>
              <li><Link href="/pietra-dura-inlay" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Pietra Dura Gemstone Inlay</Link></li>
              <li><Link href="/jaali-screens" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Pierced Jaali Lattice Screens</Link></li>
              <li><Link href="/royal-projects" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Monumental Shikhar Temples</Link></li>
            </ul>
          </div>

          {/* Col 3: Sacred Science & Sthapatya */}
          <div>
            <h4 style={{ fontSize: '11.5px', letterSpacing: '0.2em', color: '#c5a059', textTransform: 'uppercase', marginBottom: '18px', fontWeight: 700, paddingBottom: '7px', borderBottom: '1px solid rgba(197, 160, 89, 0.22)' }}>
              Sacred Craft &amp; Vastu
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <li><Link href="/ayadi-vastu-shastra" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Ayadi Vastu Architecture</Link></li>
              <li><Link href="/atelier-workshop" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>4th-Gen Silawat Lineage</Link></li>
              <li><Link href="/materials-guide" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Makrana Calcite Purity Science</Link></li>
              <li><Link href="/pre-assembly-trial" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>100% Pre-Assembly Yard</Link></li>
              <li><Link href="/bespoke-consultation" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>3D Space Dimension Planning</Link></li>
              <li><Link href="/temple-maintenance-guide" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Abhishek &amp; Stone Care Guide</Link></li>
              <li><Link href="/pricing-guide" style={{ color: '#d4c8b8', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>Pricing &amp; Investment Guide</Link></li>
            </ul>
          </div>

          {/* Col 4: Global & Pan-India Footprint */}
          <div>
            <h4 style={{ fontSize: '11.5px', letterSpacing: '0.2em', color: '#c5a059', textTransform: 'uppercase', marginBottom: '18px', fontWeight: 700, paddingBottom: '7px', borderBottom: '1px solid rgba(197, 160, 89, 0.22)' }}>
              Global White-Glove Export
            </h4>
            <div style={{ fontSize: '12.5px', color: '#b8aba0', lineHeight: 1.6, marginBottom: '14px' }}>
              <strong style={{ color: '#fffdf9', display: 'block', marginBottom: '4px' }}>Pan-India Doorstep Delivery:</strong>
              Mumbai · Delhi-NCR · Bengaluru · Hyderabad · Chennai · Kolkata · Ahmedabad · Pune · Jaipur
            </div>
            <div style={{ fontSize: '12.5px', color: '#b8aba0', lineHeight: 1.6, marginBottom: '16px' }}>
              <strong style={{ color: '#fffdf9', display: 'block', marginBottom: '4px' }}>International Export Footprint:</strong>
              United States (NJ, CA, TX) · United Kingdom (London) · UAE (Dubai &amp; Abu Dhabi) · Singapore · Australia · Canada · Germany
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link href="/global-shipping" style={{ color: '#edd7a8', fontWeight: 600, textDecoration: 'none', fontSize: '12.5px' }}>Worldwide Marine Crating Protocols →</Link></li>
              <li><Link href="/private-commissions" style={{ color: '#edd7a8', fontWeight: 600, textDecoration: 'none', fontSize: '12.5px' }}>Private Patron NRI Commissions →</Link></li>
            </ul>
          </div>

          {/* Col 5: Atelier Workshops & Studios */}
          <div>
            <h4 style={{ fontSize: '11.5px', letterSpacing: '0.2em', color: '#c5a059', textTransform: 'uppercase', marginBottom: '18px', fontWeight: 700, paddingBottom: '7px', borderBottom: '1px solid rgba(197, 160, 89, 0.22)' }}>
              Atelier Workshops
            </h4>
            <div style={{ fontSize: '12.5px', color: '#b8aba0', lineHeight: 1.6, marginBottom: '14px' }}>
              <strong style={{ color: '#fffdf9', display: 'block', marginBottom: '3px' }}>Jaipur Master Atelier &amp; Fitment Yard:</strong>
              RIICO Industrial Area, Mansarovar / Sanganer, Jaipur, Rajasthan 302020
            </div>
            <div style={{ fontSize: '12.5px', color: '#b8aba0', lineHeight: 1.6, marginBottom: '14px' }}>
              <strong style={{ color: '#fffdf9', display: 'block', marginBottom: '3px' }}>Makrana Calcite Quarry Works:</strong>
              Gunawati Range &amp; Station Road, Makrana, Rajasthan 341505
            </div>
            <div style={{ fontSize: '12px', color: '#9e9080', lineHeight: 1.5 }}>
              <strong style={{ color: '#edd7a8' }}>Studio Hours:</strong><br />
              Mon – Sat: 09:30 AM – 08:00 PM IST<br />
              Sunday: By Private Patron Appointment
            </div>
          </div>
        </div>

        {/* ============ ESSENTIAL LEGAL WARNINGS & ARCHITECTURAL CHARTER ============ */}
        <div
          className="footer-legal-warnings"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(197, 160, 89, 0.2)',
            borderRadius: '14px',
            padding: '24px 28px',
            marginBottom: '42px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            fontSize: '11.5px',
            lineHeight: 1.6,
            color: '#a09080'
          }}
        >
          <div>
            <strong style={{ color: '#c5a059', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              1. Natural Calcite Bedrock Authenticity Notice
            </strong>
            <p style={{ margin: 0 }}>
              Every sanctum and fountain is sculpted exclusively from 100% natural, virgin Makrana calcite bedrock. Natural translucent crystal veins and subtle geological striations formed over 1,500 million years ago are certified hallmarks of authentic earth stone, not defects.
            </p>
          </div>

          <div>
            <strong style={{ color: '#c5a059', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              2. Ayadi Vastu Mathematical Integrity
            </strong>
            <p style={{ margin: 0 }}>
              Sanctum dimensions are engineered in strict mathematical alignment with Sthapatya Veda Ayadi formulas (Aya, Vya, Yoni, Rasi). Patrons are requested to confirm cardinal orientation during 2D blueprint finalization for divine energetic equilibrium.
            </p>
          </div>

          <div>
            <strong style={{ color: '#c5a059', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              3. IPPC ISPM-15 Export &amp; Marine Insurance
            </strong>
            <p style={{ margin: 0 }}>
              International timber packaging complies with ISPM-15 phytosanitary heat-treatment regulations. All export shipments carry comprehensive marine transit insurance covering door-to-door transit to port and residence worldwide.
            </p>
          </div>
        </div>

        {/* ============ BOTTOM LEGAL & COPYRIGHT BAR ============ */}
        <div
          className="footer-bottom-bar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '1px solid rgba(197, 160, 89, 0.22)',
            fontSize: '12px',
            color: '#9e9080',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <p style={{ margin: 0, color: '#9e9080' }}>
            &copy; {new Date().getFullYear()} A.F.G Marble &amp; Arts. All rights reserved. Handcrafted with sacred reverence by Generational Silawats in Makrana &amp; Jaipur, Rajasthan.
          </p>

          <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/terms-and-conditions" style={{ color: '#d4c8b8', textDecoration: 'none' }}>Terms of Commission</Link>
            <span style={{ color: 'rgba(197, 160, 89, 0.35)' }}>·</span>
            <Link href="/privacy-policy" style={{ color: '#d4c8b8', textDecoration: 'none' }}>Patron Confidentiality</Link>
            <span style={{ color: 'rgba(197, 160, 89, 0.35)' }}>·</span>
            <button
              type="button"
              onClick={handleOpenCookies}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#edd7a8',
                cursor: 'pointer',
                padding: 0,
                fontSize: '12px',
                textDecoration: 'underline'
              }}
            >
              Cookie Preferences
            </button>
            <span style={{ color: 'rgba(197, 160, 89, 0.35)' }}>·</span>
            <Link href="/pricing-guide" style={{ color: '#d4c8b8', textDecoration: 'none' }}>Investment Guide</Link>
            <span style={{ color: 'rgba(197, 160, 89, 0.35)' }}>·</span>
            <Link href="/contact" style={{ color: '#d4c8b8', textDecoration: 'none' }}>Visit Ateliers</Link>
          </div>
        </div>

        {/* ============ MONUMENTAL BRANDING WATERMARK TYPOGRAPHY ============ */}
        <div
          className="footer-monumental-brand"
          aria-hidden="true"
          style={{
            marginTop: '48px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(197, 160, 89, 0.15)',
            textAlign: 'center',
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(38px, 9.8vw, 138px)',
              fontWeight: 500,
              letterSpacing: 'clamp(0.08em, 2vw, 0.22em)',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              display: 'block',
              background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.32) 0%, rgba(212, 175, 55, 0.03) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}
          >
            AFG MARBLE &amp; ARTS
          </span>
        </div>
      </div>
    </footer>
  );
}

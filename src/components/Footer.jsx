'use client';
import Link from 'next/link';

export default function Footer() {
  const handleScrollToTop = (e) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="footer"
      id="footer"
      style={{
        background: '#faf7f2',
        color: '#2a231b',
        padding: 'clamp(60px, 7vw, 100px) 0 36px',
        borderTop: '2px solid rgba(176, 138, 79, 0.35)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="sec-container">
        {/* ============ PRE-FOOTER: ROYAL ATELIER COMMISSION BANNER (LIGHT PALATIAL THEME) ============ */}
        <div
          className="footer-royal-banner"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #faf6ee 50%, #f4eee2 100%)',
            border: '1.5px solid rgba(176, 138, 79, 0.42)',
            borderRadius: '16px',
            padding: 'clamp(32px, 4vw, 48px)',
            marginBottom: '60px',
            boxShadow: '0 20px 50px rgba(176, 138, 79, 0.12), 0 2px 8px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ maxWidth: '720px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ color: '#b08a4f', fontSize: '13px' }}>✦</span>
                <span style={{ color: '#8c6426', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  A.F.G MARBLE &amp; ARTS · SILAWAT GUILD SINCE 1987
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3.2vw, 36px)', color: '#1c1813', margin: '0 0 12px', fontWeight: 500, letterSpacing: '-0.01em' }}>
                Commission Your Sacred Devotional Sanctuary
              </h3>
              <p style={{ fontSize: '14px', color: '#55493c', margin: 0, lineHeight: 1.68 }}>
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
                  padding: '13px 26px',
                  background: 'linear-gradient(135deg, #0f8b7b 0%, #0b6c60 100%)',
                  color: '#ffffff',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(15, 139, 123, 0.35)',
                  transition: 'all 0.3s ease'
                }}
              >
                <span>Direct Sthapati WhatsApp</span>
                <span style={{ fontSize: '15px' }}>→</span>
              </a>

              <Link
                href="/bespoke-consultation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 24px',
                  background: '#ffffff',
                  color: '#7c5926',
                  border: '1.5px solid #b08a4f',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(176, 138, 79, 0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <span>Request Free 3D CAD Blueprint</span>
              </Link>
            </div>
          </div>

          {/* Four Imperial Quality Hallmarks */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '18px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(176, 138, 79, 0.25)'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#b08a4f', fontSize: '18px', lineHeight: 1 }}>✦</span>
              <div>
                <strong style={{ fontSize: '13px', color: '#1c1813', display: 'block', marginBottom: '2px' }}>
                  100% Makrana Calcite
                </strong>
                <span style={{ fontSize: '12px', color: '#685b4d', lineHeight: 1.45, display: 'block' }}>
                  Taj Mahal stratum (99.2% CaCO₃). Non-porous, zero yellowing under abhishek.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#b08a4f', fontSize: '18px', lineHeight: 1 }}>✦</span>
              <div>
                <strong style={{ fontSize: '13px', color: '#1c1813', display: 'block', marginBottom: '2px' }}>
                  100% Yard Pre-Assembly
                </strong>
                <span style={{ fontSize: '12px', color: '#685b4d', lineHeight: 1.45, display: 'block' }}>
                  Full dry-joint erection in Jaipur yard with live 4K video inspection before freight.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#b08a4f', fontSize: '18px', lineHeight: 1 }}>✦</span>
              <div>
                <strong style={{ fontSize: '13px', color: '#1c1813', display: 'block', marginBottom: '2px' }}>
                  ISPM-15 Timber Crating
                </strong>
                <span style={{ fontSize: '12px', color: '#685b4d', lineHeight: 1.45, display: 'block' }}>
                  Fumigated pine crates, 50mm shock foam cradles, and full marine transit insurance.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#b08a4f', fontSize: '18px', lineHeight: 1 }}>✦</span>
              <div>
                <strong style={{ fontSize: '13px', color: '#1c1813', display: 'block', marginBottom: '2px' }}>
                  White-Glove Global Setup
                </strong>
                <span style={{ fontSize: '12px', color: '#685b4d', lineHeight: 1.45, display: 'block' }}>
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
            gap: '40px 28px',
            marginBottom: '60px'
          }}
        >
          {/* Col 1: Brand Authority & Silawat Lineage */}
          <div>
            <Link
              href="/"
              onClick={handleScrollToTop}
              className="footer-logo"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px', textDecoration: 'none', cursor: 'pointer' }}
            >
              <img
                src="/afg-logo.svg"
                alt="A.F.G Marble & Arts"
                width={54}
                height={30}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/afg-logo.png';
                }}
              />
              <span style={{ fontFamily: 'var(--display)', fontSize: '15px', fontWeight: 600, letterSpacing: '0.16em', color: '#1c1813' }}>
                A.F.G MARBLE &amp; ARTS
              </span>
            </Link>

            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#55493c', marginBottom: '20px' }}>
              Imperial Silawat master sculptors since 1987. Descendants of the royal stone guilds of Rajasthan, sculpting consecrated marble mandirs, palatial fountains, and monumental architecture in authentic 99.2% Makrana calcite bedrock.
            </p>

            <div style={{ padding: '12px 16px', background: '#f5efe4', borderRadius: '8px', borderLeft: '3px solid #b08a4f', border: '1px solid rgba(176, 138, 79, 0.25)', marginBottom: '16px' }}>
              <strong style={{ fontSize: '12px', color: '#7c5926', display: 'block', marginBottom: '2px' }}>
                Direct Sthapati Consultation Desk
              </strong>
              <span style={{ fontSize: '12px', color: '#382f25' }}>
                Phone / WhatsApp: +91 7597417274
              </span>
            </div>

            <span style={{ fontSize: '11.5px', color: '#7d6f5f', display: 'block' }}>
              Makrana Quarry Works · Jaipur Master Atelier
            </span>
          </div>

          {/* Col 2: Master Collections */}
          <div>
            <h4 style={{ fontSize: '11.5px', letterSpacing: '0.18em', color: '#8c6426', textTransform: 'uppercase', marginBottom: '18px', fontWeight: 700, paddingBottom: '6px', borderBottom: '1px solid rgba(176, 138, 79, 0.2)' }}>
              Master Collections
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link href="/pooja-sanctums" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Bespoke Pooja Sanctums</Link></li>
              <li><Link href="/pooja-sanctums" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Luxury Villa Mandirs</Link></li>
              <li><Link href="/palatial-fountains" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Palatial Estate Fountains</Link></li>
              <li><Link href="/heritage-chhatris" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Heritage Chhatris &amp; Pavilions</Link></li>
              <li><Link href="/marble-deities" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Consecrated Marble Deities</Link></li>
              <li><Link href="/pietra-dura-inlay" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Pietra Dura Gemstone Inlay</Link></li>
              <li><Link href="/jaali-screens" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Pierced Jaali Lattice Screens</Link></li>
              <li><Link href="/royal-projects" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Monumental Shikhar Temples</Link></li>
            </ul>
          </div>

          {/* Col 3: Sacred Science & Sthapatya */}
          <div>
            <h4 style={{ fontSize: '11.5px', letterSpacing: '0.18em', color: '#8c6426', textTransform: 'uppercase', marginBottom: '18px', fontWeight: 700, paddingBottom: '6px', borderBottom: '1px solid rgba(176, 138, 79, 0.2)' }}>
              Sacred Craft &amp; Vastu
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link href="/ayadi-vastu-shastra" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Ayadi Vastu Architecture</Link></li>
              <li><Link href="/atelier-workshop" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>4th-Gen Silawat Lineage</Link></li>
              <li><Link href="/materials-guide" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Makrana Calcite Purity Science</Link></li>
              <li><Link href="/pre-assembly-trial" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>100% Pre-Assembly Yard</Link></li>
              <li><Link href="/bespoke-consultation" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>3D Space Dimension Planning</Link></li>
              <li><Link href="/temple-maintenance-guide" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Abhishek &amp; Stone Care Guide</Link></li>
              <li><Link href="/pricing-guide" style={{ color: '#453b30', textDecoration: 'none', fontSize: '13px' }}>Pricing &amp; Investment Guide</Link></li>
            </ul>
          </div>

          {/* Col 4: Global & Pan-India Footprint */}
          <div>
            <h4 style={{ fontSize: '11.5px', letterSpacing: '0.18em', color: '#8c6426', textTransform: 'uppercase', marginBottom: '18px', fontWeight: 700, paddingBottom: '6px', borderBottom: '1px solid rgba(176, 138, 79, 0.2)' }}>
              Global White-Glove Export
            </h4>
            <div style={{ fontSize: '12.5px', color: '#554a3e', lineHeight: 1.6, marginBottom: '14px' }}>
              <strong style={{ color: '#1c1813', display: 'block', marginBottom: '4px' }}>Pan-India Doorstep Delivery:</strong>
              Mumbai · Delhi-NCR · Bengaluru · Hyderabad · Chennai · Kolkata · Ahmedabad · Pune · Jaipur
            </div>
            <div style={{ fontSize: '12.5px', color: '#554a3e', lineHeight: 1.6, marginBottom: '14px' }}>
              <strong style={{ color: '#1c1813', display: 'block', marginBottom: '4px' }}>International Export Footprint:</strong>
              United States (NJ, CA, TX) · United Kingdom (London) · UAE (Dubai &amp; Abu Dhabi) · Singapore · Australia (Sydney, Melbourne) · Canada (Toronto) · Germany
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link href="/global-shipping" style={{ color: '#8c6426', fontWeight: 600, textDecoration: 'none', fontSize: '12.5px' }}>Worldwide Marine Crating Protocols →</Link></li>
              <li><Link href="/private-commissions" style={{ color: '#8c6426', fontWeight: 600, textDecoration: 'none', fontSize: '12.5px' }}>Private Patron NRI Commissions →</Link></li>
            </ul>
          </div>

          {/* Col 5: Atelier Workshops & Studios */}
          <div>
            <h4 style={{ fontSize: '11.5px', letterSpacing: '0.18em', color: '#8c6426', textTransform: 'uppercase', marginBottom: '18px', fontWeight: 700, paddingBottom: '6px', borderBottom: '1px solid rgba(176, 138, 79, 0.2)' }}>
              Atelier Workshops
            </h4>
            <div style={{ fontSize: '12.5px', color: '#554a3e', lineHeight: 1.55, marginBottom: '16px' }}>
              <strong style={{ color: '#1c1813', display: 'block', marginBottom: '3px' }}>Jaipur Master Atelier &amp; Fitment Yard:</strong>
              RIICO Industrial Area, Mansarovar / Sanganer, Jaipur, Rajasthan 302020
            </div>
            <div style={{ fontSize: '12.5px', color: '#554a3e', lineHeight: 1.55, marginBottom: '16px' }}>
              <strong style={{ color: '#1c1813', display: 'block', marginBottom: '3px' }}>Makrana Calcite Quarry Works:</strong>
              Gunawati Range &amp; Station Road, Makrana, Rajasthan 341505
            </div>
            <div style={{ fontSize: '12px', color: '#6e6050', lineHeight: 1.45 }}>
              <strong style={{ color: '#8c6426' }}>Studio Hours:</strong><br />
              Mon – Sat: 09:30 AM – 08:00 PM IST<br />
              Sunday: By Private Patron Appointment
            </div>
          </div>
        </div>

        {/* ============ BOTTOM LEGAL & COPYRIGHT BAR ============ */}
        <div
          className="footer-bottom-bar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '26px',
            borderTop: '1px solid rgba(176, 138, 79, 0.22)',
            fontSize: '12px',
            color: '#6d6153',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <p style={{ margin: 0, color: '#6d6153' }}>
            &copy; {new Date().getFullYear()} A.F.G Marble &amp; Arts. All rights reserved. Handcrafted with sacred reverence by Generational Silawats in Makrana &amp; Jaipur, Rajasthan.
          </p>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/terms-and-conditions" style={{ color: '#6d6153', textDecoration: 'none' }}>Terms of Commission</Link>
            <span style={{ color: 'rgba(176,138,79,0.35)' }}>·</span>
            <Link href="/privacy-policy" style={{ color: '#6d6153', textDecoration: 'none' }}>Calcite Purity Guarantee</Link>
            <span style={{ color: 'rgba(176,138,79,0.35)' }}>·</span>
            <Link href="/pricing-guide" style={{ color: '#6d6153', textDecoration: 'none' }}>Investment Guide</Link>
            <span style={{ color: 'rgba(176,138,79,0.35)' }}>·</span>
            <Link href="/contact" style={{ color: '#6d6153', textDecoration: 'none' }}>Visit Ateliers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="sec-container">
        <div className="footer-top">
          <div className="footer-col-brand">
            <Link href="/" className="footer-logo">
              <img
                src="/afg-logo.svg"
                alt="A.F.G Marble & Arts"
                width={60}
                height={34}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/afg-logo.png';
                }}
              />
              <span className="footer-brand-name">A.F.G MARBLE &amp; ARTS</span>
            </Link>
            <p className="footer-tagline">
              Master carvers in authentic 99% Makrana calcite marble. Creating bespoke pooja sanctums, palatial fountains, and monumental temple architecture since 1987. Zero yellowing guarantee.
            </p>
            <div className="footer-contact-pills" style={{ marginTop: '16px' }}>
              <a
                href="https://wa.me/917597417274"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
                style={{ color: '#b08a4f', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>WhatsApp: +91 7597417274</span>
              </a>
              <span style={{ color: 'var(--ink-3)', fontSize: '13px', display: 'block', marginTop: '6px' }}>
                Direct Makrana Bedrock Quarry &amp; Jaipur Ateliers
              </span>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Master Collections</h4>
            <ul>
              <li><Link href="/pooja-sanctums">Pooja Sanctums &amp; Mandirs</Link></li>
              <li><Link href="/palatial-fountains">Palatial Estate Fountains</Link></li>
              <li><Link href="/heritage-chhatris">Royal Chhatris &amp; Pavilions</Link></li>
              <li><Link href="/marble-deities">Consecrated Marble Deities</Link></li>
              <li><Link href="/pietra-dura-inlay">Pietra Dura Gemstone Inlay</Link></li>
              <li><Link href="/jaali-screens">Pierced Jaali Screens</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Sacred Craft &amp; Science</h4>
            <ul>
              <li><Link href="/ayadi-vastu-shastra">Ayadi Vastu Architecture</Link></li>
              <li><Link href="/atelier-workshop">Silawat Master Guild</Link></li>
              <li><Link href="/materials-guide">Makrana Calcite Stone Guide</Link></li>
              <li><Link href="/pre-assembly-trial">100% Pre-Assembly Yard</Link></li>
              <li><Link href="/global-shipping">Worldwide Crating &amp; Export</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Patron Services &amp; Heritage</h4>
            <ul>
              <li><Link href="/royal-projects">Royal Heritage Commissions</Link></li>
              <li><Link href="/makrana-calcite-mine">Quarry Science &amp; Purity</Link></li>
              <li><Link href="/temple-maintenance-guide">Temple Care &amp; Abhishek Guide</Link></li>
              <li><Link href="/bespoke-consultation">3D Space Dimension Consultation</Link></li>
              <li><Link href="/pricing-guide">Temple Investment &amp; Pricing</Link></li>
              <li><Link href="/private-commissions">Private Commissions</Link></li>
              <li><Link href="/about-afg">AFG Lineage Since 1987</Link></li>
              <li><Link href="/contact">Visit Workshops &amp; Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} A.F.G Marble &amp; Arts. All rights reserved. Handcrafted with reverence in Makrana &amp; Jaipur, Rajasthan.</p>
          <div className="footer-legal-links">
            <Link href="/terms-and-conditions" className="btn-text-link">Terms &amp; Conditions</Link>
            <span className="dot-sep">·</span>
            <Link href="/privacy-policy" className="btn-text-link">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

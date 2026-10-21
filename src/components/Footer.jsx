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
              Master carvers in authentic 99% Makrana calcite marble. Creating bespoke pooja sanctums, palatial fountains, and monumental temple architecture since 1987.
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
              <span style={{ color: 'var(--ink-3)', fontSize: '13px' }}>Direct Makrana Quarry &amp; Jaipur Atelier</span>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Bespoke Creations</h4>
            <ul>
              <li><Link href="/pooja-sanctums">Pooja Sanctums &amp; Mandirs</Link></li>
              <li><Link href="/palatial-fountains">Palatial Estate Fountains</Link></li>
              <li><Link href="/materials-guide">Noble Stone Guide</Link></li>
              <li><Link href="/atelier-workshop">Silawat Master Guild</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Atelier &amp; Experience Hubs</h4>
            <ul>
              <li><Link href="/atelier-workshop">Jaipur Pre-Assembly Yard</Link></li>
              <li><Link href="/materials-guide">Makrana Quarry Selection</Link></li>
              <li><Link href="/contact">Space Measurement Session</Link></li>
              <li><Link href="/contact">Visit Workshops</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Regulatory &amp; Policies</h4>
            <ul>
              <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy-policy">Privacy &amp; Data Security</Link></li>
              <li><Link href="/contact">Client Support Desk</Link></li>
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

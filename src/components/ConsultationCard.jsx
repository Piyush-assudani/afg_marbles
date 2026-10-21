'use client';
import Link from 'next/link';

export default function ConsultationCard({ onOpenInquiry }) {
  return (
    <section className="sec-consultation-banner">
      <div className="sec-container">
        <div className="consultation-card">
          <div className="consultation-card__inner">
            <div className="consultation-content">
              <span className="card-badge">EFFORTLESS BESPOKE ARCHITECTURE</span>
              <h2>All We Need Is Your Space Dimensions &amp; Pictures</h2>
              <div className="gold-rule"></div>
              <p className="consultation-lead">
                Whether you have an empty pooja room alcove in a Mumbai penthouse or a palatial central courtyard in London, our Master Sthapati translates your exact dimensions into a timeless consecrated sanctum.
              </p>

              <div className="consultation-steps">
                <div className="c-step">
                  <div className="c-step__num">1</div>
                  <div className="c-step__body">
                    <strong>Send Space Measurements</strong>
                    <p>Share your room width, depth, ceiling height and 2-3 room photos via WhatsApp or our atelier desk.</p>
                  </div>
                </div>
                <div className="c-step">
                  <div className="c-step__num">2</div>
                  <div className="c-step__body">
                    <strong>Sacred 3D Vastu CAD Render</strong>
                    <p>Receive a custom 3D architectural plan with precise Ayadi mathematical harmony within 24 hours.</p>
                  </div>
                </div>
                <div className="c-step">
                  <div className="c-step__num">3</div>
                  <div className="c-step__body">
                    <strong>Quarry Chisel &amp; Pre-Fit</strong>
                    <p>We hand-carve in pure Makrana white, pre-assemble in our Jaipur yard, and crate for delivery.</p>
                  </div>
                </div>
              </div>

              <div className="consultation-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    if (onOpenInquiry) {
                      onOpenInquiry({ title: 'Space Dimensions & Photos Consultation' });
                    } else {
                      window.location.href = '/contact';
                    }
                  }}
                >
                  <span className="btn-primary__text">Get Free 3D Space Consultation</span>
                  <span className="btn-primary__icon">→</span>
                </button>
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20have%20my%20space%20dimensions%20and%20pictures%20ready%20for%20a%20temple%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                  </svg>
                  <span>WhatsApp Dimensions Directly</span>
                </a>
              </div>
            </div>

            <div className="consultation-visual">
              <div className="consultation-img-wrap">
                <img
                  src="/gallery/mandir-carved-elevation.webp"
                  alt="3D CAD Temple Elevation & Ayadi Vastu Layout"
                  loading="lazy"
                />
                <div className="consultation-img-tag">
                  <span>Ayadi Vastu 3D Precision</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

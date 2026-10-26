'use client';
import { useState } from 'react';
import Link from 'next/link';
import { saveInquiry } from '../../products.js';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    dimensions: '',
    stone: 'Makrana Pure Albeta Calcite',
    productTitle: 'Custom Space Measurement Commission',
    notes: ''
  });

  const [submittedLead, setSubmittedLead] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }
    const saved = saveInquiry(formData);
    setSubmittedLead(saved);
  };

  const generateWhatsAppLink = () => {
    if (!submittedLead) return '#';
    const text = `*NEW ARCHITECTURAL INQUIRY [${submittedLead.id}]*
• *Name:* ${submittedLead.name}
• *Phone:* ${submittedLead.phone}
• *Location:* ${submittedLead.location || 'Not specified'}
• *Dimensions:* ${submittedLead.dimensions || 'To be measured'}
• *Stone:* ${submittedLead.stone}
• *Notes:* ${submittedLead.notes || 'None'}

_Direct Submission via A.F.G Marble & Arts Official Atelier Desk_`;
    return `https://wa.me/917597417274?text=${encodeURIComponent(text)}`;
  };

  const FAQS = [
    {
      q: 'How long does a handcrafted bespoke temple sanctum take to complete?',
      a: 'Typically between 4 to 8 weeks depending on the scale and complexity of hand-carved jali filigree, peacock toranas, and monolithic pillars. Rush commissions can be expedited with multiple master artisans.'
    },
    {
      q: 'How do you guarantee safe delivery across India or internationally?',
      a: 'Every piece is packed in fumigated ISPM-15 certified wooden export crates with 50mm shock-absorbing EVA foam, steel banding, and tilt/impact sensors. We have a 100% zero-breakage record across the US, UK, UAE, and India.'
    },
    {
      q: 'Can our family priest or Vastu consultant specify custom Ayadi dimensions?',
      a: 'Absolutely. Our Master Sthapatis collaborate directly with your priest or consultant to ensure every millimeter aligns with your prescribed astrological Nakshatra, Ayadi formula, and deity placement.'
    },
    {
      q: 'Will authentic Makrana marble absorb milk, oil, or kumkum during puja?',
      a: 'No. Genuine Makrana marble has a 99% pure calcite crystalline structure with practically zero porosity (0.01%). Unlike commercial Italian or dolomitic stones, sacred liquids wipe clean without staining or yellowing.'
    }
  ];

  return (
    <>
      {/* ============ SUBPAGE HERO ============ */}
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Atelier Desk</span>
            <span>/</span>
            <span>Consultation &amp; Hubs</span>
          </div>
          <h1>Bespoke Commission &amp; Space Measurement Desk</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Connect directly with our Master Sthapatis in Jaipur and Makrana. Share your space measurements, request physical stone samples, or schedule a personal workshop walkthrough.
          </p>
        </div>
      </section>

      {/* ============ CONTACT & INQUIRY SPLIT ============ */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="contact-grid-split">
            {/* Left: Interactive Form */}
            <div className="contact-form-panel">
              <span className="card-badge">OFFICIAL ARCHITECTURAL DOSSIER</span>
              <h2>Send Space Dimensions &amp; Commission Request</h2>
              <div className="gold-rule"></div>
              <p className="panel-desc">
                Share your space dimensions (W × D × H) and requirements. Your dossier will be assigned an official reference number and reviewed personally by our Master Sculptors.
              </p>

              {!submittedLead ? (
                <form onSubmit={handleSubmit} className="inquiry-form" style={{ marginTop: '24px' }}>
                  <div className="form-row-2">
                    <div className="form-field">
                      <label>Your Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Vikram Singhania"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field">
                      <label>City &amp; Country</label>
                      <input
                        type="text"
                        name="location"
                        placeholder="e.g. Mumbai, India / London, UK"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Available Space (W × D × H in ft)</label>
                      <input
                        type="text"
                        name="dimensions"
                        placeholder="e.g. 7.5ft W × 4ft D × 9ft H"
                        value={formData.dimensions}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Preferred Noble Stone</label>
                    <select name="stone" value={formData.stone} onChange={handleChange}>
                      <option value="Makrana Pure White Marble">Makrana Pure White Marble (Temples &amp; Mandirs)</option>
                      <option value="Vietnam Pure White Marble">Vietnam Pure White Marble (Temples &amp; Deities)</option>
                      <option value="Rajnagar White Marble">Rajnagar White Marble (Palatial Fountains)</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Custom Carving, Deity, or Vastu Requirements</label>
                    <textarea
                      name="notes"
                      rows="4"
                      placeholder="Mention preferred deities (e.g. Radha Krishna, Ram Darbar, Ganeshji, Shiva), brass inlay, bell dome, delivery timeline..."
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center' }}>
                    <span className="btn-primary__text">Submit &amp; Generate Dossier</span>
                    <span className="btn-primary__icon">→</span>
                  </button>
                </form>
              ) : (
                <div className="inquiry-success-view text-center" style={{ marginTop: '24px' }}>
                  <div className="success-icon-badge">
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#b08a4f" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="card-badge">DOSSIER REGISTERED</span>
                  <h3>Reference ID: {submittedLead.id}</h3>
                  <p className="success-lead-p">
                    Thank you, <strong>{submittedLead.name}</strong>. Your space specifications have been assigned to our senior sthapati desk.
                  </p>

                  <div className="success-actions" style={{ marginTop: '24px' }}>
                    <a
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                      </svg>
                      <span className="btn-primary__text">Continue to WhatsApp with Dossier</span>
                      <span className="btn-primary__icon">→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Atelier Coordinates */}
            <div className="contact-info-panel">
              <span className="card-badge">DIRECT ATELIER HUBS</span>
              <h2>Experience Centers &amp; Workshops</h2>
              <div className="gold-rule"></div>

              <div className="hub-card">
                <h4>Jaipur Experience Studio &amp; Pre-Assembly Yard</h4>
                <p>Mansarovar Extension / Tonk Road, Jaipur, Rajasthan 302020</p>
                <div className="hub-detail">
                  <span>Timings:</span> Monday to Saturday · 10:00 AM – 7:30 PM
                </div>
                <div className="hub-detail">
                  <span>Facilities:</span> Full-scale dry-fit trial yard, architectural CAD design lounge, finished master sanctums
                </div>
              </div>

              <div className="hub-card">
                <h4>Makrana Quarry Atelier &amp; Bedrock Selection</h4>
                <p>Industrial Area, Makrana, Nagaur District, Rajasthan 341505</p>
                <div className="hub-detail">
                  <span>Facilities:</span> Raw calcite block quarrying, diamond gangsaw cutting, ultrasonic block testing
                </div>
              </div>

              <div className="hub-card">
                <h4>Direct Contact &amp; Concierge</h4>
                <div className="hub-contact-list">
                  <a href="tel:+917597417274" className="hub-contact-link">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>+91 7597417274 (Direct Line)</span>
                  </a>
                  <a
                    href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20to%20consult%20with%20your%20Master%20Sthapati."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hub-contact-link"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                    </svg>
                    <span>WhatsApp Atelier Direct (+91 7597417274)</span>
                  </a>
                  <a href="mailto:info@afgmarbel.com" className="hub-contact-link">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>info@afgmarbel.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section" style={{ marginTop: '80px' }}>
            <div className="sec-header text-center">
              <span className="card-badge">CLIENT CLARIFICATIONS</span>
              <h2>Frequently Asked Questions</h2>
              <div className="gold-rule center"></div>
            </div>

            <div className="faq-grid">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

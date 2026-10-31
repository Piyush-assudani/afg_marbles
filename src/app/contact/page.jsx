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

  const [loading, setLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!formData.name?.trim() || !formData.phone?.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          projectTitle: `${formData.productTitle} (${formData.dimensions || 'Custom Space'})`,
          stone: formData.stone,
          message: `Location: ${formData.location || 'Not specified'}. Notes: ${formData.notes || 'None'}`,
          _hp_check: formData._hp_check || '',
        }),
      });
      const data = await res.json();
      const fallback = saveInquiry(formData);
      setSubmittedLead({
        id: data.inquiryId || fallback.id,
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        dimensions: formData.dimensions,
        stone: formData.stone,
        notes: formData.notes,
        whatsappUrl: data.whatsappUrl,
      });
    } catch (err) {
      console.warn('API submission fallback:', err);
      const saved = saveInquiry(formData);
      setSubmittedLead(saved);
    } finally {
      setLoading(false);
    }
  };

  const generateWhatsAppLink = () => {
    if (!submittedLead) return '#';
    if (submittedLead.whatsappUrl) return submittedLead.whatsappUrl;
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
      q: 'How long does a custom handcrafted temple take to make?',
      a: 'Usually 4 to 8 weeks depending on the size and amount of hand carving. Fast-track orders can be completed quicker by adding more artisans.'
    },
    {
      q: 'How do you guarantee safe delivery across India or internationally?',
      a: 'Every piece is packed in strong wooden crates with thick shock-absorbing foam and steel bands. We have a 100% safe delivery record across India, the US, UK, UAE, and worldwide.'
    },
    {
      q: 'Can our family priest or Vastu consultant specify custom Ayadi dimensions?',
      a: 'Absolutely. Our marble temple designers will work directly with your family priest or Vastu expert to ensure every measurement matches your exact traditions and deity placement.'
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
          <h1>Get Free 2D Design Drawing &amp; Price Estimate</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Talk directly with our marble temple experts. Share your room measurements, ask for stone samples, or book a video call to discuss your temple design.
          </p>
        </div>
      </section>

      {/* ============ CONTACT & INQUIRY SPLIT ============ */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="contact-grid-split">
            {/* Left: Interactive Form */}
            <div className="contact-form-panel">
              <span className="card-badge">FREE PRICE ESTIMATE</span>
              <h2>Send Your Room Measurements</h2>
              <div className="gold-rule"></div>
              <p className="panel-desc">
                Enter your room measurements (W × D × H) and requirements below. Our team will prepare and send your custom 2D drawings and exact price within 24 hours.
              </p>

              {!submittedLead ? (
                <form onSubmit={handleSubmit} className="inquiry-form" style={{ marginTop: '24px' }}>
                  {/* Anti-spam honeypot */}
                  <input
                    type="text"
                    name="_hp_check"
                    value={formData._hp_check || ''}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="form-row-2">
                    <div className="form-field">
                      <label>Your Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        maxLength={100}
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
                        maxLength={25}
                        placeholder="+91 / International with country code"
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
                        maxLength={100}
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
                        maxLength={100}
                        placeholder="e.g. 7.5ft W × 4ft D × 9ft H"
                        value={formData.dimensions}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Choose Marble Type</label>
                    <select name="stone" value={formData.stone} onChange={handleChange}>
                      <option value="Makrana Pure White Marble">Makrana Pure White Marble</option>
                      <option value="Vietnam Pure White Marble">Vietnam Pure White Marble</option>
                      <option value="Rajnagar White Marble">Rajnagar White Marble</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Custom Carving, Deity, or Vastu Requirements</label>
                    <textarea
                      name="notes"
                      rows="4"
                      maxLength={1500}
                      placeholder="Mention preferred deities (e.g. Radha Krishna, Ram Darbar, Ganeshji, Shiva), brass bells, drawer storage, delivery timeline..."
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full" disabled={loading} style={{ justifyContent: 'center' }}>
                    <span className="btn-primary__text">{loading ? 'Submitting...' : 'Submit & Get Price Estimate'}</span>
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
                  <span className="card-badge">INQUIRY RECEIVED</span>
                  <h3>Reference ID: {submittedLead.id}</h3>
                  <p className="success-lead-p">
                    Thank you, <strong>{submittedLead.name}</strong>. We have received your room measurements and our marble expert will prepare your drawings and quote shortly.
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
                      <span className="btn-primary__text">Chat on WhatsApp Now</span>
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
                <h4>Makrana Master Atelier &amp; Pre-Assembly Fitment Yard</h4>
                <p>Makrana Bypass Rd, Borawar, Gunawati Jageer, Rajasthan 341502</p>
                <div className="hub-detail">
                  <span>Timings:</span> Monday to Saturday · 9:30 AM – 7:00 PM (Prior Appointment)
                </div>
                <div className="hub-detail">
                  <span>Facilities:</span> Full-scale pre-assembly dry-fit trial yard, 100% pure Makrana calcite block selection, generational Silawat hand-carving pavilion
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
                    href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20to%20consult%20with%20your%20marble%20temple%20designer."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hub-contact-link"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                    </svg>
                    <span>WhatsApp Workshop Direct (+91 7597417274)</span>
                  </a>
                  <a href="mailto:mh213702@gmail.com" className="hub-contact-link">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>mh213702@gmail.com</span>
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

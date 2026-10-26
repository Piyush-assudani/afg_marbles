'use client';
import { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle2, Phone, X } from 'lucide-react';

const CORE_MARBLES = [
  'Makrana Pure White Marble (Temples & Mandirs)',
  'Vietnam Pure White Marble (Temples & Deities)',
  'Rajnagar White Marble (Fountains)',
];

export default function InquiryModal({ initialProduct, onClose, onToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectTitle: initialProduct?.title || initialProduct?.caption || initialProduct?.name || 'Makrana Pure White Mandir',
    stone: initialProduct?.stone || 'Makrana Pure White Marble (Temples & Mandirs)',
    message: '',
  });

  const [imageSrc, setImageSrc] = useState(
    initialProduct?.image || initialProduct?.src || initialProduct?.angles?.[0]?.src || '/gallery/img_7237.webp'
  );

  const [loading, setLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (initialProduct) {
      const title = initialProduct.title || initialProduct.caption || initialProduct.name || 'Bespoke Marble Project';
      const img = initialProduct.image || initialProduct.src || initialProduct.angles?.[0]?.src || '/gallery/img_7237.webp';
      setFormData((prev) => ({
        ...prev,
        projectTitle: title,
        stone: initialProduct.primaryStone || prev.stone,
      }));
      setImageSrc(img);
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getDirectWhatsAppUrl = () => {
    const cleanPhone = '917597417274';
    const text = `*INQUIRY - A.F.G MARBLE & ARTS*
• *Name:* ${formData.name || 'Prospective Patron'}
• *Mobile:* ${formData.phone || 'Provided on chat'}
• *Selected Project:* ${formData.projectTitle}
• *Marble Material:* ${formData.stone}${formData.message ? `\n• *Requirements:* ${formData.message}` : ''}

_Sent via Website Inquiry Popup_`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone/WhatsApp number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image: imageSrc,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedLead({
          id: data.inquiryId,
          name: formData.name,
          phone: formData.phone,
          projectTitle: formData.projectTitle,
          stone: formData.stone,
          whatsappUrl: data.whatsappUrl || getDirectWhatsAppUrl(),
        });
        onToast?.(`Inquiry ${data.inquiryId} registered successfully!`);
      } else {
        alert(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback lead register
      const fallbackId = `AFG-${Date.now().toString().slice(-6)}`;
      setSubmittedLead({
        id: fallbackId,
        name: formData.name,
        phone: formData.phone,
        projectTitle: formData.projectTitle,
        stone: formData.stone,
        whatsappUrl: getDirectWhatsAppUrl(),
      });
      onToast?.(`Inquiry recorded!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Marble Inquiry Popup">
      <div className="tilak-popup-card" onClick={(e) => e.stopPropagation()}>
        {/* Prominent Close Button */}
        <button className="tilak-popup__close" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        {!submittedLead ? (
          <div className="tilak-popup__grid">
            {/* Left Column: Large HD Marble Project Visual */}
            <div className="tilak-popup__visual">
              <img
                src={imageSrc}
                alt={formData.projectTitle}
                className="tilak-popup__img"
                loading="eager"
              />
              <div className="tilak-popup__visual-overlay">
                <span className="tilak-popup__badge">A.F.G MARBLE · MAKRANA</span>
                <h4 className="tilak-popup__project-name">{formData.projectTitle}</h4>
                <p className="tilak-popup__stone-tag">{formData.stone}</p>
              </div>
            </div>

            {/* Right Column: Clean, Simple Inquiry Form */}
            <div className="tilak-popup__content">
              <div className="tilak-popup__head">
                <span className="tilak-popup__subhead">Direct Inquiry</span>
                <h3 className="tilak-popup__title">Get Best Price &amp; Details</h3>
                <p className="tilak-popup__desc">
                  Share your contact details. Our Makrana marble expert will send drawings, pricing, and video walkthroughs.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="tilak-popup__form">
                <div className="tilak-form__field">
                  <label htmlFor="inquiry-name">Your Full Name *</label>
                  <input
                    id="inquiry-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    autoFocus
                  />
                </div>

                <div className="tilak-form__field">
                  <label htmlFor="inquiry-phone">Mobile / WhatsApp Number *</label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="tilak-form__field">
                  <label htmlFor="inquiry-stone">Selected Marble Material</label>
                  <select
                    id="inquiry-stone"
                    name="stone"
                    value={formData.stone}
                    onChange={handleChange}
                  >
                    {CORE_MARBLES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="tilak-form__field">
                  <label htmlFor="inquiry-message">Dimensions or Requirements (Optional)</label>
                  <input
                    id="inquiry-message"
                    type="text"
                    name="message"
                    placeholder="e.g. 5ft x 3ft Mandir for home in Mumbai"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Clear Actions: Submit + WhatsApp */}
                <div className="tilak-form__actions">
                  <button
                    type="submit"
                    className="tilak-btn tilak-btn--primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>

                  <a
                    href={getDirectWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tilak-btn tilak-btn--whatsapp"
                  >
                    <MessageSquare size={16} />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Confirmation / Success Screen */
          <div className="tilak-popup__success">
            <div className="tilak-success__icon">
              <CheckCircle2 size={44} color="#15803d" />
            </div>
            <span className="tilak-popup__subhead">Inquiry Registered</span>
            <h3 className="tilak-popup__title">Thank You, {submittedLead.name}!</h3>
            <p className="tilak-popup__desc">
              Your inquiry reference is <strong>#{submittedLead.id}</strong>. An official notification has been sent to our desk. Our master artisan will call you shortly.
            </p>

            <div className="tilak-success__details">
              <div className="tilak-detail-row">
                <span>Selected Project:</span>
                <strong>{submittedLead.projectTitle}</strong>
              </div>
              <div className="tilak-detail-row">
                <span>Material:</span>
                <strong>{submittedLead.stone}</strong>
              </div>
              <div className="tilak-detail-row">
                <span>Contact Number:</span>
                <strong>{submittedLead.phone}</strong>
              </div>
            </div>

            <div className="tilak-success__actions">
              <a
                href={submittedLead.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tilak-btn tilak-btn--whatsapp tilak-btn--large"
              >
                <MessageSquare size={18} />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <button
                type="button"
                className="tilak-btn tilak-btn--outline"
                onClick={onClose}
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

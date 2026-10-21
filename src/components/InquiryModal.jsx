'use client';
import { useState, useEffect } from 'react';
import { saveInquiry } from '../products.js';

export default function InquiryModal({ initialProduct, onClose, onToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    dimensions: '',
    stone: 'Makrana Pure Albeta Calcite',
    productTitle: initialProduct?.title || 'Bespoke Architectural Project',
    notes: ''
  });

  const [submittedLead, setSubmittedLead] = useState(null);

  useEffect(() => {
    if (initialProduct?.title) {
      setFormData((prev) => ({
        ...prev,
        productTitle: initialProduct.title,
        dimensions: initialProduct.scale || ''
      }));
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    const saved = saveInquiry(formData);
    setSubmittedLead(saved);
    onToast?.(`Inquiry ${saved.id} recorded successfully!`);
  };

  const generateWhatsAppLink = () => {
    if (!submittedLead) return '#';
    const text = `*NEW ARCHITECTURAL INQUIRY [${submittedLead.id}]*
• *Name:* ${submittedLead.name}
• *Phone:* ${submittedLead.phone}
• *Location:* ${submittedLead.location || 'Not specified'}
• *Creation/Project:* ${submittedLead.productTitle}
• *Dimensions:* ${submittedLead.dimensions || 'To be measured'}
• *Preferred Stone:* ${submittedLead.stone}
• *Notes:* ${submittedLead.notes || 'None'}

_Sent via A.F.G Marble & Arts Official Dossier Portal_`;
    return `https://wa.me/917597417274?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="inquiry-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close inquiry form">
          ✕
        </button>

        {!submittedLead ? (
          <div className="inquiry-form-wrap">
            <div className="inquiry-header">
              <span className="card-badge">DIRECT ATELIER DOSSIER</span>
              <h3>Bespoke Commission &amp; Space Measurement</h3>
              <p>
                Your measurements and requirements will be reviewed by our Master Sthapati. All inquiries receive an official dossier number and direct architectural follow-up.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="inquiry-form">
              <div className="form-row-2">
                <div className="form-field">
                  <label>Your Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rajesh Singhania"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label>Contact Phone / WhatsApp *</label>
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
                    placeholder="e.g. Mumbai / London / Dubai"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label>Available Space (W × D × H in ft)</label>
                  <input
                    type="text"
                    name="dimensions"
                    placeholder="e.g. 7ft W × 4ft D × 9ft H"
                    value={formData.dimensions}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label>Select Preferred Noble Stone</label>
                  <select name="stone" value={formData.stone} onChange={handleChange}>
                    <option value="Makrana Pure Albeta Calcite">Makrana Pure Albeta Calcite (Taj Mahal Stone)</option>
                    <option value="Makrana Dungri Natural Vein">Makrana Dungri Natural Vein</option>
                    <option value="Makrana Kumari Pure White">Makrana Kumari Pure White</option>
                    <option value="Bansi Paharpur Pink Sandstone">Bansi Paharpur Pink Sandstone</option>
                    <option value="Italian Calacatta Oro / Botticino">Italian Calacatta Oro / Botticino</option>
                    <option value="Illuminated Onyx Altar Inlay">Illuminated Translucent Onyx Altar</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Creation Reference</label>
                  <input
                    type="text"
                    name="productTitle"
                    value={formData.productTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Specific Carving or Vastu Requirements</label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Mention desired deities, bell dome, brass inlay, LED halo, or delivery timeline..."
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary w-full">
                  <span className="btn-primary__text">Submit &amp; Generate Dossier</span>
                  <span className="btn-primary__icon">→</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="inquiry-success-view text-center">
            <div className="success-icon-badge">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#b08a4f" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="card-badge">LEAD RECORDED IN ATELIER REGISTRY</span>
            <h3>Dossier Reference: {submittedLead.id}</h3>
            <p className="success-lead-p">
              Thank you, <strong>{submittedLead.name}</strong>. Your space dimensions and project specifications have been logged in our master ledger.
            </p>

            <div className="success-dossier-card">
              <div className="sd-row">
                <span>Dossier ID:</span>
                <strong>{submittedLead.id}</strong>
              </div>
              <div className="sd-row">
                <span>Project:</span>
                <strong>{submittedLead.productTitle}</strong>
              </div>
              <div className="sd-row">
                <span>Dimensions:</span>
                <strong>{submittedLead.dimensions || 'To be measured'}</strong>
              </div>
              <div className="sd-row">
                <span>Stone:</span>
                <strong>{submittedLead.stone}</strong>
              </div>
            </div>

            <div className="success-actions">
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
              <button
                type="button"
                className="btn-text-link"
                style={{ marginTop: '16px' }}
                onClick={onClose}
              >
                Return to Gallery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

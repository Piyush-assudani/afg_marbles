'use client';
import { useState } from 'react';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';

export default function BespokeConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    width: '',
    depth: '',
    height: '',
    stone: 'Makrana Pure White Albeta',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Namaste A.F.G Marble & Arts, I would like to request a 3D CAD Space Consultation.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Location:* ${formData.city}\n*Space Dimensions:* ${formData.width} W × ${formData.depth} D × ${formData.height} H\n*Preferred Stone:* ${formData.stone}\n*Notes:* ${formData.notes || 'None'}`;
    window.open(`https://wa.me/917597417274?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Atelier Desk</span>
            <span>/</span>
            <span>Space Dimensions &amp; CAD Consultation</span>
          </div>
          <h1>Custom Space Dimensions &amp; 3D CAD Consultation</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Whether you have an empty pooja room alcove in Mumbai, a heritage estate courtyard in Udaipur, or a luxury penthouse in London, our Master Sthapatis translate your exact dimensions into a timeless consecrated sanctum within 24 hours.
          </p>
        </div>
      </section>

      {/* Step Guide + Form Grid */}
      <section className="subpage-body" style={{ padding: '60px 0' }}>
        <div className="sec-container">
          <div className="page-grid-2" style={{ marginBottom: '60px' }}>
            {/* Left: How to Measure Guide */}
            <div className="page-info-block">
              <span className="card-badge">EFFORTLESS 3-STEP PROCESS</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813', margin: '12px 0 16px' }}>
                How to Share Your Space Measurements
              </h2>
              <div className="gold-rule"></div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginTop: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #b88636, #8c6220)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                    1
                  </div>
                  <div>
                    <strong style={{ fontSize: '16px', color: '#1c1813', display: 'block', marginBottom: '4px' }}>Measure 3 Core Dimensions</strong>
                    <p style={{ fontSize: '13.5px', color: '#5c5246', lineHeight: 1.6, margin: 0 }}>
                      Take a standard tape measure and record your available wall width, depth from back wall to front edge, and ceiling height (clearance to false ceiling or chandelier).
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #b88636, #8c6220)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                    2
                  </div>
                  <div>
                    <strong style={{ fontSize: '16px', color: '#1c1813', display: 'block', marginBottom: '4px' }}>Snap 2 to 3 Photos of the Room</strong>
                    <p style={{ fontSize: '13.5px', color: '#5c5246', lineHeight: 1.6, margin: 0 }}>
                      Take a wide-angle photo of the room, showing the floor, side walls, and electrical switchboard locations.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #b88636, #8c6220)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                    3
                  </div>
                  <div>
                    <strong style={{ fontSize: '16px', color: '#1c1813', display: 'block', marginBottom: '4px' }}>Receive 3D CAD Blueprint in 24 Hours</strong>
                    <p style={{ fontSize: '13.5px', color: '#5c5246', lineHeight: 1.6, margin: 0 }}>
                      Our Master Sthapati drafts an architectural scale CAD elevation with sacred Ayadi Vastu alignment and sends it directly to your WhatsApp desk.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20have%20my%20pooja%20room%20measurements%20and%20photos%20ready%20for%20a%20free%20CAD%20render."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                  </svg>
                  <span>WhatsApp Measurements Directly (+91 7597417274)</span>
                </a>
              </div>
            </div>

            {/* Right: Direct Consultation Form */}
            <div className="creation-card" style={{ padding: '36px', background: '#ffffff', border: '1px solid rgba(184, 134, 63, 0.28)' }}>
              <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
                DIRECT ATELIER DESK
              </span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 18px' }}>
                Submit Your Space Details
              </h3>

              {submitted ? (
                <div style={{ padding: '24px', background: '#faf6ee', borderRadius: '8px', border: '1px solid #b8863f', textAlign: 'center' }}>
                  <h4 style={{ color: '#1c1813', marginBottom: '8px' }}>Inquiry Sent Successfully!</h4>
                  <p style={{ fontSize: '13px', color: '#5c5246', margin: 0 }}>
                    Our Master Sthapati will review your space dimensions and respond within 24 hours with your 3D CAD render.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Rajesh Sharma"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.18)', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 / +1 / +44"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.18)', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>City &amp; Country</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Mumbai, London, Dubai, New York"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.18)', fontSize: '13px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>Width (ft / in)</label>
                      <input
                        type="text"
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        placeholder="e.g. 6.5 ft"
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.18)', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>Depth (ft / in)</label>
                      <input
                        type="text"
                        value={formData.depth}
                        onChange={(e) => setFormData({ ...formData, depth: e.target.value })}
                        placeholder="e.g. 3.5 ft"
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.18)', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>Height (ft / in)</label>
                      <input
                        type="text"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        placeholder="e.g. 9.0 ft"
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.18)', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>Preferred Marble Variety</label>
                    <select
                      value={formData.stone}
                      onChange={(e) => setFormData({ ...formData, stone: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.18)', fontSize: '13px', background: '#fff' }}
                    >
                      <option>Makrana Pure White Albeta (Taj Mahal Stratum)</option>
                      <option>Makrana Dungri Natural Vein</option>
                      <option>Bansi Paharpur Pink Sandstone</option>
                      <option>Translucent Onyx &amp; Makrana Composite</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>Special Wishes / Idol Sizes</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Need backlit Om halo, jali folding doors, and pull-out diya drawer for Radha Krishna deities."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.18)', fontSize: '13px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}
                  >
                    <span className="btn-primary__text">Generate 3D CAD Proposal via WhatsApp</span>
                    <span className="btn-primary__icon">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Difference Table */}
      <DifferenceTable />
    </>
  );
}

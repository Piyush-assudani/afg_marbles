'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, MessageSquare, ArrowRight, RotateCcw } from 'lucide-react';
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
    notes: '',
    _hp_check: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg('');

    if (!formData.name?.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone?.trim() || formData.phone.trim().length < 7) {
      setErrorMsg('Please enter a valid WhatsApp or contact phone number with country code.');
      return;
    }

    setLoading(true);
    let assignedId = `AFG-${Date.now().toString().slice(-6)}`;
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          projectTitle: `CAD Space Consultation (${formData.width || 'Custom'} W × ${formData.depth || 'Custom'} D × ${formData.height || 'Custom'} H)`,
          stone: formData.stone,
          message: `Location: ${formData.city || 'Not specified'}. Requirements: ${formData.notes || 'None'}`,
          _hp_check: formData._hp_check || '',
        }),
      });
      const data = await res.json();
      if (data.inquiryId) assignedId = data.inquiryId;
    } catch (err) {
      console.warn('API save fallback:', err);
    } finally {
      setLoading(false);
      setInquiryId(assignedId);
      setSubmitted(true);

      const text = `Namaste A.F.G Marble & Arts, I requested a 2D CAD Space Consultation [${assignedId}].\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Location:* ${formData.city}\n*Space Dimensions:* ${formData.width} W × ${formData.depth} D × ${formData.height} H\n*Preferred Stone:* ${formData.stone}\n*Notes:* ${formData.notes || 'None'}`;
      window.open(`https://wa.me/917597417274?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMsg('');
    setFormData({
      name: '',
      phone: '',
      city: '',
      width: '',
      depth: '',
      height: '',
      stone: 'Makrana Pure White Albeta',
      notes: '',
      _hp_check: ''
    });
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
          <h1>Custom Space Dimensions &amp; 2D CAD Consultation</h1>
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
                    <strong style={{ fontSize: '16px', color: '#1c1813', display: 'block', marginBottom: '4px' }}>Receive 2D CAD Blueprint in 24 Hours</strong>
                    <p style={{ fontSize: '13.5px', color: '#5c5246', lineHeight: 1.6, margin: 0 }}>
                      Our Master Sthapati drafts an architectural scale 2D CAD elevation tailored to your room dimensions and personal aesthetic preferences, delivered directly to your WhatsApp desk. (3D CAD visualization available upon request).
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

              {/* Error Notification Banner */}
              {errorMsg && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: '#fdf2f2',
                    border: '1px solid #f87171',
                    color: '#991b1b',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '16px',
                  }}
                >
                  <AlertCircle size={18} color="#dc2626" style={{ flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {submitted ? (
                <div
                  style={{
                    padding: '32px 24px',
                    background: 'linear-gradient(145deg, #fdfbf7 0%, #f7f2ea 100%)',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(197, 160, 89, 0.45)',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
                    textAlign: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(37, 211, 102, 0.12)',
                      border: '2px solid #25D366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      boxShadow: '0 8px 24px rgba(37, 211, 102, 0.25)'
                    }}
                  >
                    <CheckCircle2 size={36} color="#25D366" />
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      color: '#b08a4f',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '6px'
                    }}
                  >
                    CONSULTATION CONFIRMED
                  </span>
                  <h4 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 10px', fontWeight: 600 }}>
                    Thank You, {formData.name}!
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#5c5246', margin: '0 0 20px', lineHeight: 1.6 }}>
                    Your bespoke consultation request has been registered under reference{' '}
                    <strong style={{ color: '#1c1813', background: 'rgba(197, 160, 89, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                      #{inquiryId}
                    </strong>
                    . Our Senior Sthapati will review your space dimensions and prepare a 2D CAD blueprint within 24 hours.
                  </p>

                  {/* Summary details */}
                  <div
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      borderRadius: '10px',
                      padding: '16px',
                      textAlign: 'left',
                      fontSize: '12.5px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '22px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#7a7065' }}>Contact Number:</span>
                      <strong style={{ color: '#1c1813' }}>{formData.phone}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#7a7065' }}>Dimensions:</span>
                      <strong style={{ color: '#1c1813' }}>{formData.width || 'Custom'} W × {formData.depth || 'Custom'} D × {formData.height || 'Custom'} H</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#7a7065' }}>Location:</span>
                      <strong style={{ color: '#1c1813' }}>{formData.city || 'Private Patron'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#7a7065' }}>Selected Stone:</span>
                      <strong style={{ color: '#b08a4f' }}>{formData.stone?.split('(')[0]?.trim()}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href={`https://wa.me/917597417274?text=${encodeURIComponent(`Namaste A.F.G Marble & Arts, checking on my 2D CAD Consultation [${inquiryId}] for ${formData.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '14px 22px',
                        background: 'linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)',
                        color: '#ffffff',
                        borderRadius: '999px',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
                      }}
                    >
                      <MessageSquare size={16} />
                      <span>Chat Directly on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '11px',
                        background: 'transparent',
                        border: '1px solid rgba(197, 160, 89, 0.4)',
                        color: '#5c5246',
                        borderRadius: '999px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <RotateCcw size={13} />
                      <span>Submit Another Space Consultation</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Anti-spam honeypot */}
                  <input
                    type="text"
                    name="_hp_check"
                    value={formData._hp_check || ''}
                    onChange={(e) => setFormData({ ...formData, _hp_check: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>Your Name *</label>
                      <input
                        type="text"
                        required
                        maxLength={100}
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
                        maxLength={25}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 / International with country code"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.18)', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>City &amp; Country</label>
                    <input
                      type="text"
                      maxLength={100}
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
                        maxLength={50}
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
                        maxLength={50}
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
                        maxLength={50}
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
                      <option>Makrana Pure White Marble (Taj Mahal Stratum - Temples &amp; Mandirs)</option>
                      <option>Vietnam Pure White Marble (Snow Calcite - Temples &amp; Deities)</option>
                      <option>Rajnagar White Marble (Hydraulic Calcite - Palatial Fountains)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a4239', display: 'block', marginBottom: '4px' }}>Special Wishes / Idol Sizes</label>
                    <textarea
                      rows={3}
                      maxLength={1500}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Need backlit Om halo, jali folding doors, and pull-out diya drawer for Radha Krishna deities."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.18)', fontSize: '13px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                    style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}
                  >
                    <span className="btn-primary__text">{loading ? 'Transmitting Proposal...' : 'Generate 2D CAD Proposal via WhatsApp'}</span>
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

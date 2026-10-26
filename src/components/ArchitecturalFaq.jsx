'use client';
import { useState } from 'react';

export default function ArchitecturalFaq({ onOpenInquiry }) {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Will daily milk, ghee, honey, and burning oil lamps stain pure Makrana marble?',
      a: 'Never. Unlike imported Italian or Vietnam marbles which are porous and treated with synthetic epoxy resins, authentic Makrana marble consists of 99% pure crystalline calcium carbonate (calcite). Its tightly locked interlocking crystal matrix has near-zero water absorption (less than 0.04%). Ghee, milk abhishek, and oil lamp soot cannot penetrate the stone and wipe off cleanly with warm water, retaining its Taj Mahal luminescence for centuries.',
    },
    {
      q: 'Why is Makrana Albeta marble preferred over Vietnam White or Italian Statuario for Mandirs?',
      a: 'Vietnam white marble contains dolomite which turns dull, chalky, or yellowish when exposed to daily ritual liquids and incense smoke. Italian marbles like Statuario and Carrara are soft architectural stones meant for vertical cladding and bathroom vanities, containing invisible fissures often back-netted with fibreglass. Makrana Albeta is the only historical temple stone in India that actually grows whiter and more luminous with continuous water and milk abhishekam.',
    },
    {
      q: 'How are large temples delivered and installed inside completed luxury residences without mess?',
      a: 'Every AFG temple is engineered using a proprietary interlocking dry-joint modular system. The entire mandir is divided into numbered modular blocks (plinth base, fluted pillars, jali panels, and shikhara spire). All sections are pre-assembled and checked in our Jaipur yard before dispatch. On arrival at your home, our white-glove team fits the numbered interlocking stones seamlessly within 4 to 6 hours—completely dry, with zero wet mortar, dust, or construction noise.',
    },
    {
      q: 'What is Ayadi Vastu Shastra calculation and how does AFG apply it?',
      a: 'Ayadi Shastra is the sacred mathematical science of Sthapatya Veda. It calculates the perimeter, height, and sanctum depth using specific formulas that ensure the temple vibration radiates positive spiritual energy (Dhana Aya for prosperity, Ayushya for longevity, and Nakshatra harmony matching the family head). Our in-house Sthapathi calculates these dimensions before carving begins so your temple is an authentic spiritual sanctuary.',
    },
    {
      q: 'Can AFG design a custom sanctum for irregular apartment corners or restricted heights?',
      a: 'Yes. 100% of our commissions are bespoke. Whether you have an awkward alcove, a low false-ceiling clearance of 7.5 feet, or a palatial double-height atrium of 20 feet, our architectural CAD team incorporates your exact room blueprints, integrating concealed LED lighting channels, smoke ventilation flues, and velvet storage drawers tailored down to the millimeter.',
    },
    {
      q: 'How does ISPM-15 international export packaging prevent breakage during transit?',
      a: 'Every stone component is wrapped in moisture-resistant vapor barrier film, nestled inside 50mm high-density shock-absorbing EVA foam, and locked inside fumigated ISPM-15 certified marine-grade pinewood crates. Each crate is equipped with external Tip-N-Tell tilt sensors and shock indicators. We have successfully dispatched and installed over 450 international commissions across the USA, UK, UAE, Australia, and Singapore with a 100% zero-breakage record.',
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="sec-faq" style={{ padding: '90px 0', background: '#fff' }}>
      <div className="sec-container">
        <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
            ATELIER KNOWLEDGE &amp; CLARITY
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
            Frequently Asked Questions
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
            Everything you need to know about Makrana stone science, sacred Ayadi Vastu dimensions, modular indoor installation, and global delivery.
          </p>
        </div>

        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  marginBottom: '14px',
                  borderRadius: '12px',
                  border: isOpen ? '1px solid #b08a4f' : '1px solid rgba(28, 24, 19, 0.14)',
                  background: isOpen ? '#fcfaf6' : '#fff',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: '#1c1813', fontWeight: 600, lineHeight: 1.4 }}>
                    {f.q}
                  </span>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? '#1c1813' : 'rgba(176, 138, 79, 0.12)',
                      color: isOpen ? '#ecd39b' : '#8c6a36',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '16px',
                      fontWeight: 600,
                      transition: 'transform 0.25s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 24px 22px', borderTop: '1px solid rgba(176, 138, 79, 0.12)', paddingTop: '16px' }}>
                    <p style={{ fontSize: '14px', color: '#4a4239', lineHeight: 1.7, margin: 0 }}>
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="sec-cta-wrap text-center" style={{ marginTop: '48px' }}>
          <p style={{ fontSize: '14px', color: '#6b5f52', marginBottom: '16px' }}>
            Have a custom architectural question about your space?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => onOpenInquiry?.({ title: 'Architectural Consultation Request' })}
            >
              <span className="btn-primary__text">Ask Sthapati on Discovery Call</span>
              <span className="btn-primary__icon">→</span>
            </button>
            <a
              href="https://wa.me/917597417274?text=Namaste%20AFG%20Marble,%20I%20have%20a%20technical%20question%20regarding%20my%20temple%20dimensions"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              <span>Instant WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

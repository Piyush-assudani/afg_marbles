'use client';
import { useState } from 'react';

export default function ArchitecturalFaq({ onOpenInquiry }) {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Will daily milk, oil, and puja rituals stain pure Makrana marble?',
      a: 'Never. 100% pure Makrana marble does not absorb liquids. Milk, water, honey, diya oil, and incense smoke cannot go inside the stone. Simply wipe with a wet cotton cloth, and your temple will stay clean and bright white for generations.',
    },
    {
      q: 'Why is Makrana marble better than Italian marble for home temples?',
      a: 'Italian marbles like Statuario are soft stones meant for indoor floors; they absorb liquids and turn yellowish within 2 to 3 years. Makrana marble is the famous stone used in the Taj Mahal. It is super dense, 100% stain-resistant, and actually looks newer and whiter with every wash.',
    },
    {
      q: 'How is the marble temple delivered and installed in my home without mess?',
      a: 'Every temple is made of interlocking marble pieces (base, pillars, panels, and dome). We assemble the whole temple in our workshop first and send you a video check. When it arrives at your home, our team fits the pieces together in 4 to 6 hours—completely clean, with zero dust, cement, or noise.',
    },
    {
      q: 'What is Vastu calculation and how do you design temples according to it?',
      a: 'Vastu is the ancient Indian science of positive home energy. It calculates the exact temple height, width, and depth to bring peace, good health, and prosperity to your family. Our temple experts calculate these measurements before carving begins.',
    },
    {
      q: 'Can you make a custom temple for my apartment size or low ceiling?',
      a: 'Yes! 100% of our temples are custom-made to fit your space. Whether you have a small apartment corner, a 7.5-foot false ceiling, or a large living room, we make an exact 2D drawing of your room first. We also include warm LED lighting, smoke vents, and smooth storage drawers.',
    },
    {
      q: 'How do you pack the marble temple so it doesn’t break during shipping?',
      a: 'Every marble piece is wrapped in protective foam and packed inside heavy-duty, certified wooden boxes with transit insurance. We have delivered over 450 marble temples safely across India and worldwide to the USA, UK, UAE, Canada, and Australia with zero breakage.',
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
            CLEAR ANSWERS
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
            Frequently Asked Questions
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
            Everything you need to know about marble quality, custom temple sizes, home delivery, and easy assembly.
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
              <span className="btn-primary__text">Schedule a Free Call</span>
              <span className="btn-primary__icon">→</span>
            </button>
            <a
              href="https://wa.me/917597417274?text=Hello%20AFG%20Marble,%20I%20have%20a%20question%20about%20marble%20temples"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

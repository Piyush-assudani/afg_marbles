'use client';

export default function PricingPhilosophy({ onOpenInquiry }) {
  const TIERS = [
    {
      badge: 'Apartments & Puja Rooms',
      scale: '3.0 ft to 4.2 ft Width',
      title: 'Apartment & Villa Home Temples',
      ideal: 'Ideal for modern apartments, villas, and dedicated home puja rooms.',
      investment: 'Custom Quote on Request',
      stone: '100% Pure Makrana White Marble',
      features: [
        'Solid single-block Makrana white marble base',
        'Hand-carved dome with traditional sacred kalash',
        'Velvet-lined drawer for puja items & sliding aarti tray',
        'Warm LED background lighting designed for temples',
        'Safe wooden crate packing with transit insurance',
      ],
      turnaround: '4 to 6 weeks crafting time',
      popular: false,
    },
    {
      badge: 'Most Popular Choice',
      scale: '5.0 ft to 6.5 ft Width',
      title: 'Grand Villa & Bungalow Mandirs',
      ideal: 'Designed for independent villas, ancestral homes, and spacious living areas.',
      investment: 'Custom Quote on Request',
      stone: 'First-Selection Pure Makrana Calcite',
      features: [
        'Full marble sanctum with carved pillars and arches',
        'Intricate hand-carved jali folding doors',
        'Handcrafted peacock arch and softly glowing Om backdrop',
        '24K pure gold leaf detailing and semi-precious stone inlay',
        'Full trial assembly in our Jaipur workshop with video review before delivery',
      ],
      turnaround: '6 to 8 weeks crafting time',
      popular: true,
    },
    {
      badge: 'Large Scale Commission',
      scale: '7.5 ft to 12.0 ft+ Width',
      title: 'Large Estate & Community Temples',
      ideal: 'For grand palatial homes, courtyards, trusts, and community shrines.',
      investment: 'Bespoke Quote on Space Dimensions',
      stone: 'Direct Quarry Selected Monolithic Marble',
      features: [
        'Multi-tiered traditional temple domes (Shikharas)',
        'Hand-carved elephant base and spacious layout',
        'Custom Vastu architectural drawings and 2D blueprints',
        'Complete installation by our master craftsmen anywhere in India and abroad',
        'Lifetime guarantee certificate: 100% pure Makrana marble that never yellows',
      ],
      turnaround: '10 to 14 weeks crafting time',
      popular: false,
    },
  ];

  const handleWhatsAppPricing = (tierTitle) => {
    const text = `Namaste A.F.G Marble & Arts, I would like to get a pricing estimate for "${tierTitle}". I have my room dimensions ready.`;
    window.open(`https://wa.me/917597417274?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="sec-pricing-philosophy" id="pricing" style={{ padding: '90px 0', background: '#fbf9f4' }}>
      <div className="sec-container">
        <div className="sec-header text-center" style={{ marginBottom: '52px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
            TRANSPARENT QUARRY-TO-SANCTUM CRAFT
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.6vw, 46px)', color: '#1c1813', lineHeight: 1.2 }}>
            Understanding The Pricing Of Our Sacred Temples
          </h2>
          <div className="gold-rule center" style={{ margin: '16px auto 20px' }}></div>
          <p
            className="sub-lead"
            style={{ maxWidth: '760px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.65 }}
          >
            Unlike commercial resellers who markup stone through multiple middlemen, every A.F.G creation is mined from
            our direct Makrana quarries, carved by our generational Silawat guild, and priced transparently based on raw
            calcite volume and artisan carving hours.
          </p>
        </div>

        {/* Sacred Vow Plaque */}
        <div
          className="sacred-vow-plaque"
          style={{
            maxWidth: '860px',
            margin: '0 auto 48px',
            background: 'linear-gradient(135deg, #ffffff 0%, #faf6ee 100%)',
            border: '1px solid rgba(184, 134, 63, 0.35)',
            borderLeft: '5px solid #b8863f',
            borderRadius: '12px',
            padding: '24px 32px',
            boxShadow: '0 10px 30px rgba(184, 134, 63, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <span style={{ fontSize: '38px', color: '#b8863f', lineHeight: 0.9, fontFamily: 'serif' }}>“</span>
            <div>
              <p
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(16px, 1.9vw, 20px)',
                  color: '#2a2218',
                  fontStyle: 'italic',
                  lineHeight: 1.55,
                  margin: '0 0 10px',
                  fontWeight: 500,
                }}
              >
                There may be a little more expenditure in the creation being made for God, but the result should be such that there is no scope for any shortage.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#8c6023',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  The Atelier’s Sacred Pledge
                </span>
                <span style={{ color: 'rgba(184, 134, 63, 0.5)' }}>•</span>
                <span style={{ fontSize: '13px', color: '#6b5f52', fontStyle: 'italic' }}>
                  Uncompromised Virgin Calcite &amp; Generational Chiseling
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div
          className="pricing-tiers-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '48px',
          }}
        >
          {TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`pricing-card ${tier.popular ? 'is-popular' : ''}`}
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                padding: '36px 30px',
                border: tier.popular ? '2px solid #b8863f' : '1px solid rgba(176, 138, 79, 0.22)',
                boxShadow: tier.popular
                  ? '0 20px 48px -12px rgba(184, 134, 63, 0.22)'
                  : '0 10px 30px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {tier.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #b8863f, #8c6023)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '5px 16px',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(184, 134, 63, 0.35)',
                  }}
                >
                  Most Commissioned Scale
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: '#b08a4f',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {tier.badge}
                </span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 6px' }}>
                  {tier.title}
                </h3>
                <div
                  style={{
                    display: 'inline-block',
                    background: '#fcfaf6',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid rgba(176, 138, 79, 0.2)',
                    fontSize: '12px',
                    color: '#8c6023',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}
                >
                  {tier.scale}
                </div>
                <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.5, margin: 0 }}>{tier.ideal}</p>
              </div>

              {/* Price Tag */}
              <div
                style={{
                  padding: '16px 20px',
                  background: '#faf6ee',
                  borderRadius: '8px',
                  border: '1px solid rgba(184, 134, 63, 0.2)',
                  marginBottom: '24px',
                }}
              >
                <span style={{ fontSize: '11px', color: '#7a6a57', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Commission Valuation:
                </span>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#8c6023',
                  }}
                >
                  {tier.investment}
                </div>
                <span style={{ fontSize: '11.5px', color: '#554736', display: 'block', marginTop: '4px' }}>
                  Stone: <strong>{tier.stone}</strong>
                </span>
              </div>

              {/* Feature Checklist */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1 }}>
                {tier.features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '13px',
                      color: '#4a4239',
                      lineHeight: 1.5,
                      marginBottom: '12px',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#b8863f"
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: '2px' }}
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                <button
                  type="button"
                  className="btn-whatsapp-pill"
                  onClick={() => handleWhatsAppPricing(tier.title)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '12px 20px',
                    background: 'linear-gradient(135deg, #1b4d3e 0%, #11382c 50%, #0a261d 100%)',
                    color: '#ffffff',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(212, 175, 55, 0.6)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(11, 46, 36, 0.35)',
                  }}
                >
                  <span>Get Price on WhatsApp</span>
                </button>

                <button
                  type="button"
                  className="btn-dossier-pill"
                  onClick={() => onOpenInquiry?.({ title: `${tier.title} (${tier.scale})` })}
                  style={{
                    width: '100%',
                    padding: '10px 18px',
                    background: 'transparent',
                    color: '#1c1813',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: '1px solid rgba(28, 24, 19, 0.22)',
                    cursor: 'pointer',
                  }}
                >
                  Request Custom Sizing Blueprint
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy Footnote Box */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1c1813, #2d251d)',
            color: '#f7efe5',
            borderRadius: '12px',
            padding: '32px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: '20px', margin: '0 0 8px', color: '#e8c992' }}>
              Why Our Pricing Never Changes Mid-Commission
            </h4>
            <p style={{ fontSize: '13.5px', color: '#c7bcae', lineHeight: 1.6, margin: 0 }}>
              Unlike unorganized carvers who request supplemental charges for polishing, shipping crates, or space
              drafting, every A.F.G proposal includes end-to-end quarry blocks, hand-carving, 2D CAD blueprints, trial
              assembly in Jaipur, and ISPM-15 fumigated international export crating.
            </p>
          </div>

          <a
            href="https://wa.me/917597417274?text=Namaste%20AFG%20Marble,%20I%20would%20like%20to%20send%20my%20room%20dimensions%20for%20a%20free%20custom%20temple%20quotation."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: '#b8863f',
              color: '#ffffff',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(184, 134, 63, 0.4)',
            }}
          >
            <span>Send Space Dimensions on WhatsApp</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

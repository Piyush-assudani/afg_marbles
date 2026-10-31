'use client';
import Link from 'next/link';
import PricingPhilosophy from '../../components/PricingPhilosophy';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function PricingGuidePage() {
  const FACTORS = [
    {
      title: '1. Marble Volume & Quality',
      desc: 'We use 100% natural pure Makrana white marble. Unlike ordinary stones that turn yellow or stain easily, genuine Makrana marble stays bright white forever and contains zero iron impurities.'
    },
    {
      title: '2. Hand-Carving Details & Time',
      desc: 'Each custom temple takes hundreds of hours of delicate hand-carving by master artisans. Deeply carved pillars, jali doors, and peacock arches require meticulous skill.'
    },
    {
      title: '3. Custom Sizes & Vastu Calculations',
      desc: 'Our temple designers calculate auspicious Vastu proportions to match your exact room size, so the temple fits your space with spiritual harmony.'
    },
    {
      title: '4. Full Trial Setup & Safe Packing',
      desc: '100% full setup in our workshop before packing, video and photo inspection for your approval, and strong foam-padded wooden box packing are included.'
    }
  ];

  const FAQS = [
    {
      q: 'Do you charge extra for custom dimensions?',
      a: 'Never. Every single temple at AFG Marble is custom-made to your exact room width, depth, and ceiling height. You only pay for the marble volume and artisan carving work required.'
    },
    {
      q: 'Does Makrana marble turn yellow from diya oil and abhishek milk?',
      a: 'Zero yellowing guarantee. Authentic Makrana marble has near-zero porosity and contains no iron. Liquids wipe off cleanly without leaving stains. Over years of regular cleaning, Makrana marble actually grows brighter.'
    },
    {
      q: 'How does international shipping and customs clearance work?',
      a: 'We manage complete worldwide shipping across 28+ countries including USA, UK, UAE, Canada, and Australia. Your crate is delivered safely to your doorstep with full insurance.'
    },
    {
      q: 'Can our temple fit through a standard apartment elevator or door?',
      a: 'Yes. Our temples are built in interlocking modular sections. Even large 10-foot or 12-foot temples are designed to pass easily through standard 3-foot doors and apartment lifts.'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Price Guide</span>
            <span>/</span>
            <span>Pricing &amp; Cost Guide</span>
          </div>
          <h1>Transparent Temple Pricing &amp; Cost Guide</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Direct factory pricing with no middleman markups, showroom commissions, or hidden fees. See how temple pricing works and get a free quote for your exact size.
          </p>
        </div>
      </section>

      {/* Pricing Philosophy Component */}
      <PricingPhilosophy />

      {/* 4 Cost Pillars */}
      <section className="subpage-body" style={{ padding: '60px 0', background: '#faf6ee' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '40px' }}>
            <span className="card-badge">DIRECT FACTORY VALUE</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813' }}>
              The 4 Things That Determine Temple Price
            </h2>
            <div className="gold-rule center"></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {FACTORS.map((f, i) => (
              <div key={i} className="creation-card" style={{ padding: '30px', background: '#ffffff' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '19px', color: '#1c1813', marginBottom: '8px' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#5c5246', lineHeight: 1.6, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing FAQ Accordion */}
          <div className="sec-header text-center" style={{ marginBottom: '36px' }}>
            <span className="card-badge">COMMON QUESTIONS</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#1c1813' }}>
              Frequently Asked Questions About Pricing
            </h2>
            <div className="gold-rule center"></div>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} className="creation-card" style={{ padding: '24px 28px', background: '#ffffff' }}>
                <strong style={{ fontSize: '16px', color: '#1c1813', display: 'block', marginBottom: '8px' }}>
                  {faq.q}
                </strong>
                <p style={{ fontSize: '13.5px', color: '#5c5246', lineHeight: 1.6, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Difference Table & Consultation */}
      <DifferenceTable />
      <ConsultationCard />
    </>
  );
}

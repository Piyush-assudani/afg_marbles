'use client';
import Link from 'next/link';
import PricingPhilosophy from '../../components/PricingPhilosophy';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function PricingGuidePage() {
  const FACTORS = [
    {
      title: '1. Raw Makrana Calcite Bedrock Volume',
      desc: 'We use exclusively 98%–99% pure CaCO3 Makrana calcite. Unlike commercial soft Italian or dolomitic stones, authentic Makrana blocks are diamond-sawn from deep bedrock seams with zero iron impurities that turn yellow over time.'
    },
    {
      title: '2. Sculptor Hand-Chiseling Hours',
      desc: 'A master sanctum requires 350 to 900 hours of continuous hand-carving by generational Silawat sculptors. Deep undercut relief, pierced jaali lattices, and sculpted elephant plinths demand supreme artisanal discipline.'
    },
    {
      title: '3. Ayadi Vastu Mathematical Drafting',
      desc: 'Our Master Sthapati custom-calculates every dimension to sacred Shastra ratios. Every bracket, kalash finial, and sanctum aperture is engineered in mathematical harmony.'
    },
    {
      title: '4. Pre-Assembly Fitment & ISPM-15 Crating',
      desc: '100% pre-assembly in our Makrana yard, 4K inspection video verification, and custom-built shock-absorbing marine export crating are included in every proposal with zero hidden add-ons.'
    }
  ];

  const FAQS = [
    {
      q: 'Do you charge extra for custom dimensions?',
      a: 'Never. Every single sanctum at AFG Marble is custom-engineered to your exact room width, depth, and ceiling height. You only pay for the raw stone volume and artisan carving hours required.'
    },
    {
      q: 'Does Makrana marble turn yellow from diya oil and abhishek milk?',
      a: 'Zero yellowing guarantee. Authentic Makrana marble has near-zero porosity (0.01%) and contains no iron oxides. Liquids wipe off cleanly without leaving stains. Over generations of regular cleaning, Makrana marble actually grows whiter and more luminous.'
    },
    {
      q: 'How does international shipping and customs clearance work?',
      a: 'We manage complete turnkey logistics under ISPM-15 compliance across 28+ countries including USA, UK, UAE, Canada, and Australia. Your crate is delivered directly to your doorstep with all-risk transit insurance.'
    },
    {
      q: 'Can our temple fit through a standard apartment elevator or door?',
      a: 'Yes. Our temples are engineered in modular dry-joint interlocking components. Even monumental 12-foot sanctums are calibrated to pass through standard 36-inch residential doors and passenger elevators.'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Atelier Investment</span>
            <span>/</span>
            <span>Pricing &amp; Investment Guide</span>
          </div>
          <h1>Transparent Temple Pricing &amp; Investment Guide</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Direct quarry-to-sanctum pricing with no showroom markups, broker commissions, or hidden surprises. Discover the 4 factors that govern authentic Makrana marble craftsmanship and explore our turnkey investment tiers.
          </p>
        </div>
      </section>

      {/* Pricing Philosophy Component */}
      <PricingPhilosophy />

      {/* 4 Cost Pillars */}
      <section className="subpage-body" style={{ padding: '60px 0', background: '#faf6ee' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '40px' }}>
            <span className="card-badge">THE VALUE OF ETERNAL STONE</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813' }}>
              The 4 Pillars That Determine Your Temple Investment
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
            <span className="card-badge">FREQUENT INQUIRIES</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#1c1813' }}>
              Common Questions on Temple Investment
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

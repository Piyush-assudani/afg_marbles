'use client';
import Link from 'next/link';
import { Award, FileText, CheckCircle2, ShieldCheck, Box, RefreshCw } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      <section className="subpage-hero" style={{ padding: 'clamp(115px, 13vw, 155px) 24px clamp(40px, 5vw, 60px)', background: 'radial-gradient(ellipse at center, #ffffff 0%, #f6efe4 100%)', textAlign: 'center' }}>
        <div className="sec-container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="breadcrumbs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#8c6a36', marginBottom: '20px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
            <Link href="/" style={{ color: '#8c6a36', textDecoration: 'none' }}>Home</Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ opacity: 0.8 }}>Legal &amp; Sovereign Charter</span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ color: '#1c1813', fontWeight: 700 }}>Terms of Commission</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(184, 134, 63, 0.12)', border: '1px solid rgba(184, 134, 63, 0.3)', borderRadius: '999px', padding: '5px 16px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a5a22', marginBottom: '18px' }}>
            <Award size={13} strokeWidth={2.4} />
            <span>Atelier Commission Protocols · Est. 1987</span>
          </div>

          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.4vw, 56px)', color: '#1c1813', margin: '0 0 16px', lineHeight: 1.15, fontWeight: 400 }}>
            Terms &amp; Conditions of Atelier Commission
          </h1>
          <div className="gold-rule center" style={{ margin: '14px auto 20px', width: '70px', height: '2px', background: 'linear-gradient(90deg, transparent, #b8863f, transparent)' }}></div>
          <p className="sub-lead" style={{ maxWidth: '780px', margin: '0 auto', fontSize: '16px', color: '#5e5245', lineHeight: 1.7 }}>
            Official architectural governance, quarry calcite warranties, dry-fit yard verification milestones, and international transit standards of A.F.G Marble &amp; Arts.
          </p>
        </div>
      </section>

      <section className="subpage-body" style={{ padding: '60px 24px 100px', background: '#faf6ee' }}>
        <div className="sec-container" style={{ maxWidth: '920px', margin: '0 auto' }}>

          {/* Calcite Warranty Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(184, 134, 63, 0.35)',
              boxShadow: '0 12px 40px rgba(28, 24, 19, 0.06)',
              padding: '28px 32px',
              marginBottom: '36px',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #b8863f, #8c6a36)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 6px 16px rgba(184, 134, 63, 0.35)',
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--serif)', fontSize: '18px', color: '#1c1813', letterSpacing: '-0.01em' }}>
                Generational Calcite Warranty &amp; Zero-Yellowing Guarantee
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#685c4f', lineHeight: 1.7 }}>
                All sacred mandirs, courtyard fountains, and royal pavilions commissioned in Makrana White are carved exclusively from certified 99.2% calcium carbonate metamorphic rock from the Makrana bedrock (Rajasthan). Guaranteed zero discoloration and zero yellowing over generational abhishek rituals.
              </p>
            </div>
          </div>

          {/* Main Terms Article */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid rgba(184, 134, 63, 0.22)',
              boxShadow: '0 8px 32px rgba(28, 24, 19, 0.04)',
              padding: 'clamp(32px, 5vw, 56px)',
              lineHeight: 1.85,
              fontSize: '15px',
              color: '#423a31',
            }}
          >
            {/* Clause I */}
            <div style={{ marginBottom: '40px', paddingBottom: '36px', borderBottom: '1px solid rgba(184, 134, 63, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Section I</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Material Certification</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                1. Authentic Makrana Calcite Warranty
              </h3>
              <p style={{ margin: 0 }}>
                A.F.G Marble &amp; Arts guarantees that all temple sanctums commissioned in Makrana White are carved exclusively from pure calcite crystalline marble quarried in the Makrana mineral belt (Nagaur, Rajasthan). Each commission is backed by our generational zero-yellowing assurance. A physical laboratory assay certificate is provided with each dispatch.
              </p>
            </div>

            {/* Clause II */}
            <div style={{ marginBottom: '40px', paddingBottom: '36px', borderBottom: '1px solid rgba(184, 134, 63, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Section II</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>CAD Blueprinting</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                2. Architectural CAD Blueprint Sign-Off
              </h3>
              <p style={{ margin: 0 }}>
                Prior to chisel extraction on raw stone, patrons receive an architectural 2D CAD blueprint detailing exact elevation formulas, Ayadi Vastu directional alignments, pillar spacings, and ceiling load metrics. Block extraction and artisan chiseling begin solely after patron written sign-off.
              </p>
            </div>

            {/* Clause III */}
            <div style={{ marginBottom: '40px', paddingBottom: '36px', borderBottom: '1px solid rgba(184, 134, 63, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Section III</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dry-Fit Verification</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                3. Jaipur Yard Pre-Assembly Verification &amp; 4K Walkthrough
              </h3>
              <p style={{ margin: 0 }}>
                Before crating, every multi-tiered mandir, chhatri dome, or fountain is 100% dry-fit assembled in our Jaipur atelier yard. Patrons or their architectural representatives receive ultra-HD 4K walkthrough video and centimeter-ruler joint checks. Patrons are also welcomed for physical inspection in Jaipur with complimentary concierge transport.
              </p>
            </div>

            {/* Clause IV */}
            <div style={{ marginBottom: '40px', paddingBottom: '36px', borderBottom: '1px solid rgba(184, 134, 63, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Section IV</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Packaging &amp; Transit</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                4. ISPM-15 Certified Export Packaging &amp; All-Risk Transit
              </h3>
              <p style={{ margin: 0 }}>
                All shipments are encased in heat-treated, fumigated ISPM-15 compliant sea/air-worthy timber crates with shock-absorbing high-density polyethylene dampening. Every consignment carries comprehensive door-to-door transit insurance covering ocean freight, air cargo, and final estate driveway offloading.
              </p>
            </div>

            {/* Clause V */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Section V</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Installation &amp; Care</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                5. On-Site Artisan Assembly &amp; Generational Care
              </h3>
              <p style={{ margin: '0 0 24px' }}>
                For monumental sanctums and palatial fountains, A.F.G deploys senior Silawat guild sculptors for on-site alignment, epoxy bonding, and mirror-finish stone buffing at the patron estate anywhere globally. Complete care guides and abhishek formulations are handed over upon inauguration.
              </p>

              {/* Atelier Sign-Off */}
              <div
                style={{
                  background: '#fcfaf6',
                  borderRadius: '12px',
                  border: '1px solid rgba(184, 134, 63, 0.28)',
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8c6a36', fontWeight: 700 }}>
                    Commission Governance
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#1c1813', fontWeight: 600 }}>
                    A.F.G Marble &amp; Arts · Jaipur &amp; Makrana Ateliers
                  </p>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#27ae60', fontSize: '13px', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Sovereign Quality Sign-Off Guarantee</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

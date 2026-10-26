'use client';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span>Terms &amp; Conditions</span>
          </div>
          <h1>Terms &amp; Conditions of Atelier Commission</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Official architectural governance, quarry procurement protocols, and international transit standards of A.F.G Marble &amp; Arts.
          </p>
        </div>
      </section>

      <section className="subpage-body">
        <div className="sec-container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="legal-article">
            <h3>1. Authentic Makrana Calcite Warranty</h3>
            <p>
              A.F.G Marble &amp; Arts guarantees that all temple sanctums commissioned in Makrana White are carved exclusively from pure calcite crystalline marble quarried in the Makrana mineral belt (Nagaur, Rajasthan). Each commission is backed by our generational zero-yellowing assurance.
            </p>

            <h3 style={{ marginTop: '32px' }}>2. Architectural CAD Blueprint Sign-Off</h3>
            <p>
              Prior to carving raw stone, clients receive an architectural 2D CAD schematic with precise measurements and elevation plans. Carving commences only upon client verification. (Optional 3D CAD rendering available on demand).
            </p>

            <h3 style={{ marginTop: '32px' }}>3. Jaipur Yard Pre-Assembly Verification</h3>
            <p>
              Clients are provided with comprehensive 4K trial assembly video and photographic documentation from our Jaipur yard before dismantling for packaging.
            </p>

            <h3 style={{ marginTop: '32px' }}>4. ISPM-15 Export Packaging &amp; Transit</h3>
            <p>
              All shipments are packed in fumigated, heat-treated ISPM-15 wooden crates with internal high-density EVA foam dampening. Comprehensive all-risk transit insurance is included on all domestic and global dispatches.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

'use client';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>
          <h1>Privacy Policy &amp; Patron Confidentiality</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Protecting the architectural plans, residence layouts, and private coordinates of our esteemed patrons.
          </p>
        </div>
      </section>

      <section className="subpage-body">
        <div className="sec-container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="legal-article">
            <h3>1. Residence Layout &amp; Space Dimensions Confidentiality</h3>
            <p>
              All room dimensions, floor plans, and residence photographs submitted to A.F.G Marble &amp; Arts are strictly confidential. We never share client property photos, blueprints, or family details with third parties.
            </p>

            <h3 style={{ marginTop: '32px' }}>2. Lead Data Persistence</h3>
            <p>
              Inquiries and space measurements submitted through our portal are stored securely in local browser registers and our private ledger to enable ongoing architectural consultations and historical reference for future maintenance.
            </p>

            <h3 style={{ marginTop: '32px' }}>3. Contact &amp; Grievance</h3>
            <p>
              For privacy inquiries or to request dossier deletion, contact our Concierge Desk at <a href="mailto:info@afgmarbel.com">info@afgmarbel.com</a> or via WhatsApp at <a href="https://wa.me/917597417274">+91 7597417274</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

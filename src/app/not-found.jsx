'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        background: '#fbf9f4',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '580px',
          background: '#ffffff',
          padding: '48px 36px',
          borderRadius: '20px',
          border: '1px solid rgba(176, 138, 79, 0.25)',
          boxShadow: '0 20px 50px -10px rgba(28, 24, 19, 0.12)',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#b08a4f',
            display: 'block',
            marginBottom: '8px',
          }}
        >
          A.F.G MARBLE &amp; ARTS · ARCHITECTURAL CATALOG
        </span>

        <h1
          style={{
            fontFamily: 'var(--serif, serif)',
            fontSize: '32px',
            color: '#1c1813',
            marginBottom: '14px',
            fontWeight: 500,
          }}
        >
          Masterpiece Not Found
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: '#6b5f52',
            lineHeight: 1.65,
            marginBottom: '28px',
          }}
        >
          The requested architectural commission or page does not exist in our current catalog. Please explore our flagship pooja sanctums or palatial water fountains.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/pooja-sanctums"
            className="btn-primary"
            style={{
              padding: '12px 26px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <span className="btn-primary__text">Explore Pooja Sanctums</span>
            <span className="btn-primary__icon">→</span>
          </Link>

          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#1c1813',
              border: '1px solid rgba(28, 24, 19, 0.25)',
              background: '#ffffff',
              textDecoration: 'none',
            }}
          >
            Return to Sanctuary Home
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // If it's a ChunkLoadError during a live deployment rollout, auto-reload once
    const msg = (error?.message || '').toLowerCase();
    if (
      msg.includes('chunkloaderror') ||
      msg.includes('loading chunk') ||
      msg.includes('failed to fetch') ||
      msg.includes('connection closed')
    ) {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: '#fbf9f4',
        color: '#1c1813',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          background: '#ffffff',
          padding: '48px 36px',
          borderRadius: '20px',
          border: '1px solid rgba(176, 138, 79, 0.25)',
          boxShadow: '0 20px 50px -10px rgba(28, 24, 19, 0.12)',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <img
            src="/afg-logo.svg"
            alt="A.F.G Marble & Arts"
            style={{ width: '80px', height: 'auto', margin: '0 auto', display: 'block' }}
          />
        </div>

        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#b08a4f',
            display: 'block',
            marginBottom: '10px',
          }}
        >
          A.F.G MARBLE &amp; ARTS · CONCIERGE DESK
        </span>

        <h2
          style={{
            fontFamily: 'var(--serif, serif)',
            fontSize: '28px',
            color: '#1c1813',
            marginBottom: '14px',
            fontWeight: 500,
          }}
        >
          Connecting to Masterpiece Atelier
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: '#6b5f52',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          A fresh version of our architectural catalog was just deployed. Please reload the page to load the latest high-resolution stoneworks.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') window.location.reload();
              else reset();
            }}
            className="btn-primary"
            style={{
              padding: '12px 28px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            <span className="btn-primary__text">Reload Masterpiece Page</span>
            <span className="btn-primary__icon">↺</span>
          </button>

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

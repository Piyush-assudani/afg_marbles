'use client';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // If chunk mismatch happens between live Vercel deployments, self-heal via reload
    const msg = (error?.message || '').toLowerCase();
    if (
      msg.includes('chunkloaderror') ||
      msg.includes('loading chunk') ||
      msg.includes('failed to fetch') ||
      msg.includes('connection closed') ||
      msg.includes('module') ||
      msg.includes('failed to find server action')
    ) {
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Updating Atelier Experience | A.F.G Marble &amp; Arts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: 'linear-gradient(180deg, #fdfbf7 0%, #f6f1e7 100%)',
          color: '#1c1813',
          fontFamily: 'serif',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            width: '90%',
            background: '#ffffff',
            padding: '44px 32px',
            borderRadius: '20px',
            border: '1.5px solid rgba(197, 160, 89, 0.4)',
            boxShadow: '0 24px 60px rgba(28, 24, 19, 0.12)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#b08a4f',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            A.F.G MARBLE &amp; ARTS · ATELIER DESK
          </span>

          <h2
            style={{
              fontSize: '26px',
              color: '#1c1813',
              margin: '0 0 12px',
              fontWeight: 500,
            }}
          >
            Refining Sacred Architecture
          </h2>

          <p
            style={{
              fontSize: '14px',
              color: '#6b5f52',
              lineHeight: 1.6,
              margin: '0 0 28px',
            }}
          >
            A new version of our master catalog was recently updated. Please refresh to load the latest sanctum blueprints and high-definition stones.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 28px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #b08a4f 0%, #8c6a36 100%)',
                color: '#ffffff',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(176, 138, 79, 0.35)',
              }}
            >
              Refresh Latest Version
            </button>

            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: '999px',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                background: '#ffffff',
                color: '#1c1813',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Sanctuary Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

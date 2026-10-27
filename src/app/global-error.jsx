'use client';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // If chunk mismatch happens between live Vercel deployments, self-heal via reload automatically
    if (typeof window !== 'undefined') {
      const lastReload = sessionStorage.getItem('afg_last_global_reload');
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 8000) {
        sessionStorage.setItem('afg_last_global_reload', now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>A.F.G Marble &amp; Arts · Updating Atelier</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: 'radial-gradient(ellipse at 50% 45%, #ffffff 0%, #faf8f5 65%, #f4ece1 100%)',
          color: '#1c1813',
          fontFamily: "'Playfair Display', Georgia, serif",
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '460px',
            width: '90%',
            background: '#ffffff',
            padding: '44px 32px',
            borderRadius: '24px',
            border: '1px solid rgba(184, 134, 63, 0.25)',
            boxShadow: '0 20px 50px -10px rgba(28, 24, 19, 0.08)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src="/afg-logo.svg"
            alt="A.F.G Marble & Arts"
            style={{ width: '90px', height: 'auto', marginBottom: '20px' }}
          />

          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#8c6023',
              fontFamily: 'system-ui, sans-serif',
              marginBottom: '8px',
            }}
          >
            A.F.G MARBLE &amp; ARTS
          </span>

          <h2
            style={{
              fontSize: '22px',
              color: '#1c1813',
              margin: '0 0 10px',
              fontWeight: 600,
            }}
          >
            Updating Atelier Experience
          </h2>

          <p
            style={{
              fontSize: '13px',
              color: '#7a6a58',
              lineHeight: 1.5,
              margin: '0 0 24px',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Refining sacred architecture and synchronizing catalog...
          </p>

          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '3px solid rgba(184, 134, 63, 0.18)',
              borderTopColor: '#b08a4f',
              animation: 'afgSpin 0.9s linear infinite',
              marginBottom: '20px',
            }}
          />

          <style>{`
            @keyframes afgSpin {
              to { transform: rotate(360deg); }
            }
          `}</style>

          <a
            href="/"
            style={{
              color: '#8c6023',
              fontSize: '12px',
              textDecoration: 'underline',
              fontFamily: 'system-ui, sans-serif',
              opacity: 0.85,
            }}
          >
            Return to Sanctuary Home
          </a>
        </div>
      </body>
    </html>
  );
}


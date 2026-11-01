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
        <title>A.F.G Marble &amp; Art</title>
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <img
          src="/afg-logo.svg"
          alt="A.F.G Marble & Art"
          style={{ width: '92px', height: 'auto', marginBottom: '22px' }}
        />

        {/* Minimalist Dual-Ring Luxury Loader */}
        <div
          style={{
            position: 'relative',
            width: '40px',
            height: '40px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px solid rgba(184, 134, 63, 0.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#c59d5f',
              borderRightColor: '#b8863f',
              animation: 'afgGlobalSpin 0.9s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite',
            }}
          />
        </div>

        <span
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#8c6023',
            marginBottom: '6px',
          }}
        >
          A.F.G MARBLE &amp; ART
        </span>

        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '13px',
            color: '#7a6a58',
            letterSpacing: '0.04em',
            marginBottom: '24px',
          }}
        >
          Crafting Divine Spaces In Marble
        </span>

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
          Go to Home Page
        </a>

        <style>{`
          @keyframes afgGlobalSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </body>
    </html>
  );
}

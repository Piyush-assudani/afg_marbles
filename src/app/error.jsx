'use client';
import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Auto-reload immediately without asking user to click reload
    if (typeof window !== 'undefined') {
      const lastReload = sessionStorage.getItem('afg_last_err_reload');
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 8000) {
        sessionStorage.setItem('afg_last_err_reload', now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: 'radial-gradient(ellipse at 50% 45%, #ffffff 0%, #faf8f5 65%, #f4ece1 100%)',
        color: '#1c1813',
        textAlign: 'center',
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
            marginBottom: '8px',
          }}
        >
          A.F.G MARBLE &amp; ARTS
        </span>

        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '22px',
            color: '#1c1813',
            marginBottom: '10px',
            fontWeight: 600,
          }}
        >
          Synchronizing Atelier Experience
        </h2>

        <p
          style={{
            fontSize: '13px',
            color: '#7a6a58',
            lineHeight: 1.5,
            marginBottom: '24px',
          }}
        >
          Loading the latest architectural sanctum assets...
        </p>

        {/* Elegant Gold Spinner */}
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

        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') window.location.href = '/';
            else reset();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#8c6023',
            fontSize: '12px',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: '4px',
            opacity: 0.85,
          }}
        >
          Return to Sanctuary Home
        </button>
      </div>
    </div>
  );
}


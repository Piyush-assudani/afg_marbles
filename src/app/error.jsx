'use client';
import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Auto-reload seamlessly if chunk mismatch happens between live deployments
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: 'radial-gradient(ellipse at 50% 45%, #ffffff 0%, #faf8f5 65%, #f4ece1 100%)',
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
            animation: 'afgErrSpin 0.9s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite',
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

      <button
        type="button"
        onClick={() => {
          if (typeof window !== 'undefined') window.location.href = '/';
        }}
        style={{
          background: 'none',
          border: 'none',
          color: '#8c6023',
          fontSize: '12px',
          cursor: 'pointer',
          textDecoration: 'underline',
          fontFamily: 'system-ui, sans-serif',
          opacity: 0.85,
        }}
      >
        Go to Home Page
      </button>

      <style>{`
        @keyframes afgErrSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

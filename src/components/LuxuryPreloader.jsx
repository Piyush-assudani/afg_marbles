'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LuxuryPreloader() {
  const pathname = usePathname();
  const isHomePage = !pathname || pathname === '/';

  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // If not homepage or already visited in this session, skip splash
    try {
      if (!isHomePage) {
        setRemoved(true);
        return;
      }
      if (typeof window !== 'undefined') {
        if (window.__AFG_MODEL_LOADED) {
          setRemoved(true);
          return;
        }
        if (sessionStorage.getItem('afg_atelier_loaded')) {
          setRemoved(true);
          return;
        }
      }
    } catch (_e) {}

    setVisible(true);

    let isFinished = false;
    const hidePreloader = () => {
      if (isFinished) return;
      isFinished = true;
      try {
        sessionStorage.setItem('afg_atelier_loaded', '1');
        if (typeof window !== 'undefined') {
          window.__AFG_MODEL_LOADED = true;
        }
      } catch (_e) {}

      setTimeout(() => {
        setFading(true);
        setTimeout(() => {
          setRemoved(true);
        }, 400);
      }, 150);
    };

    // If 3D model is ready, hide immediately
    if (typeof window !== 'undefined') {
      if (window.__AFG_MODEL_LOADED) {
        hidePreloader();
        return;
      }
      window.addEventListener('afg_model_ready', hidePreloader, { once: true });
    }

    // Safety timeout: preloader never hangs more than 1.6s
    const timer = setTimeout(() => {
      hidePreloader();
    }, 1600);

    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined') {
        window.removeEventListener('afg_model_ready', hidePreloader);
      }
    };
  }, [isHomePage]);

  if (!visible || removed) return null;

  return (
    <div
      id="afg-luxury-preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999999,
        background: 'radial-gradient(ellipse at 50% 45%, #ffffff 0%, #faf8f5 65%, #f4ece1 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
      aria-label="A.F.G Marble And Art"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Brand Logo */}
        <img
          src="/afg-logo.svg"
          alt="A.F.G Marble And Art"
          style={{ width: '96px', height: 'auto', marginBottom: '22px', display: 'block' }}
        />

        {/* Minimalist Dual-Ring Luxury Loader */}
        <div
          style={{
            position: 'relative',
            width: '42px',
            height: '42px',
            marginBottom: '24px',
          }}
        >
          {/* Subtle outer static ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px solid rgba(184, 134, 63, 0.2)',
            }}
          />
          {/* Radiant spinning gold arc */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#c59d5f',
              borderRightColor: '#b8863f',
              animation: 'afgLuxurySpin 0.9s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite',
            }}
          />
        </div>

        {/* Brand Typography */}
        <span
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.24em',
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
          }}
        >
          Crafting Divine Spaces In Marble
        </span>
      </div>

      <style>{`
        @keyframes afgLuxurySpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';

export default function LuxuryPreloader() {
  const [percent, setPercent] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Fast, smooth luxury counter from 0 to 100 in ~1.1s
    const startTime = performance.now();
    const duration = 1100; // ms

    let animId;
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentPercent = Math.round(eased * 100);

      setPercent(currentPercent);

      if (progress < 1) {
        animId = requestAnimationFrame(updateCounter);
      } else {
        setPercent(100);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsRemoved(true);
          }, 500);
        }, 120);
      }
    };

    animId = requestAnimationFrame(updateCounter);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      id="afg-luxury-preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        background: 'radial-gradient(ellipse at 50% 45%, #ffffff 0%, #faf8f5 65%, #f4ece1 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s ease',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'scale(1.02)' : 'scale(1)',
        pointerEvents: isFading ? 'none' : 'all',
      }}
      aria-label="Loading A.F.G Marble Atelier"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '380px',
          width: '90%',
        }}
      >
        {/* Brand Logo */}
        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <img
            src="/afg-logo.svg"
            alt="A.F.G Marble And Art"
            style={{ width: '110px', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Brand Typography */}
        <div
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '18px',
            letterSpacing: '0.14em',
            color: '#1c1813',
            fontWeight: 600,
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}
        >
          A.F.G Marble And Art
        </div>

        <div
          style={{
            fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '13px',
            color: '#8c6023',
            letterSpacing: '0.04em',
            marginBottom: '32px',
          }}
        >
          Crafting Divine Spaces In Marble
        </div>

        {/* Counter and Progress Bar */}
        <div style={{ width: '220px', position: 'relative' }}>
          {/* Number Counter */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '10px',
              fontFamily: 'var(--sans, system-ui)',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#9e8a74',
              }}
            >
              INITIALIZING ATELIER
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '16px',
                fontWeight: 700,
                color: '#8c6023',
                letterSpacing: '0.02em',
              }}
            >
              {percent}%
            </span>
          </div>

          {/* Luxury Gold Progress Bar Track */}
          <div
            style={{
              width: '100%',
              height: '3px',
              background: 'rgba(184, 134, 63, 0.16)',
              borderRadius: '999px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${percent}%`,
                background: 'linear-gradient(90deg, #b08a4f 0%, #d4af37 60%, #eed58b 100%)',
                borderRadius: '999px',
                transition: 'width 0.08s linear',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
              }}
            />
          </div>

          <p
            style={{
              marginTop: '18px',
              fontSize: '11px',
              color: '#8c7b69',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Taj Mahal Stratum · 99.2% Calcite
          </p>
        </div>
      </div>
    </div>
  );
}

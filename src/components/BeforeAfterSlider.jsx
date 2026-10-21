'use client';
import { useState, useRef, useCallback } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  return (
    <section className="sec-before-after" style={{ padding: '90px 0', background: '#1c1813', color: '#fff8eb', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(176,138,79,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="sec-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="sec-header text-center" style={{ marginBottom: '44px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px', background: 'rgba(212, 175, 55, 0.2)', color: '#ecd39b', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
            TRANSFORMATION SHOWCASE
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#fff8eb' }}>
            From Workshop Dry-Fit to Consecrated Sanctum
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px', background: 'linear-gradient(90deg, transparent, #ecd39b, transparent)' }}></div>
          <p className="sub-lead" style={{ maxWidth: '740px', margin: '0 auto', fontSize: '15px', color: '#c9bfae', lineHeight: 1.6 }}>
            Drag the interactive slider below to witness the transformation: from our Jaipur yard&apos;s modular dry-joint assembly to the illuminated, consecrated sanctum inside a patron&apos;s residence.
          </p>
        </div>

        {/* Comparison Viewer Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '960px',
            margin: '0 auto',
            height: 'clamp(380px, 58vw, 620px)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            cursor: 'ew-resize',
            userSelect: 'none',
          }}
        >
          {/* Base: Finished Sanctum (Right / Underneath) */}
          <img
            src="/gallery/mandir-pure-white-om.webp"
            alt="Consecrated Temple Sanctum with warm lighting and brass lamps"
            loading="lazy"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Top Layer: Raw Yard Assembly (Left / Clipped) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sliderPos}%`,
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <img
              src="/gallery/mandir-pure-white-om-before.webp"
              alt="Raw Silawat Workshop Dry-Fit in Jaipur Yard"
              loading="lazy"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                maxWidth: 'none',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Divider Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              width: '3px',
              background: '#ecd39b',
              boxShadow: '0 0 16px rgba(236, 211, 155, 0.8)',
              zIndex: 10,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Draggable Circle Handle */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#1c1813',
                border: '2px solid #ecd39b',
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ecd39b',
                cursor: 'grab',
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
                <polyline points="9 18 3 12 9 6" style={{ transform: 'translateX(12px) rotate(180deg)', transformOrigin: 'center' }} />
              </svg>
            </div>
          </div>

          {/* Floating Pill Badges */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              zIndex: 11,
              background: 'rgba(20, 16, 12, 0.82)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '0.04em',
            }}
          >
            ← Stage 3: Yard Dry-Fit Assembly
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              zIndex: 11,
              background: 'rgba(20, 16, 12, 0.82)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#ecd39b',
              letterSpacing: '0.04em',
            }}
          >
            Stage 5: Consecrated Sanctum →
          </div>
        </div>

        {/* 3 Quick Facts below the slider */}
        <div
          style={{
            maxWidth: '960px',
            margin: '36px auto 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '20px 22px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <strong style={{ color: '#ecd39b', display: 'block', fontSize: '14px', marginBottom: '6px' }}>Zero Invisible Defects</strong>
            <p style={{ fontSize: '13px', color: '#b8ad9e', lineHeight: 1.5, margin: 0 }}>Every interlocking dry joint is tested in our Jaipur yard before packaging so on-site installation takes only 4 to 6 hours.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '20px 22px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <strong style={{ color: '#ecd39b', display: 'block', fontSize: '14px', marginBottom: '6px' }}>Natural Diamond Water Mirror Polish</strong>
            <p style={{ fontSize: '13px', color: '#b8ad9e', lineHeight: 1.5, margin: 0 }}>We never use artificial wax or epoxy glaze. 8 stages of water-honed diamond buffing reveal the natural crystalline gloss.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '20px 22px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <strong style={{ color: '#ecd39b', display: 'block', fontSize: '14px', marginBottom: '6px' }}>4K Video Walkthrough Prior to Packing</strong>
            <p style={{ fontSize: '13px', color: '#b8ad9e', lineHeight: 1.5, margin: 0 }}>You receive high-resolution video walk-rounds with metric scale rulers verifying your exact measurements before dispatch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

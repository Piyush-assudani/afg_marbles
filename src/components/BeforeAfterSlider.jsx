'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    window.addEventListener('resize', updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

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
    <section className="sec-before-after" style={{ padding: '80px 0', background: '#1c1813', color: '#fff8eb', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(176,138,79,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="sec-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="sec-header text-center" style={{ marginBottom: '28px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px', background: 'rgba(212, 175, 55, 0.2)', color: '#ecd39b', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
            TRANSFORMATION SHOWCASE · BEFORE &amp; AFTER
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#fff8eb', lineHeight: 1.25 }}>
            Without Gold Work vs. With 24K Gold &amp; Color Finishing
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 16px', background: 'linear-gradient(90deg, transparent, #ecd39b, transparent)' }}></div>
          <p className="sub-lead" style={{ maxWidth: '780px', margin: '0 auto', fontSize: '15px', color: '#c9bfae', lineHeight: 1.6 }}>
            See how pure Makrana white marble carving looks in its natural hand-carved state, and how it transforms with 24K real gold leaf and traditional temple color artistry. Drag the slider below to compare:
          </p>
        </div>

        {/* Responsive Quick Toggle Chips (Ensures 100% clarity on Mobile & Desktop) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setSliderPos(90)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              background: sliderPos > 50 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              color: '#ffffff',
              border: sliderPos > 50 ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.25s ease'
            }}
          >
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ffffff', display: 'inline-block' }} />
            <span>Before: Pure White Marble (Without Color &amp; Gold)</span>
          </button>

          <button
            type="button"
            onClick={() => setSliderPos(10)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              background: sliderPos <= 50 ? 'rgba(212, 175, 55, 0.28)' : 'rgba(212, 175, 55, 0.08)',
              color: '#ecd39b',
              border: sliderPos <= 50 ? '1px solid #ecd39b' : '1px solid rgba(212, 175, 55, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.25s ease'
            }}
          >
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ecd39b', display: 'inline-block' }} />
            <span>After: With 24K Real Gold Leaf &amp; Colors</span>
          </button>
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
            maxWidth: '560px',
            aspectRatio: '2 / 3',
            margin: '0 auto',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)',
            border: '1.5px solid rgba(212, 175, 55, 0.45)',
            cursor: 'ew-resize',
            userSelect: 'none',
            background: '#14100c'
          }}
        >
          {/* Base: With 24K Gold & Color (Right / Underneath) */}
          <img
            src="/gallery/mandir-with-gold-color.webp"
            alt="After: Temple with 24K Real Gold Leaf and Traditional Colors"
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

          {/* Top Layer: Without Gold Work & Color (Left / Clipped) */}
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
              src="/gallery/mandir-without-gold-color.webp"
              alt="Before: Pure Hand-Carved Makrana White Marble Temple"
              loading="lazy"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: containerWidth ? `${containerWidth}px` : '100%',
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
              boxShadow: '0 0 16px rgba(236, 211, 155, 0.95)',
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
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#1c1813',
                border: '2px solid #ecd39b',
                boxShadow: '0 4px 20px rgba(0,0,0,0.8)',
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

          {/* Top-Left Badge: Pure Marble (Without Gold & Color) */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 11,
              background: 'rgba(16, 13, 10, 0.92)',
              backdropFilter: 'blur(8px)',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.04em',
              pointerEvents: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
            }}
          >
            ← NATURAL WHITE MARBLE
          </div>

          {/* Top-Right Badge: 24K Gold & Color Work */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 11,
              background: 'rgba(16, 13, 10, 0.92)',
              backdropFilter: 'blur(8px)',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.6)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#ecd39b',
              letterSpacing: '0.04em',
              pointerEvents: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
            }}
          >
            24K GOLD &amp; COLORS →
          </div>

          {/* Bottom Center Indicator Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 11,
              background: 'rgba(16, 13, 10, 0.88)',
              backdropFilter: 'blur(8px)',
              padding: '5px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              fontSize: '11px',
              fontWeight: 600,
              color: '#ecd39b',
              letterSpacing: '0.03em',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}
          >
            ↔ Drag slider to compare
          </div>
        </div>

        {/* 3 Quick Facts below the slider */}
        <div
          style={{
            maxWidth: '960px',
            margin: '32px auto 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px',
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '20px 22px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <strong style={{ color: '#ffffff', display: 'block', fontSize: '14px', marginBottom: '6px' }}>1. Pure White Marble (Hand-Carved)</strong>
            <p style={{ fontSize: '13px', color: '#b8ad9e', lineHeight: 1.5, margin: 0 }}>Authentic Makrana pure white marble chiseled by master sculptors. Clean, serene, and timeless in its natural stone elegance.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '20px 22px', borderRadius: '10px', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
            <strong style={{ color: '#ecd39b', display: 'block', fontSize: '14px', marginBottom: '6px' }}>2. 24K Pure Gold Leaf Work</strong>
            <p style={{ fontSize: '13px', color: '#b8ad9e', lineHeight: 1.5, margin: 0 }}>Temple spires, peacock arches, and pillar capitals are highlighted with genuine 24-karat gold leaf that stays radiant forever.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '20px 22px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <strong style={{ color: '#ecd39b', display: 'block', fontSize: '14px', marginBottom: '6px' }}>3. Traditional Temple Color Work</strong>
            <p style={{ fontSize: '13px', color: '#b8ad9e', lineHeight: 1.5, margin: 0 }}>Hand-painted with long-lasting temple mineral colors to highlight intricate peacock feathers, lotus flowers, and sacred motifs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

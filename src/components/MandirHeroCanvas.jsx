'use client';
import { useEffect, useRef, useState } from 'react';

const STONES = [
  { key: 'makrana', name: 'Makrana Pure White Marble', origin: 'Makrana, Rajasthan (Temples)' },
  { key: 'vietnam', name: 'Vietnam Pure White Marble', origin: 'Luc Yen, Vietnam (Temples & Deities)' },
  { key: 'rajnagar', name: 'Rajnagar White Marble', origin: 'Rajnagar, Rajasthan (Fountains)' }
];

export default function MandirHeroCanvas() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [activeStone, setActiveStone] = useState('makrana');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    let destroyed = false;

    import('../scene.js').then((mod) => {
      if (destroyed || !canvasRef.current) return;
      try {
        const initFn = mod.initScene || mod.createExperience || mod.default;
        if (typeof initFn === 'function') {
          const scene = initFn({
            canvas: canvasRef.current,
            onProgress: () => {},
            onHover: () => {},
            onFrame: () => {}
          });
          scene.ready?.then(() => {
            setIsLoaded(true);
            scene.intro?.();
          });
          setTimeout(() => {
            scene.intro?.();
          }, 400);
          sceneRef.current = scene;
        }
      } catch (err) {
        console.error('Failed to initialize 3D scene:', err);
      }
    });

    return () => {
      destroyed = true;
    };
  }, []);

  const handleStoneSelect = (key) => {
    setActiveStone(key);
    if (sceneRef.current?.setStone) {
      sceneRef.current.setStone(key);
    }
  };

  return (
    <div className="hero-3d-wrapper" style={{ position: 'relative' }}>
      {/* Instant Photorealistic 3D Model Poster while WebGL loads */}
      {!isLoaded && (
        <div
          className="hero-3d-poster-skeleton"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/hero-mandir-poster.webp)',
            backgroundSize: 'contain',
            backgroundPosition: 'center 45%',
            backgroundRepeat: 'no-repeat',
            opacity: 0.95,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'opacity 0.6s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '90px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(26, 21, 16, 0.88)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              color: '#edd7a8',
              borderRadius: '999px',
              padding: '6px 16px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="pulse-dot" style={{ width: '7px', height: '7px', background: '#d4af37', borderRadius: '50%' }}></span>
            <span>INITIALIZING 3D ATELIER ENVIRONMENT...</span>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} id="canvas" className="webgl"></canvas>

      {/* Stone Switcher Palette */}
      <div className="stone-switcher-dock" aria-label="Marble Material Selection">
        <span className="stone-switcher-label">Select Pure Marble:</span>
        <div className="stone-chips-row">
          {STONES.map((stone) => (
            <button
              key={stone.key}
              type="button"
              className={`stone-chip-btn ${activeStone === stone.key ? 'is-active' : ''}`}
              onClick={() => handleStoneSelect(stone.key)}
              title={`${stone.name} (${stone.origin})`}
            >
              <span className={`stone-dot stone-dot--${stone.key}`}></span>
              <span className="stone-chip-text">{stone.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

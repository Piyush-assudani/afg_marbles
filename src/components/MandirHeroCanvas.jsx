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
    <div className="hero-3d-wrapper">
      <canvas ref={canvasRef} id="canvas" className="webgl"></canvas>

      {/* Stone Switcher Palette */}
      <div className="stone-switcher-dock" aria-label="Marble Material Selection">
        <span className="stone-switcher-label">Select Calcite Stratum:</span>
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

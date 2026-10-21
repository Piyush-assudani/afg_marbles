'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { createExperience, STONES } from '../scene.js';

export default function HeroSection({ onOpenInquiry }) {
  const canvasRef = useRef(null);
  const expRef = useRef(null);
  const [activeStoneIndex, setActiveStoneIndex] = useState(0);
  const [lightingMode, setLightingMode] = useState('daylight');
  const [isWireframe, setIsWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  const handleLightingChange = (mode) => {
    setLightingMode(mode);
    expRef.current?.setLightingMode?.(mode);
  };

  const handleToggleWireframe = () => {
    const next = !isWireframe;
    setIsWireframe(next);
    expRef.current?.setWireframe?.(next);
  };

  const handleToggleRotate = () => {
    const next = !isRotating;
    setIsRotating(next);
    expRef.current?.setAutoRotate?.(next);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    let isDestroyed = false;

    const canvas = canvasRef.current;
    const swatchesContainer = document.getElementById('swatches');
    const stoneName = document.getElementById('stone-name');
    const stoneOrigin = document.getElementById('stone-origin');
    const nicheWord = document.getElementById('niche-word');
    const niche = document.getElementById('niche');
    const stageCaption = document.getElementById('stage-caption');

    let currentStoneIdx = 0;

    function selectStone(idx, exp) {
      if (idx === currentStoneIdx || exp.isTransitioning()) return;
      currentStoneIdx = idx;
      setActiveStoneIndex(idx);
      const stone = STONES[idx];

      if (swatchesContainer) {
        const swatches = Array.from(swatchesContainer.children);
        swatches.forEach((sw, i) => {
          const isActive = i === idx;
          sw.classList.toggle('is-active', isActive);
          sw.setAttribute('aria-checked', isActive ? 'true' : 'false');
        });

        const activeBtn = swatches[idx];
        if (activeBtn) {
          gsap.fromTo(
            activeBtn,
            { scale: 0.8 },
            {
              scale: 1.2,
              duration: 0.35,
              ease: 'back.out(2.6)',
              onComplete: () => gsap.to(activeBtn, { scale: 1.0, duration: 0.22, ease: 'power2.out' }),
            }
          );
        }
      }

      // Trigger 3D wipe shader
      exp.setStone(stone.key);

      // Animate Stone Card & Backdrop word
      const targets = [stoneName, stoneOrigin].filter(Boolean);
      if (targets.length) {
        gsap.to(targets, {
          y: -12,
          opacity: 0,
          filter: 'blur(4px)',
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            if (stoneName) {
              const parts = stone.name.toUpperCase().split(' ');
              stoneName.innerHTML = `<span>${parts[0]}<br />${parts.slice(1).join(' ')}</span>`;
            }
            if (stoneOrigin) {
              const noteText = (stone.note || stone.origin).toUpperCase();
              const noteWords = noteText.split(' ');
              const mid = Math.ceil(noteWords.length / 2);
              stoneOrigin.innerHTML = `<span>${noteWords.slice(0, mid).join(' ')}<br />${noteWords.slice(mid).join(' ')}</span>`;
            }
            if (nicheWord) nicheWord.textContent = stone.word;

            gsap.fromTo(
              targets,
              { y: 16, opacity: 0, filter: 'blur(6px)' },
              { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out', stagger: 0.08, clearProps: 'filter' }
            );
          },
        });
      }
    }

    function buildSwatches(exp) {
      if (!swatchesContainer) return;
      swatchesContainer.innerHTML = '';

      STONES.forEach((s, idx) => {
        const btn = document.createElement('button');
        btn.className = `swatch ${idx === 0 ? 'is-active' : ''}`;
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', idx === 0 ? 'true' : 'false');
        btn.setAttribute('aria-label', s.name);
        btn.style.setProperty('--img', `url(${s.url})`);

        const tip = document.createElement('span');
        tip.className = 'swatch__tip';
        tip.textContent = s.name;
        btn.appendChild(tip);

        btn.addEventListener('click', () => {
          selectStone(idx, exp);
        });

        swatchesContainer.appendChild(btn);
      });

      const arrowPrev = document.getElementById('stone-arrow-prev');
      const arrowNext = document.getElementById('stone-arrow-next');

      if (arrowPrev) {
        arrowPrev.onclick = () => {
          const prevIdx = (currentStoneIdx - 1 + STONES.length) % STONES.length;
          selectStone(prevIdx, exp);
        };
      }
      if (arrowNext) {
        arrowNext.onclick = () => {
          const nextIdx = (currentStoneIdx + 1) % STONES.length;
          selectStone(nextIdx, exp);
        };
      }
    }

    try {
      const exp = createExperience({
        canvas,
        onProgress: () => {},
        onHover: () => {},
        onFrame: (state) => {
          if (state.niche && niche) {
            const { left, top, width, height } = state.niche;
            niche.style.transform = `translate3d(${left}px, ${top}px, 0)`;
            niche.style.width = `${width}px`;
            niche.style.height = `${height}px`;
            niche.style.borderRadius = `${width / 2}px ${width / 2}px 0 0`;
            niche.style.fontSize = `${width * 0.16}px`;
          }
          if (state.caption && stageCaption) {
            const h = canvas.clientHeight || window.innerHeight;
            const safeY = Math.min(state.caption.y, h - 82);
            stageCaption.style.transform = `translate3d(${state.caption.x}px, ${safeY}px, 0) translate(-50%, 0)`;
          }
        },
      });

      expRef.current = exp;
      buildSwatches(exp);

      // Start the 3D temple intro immediately so it's fully visible and rotating!
      exp.ready.then(() => {
        if (!isDestroyed) {
          exp.intro();
        }
      });
      setTimeout(() => {
        if (!isDestroyed && exp) {
          exp.intro();
        }
      }, 500);

      // Entrance sequence with fail-safe visibility (never hide critical content)
      const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const titleLines = document.querySelectorAll('.hero__title .line > span');
      if (titleLines.length) {
        entranceTl.from(
          titleLines,
          { y: 18, duration: 0.8, stagger: 0.08, clearProps: 'all' },
          0.05
        );
      }
      entranceTl.from('.hero__eyebrow', { x: -10, duration: 0.6, clearProps: 'all' }, 0.1);
      entranceTl.from('.hero__lead', { y: 14, duration: 0.7, clearProps: 'all' }, 0.15);
      entranceTl.from('.hero__ctas > *', { y: 14, duration: 0.7, stagger: 0.08, clearProps: 'all' }, 0.2);
      entranceTl.from('.hero-stone-card', { scale: 0.95, duration: 0.8, clearProps: 'all' }, 0.25);
      entranceTl.from('#stone-rail', { x: 20, duration: 0.8, clearProps: 'all' }, 0.3);
      entranceTl.from('.hero__stats-ribbon', { y: 15, duration: 0.8, clearProps: 'all' }, 0.35);

      // Instant visibility guarantee
      document.querySelectorAll('.hero__content, .hero__title .line > span, .hero__eyebrow, .hero__lead, .hero__ctas, .hero__ctas > *, .hero-stone-card, #stone-rail, .hero__stats-ribbon').forEach((el) => {
        el.style.opacity = '1';
      });

      setTimeout(() => {
        document.querySelectorAll('.hero__content, .hero__title .line > span, .hero__eyebrow, .hero__lead, .hero__ctas, .hero__ctas > *, .hero-stone-card, #stone-rail, .hero__stats-ribbon').forEach((el) => {
          el.style.opacity = '1';
        });
        document.querySelectorAll('.hero__title .line > span').forEach((el) => {
          el.style.transform = 'none';
        });
      }, 400);

      // Count-up stats animation
      const statNums = document.querySelectorAll('.ribbon-stat__num span[data-count]');
      statNums.forEach((el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          delay: 0.2,
          onUpdate: () => {
            if (obj.val > 0) {
              el.textContent = Math.floor(obj.val).toLocaleString();
            }
          },
          onComplete: () => {
            el.textContent = target.toLocaleString();
          }
        });
      });
    } catch (err) {
      console.error('3D Scene initialization error:', err);
    }

    return () => {
      isDestroyed = true;
    };
  }, []);

  return (
    <section className="hero" id="hero" aria-label="A.F.G Marble & Arts — Hero">
      {/* Royal Palatial Terrace Backdrop Overlay */}
      <div className="hero__backdrop" aria-hidden="true"></div>

      {/* Backdrop niche (subtle architectural watermark) */}
      <div className="niche" id="niche" aria-hidden="true">
        <span className="niche__word" id="niche-word">MAKRANA</span>
      </div>

      {/* Interactive 3D WebGL Canvas */}
      <canvas className="webgl" id="webgl" ref={canvasRef} aria-label="Interactive 3D marble temple"></canvas>
      <div className="grain" aria-hidden="true"></div>

      {/* ============ HERO CONTENT COLUMN (STRICTLY ON LEFT) ============ */}
      <div className="hero__content">
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-line hero__eyebrow-line--left" aria-hidden="true"></span>
          <span className="eyebrow-text">ROYAL MAKRANA BEDROCK · ESTD 1987</span>
          <span className="hero__eyebrow-line hero__eyebrow-line--right" aria-hidden="true"></span>
        </p>

        <h1 className="hero__title">
          <span className="line"><span>Sacred Devotion,</span></span>
          <span className="line line--italic"><span><em>sculpted</em></span></span>
          <span className="line"><span>in eternal marble</span></span>
        </h1>

        <p className="hero__lead">
          Bespoke marble mandirs, palatial fountains, temples and artistic stone creations — crafted in the purest Makrana marble by generational Silawat master sculptors.
        </p>

        <div className="hero__ctas">
          <Link href="/pooja-sanctums" className="btn-hero-primary magnetic" id="cta-explore">
            <span>Explore Our Creations</span>
            <span className="btn-hero-primary__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
          <button
            type="button"
            className="btn-outline-gold"
            style={{ marginLeft: '16px' }}
            onClick={() => onOpenInquiry?.({ title: 'Space Dimensions Consultation' })}
          >
            <span>Free Space Consultation</span>
          </button>
        </div>
      </div>

      {/* ============ STONE PEDESTAL CARD (Right of Mandir) ============ */}
      <div className="hero-stone-card" id="hero-stone-card">
        <span className="hero-stone-card__name" id="stone-name">
          MAKRANA<br />WHITE
        </span>
        <span className="hero-stone-card__origin" id="stone-origin">
          THE STONE OF<br />THE TAJ MAHAL
        </span>
        <div className="hero-stone-card__line" aria-hidden="true"></div>
      </div>

      {/* ============ 3D SANCTUM LIGHTING & BLUEPRINT CONTROLS ============ */}
      <div className="hero-3d-toolbar" aria-label="3D Sanctum Atmosphere Controller">
        <div className="toolbar-group">
          <span className="toolbar-label">Ambience:</span>
          <button
            type="button"
            className={`toolbar-btn ${lightingMode === 'daylight' ? 'is-active' : ''}`}
            onClick={() => handleLightingChange('daylight')}
            title="Surya / Pure Daylight Illumination"
          >
            ☀️ Surya
          </button>
          <button
            type="button"
            className={`toolbar-btn ${lightingMode === 'aarti' ? 'is-active' : ''}`}
            onClick={() => handleLightingChange('aarti')}
            title="Sandhya / Aarti Diya Inner Glow"
          >
            🪔 Aarti Glow
          </button>
          <button
            type="button"
            className={`toolbar-btn ${lightingMode === 'consecration' ? 'is-active' : ''}`}
            onClick={() => handleLightingChange('consecration')}
            title="Consecration / Ethereal Sanctum Aura"
          >
            🕉️ Consecration
          </button>
        </div>

        <div className="toolbar-divider" aria-hidden="true" />

        <div className="toolbar-group">
          <button
            type="button"
            className={`toolbar-btn ${isWireframe ? 'is-active' : ''}`}
            onClick={handleToggleWireframe}
            title="Sthapatya Veda 3D CAD Blueprint Wireframe"
          >
            📐 CAD Mesh
          </button>
          <button
            type="button"
            className={`toolbar-btn ${isRotating ? 'is-active' : ''}`}
            onClick={handleToggleRotate}
            title="Toggle Continuous 360 Rotation"
          >
            {isRotating ? '⏸️ Pause' : '🔄 360°'}
          </button>
        </div>
      </div>

      {/* ============ FLOATING FEATURE CARD ============ */}
      <Link href="/pooja-sanctums" className="hero-feature-card glass magnetic" id="hero-feature-card" aria-label="A Legacy in Every Detail">
        <div className="feature-card__thumb">
          <img src="/mandir-detail-thumb.jpg" alt="A Legacy in Every Detail" width="46" height="46" loading="eager" />
        </div>
        <span className="feature-card__title">A Legacy in Every Detail</span>
        <span className="feature-card__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </Link>

      {/* ============ VERTICAL STONE COLLECTION RAIL ============ */}
      <aside className="stone-rail glass" id="stone-rail" aria-label="Stone Collection">
        <button className="stone-rail__arrow stone-rail__arrow--up" id="stone-arrow-prev" aria-label="Previous marble">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
        <span className="stone-rail__label">STONE<br />COLLECTION</span>
        <div className="stone-rail__swatches" role="radiogroup" id="swatches"></div>
        <button className="stone-rail__arrow stone-rail__arrow--down" id="stone-arrow-next" aria-label="Next marble">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </aside>

      {/* ============ FULL-WIDTH BOTTOM STATS RIBBON ============ */}
      <div className="hero__stats-ribbon glass" id="hero-stats-ribbon">
        <div className="ribbon-stat ribbon-stat--1">
          <div className="ribbon-stat__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="33" height="33" fill="none" stroke="#b8863f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.5 22.5 C10.5 24 21.5 24 26.5 22.5" />
              <path d="M5.5 25.5 C10.5 27 21.5 27 26.5 25.5" />
              <path d="M5.5 22.5 v 3 M26.5 22.5 v 3" />
              <path d="M6 22.5 L3.2 13.5 L10.5 17.5 L16 8 L21.5 17.5 L28.8 13.5 L26 22.5" />
              <circle cx="3.2" cy="11.5" r="1.4" stroke="#b8863f" strokeWidth="1.5" fill="none" />
              <circle cx="16" cy="6" r="1.5" stroke="#b8863f" strokeWidth="1.5" fill="none" />
              <circle cx="28.8" cy="11.5" r="1.4" stroke="#b8863f" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div className="ribbon-stat__content">
            <span className="ribbon-stat__num"><span data-count="35">35</span>+</span>
            <span className="ribbon-stat__label">Years of Royal Craft</span>
          </div>
        </div>

        <div className="ribbon-divider" aria-hidden="true"></div>

        <div className="ribbon-stat ribbon-stat--2">
          <div className="ribbon-stat__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="33" height="33" fill="none" stroke="#b8863f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 2.5 v 2.5" />
              <circle cx="16" cy="2.5" r="0.9" fill="#b8863f" />
              <path d="M16 5 L5 11.5 h 22 Z" />
              <path d="M3.5 13.5 h 25" />
              <path d="M7 13.5 v 10.5 M9.8 13.5 v 10.5" />
              <path d="M22.2 13.5 v 10.5 M25 13.5 v 10.5" />
              <path d="M12.8 24 v -6.5 a 3.2 3.2 0 0 1 6.4 0 v 6.5" />
              <path d="M4.5 24 h 23" />
              <path d="M2.8 26.8 h 26.4" />
            </svg>
          </div>
          <div className="ribbon-stat__content">
            <span className="ribbon-stat__num"><span data-count="5000">5,000</span>+</span>
            <span className="ribbon-stat__label">Temples &amp; Fountains</span>
          </div>
        </div>

        <div className="ribbon-divider" aria-hidden="true"></div>

        <div className="ribbon-stat ribbon-stat--3">
          <div className="ribbon-stat__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="33" height="33" fill="none" stroke="#b8863f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="16" cy="16" r="12" />
              <path d="M16 4 v 24" />
              <path d="M4 16 h 24" />
              <ellipse cx="16" cy="16" rx="6.2" ry="12" />
              <path d="M6.8 9.5 h 18.4" />
              <path d="M6.8 22.5 h 18.4" />
            </svg>
          </div>
          <div className="ribbon-stat__content">
            <span className="ribbon-stat__num"><span data-count="28">28</span>+</span>
            <span className="ribbon-stat__label">Countries Exported</span>
          </div>
        </div>

        <div className="ribbon-divider" aria-hidden="true"></div>

        <div className="ribbon-stat ribbon-stat--4">
          <div className="ribbon-stat__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="33" height="33" fill="none" stroke="#b8863f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="16" cy="10" rx="4" ry="5" />
              <path d="M8.2 25.5 C8.2 20 11.5 18.2 13.5 17.5 L16 19 L18.5 17.5 C20.5 18.2 23.8 20 23.8 25.5 H8.2" />
              <path d="M12 9 A 3.6 4.2 0 1 0 8 14" />
              <path d="M4 25.5 C4 20.8 7 19 9.5 18.5" />
              <path d="M20 9 A 3.6 4.2 0 1 1 24 14" />
              <path d="M28 25.5 C28 20.8 25 19 22.5 18.5" />
            </svg>
          </div>
          <div className="ribbon-stat__content">
            <span className="ribbon-stat__num ribbon-stat__num--text">Specialists</span>
            <span className="ribbon-stat__label">In Bespoke Marble Creations</span>
          </div>
        </div>
      </div>

      {/* ============ SCROLL TO EXPLORE MOUSE INDICATOR ============ */}
      <a href="#collections" className="hero__scroll-indicator" id="hero-scroll-btn" aria-label="Scroll to explore creations">
        <div className="scroll-mouse-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="20" fill="none" stroke="#554b40" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="3" width="12" height="18" rx="6" />
            <line x1="12" y1="6" x2="12" y2="9" />
          </svg>
        </div>
        <span className="scroll-label">SCROLL<br />TO EXPLORE</span>
        <div className="scroll-plumb" aria-hidden="true">
          <div className="scroll-plumb__line"></div>
          <div className="scroll-plumb__cross">
            <div className="scroll-plumb__hbar"></div>
            <div className="scroll-plumb__dot"></div>
          </div>
        </div>
      </a>
    </section>
  );
}

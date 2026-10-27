'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import {
  Sparkles,
  Compass,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { createExperience, STONES } from '../scene.js';

// The 3 Certified White Marbles Crafted by A.F.G:
// 1. Makrana Pure White Marble (Home Temples)
// 2. Vietnam Pure White Marble (Temples & Statues)
// 3. Rajnagar White Marble (Garden & Estate Fountains)
const STONES_METADATA = [
  {
    key: 'makrana',
    name: 'Makrana Pure White',
    quarry: 'Chosira & Chak Dungri, Makrana, Rajasthan',
    purity: '99.2% Pure White Marble (Taj Mahal Stone)',
    origin: 'Makrana, Rajasthan (Home Temples)',
    note: 'Home Temples · Never Turns Yellow',
    desc: 'The famous white marble used in the Taj Mahal. 100% stain-resistant, easy to wash with water, milk or oil, and guaranteed never to turn yellow.',
    grade: 'Taj Mahal Grade AAA',
    accentColor: '#d4af37',
    tag: 'Home Temples',
    word: 'MAKRANA',
    thumb: '/textures/makrana.jpg',
    specs: {
      purity: '99.2% Pure White',
      absorption: '0.01% (Zero Stain)',
      hardness: '3.5–4.0 Mohs',
      application: 'Custom Home Temples'
    }
  },
  {
    key: 'vietnam',
    name: 'Vietnam Pure White',
    quarry: 'Luc Yen & Yen Bai Mountain Mines, Vietnam',
    purity: '99.6% Ultra-Pure Snow White Marble',
    origin: 'Luc Yen, Vietnam (Temples & Statues)',
    note: 'Temples & Statues · Pure Snow White',
    desc: 'World famous for its pure snow-white look and smooth texture. Perfect for modern luxury home temples and finely detailed statues.',
    grade: 'Pure Snow White Grade AAA+',
    accentColor: '#c9a24d',
    tag: 'Temples & Statues',
    word: 'VIETNAM',
    thumb: '/textures/vietnam.jpg',
    specs: {
      purity: '99.6% Snow White',
      absorption: '0.03% (Resin-Free)',
      hardness: '3.0–3.5 Mohs',
      application: 'Modern Temples & Statues'
    }
  },
  {
    key: 'rajnagar',
    name: 'Rajnagar White Marble',
    quarry: 'Rajnagar Seam, Rajsamand, Rajasthan',
    purity: 'High-Density Strong White Marble',
    origin: 'Rajnagar, Rajasthan (Garden Fountains)',
    note: 'Garden Fountains · Water Resistant',
    desc: 'Super strong white marble from Rajasthan. Built specially for outdoor fountains. Handles continuous flowing water, sunlight, and weather for decades.',
    grade: 'Heavy Outdoor Fountain Grade',
    accentColor: '#8a7d70',
    tag: 'Garden Fountains',
    word: 'RAJNAGAR',
    thumb: '/textures/rajnagar.jpg',
    specs: {
      purity: 'Heavy White Marble',
      density: '2.72 g/cm³',
      durability: 'Continuous Flow Resistant',
      application: 'Grand Estate Fountains'
    }
  },
];

export default function HeroSection({ onOpenInquiry }) {
  const canvasRef = useRef(null);
  const expRef = useRef(null);
  const [activeStoneIdx, setActiveStoneIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const activeStone = STONES_METADATA[activeStoneIdx] || STONES_METADATA[0];

  const selectStone = useCallback((idx) => {
    if (idx === activeStoneIdx || expRef.current?.isTransitioning?.()) return;
    setActiveStoneIdx(idx);
    const stone = STONES[idx];
    if (stone && expRef.current) {
      expRef.current.setStone(stone.key);
    }

    // Animate DOM text targets for smooth transition
    const stoneName = document.getElementById('stone-name');
    const stoneOrigin = document.getElementById('stone-origin');
    const nicheWord = document.getElementById('niche-word');

    const targets = [stoneName, stoneOrigin].filter(Boolean);
    if (targets.length) {
      gsap.to(targets, {
        y: -10,
        opacity: 0,
        filter: 'blur(4px)',
        duration: 0.22,
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
            { y: 14, opacity: 0, filter: 'blur(6px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out', stagger: 0.06, clearProps: 'filter' }
          );
        },
      });
    }
  }, [activeStoneIdx]);

  useEffect(() => {
    if (!canvasRef.current) return;
    let isDestroyed = false;

    const canvas = canvasRef.current;
    const niche = document.getElementById('niche');
    const stageCaption = document.getElementById('stage-caption');

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

      // Start 3D temple immediately so it is fully visible and smoothly rotating
      exp.ready.then(() => {
        if (!isDestroyed) {
          exp.intro();
          setIsLoaded(true);
        }
      });

      // Pause WebGL rendering when hero is scrolled out of view (saves 90% GPU/CPU, stops lag)
      let heroObserver = null;
      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        heroObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                exp.resume?.();
              } else {
                exp.pause?.();
              }
            });
          },
          { threshold: 0.05 }
        );
        const heroEl = document.getElementById('hero');
        if (heroEl) heroObserver.observe(heroEl);
      }

      // Instant visibility guarantee
      const allHeroElements = document.querySelectorAll(
        '.hero__content, .hero__title .line > span, .hero__lead, .hero__ctas, .hero__ctas > *, .hero-stone-card, #stone-rail, .hero__stats-ribbon'
      );
      allHeroElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });

      return () => {
        isDestroyed = true;
        heroObserver?.disconnect();
        exp.destroy?.();
      };
    } catch (err) {
      console.error('3D Scene initialization error:', err);
    }
  }, []);

  return (
    <section className="hero" id="hero" aria-label="A.F.G Marble & Arts — Hero">
      {/* Royal Palatial Terrace Backdrop Overlay */}
      <div className="hero__backdrop" aria-hidden="true"></div>

      {/* Halo Spotlight Glow Behind 3D Temple */}
      <div className="hero__sanctum-glow" aria-hidden="true"></div>

      {/* Backdrop niche watermark */}
      <div className="niche" id="niche" aria-hidden="true">
        <span className="niche__word" id="niche-word">
          {activeStone.word}
        </span>
      </div>

      {/* Interactive 3D WebGL Canvas */}
      <canvas className="webgl" id="webgl" ref={canvasRef} aria-label="Interactive 3D marble temple"></canvas>

      <div className="grain" aria-hidden="true"></div>

      {/* ============ HERO CONTENT COLUMN (STRICTLY ON LEFT) ============ */}
      <div className="hero__content">
        {/* Stately Hero Title — Simple & Clear English */}
        <h1 className="hero__title">
          <span className="line">
            <span>Pure White</span>
          </span>
          <span className="line">
            <span>Marble Temples,</span>
          </span>
          <span className="line line--italic">
            <span>
              <em>Handmade to Last</em>
            </span>
          </span>
          <span className="line">
            <span>For Generations.</span>
          </span>
        </h1>

        {/* Clear, Easy-to-understand Lead Copy */}
        <p className="hero__lead">
          Custom white marble temples and grand fountains for your home. Made with 100% pure Makrana marble that never turns yellow and stays bright forever.
        </p>

        {/* Action CTA */}
        <div className="hero__ctas">
          <Link href="/pooja-sanctums" className="btn-hero-primary magnetic" id="cta-explore">
            <span className="btn-hero-primary__text">Explore Temples & Fountains</span>
            <span className="btn-hero-primary__icon" aria-hidden="true">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      {/* ============ COMPACT STONE SPECIMEN BADGE (DOCKED ON SIDE) ============ */}
      <div className="hero-stone-card" id="hero-stone-card" aria-label="Certified Marble Specimen">
        <div className="stone-card__mini-head">
          <span className="stone-card__mini-tag">0{activeStoneIdx + 1} / 0{STONES_METADATA.length}</span>
          <span className="stone-card__mini-badge">100% PURE</span>
        </div>
        <span className="hero-stone-card__name" id="stone-name">
          {activeStone.name.toUpperCase().split(' ')[0]}<br />{activeStone.name.toUpperCase().split(' ').slice(1).join(' ')}
        </span>
        <span className="hero-stone-card__origin" id="stone-origin">
          {activeStone.note.toUpperCase()}
        </span>
        <div className="hero-stone-card__line" aria-hidden="true"></div>
      </div>

      {/* ============ VERTICAL STONE RAIL ============ */}
      <aside className="stone-rail glass" id="stone-rail" aria-label="Marble Selection Rail">
        <button
          className="stone-rail__arrow stone-rail__arrow--up"
          id="stone-arrow-prev"
          aria-label="Previous marble"
          onClick={() => {
            const prevIdx = (activeStoneIdx - 1 + STONES_METADATA.length) % STONES_METADATA.length;
            selectStone(prevIdx);
          }}
        >
          <ChevronUp size={14} />
        </button>

        <span className="stone-rail__label">
          SELECT
          <br />
          MARBLE
        </span>

        <div className="stone-rail__swatches" role="radiogroup" id="swatches">
          {STONES_METADATA.map((s, idx) => {
            const isActive = idx === activeStoneIdx;
            return (
              <button
                key={s.key}
                type="button"
                className={`swatch ${isActive ? 'is-active' : ''}`}
                role="radio"
                aria-checked={isActive}
                aria-label={s.name}
                style={{ '--img': `url(${s.thumb || STONES[idx]?.url})` }}
                onClick={() => selectStone(idx)}
              >
                <span className="swatch__tip">
                  <strong>{s.name}</strong>
                  <small>{s.tag}</small>
                </span>
              </button>
            );
          })}
        </div>

        <button
          className="stone-rail__arrow stone-rail__arrow--down"
          id="stone-arrow-next"
          aria-label="Next marble"
          onClick={() => {
            const nextIdx = (activeStoneIdx + 1) % STONES_METADATA.length;
            selectStone(nextIdx);
          }}
        >
          <ChevronDown size={14} />
        </button>
      </aside>

      {/* ============ BOTTOM STATS RIBBON ============ */}
      <div className="hero__stats-ribbon glass" id="hero-stats-ribbon" aria-label="AFG Heritage Metrics">
        <div className="ribbon-guild-badge" aria-hidden="true">
          <span className="ribbon-guild-badge__star">✦</span>
          <span className="ribbon-guild-badge__text">MASTER ARTISANS · EST. 1987</span>
        </div>

        <div className="ribbon-divider" aria-hidden="true"></div>

        <div className="ribbon-stat ribbon-stat--1">
          <div className="ribbon-stat__content">
            <span className="ribbon-stat__num">
              <span data-count="5000">5,000</span>+
            </span>
            <span className="ribbon-stat__label">Temples Built</span>
          </div>
        </div>

        <div className="ribbon-divider" aria-hidden="true"></div>

        <div className="ribbon-stat ribbon-stat--2">
          <div className="ribbon-stat__content">
            <span className="ribbon-stat__num">
              <span data-count="99">99.2</span>%
            </span>
            <span className="ribbon-stat__label">Pure White Marble</span>
          </div>
        </div>

        <div className="ribbon-divider" aria-hidden="true"></div>

        <div className="ribbon-stat ribbon-stat--3">
          <div className="ribbon-stat__content">
            <span className="ribbon-stat__num">
              <span data-count="28">28</span>+
            </span>
            <span className="ribbon-stat__label">Countries Shipped</span>
          </div>
        </div>
      </div>
    </section>
  );
}

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

// The 3 Certified White Marbles Crafted by A.F.G Atelier:
// 1. Makrana Pure White Marble (Temples & Mandirs)
// 2. Vietnam Pure White Marble (Temples & Sacred Deities)
// 3. Rajnagar White Marble (Palatial Estate Fountains)
const STONES_METADATA = [
  {
    key: 'makrana',
    name: 'Makrana Pure White',
    hindi: 'मकराना शुद्ध श्वेत मकराना मार्बल',
    quarry: 'Chosira & Chak Dungri Bedrock, Makrana, Rajasthan',
    purity: '99.2% Pure Calcite (Taj Mahal Bedrock)',
    origin: 'Makrana, Rajasthan (Temples)',
    note: 'Temples & Mandirs · Zero Yellowing Guarantee',
    desc: 'The sovereign stone of sacred Hindu temples and the Taj Mahal. Formed over 1,500 million years ago, its 99.2% calcium carbonate calcite structure has virtually zero porosity (0.02%), making it 100% immune to stains from daily puja ghee, panchamrit, kumkum, and weather. Never turns yellow over centuries.',
    grade: 'Taj Mahal Calcite (Grade AAA)',
    accentColor: '#d4af37',
    tag: 'Temples & Mandirs',
    word: 'MAKRANA',
    thumb: '/textures/makrana.jpg',
    specs: {
      purity: '99.2% CaCO₃',
      absorption: '0.01% (Zero Stain)',
      hardness: '3.5–4.0 Mohs',
      application: 'Sacred Mandirs & Sanctums'
    }
  },
  {
    key: 'vietnam',
    name: 'Vietnam Pure White',
    hindi: 'वियतनाम शुद्ध स्नो-व्हाइट मार्बल',
    quarry: 'Luc Yen & Yen Bai Mountain Mines, Vietnam',
    purity: '99.6% Ultra-Pure Snow Crystalline Calcite',
    origin: 'Luc Yen, Vietnam (Temples & Deities)',
    note: 'Temples & Deities · Pure Crystalline Snow',
    desc: 'Revered worldwide for its immaculate snow-white uniformity and zero grain distortion. With a crystalline fine-sugar matrix and 99.6% calcite composition, it reflects divine light with extraordinary brilliance. The supreme global choice for contemporary luxury sanctums and intricate hand-sculpted deity murti statues.',
    grade: 'Sculptural Snow Calcite (Grade AAA+)',
    accentColor: '#c9a24d',
    tag: 'Temples & Deities',
    word: 'VIETNAM',
    thumb: '/textures/vietnam.jpg',
    specs: {
      purity: '99.6% CaCO₃',
      absorption: '0.03% (Resin-Free)',
      hardness: '3.0–3.5 Mohs',
      application: 'Contemporary Temples & Deities'
    }
  },
  {
    key: 'rajnagar',
    name: 'Rajnagar White Marble',
    hindi: 'राजनगर श्वेत संगमरमर',
    quarry: 'Rajnagar Hydraulic Seam, Rajsamand, Rajasthan',
    purity: 'High-Density Hydraulic Crystalline Calcite',
    origin: 'Rajnagar, Rajasthan (Fountains)',
    note: 'Palatial Fountains · High-Density Hydraulic Calcite',
    desc: 'The undisputed master stone for monumental palatial fountains and hydraulic outdoor cascades. Naturally dense with interlocking calcite crystals, Rajnagar marble resists pressurized water erosion, continuous chlorine/calcium contact, outdoor sun UV, and prevents algae or moss adherence over decades.',
    grade: 'Heavy Hydraulic Fountain Grade',
    accentColor: '#8a7d70',
    tag: 'Palatial Fountains',
    word: 'RAJNAGAR',
    thumb: '/textures/rajnagar.jpg',
    specs: {
      purity: 'Hydraulic Calcite',
      density: '2.72 g/cm³',
      durability: 'Continuous Flow Resistant',
      application: 'Monumental Estate Fountains'
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

      // Start the 3D temple intro immediately so it's fully visible and rotating!
      exp.ready.then(() => {
        if (!isDestroyed) {
          exp.intro();
          setIsLoaded(true);
        }
      });

      setTimeout(() => {
        if (!isDestroyed && exp) {
          exp.intro();
          setIsLoaded(true);
        }
      }, 400);

      // Entrance animation sequence with fail-safe visibility
      const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const titleLines = document.querySelectorAll('.hero__title .line > span');
      if (titleLines.length) {
        entranceTl.from(titleLines, { y: 22, opacity: 0, duration: 0.8, stagger: 0.08, clearProps: 'all' }, 0.05);
      }
      entranceTl.from('.hero__lead', { y: 16, opacity: 0, duration: 0.7, clearProps: 'all' }, 0.15);
      entranceTl.from('.hero__ctas > *', { y: 14, opacity: 0, duration: 0.7, clearProps: 'all' }, 0.22);
      entranceTl.from('.hero-stone-card', { scale: 0.94, opacity: 0, duration: 0.8, clearProps: 'all' }, 0.28);
      entranceTl.from('#stone-rail', { x: 25, opacity: 0, duration: 0.8, clearProps: 'all' }, 0.35);
      entranceTl.from('.hero__stats-ribbon', { y: 18, opacity: 0, duration: 0.8, clearProps: 'all' }, 0.42);

      // Instant visibility guarantee
      const allHeroElements = document.querySelectorAll(
        '.hero__content, .hero__title .line > span, .hero__lead, .hero__ctas, .hero__ctas > *, .hero-stone-card, #stone-rail, .hero__stats-ribbon'
      );
      allHeroElements.forEach((el) => {
        el.style.opacity = '1';
      });

      setTimeout(() => {
        allHeroElements.forEach((el) => {
          el.style.opacity = '1';
        });
      }, 500);

      // Count-up stats animation
      const statNums = document.querySelectorAll('.ribbon-stat__num span[data-count]');
      statNums.forEach((el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          delay: 0.3,
          onUpdate: () => {
            if (obj.val > 0) {
              el.textContent = Math.floor(obj.val).toLocaleString();
            }
          },
          onComplete: () => {
            el.textContent = target.toLocaleString();
          },
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

      {/* Sacred Halo Spotlight Glow Behind 3D Temple */}
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
        {/* Stately Hero Title — 4 Elegant Lines */}
        <h1 className="hero__title">
          <span className="line">
            <span>Sacred</span>
          </span>
          <span className="line">
            <span>Devotion,</span>
          </span>
          <span className="line line--italic">
            <span>
              <em>Sculpted in Pure</em>
            </span>
          </span>
          <span className="line">
            <span>Eternal Marble.</span>
          </span>
        </h1>

        {/* Evocative Lead Copy */}
        <p className="hero__lead">
          Bespoke marble mandirs, monumental sanctums, and palatial fountains — sculpted from certified 99% pure virgin Makrana calcite marble by generational Silawat master artisans.
        </p>

        {/* Action CTA */}
        <div className="hero__ctas">
          <Link href="/pooja-sanctums" className="btn-hero-primary magnetic" id="cta-explore">
            <span className="btn-hero-primary__text">Explore Masterpieces</span>
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
          <span className="stone-card__mini-badge">CALCITE</span>
        </div>
        <span className="hero-stone-card__name" id="stone-name">
          {activeStone.name.toUpperCase().split(' ')[0]}<br />{activeStone.name.toUpperCase().split(' ').slice(1).join(' ')}
        </span>
        <span className="hero-stone-card__origin" id="stone-origin">
          {activeStone.note.toUpperCase()}
        </span>
        <div className="hero-stone-card__line" aria-hidden="true"></div>
      </div>

      {/* ============ VERTICAL STONE ATELIER RAIL ============ */}
      <aside className="stone-rail glass" id="stone-rail" aria-label="Stone Atelier Rail">
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
          STONE
          <br />
          ATELIER
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

      {/* ============ ARCHITECTURAL ROYAL HERITAGE PLINTH ============ */}
      <div className="hero__stats-ribbon glass" id="hero-stats-ribbon" aria-label="AFG Heritage Metrics">
        <div className="ribbon-guild-badge" aria-hidden="true">
          <span className="ribbon-guild-badge__star">✦</span>
          <span className="ribbon-guild-badge__text">SILAWAT GUILD · EST. 1987</span>
        </div>

        <div className="ribbon-divider" aria-hidden="true"></div>

        <div className="ribbon-stat ribbon-stat--1">
          <div className="ribbon-stat__content">
            <span className="ribbon-stat__num">
              <span data-count="5000">5,000</span>+
            </span>
            <span className="ribbon-stat__label">Consecrated Sanctums</span>
          </div>
        </div>

        <div className="ribbon-divider" aria-hidden="true"></div>

        <div className="ribbon-stat ribbon-stat--2">
          <div className="ribbon-stat__content">
            <span className="ribbon-stat__num">
              <span data-count="99">99.2</span>%
            </span>
            <span className="ribbon-stat__label">Virgin Calcite Purity</span>
          </div>
        </div>

        <div className="ribbon-divider" aria-hidden="true"></div>

        <div className="ribbon-stat ribbon-stat--3">
          <div className="ribbon-stat__content">
            <span className="ribbon-stat__num">
              <span data-count="28">28</span>+
            </span>
            <span className="ribbon-stat__label">Countries Exported</span>
          </div>
        </div>
      </div>
    </section>
  );
}

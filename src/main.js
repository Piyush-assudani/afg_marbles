import gsap from 'gsap';
import { createExperience, STONES } from './scene.js';
import './style.css';

/* ------------------------------------------------------------------
   DOM Elements
------------------------------------------------------------------- */
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderCount = document.getElementById('loader-count');

const cursor = document.getElementById('cursor');
const cursorLabel = document.getElementById('cursor-label');

const canvas = document.getElementById('webgl');
const niche = document.getElementById('niche');
const nicheWord = document.getElementById('niche-word');

const stoneRail = document.getElementById('stone-rail');
const swatchesContainer = document.getElementById('swatches');
const stoneIdx = document.getElementById('stone-idx');

const stoneName = document.getElementById('stone-name');
const stoneOrigin = document.getElementById('stone-origin');
const stageCaption = document.getElementById('stage-caption');

const hsPillar = document.getElementById('hs-pillar');
const hsKalash = document.getElementById('hs-kalash');

const nav = document.getElementById('nav');
const heroContent = document.querySelector('.hero__content');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

/* ------------------------------------------------------------------
   State
------------------------------------------------------------------- */
let activeStoneIndex = 0;
let currentHoverType = null;

/* ------------------------------------------------------------------
   Stone Swatches Rail Setup
------------------------------------------------------------------- */
function buildSwatches(exp) {
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
}

function selectStone(idx, exp) {
  if (idx === activeStoneIndex || exp.isTransitioning()) return;
  activeStoneIndex = idx;
  const stone = STONES[idx];

  // Update Swatch UI
  const swatches = Array.from(swatchesContainer.children);
  swatches.forEach((sw, i) => {
    const isActive = i === idx;
    sw.classList.toggle('is-active', isActive);
    sw.setAttribute('aria-checked', isActive ? 'true' : 'false');
  });

  stoneIdx.textContent = String(idx + 1).padStart(2, '0');

  // Trigger 3D wipe shader
  exp.setStone(stone.key);

  // Animate Caption & Backdrop word
  gsap.to([stoneName, stoneOrigin], {
    y: -12,
    opacity: 0,
    duration: 0.25,
    ease: 'power2.in',
    onComplete: () => {
      stoneName.innerHTML = `<span>${stone.name}</span>`;
      stoneOrigin.innerHTML = `<span>${stone.origin} — ${stone.note}</span>`;
      nicheWord.textContent = stone.word;

      gsap.fromTo(
        [stoneName, stoneOrigin],
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 }
      );
    },
  });
}

/* ------------------------------------------------------------------
   Custom Cursor Logic
------------------------------------------------------------------- */
function setupCursor() {
  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;
  let rx = cx;
  let ry = cy;

  window.addEventListener('pointermove', (e) => {
    cx = e.clientX;
    cy = e.clientY;
  });

  function renderCursor() {
    rx += (cx - rx) * 0.22;
    ry += (cy - ry) * 0.22;

    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    const ring = cursor.querySelector('.cursor__ring');
    if (ring) {
      ring.style.transform = `translate3d(${rx - cx}px, ${ry - cy}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Link magnetic & cursor hover triggers
  const interactiveEls = document.querySelectorAll('a, button, .swatch, .magnetic');
  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (!currentHoverType) cursor.classList.add('is-link');
    });
    el.addEventListener('mouseleave', () => {
      if (!currentHoverType) cursor.classList.remove('is-link');
    });
  });

  // Magnetic effect for primary buttons
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const mx = e.clientX - (rect.left + rect.width / 2);
      const my = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, { x: mx * 0.35, y: my * 0.35, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* ------------------------------------------------------------------
   Count-up Animation for Stats
------------------------------------------------------------------- */
function animateStats() {
  const statNums = document.querySelectorAll('.stat__num span[data-count]');
  statNums.forEach((el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: 'power3.out',
      delay: 1.2,
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString();
      },
    });
  });
}

/* ------------------------------------------------------------------
   Mobile Menu Toggle
------------------------------------------------------------------- */
function setupMobileMenu() {
  if (!burger || !mobileMenu) return;
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

/* ------------------------------------------------------------------
   App Initialization
------------------------------------------------------------------- */
async function init() {
  setupCursor();
  setupMobileMenu();

  const exp = createExperience({
    canvas,
    onProgress: (ratio) => {
      const pct = Math.round(ratio * 100);
      loaderBar.style.transform = `scaleX(${ratio})`;
      loaderCount.textContent = pct;
    },
    onHover: (hoverInfo) => {
      currentHoverType = hoverInfo;
      if (!hoverInfo) {
        cursor.classList.remove('is-label', 'is-link');
        cursorLabel.textContent = '';
      } else if (hoverInfo.type === 'temple') {
        cursor.classList.add('is-label');
        cursor.classList.remove('is-link');
        cursorLabel.textContent = 'ROTATE';
      } else if (hoverInfo.type === 'slab') {
        cursor.classList.add('is-label');
        cursor.classList.remove('is-link');
        const st = STONES.find((s) => s.key === hoverInfo.key);
        cursorLabel.textContent = st ? st.name.split(' ')[0] : 'SELECT';
      }
    },
    onFrame: (state) => {
      // Sync 2D Backdrop Niche with 3D camera projection
      if (state.niche) {
        const { left, top, width, height } = state.niche;
        niche.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        niche.style.width = `${width}px`;
        niche.style.height = `${height}px`;
        niche.style.borderRadius = `${width / 2}px ${width / 2}px 0 0`;
        niche.style.fontSize = `${width * 0.16}px`;
      }

      // Sync 2D Stage Caption position
      if (state.caption) {
        stageCaption.style.transform = `translate3d(${state.caption.x}px, ${state.caption.y}px, 0) translate(-50%, 0)`;
      }

      // Sync 3D Anchored Hotspots
      if (state.hotspots) {
        state.hotspots.forEach((hs) => {
          const el = hs.id === 'pillar' ? hsPillar : hsKalash;
          if (el) {
            el.style.transform = `translate3d(${hs.x}px, ${hs.y}px, 0)`;
            el.classList.toggle('is-visible', hs.visible);
          }
        });
      }
    },
  });

  buildSwatches(exp);

  exp.onSlabClick((key) => {
    const idx = STONES.findIndex((s) => s.key === key);
    if (idx !== -1) selectStone(idx, exp);
  });

  // Wait for 3D textures load & GPU compilation
  await exp.ready;
  await exp.warmup();

  // Dismiss loader with a smooth reveal clip
  gsap.to(loader, {
    clipPath: 'inset(0 0 100% 0)',
    duration: 1.1,
    ease: 'power4.inOut',
    onComplete: () => {
      loader.style.display = 'none';
      // Trigger 3D scene camera & assembly intro
      exp.intro();
      // Animate text & UI elements
      animateEntrance();
    },
  });
}

/* ------------------------------------------------------------------
   Entrance Animation Sequence
------------------------------------------------------------------- */
function animateEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  // Nav entrance
  tl.fromTo(nav, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4 }, 0.2);

  // Title line-by-line reveal
  const titleLines = document.querySelectorAll('.hero__title .line > span');
  tl.fromTo(
    titleLines,
    { y: '110%' },
    { y: '0%', duration: 1.6, stagger: 0.12 },
    0.4
  );

  // Eyebrow, lead text, CTAs
  tl.fromTo('.hero__eyebrow-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 0.6);
  tl.fromTo('.hero__eyebrow', { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 1.2 }, 0.7);
  tl.fromTo('.hero__lead', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.4 }, 0.9);
  tl.fromTo('.hero__ctas > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.4, stagger: 0.15 }, 1.1);

  // Stone rail & stats
  tl.fromTo(stoneRail, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4 }, 1.0);
  tl.fromTo('.hero__stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.4 }, 1.2);

  // Trigger stat count up
  animateStats();
}

// Start application
window.addEventListener('DOMContentLoaded', init);

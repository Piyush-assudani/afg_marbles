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
   Scroll Header & Smooth Section Navigation
------------------------------------------------------------------- */
function setupScrollNav() {
  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scroll links & auto close mobile menu
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#terms') || href.startsWith('#privacy')) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (mobileMenu && mobileMenu.classList.contains('is-open')) {
          mobileMenu.classList.remove('is-open');
          if (burger) burger.setAttribute('aria-expanded', 'false');
        }
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ------------------------------------------------------------------
   Curated Creations Filter Tabs
------------------------------------------------------------------- */
function setupGalleryFilter() {
  const tabs = document.querySelectorAll('.filter-tabs .tab-btn');
  const cards = document.querySelectorAll('.creations-grid .creation-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const filter = tab.getAttribute('data-filter');
      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        const matches = filter === 'all' || cat === filter;
        if (matches) {
          card.style.display = 'flex';
          gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ------------------------------------------------------------------
   Masterpiece Lightbox Modal
------------------------------------------------------------------- */
function setupLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const waBtn = document.getElementById('lightbox-wa-btn');
  if (!modal || !closeBtn || !img) return;

  function openLightbox(src, title) {
    img.src = src;
    img.alt = title || 'A.F.G Marble Masterpiece';
    if (caption) caption.textContent = title || '';
    if (waBtn) {
      const msg = encodeURIComponent(
        `Hello A.F.G Marble & Arts, I am interested in commissioning a creation like: "${title || 'Masterpiece'}". Please share pricing, custom dimensions, and stone options.`
      );
      waBtn.href = `https://wa.me/919829012345?text=${msg}`;
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-lightbox').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title');
      if (src) openLightbox(src, title);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeLightbox();
  });
}

/* ------------------------------------------------------------------
   Terms & Privacy Policy Modals
------------------------------------------------------------------- */
function setupLegalModals() {
  const termsModal = document.getElementById('terms-modal');
  const termsClose = document.getElementById('terms-close');
  const privacyModal = document.getElementById('privacy-modal');
  const privacyClose = document.getElementById('privacy-close');

  function openModal(m) {
    if (!m) return;
    m.classList.add('is-open');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(m) {
    if (!m) return;
    m.classList.remove('is-open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Terms triggers
  document.querySelectorAll('#btn-open-terms, #link-terms, a[href="#terms-modal"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(termsModal);
    });
  });

  if (termsClose) {
    termsClose.addEventListener('click', () => closeModal(termsModal));
  }
  if (termsModal) {
    termsModal.addEventListener('click', (e) => {
      if (e.target === termsModal) closeModal(termsModal);
    });
  }

  // Privacy triggers
  document.querySelectorAll('#btn-open-privacy, #link-privacy, a[href="#privacy-modal"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(privacyModal);
    });
  });

  if (privacyClose) {
    privacyClose.addEventListener('click', () => closeModal(privacyModal));
  }
  if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) closeModal(privacyModal);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(termsModal);
      closeModal(privacyModal);
    }
  });
}

/* ------------------------------------------------------------------
   Commission Consultation Inquiry Form
------------------------------------------------------------------- */
function setupCommissionForm() {
  const form = document.getElementById('commission-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements['name']?.value?.trim() || '';
    const phone = form.elements['phone']?.value?.trim() || '';
    const email = form.elements['email']?.value?.trim() || 'Not specified';
    const project = form.elements['project']?.value || 'Custom Marble Masterpiece';
    const stone = form.elements['stone']?.value || 'Makrana Pure White';
    const message = form.elements['message']?.value?.trim() || 'No additional details specified.';

    const text = encodeURIComponent(
      `*New Bespoke Commission Inquiry | A.F.G Marble & Arts*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `• *Client Name:* ${name}\n` +
      `• *Phone / WA:* ${phone}\n` +
      `• *Email:* ${email}\n` +
      `• *Requirement:* ${project}\n` +
      `• *Preferred Stone:* ${stone}\n` +
      `• *Details / Dimensions:* ${message}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please connect with our master stone architect.`
    );

    const waUrl = `https://wa.me/919829012345?text=${text}`;

    const submitBtn = form.querySelector('#btn-submit-inquiry');
    if (submitBtn) {
      submitBtn.innerHTML = `<span>Connecting to Atelier Master Sculptor...</span>`;
      submitBtn.style.background = '#25D366';
      submitBtn.style.color = '#fff';
      submitBtn.style.borderColor = '#25D366';
    }

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      if (submitBtn) {
        submitBtn.innerHTML = `<span>Inquiry Dispatched (Open WhatsApp)</span>`;
      }
    }, 400);
  });
}

/* ------------------------------------------------------------------
   App Initialization
------------------------------------------------------------------- */
async function init() {
  setupCursor();
  setupMobileMenu();
  setupScrollNav();
  setupGalleryFilter();
  setupLightbox();
  setupLegalModals();
  setupCommissionForm();

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

import gsap from 'gsap';
import { createExperience, STONES } from './scene.js';
import './style.css';
import './premium.css';
import { initPremium } from './premium.js';
import { initSecurity } from './security.js';
import { PRODUCTS, getProductById, saveInquiry } from './products.js';

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

  const arrowPrev = document.getElementById('stone-arrow-prev');
  const arrowNext = document.getElementById('stone-arrow-next');

  if (arrowPrev) {
    arrowPrev.onclick = () => {
      const prevIdx = (activeStoneIndex - 1 + STONES.length) % STONES.length;
      selectStone(prevIdx, exp);
    };
  }
  if (arrowNext) {
    arrowNext.onclick = () => {
      const nextIdx = (activeStoneIndex + 1) % STONES.length;
      selectStone(nextIdx, exp);
    };
  }
}

function selectStone(idx, exp) {
  if (idx === activeStoneIndex || exp.isTransitioning()) return;
  activeStoneIndex = idx;
  const stone = STONES[idx];

  // Update Swatch UI with spring bounce
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

  // Stone index number roll if present
  if (stoneIdx) {
    stoneIdx.textContent = String(idx + 1).padStart(2, '0');
    gsap.fromTo(stoneIdx, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
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

        if (nicheWord) {
          gsap.fromTo(
            nicheWord,
            { opacity: 0, scale: 0.94, filter: 'blur(10px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.85, ease: 'expo.out', clearProps: 'filter' }
          );
        }
      },
    });
  }
}

/* ------------------------------------------------------------------
   Custom Cursor Logic
------------------------------------------------------------------- */
function setupCursor() {
  if (cursor) cursor.style.display = 'none';

  // Magnetic effect for primary buttons (clean system cursor)
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
  const statNums = document.querySelectorAll('.stat__num span[data-count], .ribbon-stat__num span[data-count]');
  statNums.forEach((el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: 'power3.out',
      delay: 0.6,
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

  const toggle = (force) => {
    const isOpen = typeof force === 'boolean' ? force : !mobileMenu.classList.contains('is-open');
    if (isOpen) {
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
    }
  };

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('is-open') && !mobileMenu.contains(e.target) && !burger.contains(e.target)) {
      toggle(false);
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle(false);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      toggle(false);
    }
  });
}

/* ------------------------------------------------------------------
   Desktop Mega Menu Hover Grace Period & Interactive Category Tabs
------------------------------------------------------------------- */
function setupMegaMenu() {
  const dropdown = document.querySelector('.nav-item-dropdown');
  const flyout = document.querySelector('.mega-menu-flyout');
  if (!dropdown || !flyout) return;

  let timer;
  const trigger = dropdown.querySelector('.dropdown-trigger');

  const open = () => {
    clearTimeout(timer);
    dropdown.classList.add('is-hovered');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    timer = setTimeout(() => {
      dropdown.classList.remove('is-hovered');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }, 240);
  };

  dropdown.addEventListener('mouseenter', open);
  dropdown.addEventListener('mouseleave', close);
  flyout.addEventListener('mouseenter', open);
  flyout.addEventListener('mouseleave', close);

  // Dynamic Interactive Category Switching on Hover
  const catItems = flyout.querySelectorAll('.mega-cat-item');
  const panels = flyout.querySelectorAll('.mega-panel');

  catItems.forEach((item) => {
    const activate = () => {
      const tabName = item.dataset.megaTab;
      catItems.forEach((ci) => ci.classList.remove('is-active'));
      item.classList.add('is-active');

      panels.forEach((p) => {
        if (p.dataset.panel === tabName) {
          p.classList.add('is-active');
        } else {
          p.classList.remove('is-active');
        }
      });
    };

    item.addEventListener('mouseenter', activate);
    item.addEventListener('focusin', activate);
    item.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        activate();
      }
    });
  });

  flyout.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      dropdown.classList.remove('is-hovered');
    });
  });
}

/* ------------------------------------------------------------------
   Scroll Header & Smooth Section Navigation
------------------------------------------------------------------- */
function setupScrollNav() {
  const wa = document.querySelector('.floating-wa, .floating-whatsapp');
  const scrollIndicator = document.querySelector('.hero__scroll-indicator');
  const hasHero = !!document.querySelector('.hero');

  const onScroll = () => {
    const y = window.scrollY;

    // Header nav styling
    if (y > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    // Hero scroll indicator: fade out smoothly when user begins scrolling
    if (scrollIndicator) {
      if (y > 60) {
        scrollIndicator.classList.add('is-hidden');
      } else {
        scrollIndicator.classList.remove('is-hidden');
      }
    }

    // Floating WhatsApp button: glide down past hero to standard bottom right
    if (wa) {
      if (!hasHero || y > 260) {
        wa.classList.add('is-scrolled');
      } else {
        wa.classList.remove('is-scrolled');
      }
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
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });
}

/* ------------------------------------------------------------------
   Mobile Filter Tabs Horizontal Scroll Arrow Indicator
------------------------------------------------------------------- */
function setupFilterTabsScroll() {
  const rail = document.getElementById('filter-tabs');
  const arrow = document.getElementById('filter-tabs-arrow');
  if (!rail || !arrow) return;

  function updateArrow() {
    const maxScroll = rail.scrollWidth - rail.clientWidth - 10;
    if (rail.scrollLeft >= maxScroll) {
      arrow.classList.add('is-end');
      arrow.setAttribute('aria-label', 'Slide back to start');
    } else {
      arrow.classList.remove('is-end');
      arrow.setAttribute('aria-label', 'Slide to see more categories');
    }
  }

  rail.addEventListener('scroll', updateArrow, { passive: true });

  arrow.addEventListener('click', () => {
    const maxScroll = rail.scrollWidth - rail.clientWidth - 10;
    if (rail.scrollLeft >= maxScroll) {
      rail.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      rail.scrollBy({ left: 190, behavior: 'smooth' });
    }
  });

  updateArrow();
  window.addEventListener('resize', updateArrow, { passive: true });
}

/* ------------------------------------------------------------------
   Masterpiece Lightbox Modal (Click-to-Enlarge)
------------------------------------------------------------------- */
function setupLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const waBtn = document.getElementById('lightbox-wa-btn');
  if (!modal || !closeBtn || !img) return;

  // Collect all gallery items across the page for seamless browsing
  let gallery = [];
  let currentIndex = 0;

  function buildGallery() {
    gallery = [];
    const mediaNodes = document.querySelectorAll(
      '.sanctum-hero-media, .creation-card .card-media, .cx-slide__media, .insta-item, .bento__cell, .craft-media, .vastu-card-media'
    );
    mediaNodes.forEach((node) => {
      const btn = node.querySelector('.btn-lightbox');
      const imgEl = node.querySelector('img');
      const src = btn?.getAttribute('data-src') || imgEl?.currentSrc || imgEl?.getAttribute('src');
      if (!src) return;

      let title = btn?.getAttribute('data-title');
      if (!title) {
        const parentCard = node.closest('.sanctum-hero-card, .creation-card, .cx-slide, .craft-card, .vastu-card, .bento__cell, figure');
        const heading = parentCard?.querySelector('h3, h4, figcaption');
        title = heading?.textContent?.trim() || imgEl?.alt || 'A.F.G Marble Masterpiece';
      }

      if (!gallery.some((item) => item.src === src)) {
        gallery.push({ src, title });
      }
    });
  }

  buildGallery();

  function renderCurrentItem() {
    if (gallery.length === 0) return;
    const item = gallery[currentIndex];
    img.src = item.src;
    img.alt = item.title;
    if (caption) caption.textContent = item.title;
    if (waBtn) {
      const msg = encodeURIComponent(
        `Hello A.F.G Marble & Arts, I am interested in commissioning a creation like: "${item.title}". Please share pricing, custom dimensions, and stone options.`
      );
      waBtn.href = `https://wa.me/917597417274?text=${msg}`;
    }
  }

  function openLightbox(src, title) {
    if (!src) return;
    buildGallery();

    const foundIdx = gallery.findIndex((item) => item.src === src || src.endsWith(item.src));
    if (foundIdx !== -1) {
      currentIndex = foundIdx;
    } else {
      gallery.unshift({ src, title: title || 'A.F.G Marble Masterpiece' });
      currentIndex = 0;
    }

    renderCurrentItem();

    modal.classList.add('is-open', 'is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('is-open', 'is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextItem() {
    if (gallery.length === 0) return;
    currentIndex = (currentIndex + 1) % gallery.length;
    renderCurrentItem();
  }

  function prevItem() {
    if (gallery.length === 0) return;
    currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    renderCurrentItem();
  }

  // 1. Explicit .btn-lightbox triggers
  document.querySelectorAll('.btn-lightbox').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title');
      if (src) openLightbox(src, title);
    });
  });

  // 2. Direct click on any media container or its image
  const zoomableSelectors = [
    '.sanctum-hero-media',
    '.creation-card .card-media',
    '.cx-slide__media',
    '.insta-item',
    '.bento__cell',
    '.craft-media',
    '.vastu-card-media'
  ];

  document.querySelectorAll(zoomableSelectors.join(', ')).forEach((container) => {
    container.style.cursor = 'zoom-in';
    container.addEventListener('click', (e) => {
      // Don't hijack whatsapp inquiry links or buttons
      if (e.target.closest('a') && !e.target.closest('.btn-lightbox')) return;
      e.preventDefault();
      e.stopPropagation();

      const btn = container.querySelector('.btn-lightbox');
      const imgEl = container.querySelector('img');
      const src = btn?.getAttribute('data-src') || imgEl?.currentSrc || imgEl?.getAttribute('src');

      let title = btn?.getAttribute('data-title');
      if (!title) {
        const parentCard = container.closest('.sanctum-hero-card, .creation-card, .cx-slide, .craft-card, .vastu-card, .bento__cell, figure');
        const heading = parentCard?.querySelector('h3, h4, figcaption');
        title = heading?.textContent?.trim() || imgEl?.alt || 'A.F.G Marble Masterpiece';
      }

      if (src) openLightbox(src, title);
    });
  });

  // Navigation handlers
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevItem(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextItem(); });
  closeBtn.addEventListener('click', closeLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open') && !modal.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextItem();
    if (e.key === 'ArrowLeft') prevItem();
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
    m.classList.add('is-open', 'is-active');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(m) {
    if (!m) return;
    m.classList.remove('is-open', 'is-active');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Terms triggers
  document.querySelectorAll('#btn-open-terms, #link-terms, a[href="#terms-modal"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        burger?.setAttribute('aria-expanded', 'false');
      }
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
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        burger?.setAttribute('aria-expanded', 'false');
      }
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

    const waUrl = `https://wa.me/917597417274?text=${text}`;

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
   Interactive Before & After Comparison Slider (Inspired by SS2)
------------------------------------------------------------------- */
function setupBeforeAfter() {
  const container = document.getElementById('ba-slider');
  const afterWrapper = document.getElementById('ba-after-wrapper');
  const divider = document.getElementById('ba-divider');
  const range = document.getElementById('ba-range');
  if (!container || !afterWrapper || !divider || !range) return;

  const updateSlider = (val) => {
    const pct = Math.max(0, Math.min(100, val));
    afterWrapper.style.clipPath = `polygon(${pct}% 0, 100% 0, 100% 100%, ${pct}% 100%)`;
    divider.style.left = `${pct}%`;
    range.value = pct;
  };

  range.addEventListener('input', (e) => {
    updateSlider(parseFloat(e.target.value));
  });

  let isDragging = false;
  const onMove = (clientX) => {
    const rect = container.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    updateSlider(pct);
  };

  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    onMove(e.clientX);
  });
  window.addEventListener('pointermove', (e) => {
    if (isDragging) onMove(e.clientX);
  });
  window.addEventListener('pointerup', () => {
    isDragging = false;
  });

  updateSlider(50);
}

/* ------------------------------------------------------------------
   Toast Notification Utility
------------------------------------------------------------------- */
let toastTimeout = null;
export function showToast(message) {
  const toast = document.getElementById('toast-notify');
  const textEl = document.getElementById('toast-text');
  if (!toast || !textEl) return;
  textEl.textContent = message;
  toast.classList.add('is-active');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-active');
  }, 3200);
}

/* ------------------------------------------------------------------
   Bespoke Space & Inquiry Form (Persists to LocalStorage & WhatsApp)
------------------------------------------------------------------- */
let openInquiryModal = () => {};

function setupBespokeInquiryModal() {
  const modal = document.getElementById('inquiry-modal');
  const backdrop = document.getElementById('inq-backdrop');
  const closeBtn = document.getElementById('inq-close-btn');
  const form = document.getElementById('inquiry-form');
  const formWrapper = document.getElementById('inquiry-form-wrapper');
  const successView = document.getElementById('inquiry-success-view');
  const closeSuccessBtn = document.getElementById('btn-close-success');
  const successRefEl = document.getElementById('success-ref-id');
  const successWaLink = document.getElementById('success-wa-link');

  const inqProductId = document.getElementById('inq-product-id');
  const inqProductTitle = document.getElementById('inq-product-title');
  const inqProductTag = document.getElementById('inq-product-tag');
  const inqProductNameLabel = document.getElementById('inq-product-name-label');

  if (!modal || !form) return;

  openInquiryModal = function(productInfo = null) {
    formWrapper.style.display = 'block';
    successView.style.display = 'none';

    if (productInfo && productInfo.title) {
      inqProductId.value = productInfo.id || '';
      inqProductTitle.value = productInfo.title;
      inqProductNameLabel.textContent = productInfo.title;
      inqProductTag.style.display = 'flex';
      if (productInfo.stone) {
        const stoneSelect = document.getElementById('inq-stone');
        if (stoneSelect) {
          const matchOpt = Array.from(stoneSelect.options).find(o => 
            productInfo.stone.toLowerCase().includes(o.value.toLowerCase()) || 
            o.value.toLowerCase().includes(productInfo.stone.toLowerCase())
          );
          if (matchOpt) matchOpt.selected = true;
        }
      }
    } else {
      inqProductId.value = '';
      inqProductTitle.value = 'General Atelier Concept Discovery';
      inqProductTag.style.display = 'none';
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeInquiry() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeInquiry);
  backdrop?.addEventListener('click', closeInquiry);
  closeSuccessBtn?.addEventListener('click', closeInquiry);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeInquiry();
  });

  // Hook up the Consultation CTA button from "THE AFG DIFFERENCE" section
  const consultationBtn = document.getElementById('btn-open-consultation');
  if (consultationBtn) {
    consultationBtn.addEventListener('click', () => {
      openInquiryModal(null);
    });
  }

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements['name']?.value?.trim();
    const phone = form.elements['phone']?.value?.trim();
    const location = form.elements['location']?.value?.trim();
    const stone = form.elements['stone']?.value;
    const width = form.elements['width']?.value?.trim() || 'Custom';
    const depth = form.elements['depth']?.value?.trim() || 'Custom';
    const height = form.elements['height']?.value?.trim() || 'Custom';
    const notes = form.elements['notes']?.value?.trim() || 'No additional notes provided.';
    const productTitle = inqProductTitle.value || 'Custom Commission';
    const productId = inqProductId.value || '';

    if (!name || !phone || !location) {
      alert('Please provide your Full Name, WhatsApp Number, and City.');
      return;
    }

    // Save to LocalStorage via products.js
    const saved = saveInquiry({
      name,
      phone,
      location,
      stone,
      dimensions: `${width} (W) × ${depth} (D) × ${height} (H)`,
      notes,
      productTitle,
      productId
    });

    // Update success view
    successRefEl.textContent = saved.id;

    const waText = 
      `*A.F.G MARBLE & ARTS — BESPOKE INQUIRY [${saved.id}]*\n\n` +
      `*Client:* ${name}\n` +
      `*WhatsApp:* ${phone}\n` +
      `*Destination City:* ${location}\n` +
      `*Masterpiece / Sanctum:* ${productTitle}\n` +
      `*Stone Selection:* ${stone}\n` +
      `*Space Dimensions:* ${width} Width × ${depth} Depth × ${height} Height\n` +
      `*Vastu / Deities / Notes:* ${notes}\n\n` +
      `_Please prepare the architectural 3D drawings and bespoke quotation._`;

    successWaLink.href = `https://wa.me/917597417274?text=${encodeURIComponent(waText)}`;

    formWrapper.style.display = 'none';
    successView.style.display = 'block';
    showToast(`Inquiry dossier ${saved.id} registered`);
  });
}

/* ------------------------------------------------------------------
   Dynamic SPA Product Modal & Multi-Angle Catalog
   (No HTML reload, Pure JavaScript with Hash Navigation)
------------------------------------------------------------------- */
function setupDynamicProductExperience() {
  const modal = document.getElementById('product-modal');
  const pmBackdrop = document.getElementById('pm-backdrop');
  const pmCloseBtn = document.getElementById('pm-close-btn');
  const pmContent = document.getElementById('pm-content');
  if (!modal || !pmContent) return;

  let currentProductId = null;
  let currentAngleIndex = 0;

  function renderProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;
    currentProductId = product.id;
    currentAngleIndex = 0;

    const angles = product.angles && product.angles.length > 0 ? product.angles : [
      { label: 'Front Elevation', tag: 'Full View', src: '/gallery/sanctum-pooja-luxe.webp', desc: product.fullDesc }
    ];

    const specsHtml = product.specs.map(spec => `
      <div class="spec-row">
        <dt class="spec-label">${spec.label}</dt>
        <dd class="spec-val">${spec.value}</dd>
      </div>
    `).join('');

    const thumbnailsHtml = angles.map((angle, idx) => `
      <button type="button" class="angle-thumb ${idx === 0 ? 'is-active' : ''}" data-angle-idx="${idx}" aria-label="View ${angle.label}">
        <img src="${angle.src}" alt="${product.title} - ${angle.label}" loading="lazy" />
        <span class="angle-thumb-tag">${angle.tag || angle.label}</span>
      </button>
    `).join('');

    pmContent.innerHTML = `
      <div class="pm-split-layout">
        <!-- LEFT: Multi-Angle Interactive Gallery -->
        <div class="pm-gallery-col">
          <div class="pm-main-display">
            <img id="pm-active-image" class="pm-active-img" src="${angles[0].src}" alt="${product.title} - ${angles[0].label}" />
            <div class="pm-image-badge">
              <span id="pm-angle-tag">${angles[0].tag || 'Primary Angle'}</span>
              <span class="pm-angle-counter"><span id="pm-cur-idx">1</span> / ${angles.length}</span>
            </div>
            <button type="button" class="pm-zoom-btn" id="pm-zoom-btn" aria-label="Full-Screen Zoom">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </button>
          </div>

          <div class="pm-angle-desc-card">
            <strong id="pm-angle-title">${angles[0].label}</strong>
            <p id="pm-angle-desc">${angles[0].desc || product.tagline}</p>
          </div>

          <!-- Thumbnails Strip -->
          <div class="pm-thumbnails-bar" id="pm-thumbnails">
            ${thumbnailsHtml}
          </div>
        </div>

        <!-- RIGHT: Architectural Marble Dossier & Specifications -->
        <div class="pm-info-col">
          <div class="pm-info-header">
            <div class="pm-category-pill">${product.categoryName || 'Bespoke Marble Sanctum'}</div>
            <h2 class="pm-product-title" id="pm-title">${product.title}</h2>
            <p class="pm-tagline">${product.tagline}</p>
            <div class="pm-rating-bar">
              <span class="pm-stars">★★★★★</span>
              <span class="pm-rating-val">${product.rating || '5.0'}</span>
              <span class="pm-reviews">(${product.reviewsCount || 42} Atelier Commissions)</span>
            </div>
          </div>

          <div class="pm-summary-pills">
            <div class="summary-pill">
              <span class="pill-title">Stone Variety</span>
              <strong class="pill-value">${product.primaryStone}</strong>
            </div>
            <div class="summary-pill">
              <span class="pill-title">Dimensions</span>
              <strong class="pill-value">${product.scale}</strong>
            </div>
            <div class="summary-pill">
              <span class="pill-title">Certification</span>
              <strong class="pill-value">Ayadi Vastu Compliant</strong>
            </div>
          </div>

          <div class="pm-desc-box">
            <h4>Atelier Architectural Notes</h4>
            <p>${product.fullDesc}</p>
          </div>

          <div class="pm-specs-section">
            <h4 class="pm-specs-heading">Architectural &amp; Material Specifications</h4>
            <div class="pm-specs-grid">
              ${specsHtml}
            </div>
          </div>

          <!-- Action & Personal Share Bar -->
          <div class="pm-actions-group">
            <button type="button" class="btn-pm-inquire" id="btn-pm-inquire">
              <span>Request Bespoke Quotation &amp; 3D Plan</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </button>

            <div class="pm-share-bar">
              <span class="share-prompt">Personal Share:</span>
              <button type="button" class="btn-share-tool btn-share-wa" id="pm-share-wa" title="Share on WhatsApp">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                </svg>
                <span>WhatsApp</span>
              </button>

              <button type="button" class="btn-share-tool btn-share-copy" id="pm-share-copy" title="Copy Masterpiece Deep-Link">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy Link</span>
              </button>

              <a href="https://wa.me/917597417274?text=${encodeURIComponent('Hello AFG Marble & Arts, I am viewing ' + product.title + ' and would like to speak directly with the Master Silawat artisan.')}" target="_blank" rel="noopener noreferrer" class="btn-share-tool btn-share-chat" title="Direct Atelier Chat">
                <span>Direct Artisan Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Hook up thumbnail switching
    const activeImg = pmContent.querySelector('#pm-active-image');
    const angleTag = pmContent.querySelector('#pm-angle-tag');
    const angleCounter = pmContent.querySelector('#pm-cur-idx');
    const angleTitle = pmContent.querySelector('#pm-angle-title');
    const angleDesc = pmContent.querySelector('#pm-angle-desc');
    const thumbBtns = pmContent.querySelectorAll('.angle-thumb');

    thumbBtns.forEach((tBtn) => {
      tBtn.addEventListener('click', () => {
        const idx = parseInt(tBtn.getAttribute('data-angle-idx'), 10) || 0;
        currentAngleIndex = idx;
        const targetAngle = angles[idx];

        thumbBtns.forEach((b) => b.classList.remove('is-active'));
        tBtn.classList.add('is-active');

        // Smooth image switch with subtle crossfade
        activeImg.style.opacity = '0.35';
        setTimeout(() => {
          activeImg.src = targetAngle.src;
          activeImg.alt = `${product.title} - ${targetAngle.label}`;
          activeImg.style.opacity = '1';
        }, 120);

        angleTag.textContent = targetAngle.tag || targetAngle.label;
        angleCounter.textContent = (idx + 1).toString();
        angleTitle.textContent = targetAngle.label;
        angleDesc.textContent = targetAngle.desc || product.tagline;
      });
    });

    // Zoom trigger -> uses existing lightbox for high-res viewing
    const zoomBtn = pmContent.querySelector('#pm-zoom-btn');
    if (zoomBtn) {
      zoomBtn.addEventListener('click', () => {
        const curAngle = angles[currentAngleIndex];
        const lbImg = document.getElementById('lightbox-img');
        const lbCaption = document.getElementById('lightbox-caption');
        const lbModal = document.getElementById('lightbox-modal');
        if (lbImg && lbModal) {
          lbImg.src = curAngle.src;
          if (lbCaption) lbCaption.textContent = `${product.title} — ${curAngle.label}`;
          lbModal.classList.add('is-open', 'is-active');
        }
      });
    }

    // Inquiry trigger from modal
    const pmInquireBtn = pmContent.querySelector('#btn-pm-inquire');
    if (pmInquireBtn) {
      pmInquireBtn.addEventListener('click', () => {
        openInquiryModal({
          id: product.id,
          title: product.title,
          stone: product.primaryStone,
          scale: product.scale
        });
      });
    }

    // Share handlers
    const shareWaBtn = pmContent.querySelector('#pm-share-wa');
    if (shareWaBtn) {
      shareWaBtn.addEventListener('click', () => {
        const productUrl = `${window.location.origin}${window.location.pathname}#product/${product.id}`;
        const msg = `*A.F.G MARBLE & ARTS — Masterpiece Dossier*\n\n*${product.title}*\n${product.tagline}\nScale: ${product.scale}\nStone: ${product.primaryStone}\n\nView details & multi-angle gallery:\n${productUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
      });
    }

    const shareCopyBtn = pmContent.querySelector('#pm-share-copy');
    if (shareCopyBtn) {
      shareCopyBtn.addEventListener('click', async () => {
        const productUrl = `${window.location.origin}${window.location.pathname}#product/${product.id}`;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(productUrl);
          } else {
            const ta = document.createElement('textarea');
            ta.value = productUrl;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }
          showToast(`Direct link copied: ${product.title}`);
        } catch (e) {
          showToast(`Direct link: ${productUrl}`);
        }
      });
    }
  }

  function openProductDetail(productId, updateHash = true) {
    renderProduct(productId);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (updateHash && window.location.hash !== `#product/${productId}`) {
      window.location.hash = `product/${productId}`;
    }
  }

  function closeProductDetail() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.location.hash.startsWith('#product/')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }

  pmCloseBtn?.addEventListener('click', closeProductDetail);
  pmBackdrop?.addEventListener('click', closeProductDetail);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeProductDetail();
    }
  });

  // SPA Hash Routing
  function handleHashRoute() {
    const hash = window.location.hash;
    const match = hash.match(/^#product\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      openProductDetail(match[1], false);
    } else if (modal.classList.contains('is-open')) {
      closeProductDetail();
    }
  }

  window.addEventListener('hashchange', handleHashRoute);
  // Initial check
  if (window.location.hash.startsWith('#product/')) {
    setTimeout(handleHashRoute, 250);
  }

  // Hook up creation cards in the catalog
  document.querySelectorAll('.creation-card').forEach((card, index) => {
    // Map card index to our products list if not explicit
    const fallbackId = PRODUCTS[index % PRODUCTS.length]?.id;
    const prodId = card.getAttribute('data-product-id') || fallbackId;
    card.setAttribute('data-product-id', prodId);

    // Clicking card image or title opens product view
    const titleEl = card.querySelector('h3');
    const imgEl = card.querySelector('.card-media img');
    [titleEl, imgEl].forEach((el) => {
      if (!el) return;
      el.style.cursor = 'pointer';
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openProductDetail(prodId);
      });
    });

    // Add buttons to card actions if not already present
    const cardActions = card.querySelector('.card-actions');
    if (cardActions && !cardActions.querySelector('.btn-card-explore')) {
      const exploreBtn = document.createElement('button');
      exploreBtn.type = 'button';
      exploreBtn.className = 'btn-card-explore';
      exploreBtn.innerHTML = `<span>Multi-Angle &amp; Specs</span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`;
      exploreBtn.addEventListener('click', () => openProductDetail(prodId));

      const shareBtn = document.createElement('button');
      shareBtn.type = 'button';
      shareBtn.className = 'btn-card-share';
      shareBtn.setAttribute('aria-label', 'Share Masterpiece');
      shareBtn.setAttribute('title', 'Share Masterpiece');
      shareBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
      shareBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const p = getProductById(prodId);
        const url = `${window.location.origin}${window.location.pathname}#product/${p.id}`;
        try {
          if (navigator.share) {
            await navigator.share({ title: p.title, text: p.tagline, url });
          } else {
            await navigator.clipboard.writeText(url);
            showToast(`Direct link copied: ${p.title}`);
          }
        } catch (err) {
          showToast(`Direct link: ${url}`);
        }
      });

      cardActions.prepend(shareBtn);
      cardActions.prepend(exploreBtn);
    }
  });

  // Global triggers with [data-open-product]
  document.querySelectorAll('[data-open-product]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.getAttribute('data-open-product');
      if (pid) openProductDetail(pid);
    });
  });
}

/* ------------------------------------------------------------------
   Floating Quick Dock (SHOP, CALL US, Back-to-Top)
------------------------------------------------------------------- */
function setupFloatingQuickDock() {
  const dock = document.getElementById('floating-quick-dock');
  const shopBtn = document.getElementById('dock-btn-shop');
  const callBtn = document.getElementById('dock-btn-call');
  const topBtn = document.getElementById('dock-btn-top');

  if (!dock) return;

  function onScroll() {
    if (window.scrollY > 400) {
      topBtn?.classList.add('is-visible');
    } else {
      topBtn?.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  topBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  shopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const creationsSec = document.getElementById('creations');
    if (creationsSec) {
      creationsSec.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ------------------------------------------------------------------
   App Initialization
------------------------------------------------------------------- */
async function init() {
  setupCursor();
  setupMobileMenu();
  setupMegaMenu();
  setupScrollNav();
  setupGalleryFilter();
  setupFilterTabsScroll();
  setupLightbox();
  setupLegalModals();
  setupCommissionForm();
  setupBeforeAfter();
  setupBespokeInquiryModal();
  setupDynamicProductExperience();
  setupFloatingQuickDock();
  initPremium();
  initSecurity();

  // Dynamic progressive loader ticker so the user immediately sees active movement (never stuck at 0%)
  let currentPct = 25;
  loaderBar.style.transform = `scaleX(0.25)`;
  loaderCount.textContent = '25';

  const progressTicker = setInterval(() => {
    if (currentPct < 92) {
      currentPct += Math.floor(Math.random() * 8) + 6;
      if (currentPct > 92) currentPct = 92;
      loaderBar.style.transform = `scaleX(${currentPct / 100})`;
      loaderCount.textContent = currentPct;
    }
  }, 45);

  const exp = createExperience({
    canvas,
    onProgress: (ratio) => {
      const realPct = Math.round(ratio * 100);
      if (realPct > currentPct) {
        currentPct = Math.min(96, realPct);
        loaderBar.style.transform = `scaleX(${currentPct / 100})`;
        loaderCount.textContent = currentPct;
      }
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
      if (state.niche && niche) {
        const { left, top, width, height } = state.niche;
        niche.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        niche.style.width = `${width}px`;
        niche.style.height = `${height}px`;
        niche.style.borderRadius = `${width / 2}px ${width / 2}px 0 0`;
        niche.style.fontSize = `${width * 0.16}px`;
      }

      // Sync 2D Stage Caption position (guarantee clean margin above marquee ribbon)
      if (state.caption && stageCaption) {
        const h = canvas.clientHeight || window.innerHeight;
        const safeY = Math.min(state.caption.y, h - 82);
        stageCaption.style.transform = `translate3d(${state.caption.x}px, ${safeY}px, 0) translate(-50%, 0)`;
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

  // Guarantee loader lifts quickly (max 1.8s safety cutoff)
  const maxWaitPromise = new Promise((resolve) => setTimeout(resolve, 1800));
  await Promise.race([exp.ready, maxWaitPromise]);

  clearInterval(progressTicker);
  loaderBar.style.transform = `scaleX(1)`;
  loaderCount.textContent = '100';

  try {
    await Promise.race([exp.warmup(), new Promise((resolve) => setTimeout(resolve, 120))]);
  } catch (err) {
    console.warn('Warmup skipped:', err);
  }

  // Dismiss loader with a snappy, silky curtain lift, overlapping the 3D intro (no dead frame)
  const handoff = gsap.timeline();
  handoff.to(loader.querySelector('.loader__inner') || loader, {
    opacity: 0,
    y: -14,
    duration: 0.25,
    ease: 'power2.out',
  });
  handoff.to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 0.48, ease: 'power3.inOut' }, 0.08);
  handoff.add(() => {
    exp.intro();
    animateEntrance();
  }, 0.18);
  handoff.add(() => {
    loader.style.display = 'none';
    loader.style.pointerEvents = 'none';
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
    { y: '110%', filter: 'blur(10px)' },
    { y: '0%', filter: 'blur(0px)', duration: 2, stagger: 0.14, ease: 'expo.out', clearProps: 'filter' },
    0.4
  );

  // Eyebrow, lead text, CTAs
  tl.fromTo('.hero__eyebrow', { opacity: 0, x: -15, filter: 'blur(6px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.6, clearProps: 'filter' }, 0.7);
  tl.fromTo('.hero__lead', { opacity: 0, y: 24, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.8, clearProps: 'filter' }, 0.95);
  tl.fromTo('.hero__ctas > *', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.8, stagger: 0.15 }, 1.15);

  // Stone block badge, floating detail card, stone rail & stats ribbon matching mockup
  tl.fromTo('.hero-stone-card', { opacity: 0, scale: 0.92, filter: 'blur(6px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.4, clearProps: 'filter' }, 1.0);
  tl.fromTo('.hero-feature-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4 }, 1.1);
  tl.fromTo(stoneRail, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4 }, 1.15);
  tl.fromTo('.hero__stats-ribbon', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4 }, 1.25);
  tl.fromTo('.hero__scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.35);

  // Trigger stat count up
  animateStats();
}

// Start application
window.addEventListener('DOMContentLoaded', init);

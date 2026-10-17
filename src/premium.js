/* =========================================================
   A.F.G — Premium motion layer
   Scroll reveals · scrubbed clip reveal · parallax · carousel · counters
   ========================================================= */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Scroll reveals ---------- */
function setupReveals() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );
  els.forEach((el, idx) => {
    // auto-stagger siblings inside grids that don't set --i
    if (!el.style.getPropertyValue('--i') && el.parentElement) {
      const sibs = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
      if (sibs.length > 1) el.style.setProperty('--i', sibs.indexOf(el));
    }
    io.observe(el);
  });
}

/* ---------- Scrubbed clip reveal + parallax (single rAF loop) ---------- */
function setupScrollScenes() {
  const scrubs = [...document.querySelectorAll('[data-scrub]')];
  const parallax = [...document.querySelectorAll('[data-parallax]')];
  if (reduceMotion || (!scrubs.length && !parallax.length)) {
    scrubs.forEach((s) => s.style.setProperty('--p', 1));
    return;
  }

  const state = scrubs.map(() => ({ cur: 0, target: 0 }));
  let vh = window.innerHeight;
  window.addEventListener('resize', () => (vh = window.innerHeight), { passive: true });

  function loop() {
    scrubs.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      // 0 when section top hits bottom of viewport → 1 when top reaches 15% from top
      const raw = (vh - r.top) / (vh * 0.85);
      state[i].target = Math.max(0, Math.min(1, raw));
      state[i].cur += (state[i].target - state[i].cur) * 0.085; // eased lerp for buttery motion
      if (Math.abs(state[i].target - state[i].cur) > 0.0005) {
        el.style.setProperty('--p', state[i].cur.toFixed(4));
      }
    });

    parallax.forEach((el) => {
      const host = el.parentElement;
      const r = host.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const offset = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* ---------- Commissions carousel (drag, arrows, autoplay, progress) ---------- */
function setupCarousel() {
  const vp = document.getElementById('cx-viewport');
  const track = document.getElementById('cx-track');
  if (!vp || !track) return;
  const slides = [...track.children];
  const prev = document.getElementById('cx-prev');
  const next = document.getElementById('cx-next');
  const cur = document.getElementById('cx-current');
  const total = document.getElementById('cx-total');
  const bar = document.getElementById('cx-progress-bar');
  const pad = (n) => String(n).padStart(2, '0');
  if (total) total.textContent = pad(slides.length);

  const step = () => slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 24);
  const maxScroll = () => vp.scrollWidth - vp.clientWidth;

  function update() {
    const idx = Math.min(slides.length - 1, Math.round(vp.scrollLeft / step()));
    if (cur) cur.textContent = pad(idx + 1);
    const ratio = maxScroll() > 0 ? vp.scrollLeft / maxScroll() : 0;
    if (bar) bar.style.transform = `scaleX(${Math.max(0.08, ratio)})`;
  }

  function go(dir) {
    if (dir > 0 && vp.scrollLeft >= maxScroll() - 4) vp.scrollTo({ left: 0, behavior: 'smooth' });
    else vp.scrollBy({ left: dir * step(), behavior: 'smooth' });
  }

  prev?.addEventListener('click', () => { go(-1); restart(); });
  next?.addEventListener('click', () => { go(1); restart(); });
  vp.addEventListener('scroll', update, { passive: true });

  // Mouse drag with inertia (touch uses native scrolling)
  let down = false, startX = 0, startLeft = 0, lastX = 0, vel = 0, moved = 0;
  vp.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = 0;
    startX = lastX = e.clientX;
    startLeft = vp.scrollLeft;
    vp.classList.add('is-dragging');
    stop();
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    vel = e.clientX - lastX;
    lastX = e.clientX;
    moved += Math.abs(vel);
    vp.scrollLeft = startLeft - (e.clientX - startX);
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    let v = -vel * 1.6;
    const glide = () => {
      if (Math.abs(v) < 0.4) {
        vp.classList.remove('is-dragging');
        // snap to nearest
        const target = Math.round(vp.scrollLeft / step()) * step();
        vp.scrollTo({ left: target, behavior: 'smooth' });
        restart();
        return;
      }
      vp.scrollLeft += v;
      v *= 0.92;
      requestAnimationFrame(glide);
    };
    glide();
  });

  // Autoplay — pauses on hover / off-screen
  let timer = null;
  let visible = false;
  function stop() { clearInterval(timer); timer = null; }
  function start() { if (!timer && visible && !reduceMotion) timer = setInterval(() => go(1), 4200); }
  function restart() { stop(); start(); }
  vp.addEventListener('mouseenter', stop);
  vp.addEventListener('mouseleave', start);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }, { threshold: 0.3 }).observe(vp);

  update();
}

/* ---------- Count-up numbers ---------- */
function setupCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const run = (el) => {
    const end = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = end.toLocaleString('en-IN') + suffix; return; }
    const dur = 2400;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * eased).toLocaleString('en-IN') + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  els.forEach((el) => io.observe(el));
}

export function initPremium() {
  setupReveals();
  setupScrollScenes();
  setupCarousel();
  setupCounters();
}

// Subpage script for A.F.G Marble & Arts
document.addEventListener('DOMContentLoaded', () => {
  // Resilient Asset & Image Resolver (works in dev, production build, and direct file preview)
  const resolveAssets = () => {
    const isFile = window.location.protocol === 'file:';
    document.querySelectorAll('img').forEach((img) => {
      const orig = img.getAttribute('src') || '';
      if (isFile && orig.startsWith('/')) {
        img.src = '.' + (orig.startsWith('/public') ? '' : '/public') + orig;
      }
      img.addEventListener('error', () => {
        const cur = img.getAttribute('src') || '';
        if (cur.startsWith('/gallery/')) {
          img.src = './public' + cur;
        } else if (cur.startsWith('./public/gallery/')) {
          img.src = cur.replace('./public', '');
        } else if (cur.startsWith('/afg-logo')) {
          img.src = './public' + cur;
        }
      });
    });
  };
  resolveAssets();

  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.getElementById('nav');

  // Scroll Header
  const onScroll = () => {
    if (window.scrollY > 40) {
      nav?.classList.add('is-scrolled');
    } else {
      nav?.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile Menu
  if (burger && mobileMenu) {
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

  // FAQ Accordion
  document.querySelectorAll('.page-faq-item').forEach((item) => {
    const q = item.querySelector('.page-faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.page-faq-item').forEach((i) => i.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });
});

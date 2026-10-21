'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ onOpenInquiry }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`nav ${isScrolled ? 'nav--scrolled' : ''}`} id="nav">
        <Link href="/" className="logo" id="logo" aria-label="A.F.G Marble & Arts Home">
          <img
            src="/afg-logo.svg"
            alt="A.F.G Marble & Arts"
            className="logo__img"
            width={56}
            height={32}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/afg-logo.png';
            }}
          />
          <span className="logo__text">
            <span className="logo__name">A.F.G MARBLE &amp; ARTS</span>
            <span className="logo__sub">Makrana · Jaipur, Rajasthan</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary Navigation">
          <Link href="/" className={pathname === '/' ? 'is-active' : ''}>
            Home
          </Link>
          <Link href="/pooja-sanctums" className={pathname === '/pooja-sanctums' ? 'is-active' : ''}>
            Pooja Sanctums
          </Link>
          <Link href="/palatial-fountains" className={pathname === '/palatial-fountains' ? 'is-active' : ''}>
            Palatial Fountains
          </Link>
          <Link href="/atelier-workshop" className={pathname === '/atelier-workshop' ? 'is-active' : ''}>
            Atelier &amp; Workshop
          </Link>
          <Link href="/materials-guide" className={pathname === '/materials-guide' ? 'is-active' : ''}>
            Stone Guide
          </Link>
          <Link href="/contact" className={pathname === '/contact' ? 'is-active' : ''}>
            Atelier Desk
          </Link>
        </nav>

        <div className="nav__right">
          <button
            type="button"
            className="nav__cta-btn"
            onClick={() => {
              if (onOpenInquiry) {
                onOpenInquiry({ title: 'Bespoke Atelier Commission' });
              } else {
                window.location.href = '/contact';
              }
            }}
          >
            <span>Consult Atelier</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button
            className={`burger ${mobileOpen ? 'is-active' : ''}`}
            id="burger"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Luxury Mobile Dropdown Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`} id="mobile-menu" aria-hidden={!mobileOpen}>
        <div className="mobile-menu__links">
          <Link href="/" className={`mob-link ${pathname === '/' ? 'is-active' : ''}`}>
            <span>Home Experience</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/pooja-sanctums" className={`mob-link ${pathname === '/pooja-sanctums' ? 'is-active' : ''}`}>
            <span>Pooja Sanctums &amp; Mandirs</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/palatial-fountains" className={`mob-link ${pathname === '/palatial-fountains' ? 'is-active' : ''}`}>
            <span>Palatial Estate Fountains</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/atelier-workshop" className={`mob-link ${pathname === '/atelier-workshop' ? 'is-active' : ''}`}>
            <span>Silawat Guild Workshop</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/materials-guide" className={`mob-link ${pathname === '/materials-guide' ? 'is-active' : ''}`}>
            <span>Makrana Stone Science</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/contact" className={`mob-link ${pathname === '/contact' ? 'is-active' : ''}`}>
            <span>Atelier Experience Hubs</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>

        <div className="mobile-menu__consult-cta">
          <button
            type="button"
            className="btn-primary w-full"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {
              setMobileOpen(false);
              if (onOpenInquiry) {
                onOpenInquiry({ title: 'Bespoke Atelier Commission' });
              } else {
                window.location.href = '/contact';
              }
            }}
          >
            <span className="btn-primary__text">Get Free Space Consultation</span>
            <span className="btn-primary__icon">→</span>
          </button>
        </div>

        <div className="mobile-menu__legal">
          <Link href="/terms-and-conditions">Terms</Link>
          <span>·</span>
          <Link href="/privacy-policy">Privacy</Link>
          <span>·</span>
          <Link href="/contact">Jaipur &amp; Makrana</Link>
        </div>
      </div>
    </>
  );
}

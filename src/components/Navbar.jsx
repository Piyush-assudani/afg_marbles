'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ onOpenInquiry }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeout.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 250);
  };

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

          {/* OUR CREATIONS WITH LUXURY MEGA MENU */}
          <div
            className="nav__has-mega"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`nav__mega-trigger ${pathname.startsWith('/pooja') || pathname.startsWith('/palatial') ? 'is-active' : ''}`}
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              aria-expanded={megaMenuOpen}
            >
              <span>Our Creations</span>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" className={`mega-chevron ${megaMenuOpen ? 'rotate' : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Desktop Mega Dropdown */}
            {megaMenuOpen && (
              <div className="mega-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="mega-menu__inner">
                  {/* Left: Collections Index */}
                  <div className="mega-menu__col-links">
                    <span className="mega-menu__header">MASTER COLLECTIONS</span>
                    <ul className="mega-links-list">
                      <li>
                        <Link href="/pooja-sanctums" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">01</span>
                          <div className="mega-item-info">
                            <strong>Pooja Rooms &amp; Sanctums</strong>
                            <span>Sacred Mandirs &amp; Home Shrines</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/palatial-fountains" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">02</span>
                          <div className="mega-item-info">
                            <strong>Palatial Estate Fountains</strong>
                            <span>Cascading Tiered Water Architecture</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/pooja-sanctums#chhatris" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">03</span>
                          <div className="mega-item-info">
                            <strong>Royal Chhatris &amp; Pavilions</strong>
                            <span>Carved Pavilions &amp; Gazebos</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/materials-guide" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">04</span>
                          <div className="mega-item-info">
                            <strong>Noble Stone Library</strong>
                            <span>Makrana Calcite &amp; Translucent Onyx</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/atelier-workshop" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">05</span>
                          <div className="mega-item-info">
                            <strong>Ayadi Vastu Architecture</strong>
                            <span>Sacred Proportions &amp; Shastra Formulas</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Right: Featured Masterpiece Cards */}
                  <div className="mega-menu__col-showcase">
                    <span className="mega-menu__header">FEATURED ATELIER PORTFOLIO</span>
                    <div className="mega-cards-grid">
                      <Link href="/pooja-sanctums" className="mega-card" onClick={() => setMegaMenuOpen(false)}>
                        <div className="mega-card__media">
                          <img src="/gallery/sanctum-peacock-arch.webp" alt="Royal Garbhagriha Mandir" />
                          <span className="mega-card__tag">Pooja Sanctum</span>
                        </div>
                        <div className="mega-card__body">
                          <strong>The Royal Garbhagriha</strong>
                          <span>Pure Makrana White Albeta</span>
                        </div>
                      </Link>

                      <Link href="/palatial-fountains" className="mega-card" onClick={() => setMegaMenuOpen(false)}>
                        <div className="mega-card__media">
                          <img src="/gallery/fountain-monolithic-fluted-basin.webp" alt="Classical 4-Tier Cascade" />
                          <span className="mega-card__tag">Water Architecture</span>
                        </div>
                        <div className="mega-card__body">
                          <strong>Classical 4-Tier Cascade</strong>
                          <span>Monolithic Fluted Basins</span>
                        </div>
                      </Link>

                      <Link href="/pooja-sanctums" className="mega-card" onClick={() => setMegaMenuOpen(false)}>
                        <div className="mega-card__media">
                          <img src="/gallery/mandir-gold-leaf-mandap.webp" alt="Gold Leaf Mandap" />
                          <span className="mega-card__tag">24K Gold Inlay</span>
                        </div>
                        <div className="mega-card__body">
                          <strong>Kashi Vishwanath Sanctum</strong>
                          <span>Nagara Shikhara Architecture</span>
                        </div>
                      </Link>

                      <Link href="/palatial-fountains" className="mega-card" onClick={() => setMegaMenuOpen(false)}>
                        <div className="mega-card__media">
                          <img src="/gallery/fountain-black-marquina-cascade.webp" alt="Nero Marquina Cascade" />
                          <span className="mega-card__tag">Estate Fountain</span>
                        </div>
                        <div className="mega-card__body">
                          <strong>Palatial Chateau Basin</strong>
                          <span>Calibrated Water Veils</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bottom Concierge Strip */}
                <div className="mega-menu__footer">
                  <div className="mega-footer-left">
                    <span className="pulse-dot"></span>
                    <span>Direct Concierge: <strong>+91 7597417274</strong> · Ateliers in Jaipur &amp; Makrana</span>
                  </div>
                  <Link href="/pooja-sanctums" className="mega-footer-link" onClick={() => setMegaMenuOpen(false)}>
                    <span>View Complete Masterpiece Catalog</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/atelier-workshop" className={pathname === '/atelier-workshop' ? 'is-active' : ''}>
            Our Workshop
          </Link>
          <Link href="/materials-guide" className={pathname === '/materials-guide' ? 'is-active' : ''}>
            Stone Guide
          </Link>
          <Link href="/contact" className={pathname === '/contact' ? 'is-active' : ''}>
            Contact &amp; Visit
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
            <span>Makrana Calcite Science</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/contact" className={`mob-link ${pathname === '/contact' ? 'is-active' : ''}`}>
            <span>Contact &amp; Studio Walkthrough</span>
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

'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ isScrolled: propIsScrolled, onOpenInquiry }) {
  const pathname = usePathname();
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setInternalScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = propIsScrolled !== undefined ? propIsScrolled : internalScrolled;

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
      <div className={`nav ${isScrolled ? 'nav--scrolled is-scrolled' : 'is-at-top'}`} id="nav">
        <Link href="/" className="logo" id="logo" aria-label="A.F.G Marble & Arts Home">
          <img
            src="/afg-logo.svg"
            alt="A.F.G Marble & Arts"
            className="logo__img"
            width={38}
            height={22}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/afg-logo.png';
            }}
          />
          <span className="logo__text">
            <span className="logo__name">A.F.G MARBLE &amp; ARTS</span>
            <span className="logo__sub">Makrana · Jaipur</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary Navigation">
          <Link href="/" className={pathname === '/' ? 'is-active' : ''}>
            Home
          </Link>

          {/* MASTER CREATIONS MEGA MENU */}
          <div
            className="nav__has-mega"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`nav__mega-trigger ${
                pathname.startsWith('/pooja') ||
                pathname.startsWith('/palatial') ||
                pathname.startsWith('/heritage') ||
                pathname.startsWith('/marble-deities') ||
                pathname.startsWith('/pietra') ||
                pathname.startsWith('/jaali')
                  ? 'is-active'
                  : ''
              }`}
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
                  {/* Column 1: Master Stoneworks */}
                  <div className="mega-menu__col">
                    <span className="mega-menu__header">01 MASTER STONEWORKS</span>
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
                        <Link href="/heritage-chhatris" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">03</span>
                          <div className="mega-item-info">
                            <strong>Royal Chhatris &amp; Pavilions</strong>
                            <span>Carved Ribbed Domes &amp; Gazebos</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/marble-deities" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">04</span>
                          <div className="mega-item-info">
                            <strong>Consecrated Marble Deities</strong>
                            <span>Single-Block Makrana Murti Carving</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/pietra-dura-inlay" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">05</span>
                          <div className="mega-item-info">
                            <strong>Pietra Dura Gemstone Inlay</strong>
                            <span>Taj Mahal Parchin Kari Art</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/jaali-screens" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">06</span>
                          <div className="mega-item-info">
                            <strong>Pierced Jaali Screens</strong>
                            <span>Lattice Partitions &amp; Facades</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Sacred Architecture & Craft */}
                  <div className="mega-menu__col">
                    <span className="mega-menu__header">02 SACRED ARCHITECTURE</span>
                    <ul className="mega-links-list">
                      <li>
                        <Link href="/ayadi-vastu-shastra" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">07</span>
                          <div className="mega-item-info">
                            <strong>Ayadi Vastu Architecture</strong>
                            <span>Sacred Formulas &amp; Proportions</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/atelier-workshop" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">08</span>
                          <div className="mega-item-info">
                            <strong>Silawat Guild Workshop</strong>
                            <span>5-Stage Hand-Carving Lineage</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/materials-guide" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">09</span>
                          <div className="mega-item-info">
                            <strong>Makrana Calcite Stone Guide</strong>
                            <span>99% Pure CaCO3 Bedrock Science</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/pre-assembly-trial" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">10</span>
                          <div className="mega-item-info">
                            <strong>100% Pre-Assembly Yard</strong>
                            <span>Dry Fitment &amp; Video Signoff</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/global-shipping" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">11</span>
                          <div className="mega-item-info">
                            <strong>Worldwide Crating &amp; Export</strong>
                            <span>ISPM-15 Crates &amp; White-Glove Setup</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Patron Services & Heritage */}
                  <div className="mega-menu__col">
                    <span className="mega-menu__header">03 PATRON SERVICES</span>
                    <ul className="mega-links-list">
                      <li>
                        <Link href="/bespoke-consultation" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">12</span>
                          <div className="mega-item-info">
                            <strong>3D CAD Space Consultation</strong>
                            <span>Custom Dimensions to Blueprint</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/pricing-guide" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">13</span>
                          <div className="mega-item-info">
                            <strong>Temple Pricing Guide</strong>
                            <span>Transparent Investment Breakdown</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/royal-projects" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">14</span>
                          <div className="mega-item-info">
                            <strong>Royal Heritage Portfolio</strong>
                            <span>Completed Global Landmark Projects</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/makrana-calcite-mine" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">15</span>
                          <div className="mega-item-info">
                            <strong>Quarry Science &amp; Purity</strong>
                            <span>Four Makrana Veins &amp; Lab Data</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/temple-maintenance-guide" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">16</span>
                          <div className="mega-item-info">
                            <strong>Temple Care &amp; Abhishek Guide</strong>
                            <span>Daily Ritual Protocols &amp; Upkeep</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/about-afg" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">17</span>
                          <div className="mega-item-info">
                            <strong>AFG Lineage Since 1987</strong>
                            <span>Four Decades of Sacred Artistry</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" onClick={() => setMegaMenuOpen(false)}>
                          <span className="mega-num">18</span>
                          <div className="mega-item-info">
                            <strong>Jaipur &amp; Makrana Studios</strong>
                            <span>Studio Walkthroughs &amp; Visits</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Featured Showcase Card */}
                  <div className="mega-menu__col-feature">
                    <span className="mega-menu__header">3D ATELIER BLUEPRINT</span>
                    <div className="mega-feature-card">
                      <div className="mega-feature-card__media">
                        <img src="/gallery/sanctum-peacock-arch.webp" alt="Sanctum 3D CAD Blueprint" />
                      </div>
                      <div className="mega-feature-card__body">
                        <h5>Bespoke 3D CAD Sanctum Blueprint</h5>
                        <p>Share your room dimensions down to the centimeter. Receive a consecrated Ayadi Vastu layout within 24 hours.</p>
                        <Link
                          href="/bespoke-consultation"
                          className="mega-feature-card__cta"
                          onClick={() => setMegaMenuOpen(false)}
                        >
                          Request Free 3D Layout →
                        </Link>
                      </div>
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
                    <span>Explore All 19 Architectural Portfolios</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/royal-projects" className={pathname === '/royal-projects' ? 'is-active' : ''}>
            Royal Projects
          </Link>
          <Link href="/ayadi-vastu-shastra" className={pathname === '/ayadi-vastu-shastra' ? 'is-active' : ''}>
            Ayadi Vastu
          </Link>
          <Link href="/atelier-workshop" className={pathname === '/atelier-workshop' ? 'is-active' : ''}>
            Our Workshop
          </Link>
          <Link href="/pricing-guide" className={pathname === '/pricing-guide' ? 'is-active' : ''}>
            Pricing Guide
          </Link>
          <Link href="/materials-guide" className={pathname === '/materials-guide' ? 'is-active' : ''}>
            Stone Library
          </Link>
          <Link href="/contact" className={pathname === '/contact' ? 'is-active' : ''}>
            Contact
          </Link>
        </nav>

        <div className="nav__right">
          <Link
            href="/bespoke-consultation"
            className="nav__cta-btn"
          >
            <span>Consult Atelier</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

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
      </div>

      {/* Luxury Mobile Dropdown Menu with Complete Directory */}
      <div className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`} id="mobile-menu" aria-hidden={!mobileOpen}>
        <div className="mobile-menu__links">
          <Link href="/" className={`mob-link ${pathname === '/' ? 'is-active' : ''}`}>
            <span>Home Experience</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>

          <div className="mobile-nav-group-title">Master Stoneworks</div>
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
          <Link href="/heritage-chhatris" className={`mob-link ${pathname === '/heritage-chhatris' ? 'is-active' : ''}`}>
            <span>Royal Chhatris &amp; Pavilions</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/marble-deities" className={`mob-link ${pathname === '/marble-deities' ? 'is-active' : ''}`}>
            <span>Consecrated Marble Deities</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/pietra-dura-inlay" className={`mob-link ${pathname === '/pietra-dura-inlay' ? 'is-active' : ''}`}>
            <span>Pietra Dura Gemstone Inlay</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/jaali-screens" className={`mob-link ${pathname === '/jaali-screens' ? 'is-active' : ''}`}>
            <span>Pierced Jaali Screens</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>

          <div className="mobile-nav-group-title">Sacred Architecture &amp; Craft</div>
          <Link href="/ayadi-vastu-shastra" className={`mob-link ${pathname === '/ayadi-vastu-shastra' ? 'is-active' : ''}`}>
            <span>Ayadi Vastu Architecture</span>
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
            <span>Makrana Calcite Stone Guide</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/pre-assembly-trial" className={`mob-link ${pathname === '/pre-assembly-trial' ? 'is-active' : ''}`}>
            <span>100% Pre-Assembly Yard</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/global-shipping" className={`mob-link ${pathname === '/global-shipping' ? 'is-active' : ''}`}>
            <span>Worldwide Crating &amp; Export</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>

          <div className="mobile-nav-group-title">Patron Services &amp; Heritage</div>
          <Link href="/bespoke-consultation" className={`mob-link ${pathname === '/bespoke-consultation' ? 'is-active' : ''}`}>
            <span>3D CAD Space Consultation</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/pricing-guide" className={`mob-link ${pathname === '/pricing-guide' ? 'is-active' : ''}`}>
            <span>Temple Pricing Guide</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/private-commissions" className={`mob-link ${pathname === '/private-commissions' ? 'is-active' : ''}`}>
            <span>Private Commissions</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/about-afg" className={`mob-link ${pathname === '/about-afg' ? 'is-active' : ''}`}>
            <span>About AFG Lineage Since 1987</span>
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
          <Link
            href="/bespoke-consultation"
            className="btn-primary w-full"
            style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
            onClick={() => setMobileOpen(false)}
          >
            <span className="btn-primary__text">Get Free Space Consultation</span>
            <span className="btn-primary__icon">→</span>
          </Link>
        </div>

        <div className="mobile-menu__legal">
          <Link href="/terms-and-conditions" onClick={() => setMobileOpen(false)}>Terms</Link>
          <span>·</span>
          <Link href="/privacy-policy" onClick={() => setMobileOpen(false)}>Privacy</Link>
          <span>·</span>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Jaipur &amp; Makrana</Link>
        </div>
      </div>
    </>
  );
}

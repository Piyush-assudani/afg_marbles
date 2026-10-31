'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// A.F.G Marble & Arts - Royal Bespoke Navbar (Validated 100% Clean JSX)
const MEGA_STONEWORKS = [
  {
    num: '01',
    title: 'Marble Mandirs & Temples',
    subtitle: 'Custom Home Temples',
    href: '/pooja-sanctums',
    badge: 'HOME TEMPLES',
    previewImage: '/gallery/img_7237.webp',
    previewTitle: 'Pure White Marble Temples',
    previewDesc: '100% pure Makrana white marble home temples with carved pillars, dome tops, and deity platforms.',
    ctaText: 'Explore Home Temples'
  },
  {
    num: '02',
    title: 'Palatial Cascading Fountains',
    subtitle: 'Garden & Lawn Fountains',
    href: '/palatial-fountains',
    badge: 'WATER FOUNTAINS',
    previewImage: '/gallery/fountain-palatial-estate-triple-tier-lawn.webp',
    previewTitle: 'Carved Marble Fountains',
    previewDesc: 'Carved from durable Rajnagar white marble. Specially built for continuous water flow in gardens and courtyards.',
    ctaText: 'Explore Fountains'
  },
  {
    num: '03',
    title: 'Royal Pavilions & Chhatris',
    subtitle: 'Carved Domes & Garden Gazebos',
    href: '/heritage-chhatris',
    badge: 'GARDEN PAVILIONS',
    previewImage: '/gallery/royal-chhatri-garden-pavilion.webp',
    previewTitle: 'Marble Garden Pavilions',
    previewDesc: 'Traditional Rajasthani carved marble pavilions with decorative pillars and domes for gardens and estates.',
    ctaText: 'Explore Pavilions'
  },
  {
    num: '04',
    title: 'Hand-Carved Marble Deities',
    subtitle: 'Pure White Makrana Murti Statues',
    href: '/marble-deities',
    badge: 'MARBLE IDOLS',
    previewImage: '/gallery/deity-radha-krishna-makrana-sculpture.webp',
    previewTitle: 'Marble Deities & Statues',
    previewDesc: 'Hand-sculpted by hereditary master stone carvers with lifelike facial expressions and sacred traditional proportions.',
    ctaText: 'Explore Sacred Deities'
  },
  {
    num: '05',
    title: 'Stone Inlay Art (Pietra Dura)',
    subtitle: 'Taj Mahal Floral Gem Inlay',
    href: '/pietra-dura-inlay',
    badge: 'GEMSTONE INLAY',
    previewImage: '/gallery/inlay-pietra-dura-peacock-medallion.webp',
    previewTitle: 'Gemstone Flower Inlay Art',
    previewDesc: 'Semi-precious natural colorful stones hand-inlaid into flawless Makrana pure white marble.',
    ctaText: 'Explore Inlay Art'
  },
  {
    num: '06',
    title: 'Carved Marble Jaali Screens',
    subtitle: 'Decorative Screen Partitions',
    href: '/jaali-screens',
    badge: 'MARBLE JAALIS',
    previewImage: '/gallery/jaali-geometric-hexagonal-lattice.webp',
    previewTitle: 'Carved Marble Jaalis',
    previewDesc: 'Floral and geometric pierced lattice screens for pooja room doors, room partitions, and windows.',
    ctaText: 'Explore Jaali Screens'
  }
];

const MEGA_ARCHITECTURE = [
  {
    num: '07',
    title: 'Temple Vastu Guide',
    subtitle: 'Vastu Proportions & Directions',
    href: '/ayadi-vastu-shastra',
    badge: 'VASTU SCIENCE',
    previewImage: '/gallery/sanctum-shikhara-amalaka-apex.webp',
    previewTitle: 'Temple Vastu Guide',
    previewDesc: 'Exact Vastu calculations to ensure your home temple brings lifelong spiritual peace, health, and prosperity.',
    ctaText: 'Read Vastu Guide'
  },
  {
    num: '08',
    title: 'Our Workshop & Carvers',
    subtitle: 'Master Stone Carvers Since 1987',
    href: '/atelier-workshop',
    badge: 'STONE WORKSHOP',
    previewImage: '/gallery/atelier-yard-preassembly.webp',
    previewTitle: 'Our Stone Carving Workshop',
    previewDesc: 'Meet our generational stone carvers shaping raw white marble blocks into timeless temples.',
    ctaText: 'Visit Our Workshop'
  },
  {
    num: '09',
    title: 'Makrana Marble Guide',
    subtitle: 'Why It Never Turns Yellow',
    href: '/materials-guide',
    badge: 'MARBLE QUALITY',
    previewImage: '/gallery/stone-makrana-calcite-slab.webp',
    previewTitle: '100% Pure Makrana Marble',
    previewDesc: '100% pure white marble that never absorbs oil or milk, never turns yellow, and stays bright forever.',
    ctaText: 'Read Marble Guide'
  },
  {
    num: '10',
    title: 'Pre-Delivery Workshop Trial',
    subtitle: 'Pre-Assembly & Video Inspection',
    href: '/pre-assembly-trial',
    badge: 'VIDEO CHECK',
    previewImage: '/gallery/yard-dryfit-raw-calcite-mandir.webp',
    previewTitle: 'Workshop Video Verification',
    previewDesc: 'Every temple is 100% test-assembled in our workshop with HD video review before packing.',
    ctaText: 'Learn How We Test'
  },
  {
    num: '11',
    title: 'Worldwide Safe Shipping',
    subtitle: 'Wooden Box Packing & Delivery',
    href: '/global-shipping',
    badge: 'SAFE DELIVERY',
    previewImage: '/gallery/atelier-ispm15-crating-export.webp',
    previewTitle: 'Safe Doorstep Delivery Everywhere',
    previewDesc: 'Heavy-duty wooden box packing with thick foam cushions and safe doorstep delivery across India and worldwide.',
    ctaText: 'View Delivery Details'
  },
  {
    num: '12',
    title: 'Temple Cleaning & Care',
    subtitle: 'Easy Cleaning for Daily Puja',
    href: '/temple-maintenance-guide',
    badge: 'CARE GUIDE',
    previewImage: '/gallery/sanctum-ambient-glow.webp',
    previewTitle: 'Daily Temple Care Guide',
    previewDesc: 'Easy instructions for daily milk, honey, diya oil, and incense smoke cleaning to keep your marble sparkling.',
    ctaText: 'Read Care Guide'
  }
];

const MEGA_SERVICES = [
  {
    num: '13',
    title: 'Free 2D Design Drawing',
    subtitle: 'Custom Drawings for Your Room',
    href: '/bespoke-consultation',
    badge: 'FREE 2D DRAWING',
    previewImage: '/gallery/mandir-temple-cad-plan.webp',
    previewTitle: 'Free 2D Design Drawing',
    previewDesc: 'Share your room measurements. Receive a clear 2D design drawing showing front and side views within 24 hours.',
    ctaText: 'Get Free Drawing'
  },
  {
    num: '14',
    title: 'Completed Temple Projects',
    subtitle: 'Real Photos from Client Homes',
    href: '/royal-projects',
    badge: 'COMPLETED PROJECTS',
    previewImage: '/gallery/fountain-courtyard-circular.webp',
    previewTitle: 'Our Completed Projects',
    previewDesc: 'Browse real photos of temples and fountains delivered and installed in homes across India and abroad.',
    ctaText: 'View Completed Projects'
  },
  {
    num: '15',
    title: 'Makrana Marble Quarry',
    subtitle: 'Natural Stone Purity & Mining',
    href: '/makrana-calcite-mine',
    badge: 'MARBLE MINES',
    previewImage: '/gallery/atelier-quarry-selection-block.webp',
    previewTitle: 'Makrana Marble Quarries',
    previewDesc: 'Natural white marble extracted directly from certified Makrana mines in Rajasthan.',
    ctaText: 'View Marble Mining'
  },
  {
    num: '16',
    title: 'About AFG Heritage',
    subtitle: 'Generational Stone Carvers Since 1987',
    href: '/about-afg',
    badge: 'FOUNDED 1987',
    previewImage: '/gallery/mandir-artisan-install.webp',
    previewTitle: 'Generational Stone Carvers',
    previewDesc: 'Four generations of traditional Rajasthani stone carvers making authentic marble temples.',
    ctaText: 'Read Our Story'
  },
  {
    num: '17',
    title: 'Visit Our Workshops',
    subtitle: 'Workshop Visits & Locations',
    href: '/contact',
    badge: 'VISIT WORKSHOP',
    previewImage: '/gallery/sanctum-royal-mandir-room.webp?v=purewhite',
    previewTitle: 'Visit Our Rajasthan Workshop',
    previewDesc: 'Visit our Makrana and Jaipur workshops to see temples being carved live and inspect raw marble blocks.',
    ctaText: 'Book Workshop Visit'
  }
];

export default function Navbar({ isScrolled: propIsScrolled, onOpenInquiry }) {
  const pathname = usePathname();
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState(MEGA_STONEWORKS[0]);
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
        <Link
          href="/"
          className="logo"
          id="logo"
          aria-label="A.F.G Marble And Art Home"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img
            src="/afg-logo.png"
            alt="A.F.G Marble And Art"
            className="logo__img"
            width={65}
            height={36}
          />
          <span className="logo__text">
            <span className="logo__name">A.F.G MARBLE AND ART</span>
            <span className="logo__sub">Crafting Divine Spaces In Marble</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary Navigation">
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
                      {MEGA_STONEWORKS.map((item) => (
                        <li key={item.num} onMouseEnter={() => setActivePreview(item)}>
                          <Link href={item.href} onClick={() => setMegaMenuOpen(false)}>
                            <span className="mega-num">{item.num}</span>
                            <div className="mega-item-info">
                              <strong>{item.title}</strong>
                              <span>{item.subtitle}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Sacred Architecture & Craft */}
                  <div className="mega-menu__col">
                    <span className="mega-menu__header">02 SACRED ARCHITECTURE</span>
                    <ul className="mega-links-list">
                      {MEGA_ARCHITECTURE.map((item) => (
                        <li key={item.num} onMouseEnter={() => setActivePreview(item)}>
                          <Link href={item.href} onClick={() => setMegaMenuOpen(false)}>
                            <span className="mega-num">{item.num}</span>
                            <div className="mega-item-info">
                              <strong>{item.title}</strong>
                              <span>{item.subtitle}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: Patron Services & Heritage */}
                  <div className="mega-menu__col">
                    <span className="mega-menu__header">03 PATRON SERVICES</span>
                    <ul className="mega-links-list">
                      {MEGA_SERVICES.map((item) => (
                        <li key={item.num} onMouseEnter={() => setActivePreview(item)}>
                          <Link href={item.href} onClick={() => setMegaMenuOpen(false)}>
                            <span className="mega-num">{item.num}</span>
                            <div className="mega-item-info">
                              <strong>{item.title}</strong>
                              <span>{item.subtitle}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 4: Dynamic Architectural Hover Preview Card */}
                  <div className="mega-menu__col-feature">
                    <span className="mega-menu__header">ARCHITECTURAL PREVIEW</span>
                    <div className="mega-feature-card">
                      <div
                        className="mega-feature-card__media"
                        onClick={() => {
                          if (typeof window !== 'undefined' && window.afgOpenLightbox) {
                            window.afgOpenLightbox({
                              src: activePreview.previewImage,
                              title: activePreview.previewTitle,
                              tag: activePreview.badge || 'ARCHITECTURAL PREVIEW'
                            });
                          }
                        }}
                        style={{ cursor: 'zoom-in', position: 'relative' }}
                      >
                        <img
                          key={activePreview.previewImage}
                          src={activePreview.previewImage}
                          alt={activePreview.previewTitle}
                          className="mega-preview-fade-img"
                        />
                        <span className="mega-feature-card__badge">{activePreview.badge}</span>

                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(26, 21, 16, 0.85)',
                            backdropFilter: 'blur(8px)',
                            color: '#edd7a8',
                            border: '1px solid rgba(212, 175, 55, 0.4)',
                            borderRadius: '999px',
                            padding: '3px 9px',
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            zIndex: 3,
                          }}
                        >
                          ✦ Zoom 4K
                        </span>
                      </div>
                      <div className="mega-feature-card__body">
                        <h5>{activePreview.previewTitle}</h5>
                        <p>{activePreview.previewDesc}</p>
                        <Link
                          href={activePreview.href}
                          className="mega-feature-card__cta"
                          onClick={() => setMegaMenuOpen(false)}
                        >
                          <span>{activePreview.ctaText || 'Explore Creation'}</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Concierge Strip */}
                <div className="mega-menu__footer">
                  <div className="mega-footer-left">
                    <span className="pulse-dot"></span>
                    <span>Direct Concierge: <strong>+91 7597417274</strong> · Master Atelier in Makrana, Rajasthan</span>
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
            Completed Projects
          </Link>
          <Link href="/atelier-workshop" className={pathname === '/atelier-workshop' ? 'is-active' : ''}>
            Our Workshop
          </Link>
          <Link href="/materials-guide" className={pathname === '/materials-guide' ? 'is-active' : ''}>
            Marble Guide
          </Link>
          <Link href="/contact" className={pathname === '/contact' ? 'is-active' : ''}>
            Contact Us
          </Link>
        </nav>

        <div className="nav__right">
          <Link
            href="/bespoke-consultation"
            className="nav__cta-btn"
          >
            <span>Get Free Design</span>
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

          <div className="mobile-nav-group-title">Our Marble Collections</div>
          <Link href="/pooja-sanctums" className={`mob-link ${pathname === '/pooja-sanctums' ? 'is-active' : ''}`}>
            <span>Marble Mandirs &amp; Temples</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/palatial-fountains" className={`mob-link ${pathname === '/palatial-fountains' ? 'is-active' : ''}`}>
            <span>Marble Water Fountains</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/heritage-chhatris" className={`mob-link ${pathname === '/heritage-chhatris' ? 'is-active' : ''}`}>
            <span>Marble Chhatris &amp; Pavilions</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/marble-deities" className={`mob-link ${pathname === '/marble-deities' ? 'is-active' : ''}`}>
            <span>Handmade Marble Murties</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/pietra-dura-inlay" className={`mob-link ${pathname === '/pietra-dura-inlay' ? 'is-active' : ''}`}>
            <span>Stone Inlay Work</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/jaali-screens" className={`mob-link ${pathname === '/jaali-screens' ? 'is-active' : ''}`}>
            <span>Carved Marble Jali Screens</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>

          <div className="mobile-nav-group-title">Marble Guides &amp; Quality</div>
          <Link href="/ayadi-vastu-shastra" className={`mob-link ${pathname === '/ayadi-vastu-shastra' ? 'is-active' : ''}`}>
            <span>Temple Vastu Guide</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/atelier-workshop" className={`mob-link ${pathname === '/atelier-workshop' ? 'is-active' : ''}`}>
            <span>Our Workshop &amp; Artisans</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/materials-guide" className={`mob-link ${pathname === '/materials-guide' ? 'is-active' : ''}`}>
            <span>Pure Marble Guide</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/pre-assembly-trial" className={`mob-link ${pathname === '/pre-assembly-trial' ? 'is-active' : ''}`}>
            <span>Full Setup Trial Check</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/global-shipping" className={`mob-link ${pathname === '/global-shipping' ? 'is-active' : ''}`}>
            <span>Safe Worldwide Delivery</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>

          <div className="mobile-nav-group-title">Custom Design &amp; About Us</div>
          <Link href="/bespoke-consultation" className={`mob-link ${pathname === '/bespoke-consultation' ? 'is-active' : ''}`}>
            <span>Free 2D Design Drawing</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/about-afg" className={`mob-link ${pathname === '/about-afg' ? 'is-active' : ''}`}>
            <span>About Our Workshop</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/private-commissions" className={`mob-link ${pathname === '/private-commissions' ? 'is-active' : ''}`}>
            <span>Completed Projects</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/about-afg" className={`mob-link ${pathname === '/about-afg' ? 'is-active' : ''}`}>
            <span>Our Story Since 1987</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/contact" className={`mob-link ${pathname === '/contact' ? 'is-active' : ''}`}>
            <span>Contact Us &amp; Workshop Visit</span>
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
            <span className="btn-primary__text">Get Free 2D Design Drawing</span>
            <span className="btn-primary__icon">→</span>
          </Link>
        </div>

        <div className="mobile-menu__legal">
          <Link href="/terms-and-conditions" onClick={() => setMobileOpen(false)}>Terms</Link>
          <span>·</span>
          <Link href="/privacy-policy" onClick={() => setMobileOpen(false)}>Privacy</Link>
          <span>·</span>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Makrana Workshop</Link>
        </div>
      </div>
    </>
  );
}

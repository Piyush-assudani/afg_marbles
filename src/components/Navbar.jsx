'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// A.F.G Marble & Arts - Royal Bespoke Navbar (Validated 100% Clean JSX)
const MEGA_STONEWORKS = [
  {
    num: '01',
    title: 'Pooja Rooms & Sanctums',
    subtitle: 'Sacred Mandirs & Home Shrines',
    href: '/pooja-sanctums',
    badge: 'FLAGSHIP SANCTUM',
    previewImage: '/gallery/img_7237.webp',
    previewTitle: 'Consecrated Pooja Sanctums',
    previewDesc: 'Monolithic pure Makrana calcite bedrock mandirs with multi-tier shikharas, carved toranas, and consecrated garbhagrihas.',
    ctaText: 'Explore Pooja Sanctums'
  },
  {
    num: '02',
    title: 'Palatial Estate Fountains',
    subtitle: 'Cascading Tiered Water Architecture',
    href: '/palatial-fountains',
    badge: 'WATER ARCHITECTURE',
    previewImage: '/gallery/fountain-palatial-estate-triple-tier-lawn.webp',
    previewTitle: 'Palatial Cascading Fountains',
    previewDesc: 'Carved from dense Rajnagar hydraulic white marble. Engineered for continuous water sheeting, zero algae, and freeze resilience.',
    ctaText: 'Explore Estate Fountains'
  },
  {
    num: '03',
    title: 'Royal Chhatris & Pavilions',
    subtitle: 'Carved Ribbed Domes & Gazebos',
    href: '/heritage-chhatris',
    badge: 'ROYAL HERITAGE',
    previewImage: '/gallery/royal-chhatri-garden-pavilion.webp',
    previewTitle: 'Imperial Rajput Chhatris',
    previewDesc: 'Monumental garden pavilions with monolithic fluted columns, cusped torana arches, and ribbed interlocking domes.',
    ctaText: 'Explore Royal Pavilions'
  },
  {
    num: '04',
    title: 'Consecrated Marble Deities',
    subtitle: 'Single-Block Makrana Murti Carving',
    href: '/marble-deities',
    badge: 'SACRED PRATISHTHA',
    previewImage: '/gallery/deity-radha-krishna-makrana-sculpture.webp',
    previewTitle: 'Consecrated Murti Statues',
    previewDesc: 'Hand-sculpted by hereditary Silawat murtikars adhering to sacred Vedic Shilpa Shastra facial and body iconometry.',
    ctaText: 'Explore Sacred Deities'
  },
  {
    num: '05',
    title: 'Pietra Dura Gemstone Inlay',
    subtitle: 'Taj Mahal Parchin Kari Art',
    href: '/pietra-dura-inlay',
    badge: 'PARCHIN KARI',
    previewImage: '/gallery/inlay-pietra-dura-peacock-medallion.webp',
    previewTitle: 'Imperial Gemstone Inlay',
    previewDesc: 'Semi-precious lapis lazuli, malachite, jasper, and mother-of-pearl micro-inlaid into flawless Makrana white marble.',
    ctaText: 'Explore Inlay Art'
  },
  {
    num: '06',
    title: 'Pierced Jaali Screens',
    subtitle: 'Lattice Partitions & Facades',
    href: '/jaali-screens',
    badge: 'ARCHITECTURAL LATTICE',
    previewImage: '/gallery/jaali-geometric-hexagonal-lattice.webp',
    previewTitle: 'Carved Marble Jaalis',
    previewDesc: 'Geometric, floral, and chevron pierced lattice screens for sacred room partitions, architectural ventilation, and light play.',
    ctaText: 'Explore Jaali Screens'
  }
];

const MEGA_ARCHITECTURE = [
  {
    num: '07',
    title: 'Ayadi Vastu Architecture',
    subtitle: 'Sacred Formulas & Proportions',
    href: '/ayadi-vastu-shastra',
    badge: 'STHAPATYA VEDA',
    previewImage: '/gallery/sanctum-shikhara-amalaka-apex.webp',
    previewTitle: 'Vedic Ayadi Calculations',
    previewDesc: 'Exact 6-formula Ayadi mathematical harmonics ensuring your sanctum dimensions bring lifelong spiritual peace and prosperity.',
    ctaText: 'Learn Ayadi Science'
  },
  {
    num: '08',
    title: 'Silawat Guild Workshop',
    subtitle: '5-Stage Hand-Carving Lineage',
    href: '/atelier-workshop',
    badge: 'MASTER GUILD',
    previewImage: '/gallery/atelier-yard-preassembly.webp',
    previewTitle: 'Silawat Carving Pavilion',
    previewDesc: 'Generational master stone-masons chiseling pure bedrock using sacred hand techniques passed down across four generations.',
    ctaText: 'Tour Makrana Atelier'
  },
  {
    num: '09',
    title: 'Makrana Calcite Stone Guide',
    subtitle: '99% Pure CaCO3 Bedrock Science',
    href: '/materials-guide',
    badge: 'CALCITE PURITY',
    previewImage: '/gallery/stone-makrana-calcite-slab.webp',
    previewTitle: 'Taj Mahal Marble Purity',
    previewDesc: '100% pure white Makrana marble. Completely stain-free, safe for daily milk and oil puja rituals, and never turns yellow.',
    ctaText: 'Inspect Stone Science'
  },
  {
    num: '10',
    title: '100% Pre-Assembly Yard',
    subtitle: 'Dry Fitment & Video Signoff',
    href: '/pre-assembly-trial',
    badge: 'VERIFIED DRY-FIT',
    previewImage: '/gallery/yard-dryfit-raw-calcite-mandir.webp',
    previewTitle: 'Makrana Fitment Verification',
    previewDesc: 'Every single component is 100% test-assembled in our Makrana yard with 4K video inspection and centimeter ruler signoff.',
    ctaText: 'Explore Yard Protocols'
  },
  {
    num: '11',
    title: 'Worldwide Crating & Export',
    subtitle: 'ISPM-15 Crates & White-Glove Setup',
    href: '/global-shipping',
    badge: 'GLOBAL LOGISTICS',
    previewImage: '/gallery/atelier-ispm15-crating-export.webp',
    previewTitle: 'Turnkey International Setup',
    previewDesc: 'Fumigated ISPM-15 pine crating with high-density EVA shock protection and door-to-door turnkey installation in 28+ nations.',
    ctaText: 'View Crating Details'
  },
  {
    num: '12',
    title: 'Temple Care & Abhishek Guide',
    subtitle: 'Daily Ritual Protocols & Upkeep',
    href: '/temple-maintenance-guide',
    badge: 'DEVOTIONAL CARE',
    previewImage: '/gallery/sanctum-ambient-glow.webp',
    previewTitle: 'Daily Sacred Ritual Guide',
    previewDesc: 'Master artisan protocols for daily milk, honey, panchamrit, and camphor aarti upkeep without dulling natural marble luster.',
    ctaText: 'Read Care Guide'
  }
];

const MEGA_SERVICES = [
  {
    num: '13',
    title: '2D CAD Space Consultation',
    subtitle: 'Custom Dimensions to Blueprint',
    href: '/bespoke-consultation',
    badge: '2D BLUEPRINT DESK',
    previewImage: '/gallery/mandir-temple-cad-plan.webp',
    previewTitle: 'Bespoke 2D CAD Blueprint',
    previewDesc: 'Share your room dimensions down to the centimeter. Receive a custom 2D architectural elevation blueprint within 24 hours.',
    ctaText: 'Request Free 2D Layout'
  },
  {
    num: '14',
    title: 'Royal Heritage Portfolio',
    subtitle: 'Completed Global Landmark Projects',
    href: '/royal-projects',
    badge: 'LANDMARK COMMISSIONS',
    previewImage: '/gallery/fountain-courtyard-circular.webp',
    previewTitle: 'Royal Private Commissions',
    previewDesc: 'Completed landmark palace fountains, private estate sanctums, and heritage monuments across London, Dubai, and India.',
    ctaText: 'Explore Portfolio'
  },
  {
    num: '15',
    title: 'Quarry Science & Purity',
    subtitle: 'Four Makrana Veins & Lab Data',
    href: '/makrana-calcite-mine',
    badge: 'SUBTERRANEAN MINES',
    previewImage: '/gallery/atelier-quarry-selection-block.webp',
    previewTitle: 'Chak Dungri & Albeta Mines',
    previewDesc: '350ft subterranean bedrock extraction in Makrana, Rajasthan with certified ultrasonic pulse velocity laboratory readings.',
    ctaText: 'Inspect Quarry Veins'
  },
  {
    num: '16',
    title: 'About AFG Guild Heritage',
    subtitle: 'Generational Silawat Master Artisans',
    href: '/about-afg',
    badge: 'FOUNDED 1987',
    previewImage: '/gallery/mandir-artisan-install.webp',
    previewTitle: 'Four Generations of Silawats',
    previewDesc: 'Living lineage of traditional stone-carvers preserving sovereign Indian temple architecture and sacred marble carving craft.',
    ctaText: 'Read Our Story'
  },
  {
    num: '17',
    title: 'Makrana Master Studios',
    subtitle: 'Studio Walkthroughs & Visits',
    href: '/contact',
    badge: 'VISIT ATELIER',
    previewImage: '/gallery/sanctum-royal-mandir-room.webp?v=purewhite',
    previewTitle: 'Visit Our Rajasthan Ateliers',
    previewDesc: 'Schedule a private patron walkthrough in Makrana or Makrana to inspect live pre-assembly dry-fits and raw bedrock blocks.',
    ctaText: 'Book Private Visit'
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
            Royal Projects
          </Link>
          <Link href="/atelier-workshop" className={pathname === '/atelier-workshop' ? 'is-active' : ''}>
            Atelier Yard
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
            <span>2D CAD Space Consultation</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link href="/about-afg" className={`mob-link ${pathname === '/about-afg' ? 'is-active' : ''}`}>
            <span>About AFG Guild</span>
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
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Makrana Atelier</Link>
        </div>
      </div>
    </>
  );
}

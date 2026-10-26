'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, MessageSquare } from 'lucide-react';

const SUGGESTIONS = [
  { title: 'Home Pooja Sanctums & Mandirs', href: '/pooja-sanctums', desc: 'Monolithic pure Makrana calcite sacred temples.' },
  { title: 'Palatial Cascading Fountains', href: '/palatial-fountains', desc: 'Dense hydraulic Rajnagar marble estate watercraft.' },
  { title: 'Royal Heritage Chhatris', href: '/heritage-chhatris', desc: 'Monumental Rajput garden pavilions & cupolas.' },
  { title: 'Consecrated Deities (Murtis)', href: '/marble-deities', desc: 'Vedic Shilpa Shastra single-block deity murtis.' },
  { title: 'Pierced Jaali Lattice Screens', href: '/jaali-screens', desc: 'Hand-carved marble screens for mandirs & light play.' },
  { title: 'Pietra Dura Gemstone Inlay', href: '/pietra-dura-inlay', desc: 'Taj Mahal semi-precious lapidary parchin kari.' },
  { title: '2D CAD Space Consultation', href: '/bespoke-consultation', desc: 'Custom pooja space dimensions to CAD elevation.' },
  { title: 'Landmark Heritage Portfolio', href: '/royal-projects', desc: 'Completed palatial commissions across 28+ nations.' },
];

export default function NotFound() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname.toLowerCase();

    // Auto-redirect if URL contains strong intent
    let target = null;
    if (path.includes('mandir') || path.includes('temple') || path.includes('sanctum') || path.includes('pooja')) {
      target = '/pooja-sanctums';
    } else if (path.includes('fountain') || path.includes('water')) {
      target = '/palatial-fountains';
    } else if (path.includes('chhatri') || path.includes('pavilion')) {
      target = '/heritage-chhatris';
    } else if (path.includes('murti') || path.includes('deity') || path.includes('idol')) {
      target = '/marble-deities';
    } else if (path.includes('cad') || path.includes('consult') || path.includes('bespoke')) {
      target = '/bespoke-consultation';
    } else if (path.includes('project') || path.includes('work') || path.includes('portfolio') || path.includes('gallery')) {
      target = '/royal-projects';
    } else if (path.includes('stone') || path.includes('material') || path.includes('calcite')) {
      target = '/materials-guide';
    } else if (path.includes('yard') || path.includes('feed') || path.includes('assembly')) {
      target = '/pre-assembly-trial';
    } else if (path.includes('contact') || path.includes('visit') || path.includes('location')) {
      target = '/contact';
    }

    if (target && target !== path) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        window.location.replace(target);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(60px, 8vw, 100px) 20px',
        background: 'linear-gradient(180deg, #fdfbf7 0%, #f6f1e7 100%)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '820px',
          width: '100%',
          background: '#ffffff',
          padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 44px)',
          borderRadius: '24px',
          border: '1.5px solid rgba(197, 160, 89, 0.35)',
          boxShadow: '0 25px 70px rgba(28, 24, 19, 0.08), 0 4px 14px rgba(0, 0, 0, 0.03)',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#b08a4f',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '10px',
          }}
        >
          <Compass size={14} />
          A.F.G MARBLE &amp; ARTS · ARCHITECTURAL DIRECTORY
        </span>

        <h1
          style={{
            fontFamily: 'var(--serif, serif)',
            fontSize: 'clamp(28px, 3.8vw, 42px)',
            color: '#1c1813',
            marginBottom: '12px',
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          {redirecting ? 'Guiding You to the Sanctuary...' : 'Commission Dossier Not Found'}
        </h1>

        <p
          style={{
            fontSize: '14.5px',
            color: '#6b5f52',
            lineHeight: 1.65,
            maxWidth: '620px',
            margin: '0 auto 34px',
          }}
        >
          {redirecting
            ? 'We detected your desired architectural collection and are redirecting you now.'
            : 'The specific URL or commission link requested is no longer at this address. Please explore our verified royal collections below or speak directly with our Senior Sthapati.'}
        </p>

        {/* Directory grid of active collections */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
            textAlign: 'left',
            marginBottom: '36px',
          }}
        >
          {SUGGESTIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '16px 18px',
                borderRadius: '12px',
                background: '#faf7f0',
                border: '1px solid rgba(197, 160, 89, 0.22)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.borderColor = '#c5a059';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(197, 160, 89, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#faf7f0';
                e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.22)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '13.5px', color: '#1c1813' }}>{item.title}</strong>
                <ArrowRight size={13} color="#b08a4f" />
              </div>
              <span style={{ fontSize: '11.5px', color: '#7a7065', lineHeight: 1.4, display: 'block' }}>
                {item.desc}
              </span>
            </Link>
          ))}
        </div>

        {/* Primary CTA Buttons */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link
            href="/"
            className="btn-primary"
            style={{
              padding: '14px 28px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <span className="btn-primary__text">Return to Sanctuary Home</span>
            <span className="btn-primary__icon">→</span>
          </Link>

          <a
            href="https://wa.me/917597417274?text=Namaste%20AFG%20Marble,%20I%20was%20looking%20for%20a%20specific%20marble%20design%20on%20your%20website%20and%20need%20assistance."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 26px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
            }}
          >
            <MessageSquare size={16} />
            <span>Ask Sthapati on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}


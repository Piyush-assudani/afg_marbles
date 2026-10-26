'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('afg_cookie_consent');
      if (!stored) {
        // Show after a subtle delay for optimal page experience
        const timer = setTimeout(() => setVisible(true), 1400);
        return () => clearTimeout(timer);
      }
    } catch (e) {}

    // Allow re-opening via footer or settings link
    if (typeof window !== 'undefined') {
      window.afgOpenCookieSettings = () => {
        setVisible(true);
        setPreferencesOpen(true);
      };
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('afg_cookie_consent', JSON.stringify({
        essential: true,
        analytics: true,
        vastuCalculator: true,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
    setVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem('afg_cookie_consent', JSON.stringify({
        essential: true,
        analytics: false,
        vastuCalculator: true,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      className="cookie-consent-capsule"
      aria-label="Patron Privacy & Cookie Charter"
      role="region"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        maxWidth: '460px',
        width: 'calc(100vw - 36px)',
        zIndex: 2990,
        background: 'rgba(16, 13, 10, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(197, 160, 89, 0.38)',
        borderRadius: '16px',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55), 0 2px 10px rgba(197, 160, 89, 0.1)',
        padding: '22px 24px',
        color: '#f5efe6',
        animation: 'cookieSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        @keyframes cookieSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#c5a059', display: 'grid', placeItems: 'center' }}>
            <ShieldCheck size={18} />
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#c5a059'
          }}>
            Patron Privacy &amp; Cookies
          </span>
        </div>

        <button
          type="button"
          onClick={handleAcceptEssential}
          aria-label="Close cookie notice"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#9e9080',
            cursor: 'pointer',
            padding: '4px',
            display: 'grid',
            placeItems: 'center',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9e9080')}
        >
          <X size={16} />
        </button>
      </div>

      {/* Body Copy */}
      <p style={{
        fontSize: '12.5px',
        lineHeight: 1.6,
        color: '#d4c8b8',
        margin: '0 0 14px'
      }}>
        We utilize essential encryption and strictly anonymous cookies to calculate sacred Ayadi Vastu dimensional formulas, preserve your bespoke stone selections, and enable direct Sthapati consultations. We never deploy commercial marketing trackers or sell patron data.
      </p>

      {/* Privacy Links */}
      <div style={{
        display: 'flex',
        gap: '12px',
        fontSize: '11px',
        color: '#a09080',
        marginBottom: '16px',
        flexWrap: 'wrap'
      }}>
        <Link href="/privacy-policy" style={{ color: '#c5a059', textDecoration: 'underline' }}>
          Patron Confidentiality Charter
        </Link>
        <span>·</span>
        <Link href="/terms-and-conditions" style={{ color: '#c5a059', textDecoration: 'underline' }}>
          Terms of Commission
        </Link>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          type="button"
          onClick={handleAcceptAll}
          style={{
            flex: '1 1 140px',
            padding: '10px 18px',
            background: 'linear-gradient(135deg, #c5a059 0%, #9e7d3d 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(197, 160, 89, 0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Accept All
        </button>

        <button
          type="button"
          onClick={handleAcceptEssential}
          style={{
            flex: '1 1 120px',
            padding: '9px 16px',
            background: 'transparent',
            color: '#e5ded5',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.borderColor = '#c5a059';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.4)';
          }}
        >
          Essential Only
        </button>
      </div>
    </aside>
  );
}

'use client';

export default function QuickDock({ onOpenInquiry }) {
  return (
    <div className="floating-quick-dock">
      <a
        href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20to%20consult%20with%20your%20Master%20Sthapati%20for%20a%20bespoke%20marble%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="dock-item dock-whatsapp"
        title="WhatsApp Atelier"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
        </svg>
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        className="dock-item dock-inquiry"
        onClick={() => onOpenInquiry?.({ title: 'Bespoke Space Consultation' })}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>Consult Sthapati</span>
      </button>

      <a href="tel:+917597417274" className="dock-item dock-call" title="Call Atelier">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span>Call</span>
      </a>
    </div>
  );
}

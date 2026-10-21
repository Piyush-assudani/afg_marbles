'use client';

export default function QuickDock() {
  const whatsappUrl =
    'https://wa.me/917597417274?text=Namaste%20AFG%20Marble%2C%20I%20would%20like%20to%20consult%20with%20your%20Master%20Sthapati%20for%20a%20bespoke%20marble%20project.';

  return (
    <aside aria-label="Direct WhatsApp Atelier Access" className="floating-whatsapp-container">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Chat directly on WhatsApp with Master Sthapati"
        title="Chat on WhatsApp (+91 75974 17274)"
      >
        {/* Pulsing radar ripple rings */}
        <span className="wa-pulse-ring" aria-hidden="true" />
        <span className="wa-pulse-ring wa-pulse-ring--delay" aria-hidden="true" />

        {/* Official WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="#ffffff"
          aria-hidden="true"
          className="wa-icon"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM17.47 16.5c-.24.67-1.39 1.28-1.94 1.36-.51.07-1.04.12-2.98-.68-2.47-1.03-4.06-3.55-4.18-3.72-.12-.16-1-1.33-1-2.55 0-1.21.63-1.81.86-2.06.22-.25.49-.31.66-.31.17 0 .33 0 .47.01.16.01.37-.06.58.45.22.52.74 1.79.8 1.92.06.13.11.29.02.46-.08.17-.13.28-.26.43-.13.15-.27.33-.39.45-.13.13-.26.27-.11.53.15.26.67 1.1 1.43 1.78.99.88 1.82 1.15 2.08 1.28.26.13.41.11.56-.06.15-.17.65-.75.82-1.01.17-.26.35-.22.58-.13.24.09 1.5.71 1.76.84.26.13.43.19.49.3.06.11.06.62-.18 1.29z" />
        </svg>

        {/* Floating Tooltip Label on Hover / Desktop */}
        <span className="wa-tooltip">
          <span>Inquire on WhatsApp</span>
        </span>
      </a>
    </aside>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';

export default function ImageLightbox({ image, onClose }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!image) return null;

  const src = typeof image === 'string' ? image : image.src;
  const title = typeof image === 'string' ? 'Atelier Architectural View' : image.title || image.caption || image.alt || 'Atelier Architectural View';
  const tag = typeof image === 'string' ? '4K RESOLUTION' : image.tag || image.badge || '4K ARCHITECTURAL DETAIL';

  const zoomIn = (e) => {
    e?.stopPropagation();
    setScale((prev) => Math.min(prev + 0.4, 3));
  };

  const zoomOut = (e) => {
    e?.stopPropagation();
    setScale((prev) => Math.max(prev - 0.4, 0.8));
  };

  const resetZoom = (e) => {
    e?.stopPropagation();
    setScale(1);
  };

  return (
    <div
      className="afg-lightbox-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(9, 7, 5, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeInBackdrop 0.25s ease forwards',
      }}
    >
      {/* Top Floating Controls Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          pointerEvents: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              background: 'rgba(212, 175, 55, 0.18)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: '#ecd39b',
              fontSize: '11px',
              fontWeight: 700,
              padding: '5px 12px',
              borderRadius: '999px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {tag}
          </span>
          <span
            style={{
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'var(--serif, serif)',
              maxWidth: '60vw',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </span>
        </div>

        {/* Zoom & Close Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={zoomIn}
            title="Zoom In"
            aria-label="Zoom In"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(28, 24, 19, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <ZoomIn size={16} />
          </button>

          <button
            type="button"
            onClick={zoomOut}
            title="Zoom Out"
            aria-label="Zoom Out"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(28, 24, 19, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <ZoomOut size={16} />
          </button>

          <button
            type="button"
            onClick={resetZoom}
            title="Reset Zoom"
            aria-label="Reset Zoom"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(28, 24, 19, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Maximize2 size={15} />
          </button>

          <button
            type="button"
            onClick={onClose}
            title="Close Fullscreen (Esc)"
            aria-label="Close Fullscreen"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.95)',
              border: 'none',
              color: '#14110e',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginLeft: '6px',
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Fullscreen Stage */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: scale > 1 ? 'grab' : 'zoom-in',
        }}
        onClick={scale === 1 ? zoomIn : resetZoom}
      >
        <img
          src={src}
          alt={title}
          style={{
            maxWidth: '92vw',
            maxHeight: '84vh',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(212, 175, 55, 0.3)',
            transform: `scale(${scale})`,
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Bottom Hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          color: 'rgba(255, 255, 255, 0.55)',
          fontSize: '11.5px',
          letterSpacing: '0.04em',
          pointerEvents: 'none',
        }}
      >
        Click to zoom · Press [Esc] to exit fullscreen
      </div>
    </div>
  );
}

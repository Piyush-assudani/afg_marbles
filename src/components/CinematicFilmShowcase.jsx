'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Maximize2, ArrowRight, Sparkles } from 'lucide-react';

export default function CinematicFilmShowcase({ onOpenInquiry }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // When switching between desktop and mobile source, reload video seamlessly
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isMobile]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  const handleInquiry = () => {
    const productData = {
      title: 'Custom White Marble Temple Design',
      image: isMobile ? '/videos/poster-mobile.jpg' : '/videos/poster-desktop.jpg',
      stone: '100% Pure Makrana White Marble',
    };
    if (typeof window !== 'undefined' && window.afgOpenInquiry) {
      window.afgOpenInquiry(productData);
    } else {
      onOpenInquiry?.(productData);
    }
  };

  return (
    <section
      className="sec-cinematic-film"
      id="cinematic-showcase"
      aria-label="4K Fullscreen Cinematic Atelier Immersion"
      style={{
        position: 'relative',
        width: '100%',
        background: '#090806',
        padding: 0,
        margin: 0,
        overflow: 'hidden',
        borderTop: '2px solid rgba(197, 160, 89, 0.35)',
        borderBottom: '2px solid rgba(197, 160, 89, 0.35)',
        zIndex: 5
      }}
    >
      {/* Full-bleed edge-to-edge video canvas */}
      <div
        className="cinematic-video-fullbleed"
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '100svh' : 'min(90vh, 820px)',
          minHeight: isMobile ? '560px' : '520px',
          background: '#090806',
          overflow: 'hidden'
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={isMobile ? '/videos/poster-mobile.jpg' : '/videos/poster-desktop.jpg'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
          }}
        >
          <source
            src={isMobile ? '/videos/afg-cinematic-mobile.mp4' : '/videos/afg-cinematic-desktop.mp4'}
            type="video/mp4"
          />
        </video>

        {/* Ambient Top & Bottom Vignettes for text contrast */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10, 8, 6, 0.72) 0%, rgba(10, 8, 6, 0.04) 28%, rgba(10, 8, 6, 0.08) 60%, rgba(10, 8, 6, 0.88) 100%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Top Header Floating Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(20px, 3.5vw, 36px)',
            left: 'clamp(16px, 3.5vw, 40px)',
            right: 'clamp(16px, 3.5vw, 40px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 4
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'rgba(14, 11, 8, 0.82)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                borderRadius: '999px',
                color: '#edd7a8',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: '10px'
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#25D366', display: 'inline-block' }} />
              <span>WORKSHOP VIDEO · REAL MARBLE CRAFTSMANSHIP</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(22px, 3.2vw, 36px)',
                fontWeight: 500,
                color: '#ffffff',
                lineHeight: 1.25,
                margin: '0 0 6px',
                textShadow: '0 2px 18px rgba(0,0,0,0.85)'
              }}
            >
              Handcrafted in Pure White Makrana Marble
            </h2>

            <p
              style={{
                fontSize: 'clamp(12px, 1.4vw, 14px)',
                color: '#e4d8c8',
                margin: 0,
                lineHeight: 1.5,
                textShadow: '0 2px 12px rgba(0,0,0,0.85)',
                display: isMobile ? 'none' : 'block'
              }}
            >
              From natural Makrana marble blocks to hand-carved home temples and garden water fountains.
            </p>
          </div>

          <button
            type="button"
            onClick={handleFullscreen}
            aria-label="Fullscreen Video"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(14, 11, 8, 0.82)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              transition: 'transform 0.2s, background 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Maximize2 size={17} />
          </button>
        </div>

        {/* Bottom Floating Control Bar (Mute button removed) */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(20px, 3.5vw, 36px)',
            left: 'clamp(16px, 3.5vw, 40px)',
            right: 'clamp(16px, 3.5vw, 40px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            zIndex: 4
          }}
        >
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '999px',
              background: 'rgba(14, 11, 8, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
            }}
          >
            {isPlaying ? <Pause size={14} color="#edd7a8" /> : <Play size={14} color="#edd7a8" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          {/* Direct WhatsApp Consultation CTA */}
          <button
            type="button"
            onClick={handleInquiry}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 24px',
              background: 'linear-gradient(135deg, #c5a059 0%, #9e7935 100%)',
              color: '#120f0a',
              border: 'none',
              borderRadius: '999px',
              fontSize: '12.5px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(197, 160, 89, 0.45)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span>Get Price &amp; Details for a Temple Like This</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

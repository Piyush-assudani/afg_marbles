'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function CinematicFilmShowcase({ onOpenInquiry }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
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
        // Autoplay policy fallback
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

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
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
      title: 'Bespoke Imperial Temple Commission',
      image: isMobile ? '/videos/poster-mobile.jpg' : '/videos/poster-desktop.jpg',
      stone: 'Makrana Pure White Calcite Bedrock',
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
      aria-label="4K Cinematic Atelier Immersion"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #0e0c09 0%, #15110d 50%, #0d0b09 100%)',
        padding: 'clamp(50px, 7vw, 90px) 0',
        borderTop: '1px solid rgba(197, 160, 89, 0.25)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.25)',
        overflow: 'hidden',
        zIndex: 5
      }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      <div className="sec-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'rgba(197, 160, 89, 0.12)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              borderRadius: '999px',
              color: '#edd7a8',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            <Sparkles size={13} color="#d4af37" />
            <span>ATELIER ARCHIVES · 4K CINEMATIC IMMERSION</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(26px, 3.8vw, 44px)',
              fontWeight: 500,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.22,
              margin: '0 0 14px'
            }}
          >
            Sacred Devotion, Sculpted In Pure Eternal Marble
          </h2>

          <p
            style={{
              fontSize: 'clamp(13px, 1.6vw, 15px)',
              color: '#c2b4a3',
              lineHeight: 1.7,
              margin: '0 auto',
              maxWidth: '680px'
            }}
          >
            From virgin Makrana bedrock quarry blocks to monumental shikhar temples and palatial villa sanctums. Experience the living sacred artistry of generational Silawat master sculptors.
          </p>
        </div>

        {/* Video Frame Capsule */}
        <div
          className="cinematic-video-frame"
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1.5px solid rgba(197, 160, 89, 0.45)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(197, 160, 89, 0.15)',
            background: '#0a0806',
            maxWidth: isMobile ? '460px' : '1100px',
            margin: '0 auto',
            aspectRatio: isMobile ? '9 / 16' : '16 / 9',
            maxHeight: isMobile ? '80vh' : 'auto'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            poster={isMobile ? '/videos/poster-mobile.jpg' : '/videos/poster-desktop.jpg'}
            onLoadedData={() => setVideoLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'opacity 0.4s ease'
            }}
          >
            <source
              src={isMobile ? '/videos/afg-cinematic-mobile.mp4' : '/videos/afg-cinematic-desktop.mp4'}
              type="video/mp4"
            />
          </video>

          {/* Top Floating Hallmarks Bar */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 3
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'rgba(14, 11, 8, 0.78)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                borderRadius: '999px',
                color: '#ecd39b',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em'
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#25D366', display: 'inline-block' }} />
              <span>4K CINEMATIC REEL · 100% PURE CALCITE</span>
            </div>

            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Fullscreen Video"
              style={{
                pointerEvents: 'auto',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(14, 11, 8, 0.78)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                color: '#ffffff',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.2s'
              }}
            >
              <Maximize2 size={15} />
            </button>
          </div>

          {/* Bottom Floating Control Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              zIndex: 3
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '999px',
                  background: 'rgba(14, 11, 8, 0.82)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  color: '#ffffff',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? <Pause size={13} color="#edd7a8" /> : <Play size={13} color="#edd7a8" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(14, 11, 8, 0.82)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  color: '#edd7a8',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer'
                }}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>

            <button
              type="button"
              onClick={handleInquiry}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                background: 'linear-gradient(135deg, #c5a059 0%, #9e7935 100%)',
                color: '#120f0a',
                border: 'none',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(197, 160, 89, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <span>Commission A Sanctum Like This</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Triple Hallmark Footer Ribbon Below Video */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '18px',
            maxWidth: '1100px',
            margin: '28px auto 0',
            padding: '18px 24px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(197, 160, 89, 0.22)',
            borderRadius: '14px'
          }}
        >
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: '#d4af37' }}>✦</span>
            <span style={{ fontSize: '12.5px', color: '#c7b9a5' }}>
              <strong style={{ color: '#ffffff' }}>100% Calcite Bedrock:</strong> Certified Taj Mahal vein from Makrana quarries.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: '#d4af37' }}>✦</span>
            <span style={{ fontSize: '12.5px', color: '#c7b9a5' }}>
              <strong style={{ color: '#ffffff' }}>Full Yard Pre-Assembly:</strong> Dry-joint erect trial in Jaipur before freight dispatch.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: '#d4af37' }}>✦</span>
            <span style={{ fontSize: '12.5px', color: '#c7b9a5' }}>
              <strong style={{ color: '#ffffff' }}>Turnkey Installation:</strong> Master artisan sthapati dispatch across 28+ nations.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

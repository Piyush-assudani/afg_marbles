'use client';
import { useState, useRef, useEffect } from 'react';

export default function AtelierSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const intervalRef = useRef(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    audioCtxRef.current = ctx;
    masterGainRef.current = masterGain;
  };

  // Play a soft sacred bell resonance (432 Hz harmonic scale)
  const playSacredBell = (freq = 432) => {
    if (!audioCtxRef.current || !isPlaying) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Exponential acoustic decay
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

    osc.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start();
    osc.stop(ctx.currentTime + 3.3);
  };

  // Play subtle stone chisel strike
  const playChiselStrike = () => {
    if (!audioCtxRef.current || !isPlaying) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1250, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  };

  const toggleSound = () => {
    initAudio();
    if (!audioCtxRef.current) return;

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (nextState) {
      // Trigger initial pleasant bell
      playSacredBell(432);

      // Loop meditative sequence: occasional gentle bell and chisel rhythm
      let beat = 0;
      intervalRef.current = setInterval(() => {
        beat = (beat + 1) % 12;
        if (beat === 0) playSacredBell(432); // Root
        if (beat === 6) playSacredBell(540); // Fifth harmonic
        if (beat % 2 === 0) playChiselStrike(); // Rhythmic chisel
      }, 1400);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <div className="atelier-soundscape-widget" style={{
      position: 'fixed',
      bottom: '90px',
      left: '20px',
      zIndex: 900,
      pointerEvents: 'auto'
    }}>
      <button
        type="button"
        onClick={toggleSound}
        aria-label="Toggle Devotional Atelier Soundscape"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          borderRadius: '999px',
          background: isPlaying ? 'linear-gradient(135deg, #1c1813 0%, #2e261d 100%)' : 'rgba(255, 255, 255, 0.92)',
          border: isPlaying ? '1px solid #b08a4f' : '1px solid rgba(184, 134, 63, 0.35)',
          color: isPlaying ? '#ecd39b' : '#3c3227',
          boxShadow: isPlaying ? '0 8px 24px rgba(176, 138, 79, 0.3)' : '0 6px 18px rgba(28, 24, 19, 0.1)',
          backdropFilter: 'blur(16px)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        {/* Animated equalizer waves when playing */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '14px' }}>
          <span style={{
            width: '2.5px',
            height: isPlaying ? '12px' : '4px',
            background: isPlaying ? '#ecd39b' : '#88542c',
            borderRadius: '2px',
            animation: isPlaying ? 'soundWave 0.8s ease-in-out infinite alternate' : 'none'
          }}></span>
          <span style={{
            width: '2.5px',
            height: isPlaying ? '14px' : '8px',
            background: isPlaying ? '#ecd39b' : '#88542c',
            borderRadius: '2px',
            animation: isPlaying ? 'soundWave 1.1s ease-in-out infinite alternate 0.2s' : 'none'
          }}></span>
          <span style={{
            width: '2.5px',
            height: isPlaying ? '10px' : '5px',
            background: isPlaying ? '#ecd39b' : '#88542c',
            borderRadius: '2px',
            animation: isPlaying ? 'soundWave 0.7s ease-in-out infinite alternate 0.4s' : 'none'
          }}></span>
        </div>

        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {isPlaying ? 'Sacred Ambience' : 'Atelier Rhythm'}
        </span>
      </button>

      <style jsx>{`
        @keyframes soundWave {
          0% { height: 4px; }
          100% { height: 14px; }
        }
      `}</style>
    </div>
  );
}

export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'radial-gradient(ellipse at 50% 45%, #ffffff 0%, #faf8f5 65%, #f4ece1 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Loading A.F.G Marble Atelier"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <img
          src="/afg-logo.svg"
          alt="A.F.G Marble And Art"
          style={{ width: '90px', height: 'auto', marginBottom: '22px', display: 'block' }}
        />

        {/* Minimalist Dual-Ring Luxury Loader */}
        <div
          style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px solid rgba(184, 134, 63, 0.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#c59d5f',
              borderRightColor: '#b8863f',
              animation: 'afgRouteSpin 0.9s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite',
            }}
          />
        </div>

        <span
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#8c6023',
            marginBottom: '4px',
          }}
        >
          A.F.G MARBLE &amp; ART
        </span>

        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '12px',
            color: '#7a6a58',
            letterSpacing: '0.04em',
          }}
        >
          Crafting Divine Spaces In Marble
        </span>
      </div>

      <style>{`
        @keyframes afgRouteSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}


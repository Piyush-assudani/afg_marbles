'use client';
import { useState } from 'react';

const STYLES = [
  {
    id: 'nagara',
    name: 'Imperial Nagara Shikhara',
    subtitle: 'Towering Multi-Spire Temple with Amalaka & Swarna Kalash',
    image: '/gallery/mandir-gold-leaf-mandap.webp',
    baseWeight: 3200,
    hours: 680,
    vastuScore: 99,
    yoni: 'Dhwaja (North - Ultimate Sovereignty)',
    description: 'Classical North Indian sacred architecture with stepped curvilinear shikhara, carved toran archways, and consecrated central sanctum.'
  },
  {
    id: 'haveli',
    name: 'Palatial Peacock Mandapam',
    subtitle: 'Fluted Monolith Pillars with Jharokha Arches & Floral Friezes',
    image: '/gallery/sanctum-peacock-arch.webp',
    baseWeight: 2650,
    hours: 540,
    vastuScore: 98,
    yoni: 'Simha (East - Fearless Victory & Wealth)',
    description: 'Inspired by Rajput royal palaces of Jaipur & Udaipur. Features deep undercut peacock brackets, tiered pedestals, and concealed brass runners.'
  },
  {
    id: 'contemporary',
    name: 'Modern Villa Sanctum',
    subtitle: 'Floating Marble Altar with Backlit Om Mandala & Concealed Aarti',
    image: '/gallery/sanctum-triple-shikhar-room.webp',
    baseWeight: 1950,
    hours: 420,
    vastuScore: 97,
    yoni: 'Vrishabha (West - Everlasting Peace & Family Abundance)',
    description: 'Clean-line contemporary luxury sanctum tailored for ultra-luxury penthouses and modern estates. Integrated ambient indirect warm illumination.'
  },
  {
    id: 'chhatri',
    name: 'Monumental Royal Chhatri',
    subtitle: 'Octagonal 8-Pillar Ribbed Dome with Pierced Balustrade',
    image: '/gallery/chhatri-fluted-marble-dome.webp',
    baseWeight: 4800,
    hours: 890,
    vastuScore: 99,
    yoni: 'Gaja (North - Royal Dignity & Eternal Fortune)',
    description: 'Majestic outdoor and estate pavilion hand-carved in solid Makrana calcite bedrock with weather-sealed structural interlocking dry-joints.'
  }
];

const STONES = [
  {
    id: 'makrana-albeta',
    name: 'Pure Makrana Albeta (99% Calcite)',
    origin: 'Makrana Bedrock · Taj Mahal Vein',
    colorHex: '#faf7f0',
    borderHex: '#d4af37',
    addedWeight: 0,
    porosity: '0.04% (Zero-Staining)',
    tag: 'THE ROYAL BENCHMARK'
  },
  {
    id: 'makrana-dungri',
    name: 'Makrana Dungri Pristine',
    origin: 'Makrana Old Quarry Seam',
    colorHex: '#f0ece1',
    borderHex: '#a68244',
    addedWeight: 100,
    porosity: '0.06% (Lifetime Calcite)',
    tag: 'ANCIENT TEMPLE CLASSIC'
  },
  {
    id: 'nero-marquina',
    name: 'Nero Marquina Obsidian',
    origin: 'Deep Basque Monolith Seam',
    colorHex: '#181615',
    borderHex: '#88542c',
    addedWeight: 350,
    porosity: '0.09% (Bold Royal Contrast)',
    tag: 'MIDNIGHT OPULENCE'
  },
  {
    id: 'honey-onyx',
    name: 'Translucent Backlit Green/Honey Onyx',
    origin: 'Baluchistan Rare Veins',
    colorHex: '#ded3b6',
    borderHex: '#c2954c',
    addedWeight: 220,
    porosity: '0.12% (65% Light Transmission)',
    tag: 'DIVINE LUMINESCENCE'
  }
];

const EMBELLISHMENTS = [
  { id: 'gold', name: '24K Pure Gold Leaf (Swarna Lepam) on Shikhara Finials', weight: 15, hours: 45 },
  { id: 'pietra', name: 'Parchin Kari Pietra Dura Gem Inlay (Lapis Lazuli & Carnelian)', weight: 35, hours: 80 },
  { id: 'jali', name: '7-Layer Pierced Marble Lattice Screen (Ayadi Geometric Jali)', weight: 60, hours: 65 },
  { id: 'aarti', name: 'Concealed Warm Aarti Illumination Array & Solid Brass Bells', weight: 25, hours: 30 }
];

export default function SanctumConfigurator({ onOpenInquiry }) {
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [selectedStone, setSelectedStone] = useState(STONES[0]);
  const [activeEmbellishments, setActiveEmbellishments] = useState(['gold', 'jali']);
  const [customWidth, setCustomWidth] = useState(6.5); // feet
  const [customHeight, setCustomHeight] = useState(8.5); // feet

  const toggleEmbellishment = (id) => {
    setActiveEmbellishments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate dynamic engineering values
  const embellishmentHours = activeEmbellishments.reduce((acc, id) => {
    const item = EMBELLISHMENTS.find((e) => e.id === id);
    return acc + (item ? item.hours : 0);
  }, 0);

  const embellishmentWeight = activeEmbellishments.reduce((acc, id) => {
    const item = EMBELLISHMENTS.find((e) => e.id === id);
    return acc + (item ? item.weight : 0);
  }, 0);

  const dimensionMultiplier = (customWidth * customHeight) / (6.5 * 8.5);
  const totalWeightKg = Math.round((selectedStyle.baseWeight + selectedStone.addedWeight + embellishmentWeight) * dimensionMultiplier);
  const totalArtisanHours = Math.round((selectedStyle.hours + embellishmentHours) * Math.sqrt(dimensionMultiplier));

  const handleShareWhatsApp = () => {
    const embNames = activeEmbellishments
      .map((id) => EMBELLISHMENTS.find((e) => e.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `*AFG MARBLE & ARTS — BESPOKE SANCTUM CONFIGURATION*\n\n` +
      `• *Architectural Form:* ${selectedStyle.name}\n` +
      `• *Selected Stone:* ${selectedStone.name} (${selectedStone.origin})\n` +
      `• *Dimensions:* ${customWidth} ft Width × ${customHeight} ft Height\n` +
      `• *Sacred Embellishments:* ${embNames || 'None'}\n` +
      `• *Estimated Solid Weight:* ~${totalWeightKg} kg\n` +
      `• *Ayadi Vastu Yoni:* ${selectedStyle.yoni}\n` +
      `• *Artisanal Chiseling:* ~${totalArtisanHours} Master Silawat Hours\n\n` +
      `Please provide the 3D CAD Blueprint and bespoke investment proposal for this configuration.`;

    const url = `https://wa.me/917597417274?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleOpenConsultation = () => {
    if (onOpenInquiry) {
      onOpenInquiry({
        title: `${selectedStyle.name} (${selectedStone.name})`,
        category: 'sanctum',
        id: `config-${selectedStyle.id}-${selectedStone.id}`
      });
    }
  };

  return (
    <section className="sec-sanctum-configurator" style={{ padding: '90px 0', background: 'radial-gradient(ellipse at 50% 20%, #ffffff 0%, #f4ede2 100%)' }}>
      <div className="sec-container">
        {/* Header */}
        <div className="sec-header text-center" style={{ marginBottom: '40px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
            INTERACTIVE ATELIER STUDIO
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.8vw, 46px)', color: '#1c1813', letterSpacing: '-0.01em' }}>
            Design Your Consecrated Royal Sanctum
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p className="sub-lead" style={{ maxWidth: '760px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
            Select your architectural shikhara, authentic Makrana bedrock, and sacred embellishments. Our interactive studio calculates exact Ayadi Vastu metrics and solid monolithic extraction weight in real time.
          </p>
        </div>

        {/* Configurator 2-Column Luxury Layout */}
        <div className="configurator-board" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          background: '#ffffff',
          borderRadius: '24px',
          padding: 'clamp(20px, 3.5vw, 40px)',
          boxShadow: '0 24px 60px -15px rgba(28, 24, 19, 0.12), 0 0 0 1px rgba(184, 134, 63, 0.2) inset'
        }}>
          {/* LEFT: Live Visual Preview & Dynamic Engineering Specs */}
          <div className="configurator-preview" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="configurator-stage-frame" style={{
              position: 'relative',
              height: '380px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(28, 24, 19, 0.15)',
              background: '#181512'
            }}>
              <img
                src={selectedStyle.image}
                alt={selectedStyle.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
                }}
              />

              {/* Top Luxury Badges */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'none'
              }}>
                <span style={{
                  background: 'rgba(20, 17, 14, 0.88)',
                  backdropFilter: 'blur(8px)',
                  color: '#e6c885',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  border: '1px solid rgba(212, 175, 55, 0.4)'
                }}>
                  {selectedStone.tag}
                </span>

                <span style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#1c1813',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  VASTU SCORE: {selectedStyle.vastuScore}/100
                </span>
              </div>

              {/* Bottom Stone Accent Bar */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                padding: '16px 20px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(18, 15, 12, 0.92) 100%)',
                color: '#ffffff'
              }}>
                <h4 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#ffffff', margin: '0 0 4px' }}>
                  {selectedStyle.name}
                </h4>
                <p style={{ fontSize: '12px', color: '#ecd39b', margin: 0 }}>
                  Crafted in <strong>{selectedStone.name}</strong> · {selectedStone.porosity}
                </p>
              </div>
            </div>

            {/* Realtime Engineering & Ayadi Vastu Metrics Card */}
            <div className="config-metrics-card" style={{
              background: '#fbf9f4',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(184, 134, 63, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#88542c' }}>
                  AYADI VASTU HARMONY &amp; SPECIFICATIONS
                </span>
                <span style={{ fontSize: '11px', color: '#27ae60', fontWeight: 600 }}>● Consecration Certified</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                <div style={{ padding: '10px 12px', background: '#ffffff', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '10.5px', color: '#7a7065', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Extraction Weight</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#1c1813', marginTop: '2px' }}>
                    {totalWeightKg.toLocaleString()} <span style={{ fontSize: '12px', fontWeight: 500 }}>KG</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#9c8b7a' }}>Monolithic Bedrock Blocks</div>
                </div>

                <div style={{ padding: '10px 12px', background: '#ffffff', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '10.5px', color: '#7a7065', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Silawat Hand Chisel</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#1c1813', marginTop: '2px' }}>
                    {totalArtisanHours} <span style={{ fontSize: '12px', fontWeight: 500 }}>HOURS</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#9c8b7a' }}>Generational Master Artisans</div>
                </div>

                <div style={{ padding: '10px 12px', background: '#ffffff', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)', gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '10.5px', color: '#7a7065', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sacred Directional Yoni</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#88542c', marginTop: '2px' }}>
                    {selectedStyle.yoni}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="btn-primary"
                style={{
                  flex: 1,
                  minWidth: '220px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  borderColor: '#25D366',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.28)'
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>WhatsApp Config to Atelier</span>
              </button>

              <button
                type="button"
                onClick={handleOpenConsultation}
                className="btn-outline-gold"
                style={{ flex: 1, minWidth: '180px', textAlign: 'center', justifyContent: 'center' }}
              >
                <span>Request 3D Blueprint</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Interactive Configurator Controls */}
          <div className="configurator-controls" style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            {/* Control 1: Select Architectural Form */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1c1813', marginBottom: '10px' }}>
                1. Select Architectural Form &amp; Shikhara Style
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      border: selectedStyle.id === style.id ? '2px solid #b08a4f' : '1px solid rgba(28, 24, 19, 0.12)',
                      background: selectedStyle.id === style.id ? '#fcf8f0' : '#ffffff',
                      boxShadow: selectedStyle.id === style.id ? '0 6px 18px rgba(176, 138, 79, 0.15)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1c1813' }}>{style.name}</div>
                    <div style={{ fontSize: '10.5px', color: '#7a7065', marginTop: '3px', lineHeight: 1.3 }}>
                      {style.subtitle.split('with')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Select Authentic Stone Bedrock */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1c1813', marginBottom: '10px' }}>
                2. Select Authentic Bedrock Marble
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {STONES.map((stone) => (
                  <button
                    key={stone.id}
                    type="button"
                    onClick={() => setSelectedStone(stone)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      border: selectedStone.id === stone.id ? '2px solid #b08a4f' : '1px solid rgba(28, 24, 19, 0.12)',
                      background: selectedStone.id === stone.id ? '#fcf8f0' : '#ffffff'
                    }}
                  >
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: stone.colorHex,
                      border: `2px solid ${stone.borderHex}`,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      flexShrink: 0
                    }}></span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#1c1813' }}>{stone.name}</div>
                      <div style={{ fontSize: '10.5px', color: '#7a7065' }}>{stone.origin}</div>
                    </div>
                    {selectedStone.id === stone.id && (
                      <span style={{ fontSize: '11px', color: '#b08a4f', fontWeight: 700 }}>✓ Selected</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Custom Dimension Sliders */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1c1813' }}>
                  3. Sanctum Spatial Scale
                </label>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#88542c' }}>
                  {customWidth} ft (W) × {customHeight} ft (H)
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7a7065', marginBottom: '4px' }}>
                    <span>Width: {customWidth} Feet</span>
                    <span>Range: 3.5 - 18.0 ft</span>
                  </div>
                  <input
                    type="range"
                    min="3.5"
                    max="18"
                    step="0.5"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#88542c', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7a7065', marginBottom: '4px' }}>
                    <span>Height: {customHeight} Feet</span>
                    <span>Range: 4.5 - 24.0 ft</span>
                  </div>
                  <input
                    type="range"
                    min="4.5"
                    max="24"
                    step="0.5"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#88542c', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>

            {/* Control 4: Sacred Embellishments */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1c1813', marginBottom: '10px' }}>
                4. Select Sacred Embellishments
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {EMBELLISHMENTS.map((emb) => {
                  const isChecked = activeEmbellishments.includes(emb.id);
                  return (
                    <div
                      key={emb.id}
                      onClick={() => toggleEmbellishment(emb.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: isChecked ? '1px solid #b08a4f' : '1px solid rgba(28, 24, 19, 0.1)',
                        background: isChecked ? '#fcf9f2' : '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          style={{ accentColor: '#88542c', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '12px', fontWeight: isChecked ? 600 : 500, color: '#1c1813' }}>
                          {emb.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '10px', color: '#b08a4f', fontWeight: 600 }}>+{emb.hours}h Chisel</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

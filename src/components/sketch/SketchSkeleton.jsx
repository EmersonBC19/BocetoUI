import React from 'react';
import './SketchSkeleton.css';

/**
 * Estela de humo y líneas de velocidad animadas a lo largo de todo el ancho del skeleton
 */
function SmokeSpeedTrail() {
  return (
    <div className="sketch-skeleton__shimmer" aria-hidden="true">
      <div className="sketch-skeleton__track-runner">
        <div className="sketch-skeleton__smoke-box">
          <svg
            viewBox="0 0 200 48"
            preserveAspectRatio="xMidYMid meet"
            className="sketch-skeleton__smoke-svg"
          >
            {/* Líneas de velocidad de boceto */}
            <line x1="0" y1="16" x2="110" y2="16" stroke="var(--sketch-ink)" strokeWidth="1.8" strokeDasharray="12 6" opacity="0.45" />
            <line x1="15" y1="26" x2="125" y2="26" stroke="var(--sketch-ink)" strokeWidth="2.2" opacity="0.65" />
            <line x1="5" y1="36" x2="105" y2="36" stroke="var(--sketch-ink)" strokeWidth="1.5" strokeDasharray="16 8" opacity="0.45" />

            {/* Nubecita de polvo / derrape estilo cómic artesanal */}
            <path
              d="M 90 36 C 80 36, 80 24, 95 22 C 95 14, 110 12, 120 18 C 130 9, 150 12, 155 20 C 165 17, 175 24, 172 32 C 180 34, 180 40, 170 42 L 90 42 Z"
              fill="var(--sketch-bg-paper, #fdfbf7)"
              stroke="var(--sketch-ink)"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Motas de polvo flotantes tras la nube */}
            <circle cx="75" cy="22" r="3" fill="none" stroke="var(--sketch-ink)" strokeWidth="1.5" opacity="0.5" />
            <circle cx="60" cy="30" r="2" fill="none" stroke="var(--sketch-ink)" strokeWidth="1.2" opacity="0.4" />
            <circle cx="45" cy="16" r="2.5" fill="none" stroke="var(--sketch-ink)" strokeWidth="1.2" opacity="0.3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * SketchSkeleton - Estado de carga con estela de nubes y líneas de velocidad a 120 FPS.
 *
 * @param {Object} props
 * @param {'text'|'card'|'avatar'|'image'} [props.variant='text']
 * @param {number} [props.lines=1] - Cantidad de líneas si variant="text".
 * @param {string|number} [props.width] - Ancho opcional.
 * @param {string|number} [props.height] - Alto opcional.
 * @param {string} [props.className]
 */
export function SketchSkeleton({
  variant = 'text',
  lines = 1,
  width,
  height,
  className = '',
  style = {}
}) {
  const customStyle = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {})
  };

  // Si es variante texto y pide múltiples líneas:
  if (variant === 'text' && lines > 1) {
    const lineWidths = ['100%', '88%', '94%', '70%', '82%'];
    return (
      <div className={`sketch-skeleton-container ${className}`} style={customStyle}>
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className="sketch-skeleton sketch-skeleton--text"
            style={{ width: lineWidths[i % lineWidths.length] }}
          >
            <SmokeSpeedTrail />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`sketch-skeleton sketch-skeleton--${variant} ${className}`}
      style={customStyle}
    >
      <SmokeSpeedTrail />
    </div>
  );
}

export default SketchSkeleton;

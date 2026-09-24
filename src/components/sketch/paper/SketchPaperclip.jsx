import React from 'react';
import './SketchPaperclip.css';

/**
 * SketchPaperclip — Clip de papel metálico y pinza binder artesanal
 * 
 * @param {'wire'|'binder'|'colored'} variant - Estilo del clip
 * @param {'silver'|'gold'|'red'|'blue'|'black'|'green'|'chalk'} color - Color del alambre o pinza
 * @param {'top-left'|'top-center'|'top-right'|'standalone'} position - Posición de engrapado en el contenedor padre
 * @param {'sm'|'md'|'lg'} size - Tamaño del clip
 * @param {number} rotation - Ángulo de inclinación en grados (por defecto orgánico)
 * @param {boolean} interactive - Habilita micro-animación elástica al pasar el cursor
 */
export function SketchPaperclip({
  variant = 'wire',
  color = 'silver',
  position = 'standalone',
  size = 'md',
  rotation,
  interactive = true,
  className = '',
  style = {},
  ...props
}) {
  const defaultAngles = {
    'top-left': -8,
    'top-center': 2,
    'top-right': 7,
    'standalone': -5
  };

  const angle = rotation !== undefined ? rotation : (defaultAngles[position] || 0);

  const colorStyles = {
    silver: { stroke: '#64748b', highlight: '#cbd5e1', shadow: 'rgba(0,0,0,0.25)', body: '#1e293b' },
    gold: { stroke: '#b45309', highlight: '#fde047', shadow: 'rgba(180,83,9,0.3)', body: '#78350f' },
    red: { stroke: '#b91c1c', highlight: '#fca5a5', shadow: 'rgba(185,28,28,0.25)', body: '#991b1b' },
    blue: { stroke: '#1d4ed8', highlight: '#93c5fd', shadow: 'rgba(29,78,216,0.25)', body: '#1e40af' },
    black: { stroke: '#0f172a', highlight: '#475569', shadow: 'rgba(0,0,0,0.35)', body: '#090d16' },
    green: { stroke: '#15803d', highlight: '#86efac', shadow: 'rgba(21,128,61,0.25)', body: '#166534' },
    chalk: { stroke: '#f8fafc', highlight: '#ffffff', shadow: 'rgba(0,0,0,0.6)', body: '#334155' }
  };

  const themeColors = colorStyles[color] || colorStyles.silver;

  return (
    <div
      className={`sketch-paperclip sketch-paperclip--${variant} sketch-paperclip--pos-${position} sketch-paperclip--${size} ${interactive ? 'sketch-paperclip--interactive' : ''} ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
        ...style
      }}
      role="img"
      aria-label={`Clip de papel ${variant}`}
      {...props}
    >
      {variant === 'binder' ? (
        /* Pinza Binder de Oficina con solapas abatibles */
        <svg viewBox="0 0 36 54" className="sketch-paperclip__svg" aria-hidden="true">
          <defs>
            <filter id="binder-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1.5" dy="2.5" stdDeviation="1" floodOpacity="0.3" />
            </filter>
          </defs>
          {/* Alambre metálico trasero */}
          <path
            d="M 12 18 L 12 6 C 12 2 24 2 24 6 L 24 18"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Cuerpo trapezoidal de la pinza */}
          <polygon
            points="6,18 30,18 34,44 2,44"
            fill={themeColors.body}
            stroke="var(--sketch-ink, #18181b)"
            strokeWidth="1.8"
            filter="url(#binder-shadow)"
          />
          {/* Borde metálico inferior */}
          <rect x="2" y="42" width="32" height="4" rx="1.5" fill="#64748b" stroke="var(--sketch-ink, #18181b)" strokeWidth="1" />
          {/* Alambre metálico delantero abatido */}
          <path
            d="M 10 24 L 10 38 C 10 43 26 43 26 38 L 26 24"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        /* Clip de Alambre Clásico con Vueltas Superpuestas Realistas */
        <svg viewBox="0 0 24 58" className="sketch-paperclip__svg" aria-hidden="true">
          <defs>
            <filter id={`clip-shadow-${color}`} x="-30%" y="-20%" width="160%" height="140%">
              <feDropShadow dx="2" dy="3" stdDeviation="1.5" floodColor={themeColors.shadow} />
            </filter>
          </defs>
          {/* Sombra proyectada del alambre */}
          <path
            d="M 7 42 L 7 12 C 7 5 17 5 17 12 L 17 48 C 17 54 4 54 4 48 L 4 20 C 4 15 11 15 11 20 L 11 38"
            fill="none"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(1.5, 2)"
          />
          {/* Trazo metálico base */}
          <path
            d="M 7 42 L 7 12 C 7 5 17 5 17 12 L 17 48 C 17 54 4 54 4 48 L 4 20 C 4 15 11 15 11 20 L 11 38"
            fill="none"
            stroke={themeColors.stroke}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sketch-paperclip__wire-base"
          />
          {/* Brillo de reflejo de luz metálica */}
          <path
            d="M 8 38 L 8 13 C 8 7 16 7 16 13 L 16 45"
            fill="none"
            stroke={themeColors.highlight}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
            className="sketch-paperclip__wire-highlight"
          />
        </svg>
      )}
    </div>
  );
}

export default SketchPaperclip;

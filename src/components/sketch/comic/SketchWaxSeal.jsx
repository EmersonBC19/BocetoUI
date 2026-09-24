import React, { useState } from 'react';
import './SketchWaxSeal.css';

/**
 * SketchWaxSeal — Sello de lacre y cera derretida artesanal
 * 
 * @param {'crimson'|'gold'|'navy'|'black'|'emerald'|'chalk'} color - Color de la cera fundida
 * @param {'sm'|'md'|'lg'} size - Tamaño del sello
 * @param {string} monogram - Letra o símbolo grabado en bajorrelieve (ej: 'B', '★', 'OK')
 * @param {React.ReactNode} icon - Icono opcional en el centro del sello
 * @param {number} rotation - Inclinación en grados
 * @param {boolean} interactive - Habilita animación de sellado táctil al pulsar
 * @param {Function} onClick - Callback al interactuar
 */
export function SketchWaxSeal({
  color = 'crimson',
  size = 'md',
  monogram = '★',
  icon,
  rotation,
  interactive = true,
  className = '',
  style = {},
  onClick,
  ...props
}) {
  const [isPressing, setIsPressing] = useState(false);
  const angle = rotation !== undefined ? rotation : 6;

  const colorPalettes = {
    crimson: { outer: '#991b1b', inner: '#b91c1c', rim: '#ef4444', text: '#fca5a5', shadow: 'rgba(153, 27, 27, 0.4)' },
    gold: { outer: '#92400e', inner: '#b45309', rim: '#f59e0b', text: '#fef08a', shadow: 'rgba(146, 64, 14, 0.4)' },
    navy: { outer: '#1e3a8a', inner: '#1d4ed8', rim: '#3b82f6', text: '#bfdbfe', shadow: 'rgba(30, 58, 138, 0.4)' },
    black: { outer: '#0f172a', inner: '#1e293b', rim: '#475569', text: '#cbd5e1', shadow: 'rgba(15, 23, 42, 0.5)' },
    emerald: { outer: '#064e3b', inner: '#047857', rim: '#10b981', text: '#a7f3d0', shadow: 'rgba(6, 78, 59, 0.4)' },
    chalk: { outer: '#1e293b', inner: '#334155', rim: '#cbd5e1', text: '#f8fafc', shadow: 'rgba(0, 0, 0, 0.6)' }
  };

  const palette = colorPalettes[color] || colorPalettes.crimson;

  const handleClick = (e) => {
    if (!interactive) return;
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 240);
    onClick?.(e);
  };

  return (
    <div
      className={`sketch-wax-seal sketch-wax-seal--${size} ${interactive ? 'sketch-wax-seal--interactive' : ''} ${isPressing ? 'sketch-wax-seal--pressing' : ''} ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
        ...style
      }}
      onClick={handleClick}
      role={interactive ? 'button' : 'img'}
      tabIndex={interactive ? 0 : undefined}
      title={typeof monogram === 'string' ? `Sello de Lacre ${monogram}` : 'Sello de Lacre'}
      {...props}
    >
      <svg viewBox="0 0 100 100" className="sketch-wax-seal__svg" aria-hidden="true">
        <defs>
          <radialGradient id={`wax-grad-${color}`} cx="38%" cy="34%" r="65%">
            <stop offset="0%" stopColor={palette.rim} />
            <stop offset="60%" stopColor={palette.inner} />
            <stop offset="100%" stopColor={palette.outer} />
          </radialGradient>
          <filter id={`wax-drop-${color}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="2.5" floodColor={palette.shadow} />
          </filter>
        </defs>

        {/* Borde exterior de cera derretida con salientes orgánicas */}
        <path
          d="M 50 4 
             C 65 2, 78 8, 86 20 
             C 94 32, 98 46, 95 60 
             C 92 74, 82 86, 70 93 
             C 58 100, 42 98, 30 94 
             C 18 90, 8 80, 5 66 
             C 2 52, 5 38, 12 26 
             C 19 14, 35 6, 50 4 Z"
          fill={`url(#wax-grad-${color})`}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="1.5"
          filter={`url(#wax-drop-${color})`}
          className="sketch-wax-seal__wax-blob"
        />

        {/* Segundo anillo concéntrico de rebaba de cera */}
        <path
          d="M 50 14 
             C 70 14, 86 28, 86 50 
             C 86 72, 70 86, 50 86 
             C 30 86, 14 72, 14 50 
             C 14 28, 30 14, 50 14 Z"
          fill={palette.inner}
          stroke={palette.outer}
          strokeWidth="2"
        />

        {/* Círculo interior grabado / bajorrelieve */}
        <circle
          cx="50"
          cy="50"
          r="28"
          fill={palette.outer}
          stroke={palette.rim}
          strokeWidth="1.8"
          strokeDasharray="140"
        />

        {/* Anillo de perlas o micro-trazos de orfebrería */}
        <circle
          cx="50"
          cy="50"
          r="24"
          fill="none"
          stroke={palette.rim}
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.8"
        />

        {/* Icono o Monograma Central Grabado */}
        {icon ? (
          <g transform="translate(36, 36) scale(1.15)" stroke={palette.text} fill="none">
            {icon}
          </g>
        ) : (
          <text
            x="50"
            y="57"
            textAnchor="middle"
            fill={palette.text}
            fontSize={monogram.length > 2 ? '14' : '20'}
            fontFamily="var(--font-sketch-title, 'Patrick Hand', cursive)"
            fontWeight="900"
            filter="drop-shadow(0px -1px 0px rgba(0,0,0,0.5))"
          >
            {monogram}
          </text>
        )}
      </svg>
    </div>
  );
}

export default SketchWaxSeal;

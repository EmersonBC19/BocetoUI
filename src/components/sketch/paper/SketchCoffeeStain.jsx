import React from 'react';
import './SketchCoffeeStain.css';

/**
 * SketchCoffeeStain — Manchas de taza de café y salpicaduras de tinta artesanal
 * 
 * @param {'ring'|'double-ring'|'splatter'} type - Forma de la mancha
 * @param {'coffee'|'ink-blue'|'ink-black'|'wine'|'chalk'} color - Tono de la mancha
 * @param {'sm'|'md'|'lg'|number} size - Diámetro en píxeles o escala
 * @param {number} opacity - Nivel de transparencia suave (0.1 a 1.0)
 * @param {number} rotation - Ángulo de rotación orgánico
 * @param {boolean} interactive - Habilita micro-reacción al pasar el cursor
 */
export function SketchCoffeeStain({
  type,
  variant = 'ring',
  color = 'espresso',
  size = 'md',
  opacity = 0.35,
  rotation,
  interactive = false,
  className = '',
  style = {},
  ...props
}) {
  const stainType = type || variant || 'ring';
  const angle = rotation !== undefined ? rotation : (stainType === 'double-ring' ? 15 : -8);

  const sizeMap = {
    sm: 70,
    md: 110,
    lg: 160
  };

  const pixelSize = typeof size === 'number' ? size : (sizeMap[size] || 110);

  const colorMap = {
    espresso: '#5c2c16',
    coffee: '#6f391c',
    latte: '#a1724e',
    ink: '#1e3a8a',
    'ink-blue': '#1e3a8a',
    'ink-black': '#18181b',
    water: '#0284c7',
    wine: '#831843',
    chalk: '#f8fafc'
  };

  const stainColor = colorMap[color] || colorMap.espresso;

  return (
    <div
      className={`sketch-coffee-stain sketch-coffee-stain--${stainType} ${interactive ? 'sketch-coffee-stain--interactive' : ''} ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        opacity: opacity,
        transform: `rotate(${angle}deg)`,
        ...style
      }}
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      {stainType === 'splatter' ? (
        /* Salpicadura de Tinta con Gotas Satélite */
        <svg viewBox="0 0 100 100" className="sketch-coffee-stain__svg">
          {/* Mancha central */}
          <path
            d="M 50 32 
               C 62 26, 74 38, 70 52 
               C 66 66, 58 76, 44 72 
               C 30 68, 22 56, 32 42 
               C 42 28, 38 38, 50 32 Z"
            fill={stainColor}
          />
          {/* Gotas satélite expulsadas por el impacto */}
          <circle cx="78" cy="24" r="3.5" fill={stainColor} />
          <circle cx="84" cy="38" r="2" fill={stainColor} />
          <circle cx="22" cy="74" r="4" fill={stainColor} />
          <circle cx="16" cy="62" r="2.2" fill={stainColor} />
          <circle cx="68" cy="82" r="3" fill={stainColor} />
          <circle cx="36" cy="18" r="2.5" fill={stainColor} />
        </svg>
      ) : stainType === 'double-ring' ? (
        /* Doble Aro de Fondo de Taza Interconectado */
        <svg viewBox="0 0 110 110" className="sketch-coffee-stain__svg">
          {/* Primer aro */}
          <circle
            cx="48"
            cy="48"
            r="38"
            fill="none"
            stroke={stainColor}
            strokeWidth="3.2"
            strokeDasharray="18 4 35 6 12 5"
            strokeLinecap="round"
          />
          <circle
            cx="48"
            cy="48"
            r="36.5"
            fill="none"
            stroke={stainColor}
            strokeWidth="1.2"
            opacity="0.6"
          />
          {/* Segundo aro ligeramente desplazado */}
          <circle
            cx="62"
            cy="60"
            r="36"
            fill="none"
            stroke={stainColor}
            strokeWidth="2.8"
            strokeDasharray="24 6 42 8"
            strokeLinecap="round"
          />
          {/* Gotas de condensación */}
          <circle cx="86" cy="54" r="3" fill={stainColor} />
          <circle cx="34" cy="82" r="2.2" fill={stainColor} />
          <circle cx="14" cy="42" r="2" fill={stainColor} />
        </svg>
      ) : (
        /* Aro Clásico de Fondo de Taza con Capilaridad de Papel */
        <svg viewBox="0 0 100 100" className="sketch-coffee-stain__svg">
          {/* Borde exterior irregular del aro de café */}
          <path
            d="M 50 8 
               C 74 8, 92 26, 92 50 
               C 92 74, 74 92, 50 92 
               C 26 92, 8 74, 8 50 
               C 8 26, 26 8, 50 8 Z"
            fill="none"
            stroke={stainColor}
            strokeWidth="3.6"
            strokeDasharray="30 5 18 3 45 7 14 4"
            strokeLinecap="round"
          />
          {/* Capa de tinta más fina interior */}
          <path
            d="M 50 12 
               C 72 12, 88 28, 88 50 
               C 88 72, 72 88, 50 88 
               C 28 88, 12 72, 12 50 
               C 12 28, 28 12, 50 12 Z"
            fill="none"
            stroke={stainColor}
            strokeWidth="1.6"
            opacity="0.5"
          />
          {/* Gota escurrida */}
          <ellipse cx="88" cy="64" rx="3.5" ry="5" fill={stainColor} transform="rotate(25 88 64)" />
          <circle cx="16" cy="38" r="2.5" fill={stainColor} />
        </svg>
      )}
    </div>
  );
}

export default SketchCoffeeStain;

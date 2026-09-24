import React, { useState } from 'react';
import './SketchStamp.css';

const STAMP_PRESETS = {
  approved: { text: 'APROBADO', subtext: 'OFICIAL · CERTIFICADO', color: '#16a34a', border: 'double', angle: -7 },
  draft: { text: 'BORRADOR', subtext: 'EN REVISIÓN · NO PUBLICAR', color: '#dc2626', border: 'dashed', angle: -11 },
  artisan: { text: '100% ARTESANAL', subtext: 'HECHO A MANO · REACT 19', color: '#0284c7', border: 'double', angle: 5 },
  urgent: { text: '¡URGENTE!', subtext: 'MÁXIMA PRIORIDAD', color: '#b91c1c', border: 'solid', angle: -4 },
  confidential: { text: 'CONFIDENCIAL', subtext: 'USO INTERNO EXCLUSIVO', color: '#ea580c', border: 'solid', angle: 8 },
  verified: { text: 'VERIFICADO', subtext: 'CONTROL DE CALIDAD', color: '#7c3aed', border: 'double', angle: -6 }
};

/**
 * SketchStamp — Sellos de goma, tinta viva y aprobación oficial
 * 
 * @param {'approved'|'draft'|'artisan'|'urgent'|'confidential'|'verified'} status - Tipo de sello
 * @param {string} text - Texto principal del sello
 * @param {string} subtext - Texto secundario o texto circular en arco
 * @param {'rect'|'circle'|'oval'} shape - Forma geométrica del sello
 * @param {boolean|string} date - Muestra fecha (true = fecha de hoy, o string personalizado)
 * @param {boolean} grunge - Aplica textura de porosidad de tinta y goma desgastada
 * @param {string} color - Color personalizado
 * @param {number} rotation - Inclinación en grados
 * @param {boolean} interactive - Habilita animación Slam de impacto al pulsar
 * @param {Function} onClick - Callback al interactuar
 */
export function SketchStamp({
  status = 'approved',
  text,
  subtext,
  shape = 'rect',
  date,
  grunge = true,
  color,
  rotation,
  interactive = true,
  className = '',
  style = {},
  onClick,
  ...props
}) {
  const [isSlamming, setIsSlamming] = useState(false);
  const preset = STAMP_PRESETS[status] || STAMP_PRESETS.approved;

  const displayText = text || preset.text;
  const displaySubtext = subtext || preset.subtext;
  const stampColor = color || preset.color;
  const stampAngle = rotation !== undefined ? rotation : preset.angle;

  const getFormattedDate = () => {
    if (!date) return null;
    if (typeof date === 'string') return date;
    const now = new Date();
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  const formattedDate = getFormattedDate();

  const handleClick = (e) => {
    if (!interactive) return;
    setIsSlamming(true);
    setTimeout(() => setIsSlamming(false), 300);
    onClick?.(e);
  };

  // Si es circular, renderizamos un cuño oficial concéntrico con arco de texto
  if (shape === 'circle') {
    return (
      <div
        className={`sketch-stamp sketch-stamp--circle ${grunge ? 'sketch-stamp--grunge' : ''} ${interactive ? 'sketch-stamp--interactive' : ''} ${isSlamming ? 'sketch-stamp--slamming' : ''} ${className}`}
        style={{
          '--stamp-color': stampColor,
          transform: `rotate(${stampAngle}deg)`,
          ...style
        }}
        onClick={handleClick}
        role={interactive ? 'button' : 'status'}
        tabIndex={interactive ? 0 : undefined}
        title={displayText}
        {...props}
      >
        <svg viewBox="0 0 100 100" className="sketch-stamp__circle-svg" aria-hidden="true">
          <defs>
            {grunge && (
              <filter id="stamp-grunge" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" />
              </filter>
            )}
            <path id="stamp-arc-path" d="M 50 16 A 34 34 0 1 1 49.9 16" fill="none" />
          </defs>

          <g filter={grunge ? 'url(#stamp-grunge)' : undefined}>
            {/* Círculo exterior dentado o punteado */}
            <circle cx="50" cy="50" r="46" fill="none" stroke={stampColor} strokeWidth="3" strokeDasharray="145 3" />
            <circle cx="50" cy="50" r="41" fill="none" stroke={stampColor} strokeWidth="1.4" />

            {/* Texto en arco circular superior */}
            <text fill={stampColor} fontSize="7" fontWeight="900" letterSpacing="1.5" className="sketch-stamp__arc-text">
              <textPath href="#stamp-arc-path">
                ★ {displaySubtext} ★
              </textPath>
            </text>

            {/* Texto principal en el centro */}
            <text
              x="50"
              y={formattedDate ? '47' : '53'}
              textAnchor="middle"
              fill={stampColor}
              fontSize={displayText.length > 9 ? '10' : '12'}
              fontWeight="900"
              fontFamily="var(--font-sketch-title, 'Patrick Hand', sans-serif)"
              letterSpacing="1"
            >
              {displayText}
            </text>

            {/* Fecha o estrellas inferiores */}
            {formattedDate ? (
              <text
                x="50"
                y="59"
                textAnchor="middle"
                fill={stampColor}
                fontSize="6.5"
                fontWeight="800"
                fontFamily="var(--font-sketch-code, monospace)"
                letterSpacing="1"
              >
                {formattedDate}
              </text>
            ) : (
              <text
                x="50"
                y="63"
                textAnchor="middle"
                fill={stampColor}
                fontSize="8"
                fontWeight="800"
              >
                ★★★
              </text>
            )}

            {/* Círculo interior */}
            <circle cx="50" cy="50" r="26" fill="none" stroke={stampColor} strokeWidth="1" strokeDasharray="4 3" />
          </g>
        </svg>
      </div>
    );
  }

  // Variante Rectangular / Estándar
  return (
    <div
      className={`sketch-stamp sketch-stamp--${shape} sketch-stamp--${preset.border} ${grunge ? 'sketch-stamp--grunge' : ''} ${interactive ? 'sketch-stamp--interactive' : ''} ${isSlamming ? 'sketch-stamp--slamming' : ''} ${className}`}
      style={{
        '--stamp-color': stampColor,
        transform: `rotate(${stampAngle}deg)`,
        ...style
      }}
      onClick={handleClick}
      role={interactive ? 'button' : 'status'}
      tabIndex={interactive ? 0 : undefined}
      title={displayText}
      {...props}
    >
      <div className="sketch-stamp__inner">
        <span className="sketch-stamp__text">{displayText}</span>
        {formattedDate && (
          <span className="sketch-stamp__date">{formattedDate}</span>
        )}
      </div>
    </div>
  );
}

export default SketchStamp;

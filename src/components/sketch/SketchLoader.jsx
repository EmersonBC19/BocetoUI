import React from 'react';
import './SketchLoader.css';

/**
 * SketchLoader - Cargador artesanal inspirado en nubes de humo, velocidad y destellos cómic.
 *
 * @param {Object} props
 * @param {'dust-run'|'smoke-spinner'|'impact-burst'} [props.variant='dust-run']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {string} [props.color='currentColor']
 * @param {string} [props.text] - Texto o pie opcional.
 * @param {string} [props.className]
 */
export function SketchLoader({
  variant = 'dust-run',
  size = 'md',
  color = 'currentColor',
  text,
  className = '',
  ...rest
}) {
  return (
    <div className={`sketch-loader-wrapper ${className}`} {...rest}>
      <div className={`sketch-loader sketch-loader--${variant} sketch-loader--${size}`}>
        
        {/* ==========================================================================
            Variante 1: Dust Run (Estela de polvo acelerando - Imágenes 1 y 3)
            ========================================================================== */}
        {variant === 'dust-run' && (
          <svg viewBox="0 0 100 60" fill="none" stroke={color}>
            {/* Líneas de velocidad en retroceso */}
            <line x1="5" y1="20" x2="40" y2="20" strokeWidth="2.2" strokeLinecap="round" className="sketch-speed-line" />
            <line x1="0" y1="32" x2="48" y2="32" strokeWidth="2.8" strokeLinecap="round" className="sketch-speed-line" />
            <line x1="8" y1="44" x2="38" y2="44" strokeWidth="1.8" strokeLinecap="round" className="sketch-speed-line" />

            {/* Bocanada de humo principal */}
            <g className="sketch-dust-cloud">
              <path
                d="M 45 42 C 38 42, 38 32, 48 28 C 46 18, 60 14, 68 20 C 76 12, 92 16, 92 26 C 100 28, 102 38, 96 44 C 98 50, 92 54, 82 52 L 48 52 C 40 52, 40 45, 45 42 Z"
                fill="var(--sketch-bg-paper)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Motas de polvo despedidas */}
              <circle cx="32" cy="24" r="2.5" strokeWidth="1.8" />
              <circle cx="24" cy="36" r="2" strokeWidth="1.5" />
              <circle cx="36" cy="46" r="1.8" strokeWidth="1.5" />
            </g>
          </svg>
        )}

        {/* ==========================================================================
            Variante 2: Smoke Spinner (Giro fluido continuo sobre su propio eje)
            ========================================================================== */}
        {variant === 'smoke-spinner' && (
          <svg viewBox="0 0 80 80" fill="none" stroke={color} className="sketch-smoke-spinner-svg">
            {/* Anillo de órbita punteado que sirve de guía técnica */}
            <circle cx="40" cy="40" r="24.5" stroke="var(--sketch-ink)" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.25" />

            {/* Grupo simétrico en rotación pura sobre su centro exacto (40, 40) */}
            <g className="sketch-smoke-orbit">
              {[0, 120, 240].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 40 40)`}>
                  {/* Estela de velocidad circular que precede la nube */}
                  <path
                    d="M 18 30 A 24.5 24.5 0 0 1 31 16"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="8 4"
                    opacity="0.55"
                  />
                  <circle cx="19" cy="27" r="1.8" fill={color} opacity="0.6" stroke="none" />
                  <circle cx="14" cy="34" r="1.3" fill={color} opacity="0.4" stroke="none" />

                  {/* Nubecita de boceto artesanal */}
                  <path
                    d="M 28.5 18 C 26.5 13, 32.5 9, 37.5 10 C 40.5 6, 47.5 7, 49.5 12 C 53.5 12, 55.5 17, 51.5 20 C 53.5 24, 47.5 26, 42.5 24 C 37.5 26, 31.5 24, 28.5 18 Z"
                    fill="var(--sketch-bg-paper, #fdfbf7)"
                    stroke={color}
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                </g>
              ))}
            </g>
          </svg>
        )}

        {/* ==========================================================================
            Variante 3: Impact Burst (Destello / Explosión de Cómic - Imágenes 2 y 4)
            ========================================================================== */}
        {variant === 'impact-burst' && (
          <svg viewBox="0 0 80 80" fill="none" stroke={color}>
            {/* Líneas de choque que irradian hacia afuera */}
            <line x1="40" y1="2" x2="40" y2="12" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="40" y1="68" x2="40" y2="78" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="2" y1="40" x2="12" y2="40" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="68" y1="40" x2="78" y2="40" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="12" y1="12" x2="20" y2="20" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="60" x2="68" y2="68" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="12" x2="60" y2="20" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="68" x2="20" y2="60" strokeWidth="2" strokeLinecap="round" />

            {/* Estrella de impacto puntiaguda tipo cómic (Imagen 2) */}
            <polygon
              points="40,16 46,28 58,22 52,34 64,40 52,46 58,58 46,52 40,64 34,52 22,58 28,46 16,40 28,34 22,22 34,28"
              fill="var(--sketch-accent-yellow)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </svg>
        )}

      </div>

      {text && <span className="sketch-loader__caption">{text}</span>}
    </div>
  );
}

export default SketchLoader;

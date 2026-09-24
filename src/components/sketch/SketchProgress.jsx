import React from 'react';
import './SketchProgress.css';

/**
 * SketchProgress - Barra de progreso ultra fluida acelerada por GPU (120 FPS)
 *
 * Utiliza translate3d y subpíxeles en el compositor de hardware para eliminar
 * cualquier reflow de layout, garantizando respuesta instantánea y máxima fluidez.
 *
 * @param {Object} props
 * @param {number} props.value - Valor del progreso (0 a 100).
 * @param {string} [props.label] - Título o descripción.
 * @param {'marker'|'marker-blue'|'marker-green'|'marker-pink'|'marker-purple'|'hatch'} [props.variant='marker']
 * @param {boolean} [props.showPercentage=true]
 * @param {number} [props.height=20]
 * @param {boolean} [props.animated=false] - Flujo dinámico de hachurado de lápiz
 * @param {boolean} [props.instant=false] - Sin transición de inercia (para sliders en tiempo real)
 * @param {string} [props.className]
 */
export function SketchProgress({
  value = 0,
  label,
  variant = 'marker',
  showPercentage = true,
  height = 20,
  animated = true,
  instant = false,
  className = '',
  ...rest
}) {
  const clampedValue = Math.min(100, Math.max(0, Number(value) || 0));
  const isCloudVisible = clampedValue > 4 && clampedValue < 98;

  return (
    <div className={`sketch-progress-group ${className}`} {...rest}>
      {(label || showPercentage) && (
        <div className="sketch-progress-header">
          {label && <span className="sketch-progress-label">{label}</span>}
          {showPercentage && (
            <span className="sketch-progress-percentage">
              {Math.round(clampedValue)}%
              {clampedValue === 100 && (
                <span className="sketch-progress-complete-badge" aria-label="Completado">
                  ✓ ¡LISTO!
                </span>
              )}
            </span>
          )}
        </div>
      )}

      <div
        className="sketch-progress-track"
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`sketch-progress-bar sketch-progress-bar--${variant} ${
            animated ? 'sketch-progress-bar--animated' : ''
          } ${instant ? 'sketch-progress-bar--instant' : ''}`}
          style={{
            transform: `translate3d(${clampedValue - 100}%, 0, 0)`
          }}
        >
          {/* Nube de velocidad acelerada por GPU */}
          <div
            className="sketch-progress-cloud-box"
            style={{ opacity: isCloudVisible ? 1 : 0 }}
          >
            <svg
              className="sketch-progress-cloud"
              viewBox="0 0 30 20"
              fill="var(--sketch-bg-paper, #fdfbf7)"
              stroke="var(--sketch-ink, #23272f)"
              strokeWidth="1.8"
            >
              <path d="M 5,15 C 2,15 0,10 5,8 C 5,4 12,2 16,6 C 20,2 26,5 25,10 C 29,12 28,16 24,16 Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SketchProgress;

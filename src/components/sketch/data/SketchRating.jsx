import React, { useState } from 'react';
import './SketchRating.css';

/**
 * SketchRating - Componente de valoración con estrellas trazadas a mano
 * @param {number} value - Puntuación actual (0 a max)
 * @param {number} max - Número de estrellas (default 5)
 * @param {boolean} readOnly - Si es solo lectura
 * @param {boolean} showValue - Muestra el valor numérico en una etiqueta
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {function} onChange - Callback al seleccionar una estrella
 */
export function SketchRating({
  value = 0,
  max = 5,
  readOnly = false,
  showValue = false,
  size = 'md',
  onChange,
  className = '',
  ...props
}) {
  const [hoverValue, setHoverValue] = useState(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const handleClick = (starIndex) => {
    if (!readOnly && onChange) {
      onChange(starIndex);
    }
  };

  const handleMouseEnter = (starIndex) => {
    if (!readOnly) {
      setHoverValue(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
    }
  };

  return (
    <div
      className={`sketch-rating sketch-rating--${size} ${
        readOnly ? 'sketch-rating--read-only' : ''
      } ${className}`}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`Calificación: ${value} de ${max}`}
      {...props}
    >
      {/* Definición de gradiente SVG para medias estrellas */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="sketch-rating-half-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#f4f4f5" />
          </linearGradient>
        </defs>
      </svg>

      <div className="sketch-rating__stars" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: max }, (_, i) => {
          const starNum = i + 1;
          const isFilled = displayValue >= starNum;
          const isHalf = !isFilled && displayValue >= starNum - 0.5;

          let stateClass = '';
          if (isFilled) stateClass = 'sketch-rating__star-btn--filled';
          else if (isHalf) stateClass = 'sketch-rating__star-btn--half';

          return (
            <button
              key={starNum}
              type="button"
              className={`sketch-rating__star-btn ${stateClass}`}
              onClick={() => handleClick(starNum)}
              onMouseEnter={() => handleMouseEnter(starNum)}
              disabled={readOnly}
              aria-label={`${starNum} estrella${starNum > 1 ? 's' : ''}`}
            >
              {/* Estrella trazada con pluma irregular */}
              <svg
                viewBox="0 0 24 24"
                className="sketch-rating__star-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 12 2.2 L 15.2 8.6 L 22.2 9.6 L 17.1 14.6 L 18.3 21.6 L 12 18.2 L 5.7 21.6 L 6.9 14.6 L 1.8 9.6 L 8.8 8.6 Z" />
              </svg>
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="sketch-rating__label">
          {Number(displayValue).toFixed(1)} / {max}
          {displayValue > 0 && (
            <span className="sketch-rating__feedback">
              {displayValue <= 1 ? '— Boceto rápido' :
               displayValue <= 2 ? '— En proceso' :
               displayValue <= 3 ? '— Buen trazo' :
               displayValue <= 4 ? '— Gran dibujo' : '— ¡Obra de arte!'}
            </span>
          )}
        </span>
      )}
    </div>
  );
}

export default SketchRating;

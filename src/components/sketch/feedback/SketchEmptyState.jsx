import React from 'react';
import './SketchEmptyState.css';

/**
 * SketchEmptyState - Pantalla de estado vacío con ilustración artesanal
 * @param {string} illustration - 'box' | 'search' | 'document' | custom ReactNode
 * @param {string} title - Título del estado vacío
 * @param {string} description - Texto explicativo y de guía
 * @param {ReactNode} action - Botón o acción primaria (ej. <SketchButton>)
 */
export function SketchEmptyState({
  illustration = 'box',
  title = 'No hay elementos por aquí',
  description = 'Parece que todavía no se ha agregado ningún dato a esta sección.',
  action,
  children,
  className = '',
  ...props
}) {
  const renderIllustration = () => {
    if (typeof illustration !== 'string') {
      return illustration;
    }

    switch (illustration) {
      case 'search':
        return (
          <svg
            viewBox="0 0 120 120"
            className="sketch-empty-state__svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sombra de la lupa */}
            <circle cx="54" cy="54" r="32" fill="rgba(0,0,0,0.06)" />
            {/* Aro de la lupa */}
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="#ffffff"
              stroke="#18181b"
              strokeWidth="3"
            />
            {/* Mango de la lupa con ángulo */}
            <path
              d="M 72 72 L 102 102 C 104 104, 107 101, 105 99 L 75 69 Z"
              fill="#f59e0b"
              stroke="#18181b"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Signo de interrogante doodle en el lente */}
            <path
              d="M 44 42 C 44 36, 56 36, 56 43 C 56 48, 50 49, 50 54"
              fill="none"
              stroke="#0284c7"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="50" cy="62" r="2.5" fill="#0284c7" />
          </svg>
        );

      case 'document':
        return (
          <svg
            viewBox="0 0 120 120"
            className="sketch-empty-state__svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hoja de papel con esquina doblada */}
            <path
              d="M 32 18 L 76 18 L 94 36 L 94 102 L 32 102 Z"
              fill="#ffffff"
              stroke="#18181b"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Doblez de la esquina */}
            <path
              d="M 76 18 L 76 36 L 94 36 Z"
              fill="#fef08a"
              stroke="#18181b"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Renglones punteados vacíos */}
            <line x1="44" y1="48" x2="80" y2="48" stroke="#a1a1aa" strokeWidth="2.5" strokeDasharray="4 4" />
            <line x1="44" y1="62" x2="74" y2="62" stroke="#a1a1aa" strokeWidth="2.5" strokeDasharray="4 4" />
            <line x1="44" y1="76" x2="68" y2="76" stroke="#a1a1aa" strokeWidth="2.5" strokeDasharray="4 4" />
          </svg>
        );

      case 'box':
      default:
        return (
          <svg
            viewBox="0 0 120 120"
            className="sketch-empty-state__svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sombra de la caja */}
            <ellipse cx="60" cy="100" rx="42" ry="8" fill="rgba(0,0,0,0.08)" />
            {/* Caja de cartón abierta doodle */}
            <path
              d="M 28 50 L 60 36 L 92 50 L 92 86 L 60 100 L 28 86 Z"
              fill="#fef3c7"
              stroke="#18181b"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <line x1="60" y1="36" x2="60" y2="100" stroke="#18181b" strokeWidth="2.5" />
            {/* Solapa izquierda abierta */}
            <path
              d="M 28 50 L 16 34 L 46 24 L 60 36 Z"
              fill="#fde68a"
              stroke="#18181b"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Solapa derecha abierta */}
            <path
              d="M 92 50 L 104 34 L 74 24 L 60 36 Z"
              fill="#fde68a"
              stroke="#18181b"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Tira washi tape en la solapa */}
            <rect
              x="52"
              y="18"
              width="16"
              height="22"
              transform="rotate(15 60 29)"
              fill="rgba(2, 132, 199, 0.4)"
              stroke="#18181b"
              strokeWidth="1.5"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`sketch-empty-state ${className}`} {...props}>
      <div className="sketch-empty-state__illustration">
        {renderIllustration()}
      </div>

      <h3 className="sketch-empty-state__title">{title}</h3>
      <p className="sketch-empty-state__desc">{description}</p>

      {action && <div className="sketch-empty-state__actions">{action}</div>}
      {children}
    </div>
  );
}

export default SketchEmptyState;

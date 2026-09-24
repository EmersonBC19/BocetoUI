import React, { useState } from 'react';
import './SketchTooltip.css';

/**
 * SketchTooltip - Viñeta o bocadillo flotante con trazo de boceto y flecha de plumilla.
 * 
 * @param {string|React.ReactNode} content - Texto o elemento dentro del tooltip
 * @param {'top'|'bottom'|'left'|'right'} position - Posición respecto al elemento hijo
 * @param {React.ReactNode} children - Elemento que activa el tooltip
 */
export function SketchTooltip({
  content,
  position = 'top',
  children,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`sketch-tooltip-wrapper ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && (
        <div
          role="tooltip"
          className={`sketch-tooltip sketch-tooltip--${position}`}
        >
          <div className="sketch-tooltip__bubble">
            {content}
            <div className={`sketch-tooltip__arrow sketch-tooltip__arrow--${position}`} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SketchTooltip;

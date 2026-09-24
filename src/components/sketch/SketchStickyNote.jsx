import React from 'react';
import './SketchStickyNote.css';

/**
 * SketchStickyNote - Nota adhesiva estilo Post-it con chincheta o cinta y rotación natural.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'yellow'|'pink'|'blue'|'green'|'orange'} [props.color='yellow']
 * @param {boolean} [props.hasPin=true] - Si muestra la chincheta decorativa arriba.
 * @param {number} [props.tilt] - Grados de rotación manual (ej: -2, 3, 0).
 * @param {string} [props.className]
 */
export function SketchStickyNote({
  children,
  color = 'yellow',
  hasPin = true,
  tilt,
  className = '',
  style = {},
  ...rest
}) {
  const customStyle = {
    ...style,
    ...(tilt !== undefined ? { transform: `rotate(${tilt}deg)` } : {})
  };

  return (
    <div
      className={`sketch-sticky-note sketch-sticky-note--${color} ${className}`}
      style={customStyle}
      {...rest}
    >
      {hasPin && <div className="sketch-sticky-note__pin" />}
      {children}
    </div>
  );
}

export default SketchStickyNote;

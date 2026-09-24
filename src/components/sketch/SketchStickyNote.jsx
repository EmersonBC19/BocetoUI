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
  hasPin,
  pin,
  tilt,
  rotation,
  className = '',
  style = {},
  ...rest
}) {
  // Soporte bidireccional para hasPin o pin (por defecto true)
  const showPin = pin !== undefined ? Boolean(pin) : (hasPin !== undefined ? Boolean(hasPin) : true);

  // Soporte bidireccional para tilt o rotation
  const angle = tilt !== undefined ? tilt : rotation;

  const customStyle = {
    ...style,
    ...(angle !== undefined ? { transform: `rotate(${angle}deg)` } : {})
  };

  return (
    <div
      className={`sketch-sticky-note sketch-sticky-note--${color} ${className}`}
      style={customStyle}
      {...rest}
    >
      {showPin && <div className="sketch-sticky-note__pin" />}
      {children}
    </div>
  );
}

export default SketchStickyNote;

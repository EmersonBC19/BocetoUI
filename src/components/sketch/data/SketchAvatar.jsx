import React from 'react';
import './SketchAvatar.css';

/**
 * SketchAvatar - Avatar con borde de bucle dibujado a mano alzada.
 *
 * @param {Object} props
 * @param {string} [props.src] - URL de imagen opcional.
 * @param {string} [props.alt='Avatar']
 * @param {string} [props.initials] - Iniciales a lápiz si no hay imagen.
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.status] - Si muestra badge online.
 * @param {string} [props.className]
 */
export function SketchAvatar({
  src,
  alt = 'Avatar',
  initials = '?',
  size = 'md',
  status,
  className = '',
  ...rest
}) {
  return (
    <div className={`sketch-avatar sketch-avatar--${size} ${className}`} {...rest}>
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <span>{initials}</span>
      )}
      {status && <span className="sketch-avatar-badge" />}
    </div>
  );
}

export default SketchAvatar;

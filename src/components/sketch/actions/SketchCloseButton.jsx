import React from 'react';
import './SketchCloseButton.css';
import { SketchCloseIcon } from '../SketchIcons';

/**
 * SketchCloseButton - Botón de cierre y limpieza con trazo artesanal dibujado a mano.
 *
 * @param {Object} props
 * @param {'xs'|'sm'|'md'|'lg'} [props.size='md'] - Dimensión del botón
 * @param {'default'|'ghost'|'danger'} [props.variant='default'] - Estilo visual
 * @param {string} [props.title='Cerrar'] - Tooltip nativo
 * @param {string} [props.ariaLabel='Cerrar'] - Etiqueta accesible
 * @param {Function} [props.onClick] - Callback al hacer clic
 * @param {string} [props.className] - Clases CSS adicionales
 */
export function SketchCloseButton({
  size = 'md',
  variant = 'default',
  title = 'Cerrar',
  ariaLabel = 'Cerrar',
  onClick,
  className = '',
  iconSize,
  strokeWidth = 2.8,
  ...props
}) {
  const iconPixelSizes = {
    xs: 10,
    sm: 12,
    md: 15,
    lg: 18
  };

  const finalIconSize = iconSize || iconPixelSizes[size] || 14;

  return (
    <button
      type="button"
      className={`sketch-close-btn sketch-close-btn--${size} sketch-close-btn--${variant} ${className}`}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel || title}
      {...props}
    >
      <SketchCloseIcon size={finalIconSize} strokeWidth={strokeWidth} />
    </button>
  );
}

export default SketchCloseButton;

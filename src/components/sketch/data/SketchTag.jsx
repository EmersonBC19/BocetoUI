import React from 'react';
import './SketchTag.css';
import { SketchCloseButton } from '../actions/SketchCloseButton';

/**
 * SketchTag - Etiqueta / Chip con trazo de pluma y botón de cierre opcional.
 * 
 * @param {string|React.ReactNode} children - Contenido de la etiqueta
 * @param {'default'|'blue'|'green'|'red'|'yellow'|'purple'} color - Color del tag
 * @param {'sm'|'md'|'lg'} size - Tamaño
 * @param {Function} onRemove - Callback para eliminar
 * @param {React.ReactNode} icon - Icono opcional
 */
export function SketchTag({
  children,
  color = 'default',
  size = 'md',
  onRemove,
  icon,
  className = ''
}) {
  return (
    <span className={`sketch-tag sketch-tag--${color} sketch-tag--${size} ${className}`}>
      {icon && <span className="sketch-tag__icon">{icon}</span>}
      <span className="sketch-tag__label">{children}</span>
      {onRemove && (
        <SketchCloseButton
          size="xs"
          variant="ghost"
          className="sketch-tag__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          ariaLabel="Eliminar etiqueta"
          title="Eliminar"
        />
      )}
    </span>
  );
}

export default SketchTag;

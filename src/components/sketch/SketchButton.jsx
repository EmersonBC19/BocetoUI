import React, { useState } from 'react';
import './SketchButton.css';
import { SketchLoader } from './SketchLoader';

/**
 * SketchButton - Botón con estilos de dibujo a mano artesanal y física elástica.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Texto o contenido del botón.
 * @param {'wobbly'|'architect'|'double-line'|'marker'|'dashed'|'grunge'|'comic'|'dymo'|'pencil'} [props.variant='wobbly'] - Estilo del trazo.
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Tamaño del botón.
 * @param {'default'|'blue'|'red'|'green'} [props.color='default'] - Tono de la tinta o trazo.
 * @param {React.ReactNode} [props.icon] - Icono opcional al inicio.
 * @param {string} [props.shortcut] - Atajo de teclado visible (ej: "Enter", "⌘K").
 * @param {boolean|string} [props.burst=false] - Dispara onomatopeya cómic al hacer clic (ej: true, "¡BAM!", "¡CLIC!").
 * @param {boolean} [props.boilOnHover=false] - Activa temblor stop-motion line-boil al pasar el cursor.
 * @param {boolean} [props.loading=false] - Estado de carga con animación de humo.
 * @param {boolean} [props.disabled=false] - Deshabilitado.
 * @param {Function} [props.onClick] - Evento de clic.
 * @param {string} [props.className] - Clases CSS extra.
 */
export function SketchButton({
  children,
  variant = 'wobbly',
  size = 'md',
  color = 'default',
  icon,
  shortcut,
  burst = false,
  boilOnHover = false,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...rest
}) {
  const [activeBurst, setActiveBurst] = useState(null);

  const handleClick = (e) => {
    if (disabled || loading) return;

    if (burst) {
      const text = typeof burst === 'string' ? burst : '¡CLIC!';
      setActiveBurst(text);
      setTimeout(() => {
        setActiveBurst(null);
      }, 650);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const classes = [
    'sketch-btn',
    `sketch-btn--${variant}`,
    `sketch-btn--${size}`,
    color !== 'default' ? `sketch-btn--color-${color}` : '',
    boilOnHover ? 'sketch-boil-hover' : '',
    loading ? 'sketch-btn--loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...rest}
    >
      {/* Onomatopeya flotante de impacto cómic */}
      {activeBurst && (
        <span className="sketch-btn__burst sketch-onomatopoeia">
          {activeBurst}
        </span>
      )}

      {loading ? (
        <span className="sketch-btn__loader" style={{ display: 'inline-flex', marginRight: '6px' }}>
          <SketchLoader variant="dust-run" size="sm" />
        </span>
      ) : (
        icon && <span className="sketch-btn__icon">{icon}</span>
      )}
      <span>{children}</span>

      {shortcut && (
        <kbd className="sketch-btn__shortcut">
          {shortcut}
        </kbd>
      )}
    </button>
  );
}

export default SketchButton;

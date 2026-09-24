import React from 'react';
import './SketchCard.css';

/**
 * SketchCard - Contenedor con marcos de boceto inspirados en las imágenes.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido interior.
 * @param {'blueprint'|'taped'|'folded'|'notepad'|'double-line'|'wavy'|'grunge'} [props.variant='blueprint']
 * @param {'top-center'|'corners'} [props.tapePosition='top-center'] - Posición de la cinta si variant='taped'.
 * @param {string} [props.title] - Título opcional en cabecera de boceto.
 * @param {React.ReactNode} [props.headerAction] - Acción o icono a la derecha del título.
 * @param {React.ReactNode} [props.footer] - Pie de tarjeta opcional.
 * @param {string} [props.className] - Clases CSS extra.
 * @param {Object} [props.style] - Estilos inline.
 */
export function SketchCard({
  children,
  variant = 'blueprint',
  tapePosition = 'top-center',
  title,
  headerAction,
  footer,
  className = '',
  style = {},
  ...rest
}) {
  const classes = [
    'sketch-card',
    `sketch-card--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} {...rest}>
      {/* Cinta washi tape si variant === 'taped' */}
      {variant === 'taped' && tapePosition === 'top-center' && (
        <div className="sketch-card__tape sketch-card__tape--top-center" />
      )}
      {variant === 'taped' && tapePosition === 'corners' && (
        <>
          <div className="sketch-card__tape sketch-card__tape--corner-left" />
          <div className="sketch-card__tape sketch-card__tape--corner-right" />
        </>
      )}

      {/* Anillas de libreta si variant === 'notepad' */}
      {variant === 'notepad' && (
        <div className="sketch-card__rings">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="sketch-card__ring" />
          ))}
        </div>
      )}

      {/* Solapa doblada si variant === 'folded' */}
      {variant === 'folded' && <div className="sketch-card__fold" />}

      {/* Esquina doblada realista si variant === 'dog-ear' */}
      {variant === 'dog-ear' && <div className="sketch-card__dog-ear" aria-hidden="true" />}

      {/* Cabecera si hay título */}
      {title && (
        <div className="sketch-card__header">
          <span>{title}</span>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Contenido principal */}
      <div className="sketch-card__body">
        {children}
      </div>

      {/* Pie de tarjeta */}
      {footer && (
        <div className="sketch-card__footer">
          {footer}
        </div>
      )}
    </div>
  );
}

export default SketchCard;

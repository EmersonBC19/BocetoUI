import React, { useState, useRef, useEffect } from 'react';
import './SketchPopover.css';
import { SketchCloseButton } from '../actions/SketchCloseButton';

/**
 * SketchPopover - Panel flotante artesanal anclado a un elemento
 * @param {React.ReactNode} trigger - Elemento que dispara el popover
 * @param {React.ReactNode} children - Contenido enriquecido del popover
 * @param {string} [title] - Título opcional
 * @param {('top'|'bottom'|'left'|'right')} [placement='bottom'] - Posición respecto al trigger
 * @param {string} [width='280px'] - Ancho del panel
 */
export function SketchPopover({
  trigger,
  children,
  title,
  placement = 'bottom',
  width = '280px',
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`sketch-popover-container ${className}`}
      {...props}
    >
      <div
        className="sketch-popover-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`sketch-popover-panel sketch-popover-panel--${placement}`}
          style={{ width }}
          role="dialog"
        >
          {/* Cabecera si hay título */}
          {(title || true) && (
            <div className="sketch-popover-header">
              {title && <span className="sketch-popover-title">{title}</span>}
              <SketchCloseButton
                size="xs"
                variant="ghost"
                className="sketch-popover-close"
                onClick={() => setIsOpen(false)}
                ariaLabel="Cerrar popover"
                title="Cerrar"
              />
            </div>
          )}

          {/* Cuerpo del contenido */}
          <div className="sketch-popover-body">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default SketchPopover;

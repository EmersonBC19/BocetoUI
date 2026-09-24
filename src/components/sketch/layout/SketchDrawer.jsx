import React, { useEffect } from 'react';
import './SketchDrawer.css';
import { SketchCloseButton } from '../actions/SketchCloseButton';

/**
 * SketchDrawer - Panel lateral desplegable artesanal (Off-canvas / Sheet)
 * @param {boolean} isOpen - Estado visible del panel
 * @param {function} onClose - Callback al solicitar cerrar
 * @param {string} title - Título del encabezado
 * @param {string} placement - 'right' | 'left'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {ReactNode} footer - Acciones del pie de panel
 */
export function SketchDrawer({
  isOpen = false,
  onClose,
  title,
  placement = 'right',
  size = 'md',
  children,
  footer,
  className = '',
  ...props
}) {
  // Manejo de la tecla Escape para cerrar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Bloqueo de scroll en body al estar abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={`sketch-drawer-backdrop ${isOpen ? 'sketch-drawer-backdrop--open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
      aria-hidden={!isOpen}
    >
      <aside
        className={`sketch-drawer sketch-drawer--${placement} sketch-drawer--${size} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sketch-drawer-title"
        {...props}
      >
        {/* Encabezado con cenefa washi */}
        <header className="sketch-drawer__header">
          <div className="sketch-drawer__washi" aria-hidden="true" />
          <h2 id="sketch-drawer-title" className="sketch-drawer__title">
            {title}
          </h2>
          {onClose && (
            <SketchCloseButton
              size="md"
              variant="default"
              className="sketch-drawer__close-btn"
              onClick={onClose}
              ariaLabel="Cerrar panel lateral"
              title="Cerrar panel"
            />
          )}
        </header>

        {/* Cuerpo con scroll propio */}
        <div className="sketch-drawer__body">{children}</div>

        {/* Pie de panel opcional */}
        {footer && <footer className="sketch-drawer__footer">{footer}</footer>}
      </aside>
    </div>
  );
}

export default SketchDrawer;

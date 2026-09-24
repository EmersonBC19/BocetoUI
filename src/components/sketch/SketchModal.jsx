import React, { useEffect, useState } from 'react';
import './SketchModal.css';
import { SketchCloseButton } from './actions/SketchCloseButton';

/**
 * SketchModal - Diálogo modal con animación elástica de rebote (bungee)
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Si está visible el modal.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {string} [props.title] - Título del diálogo.
 * @param {React.ReactNode} props.children - Contenido interior.
 * @param {React.ReactNode} [props.footer] - Botones o acciones del pie.
 * @param {boolean} [props.hasTape=true] - Si muestra la cinta decorativa arriba.
 */
export function SketchModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  hasTape = true
}) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 210);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`sketch-modal-backdrop ${isClosing ? 'sketch-modal-backdrop--closing' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`sketch-modal ${isClosing ? 'sketch-modal--closing' : 'sketch-modal--opening'}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {hasTape && <div className="sketch-modal__tape" />}

        <SketchCloseButton
          size="md"
          variant="default"
          className="sketch-modal__close"
          onClick={handleClose}
          ariaLabel="Cerrar modal"
          title="Cerrar modal"
        />

        {title && <div className="sketch-modal__header">{title}</div>}

        <div className="sketch-modal__body">
          {children}
        </div>

        {footer && <div className="sketch-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

export default SketchModal;

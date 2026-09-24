import React, { useEffect, useRef, useState } from 'react';
import './SketchToast.css';
import { SketchCheckIcon, SketchAlertIcon, SketchSparkleIcon } from '../SketchIcons';
import { SketchCloseButton } from '../actions/SketchCloseButton';

/**
 * SketchToast - Notificación flotante de boceto con tira de cinta washi, mecha animada y marco orgánico.
 * 
 * @param {string} message - Texto de la notificación
 * @param {'info'|'success'|'warning'|'error'} type - Tipo de notificación
 * @param {Function} onClose - Callback al cerrar
 * @param {boolean} isOpen - Control de visibilidad
 * @param {number} [duration=4500] - Tiempo en ms antes de auto-cerrar (0 para persistente)
 * @param {boolean} [pauseOnHover=true] - Pausa la cuenta regresiva y mecha al pasar el ratón
 * @param {'top-right'|'top-left'|'top-center'|'bottom-right'|'bottom-left'|'bottom-center'} [position='top-right'] - Ubicación en pantalla
 */
export function SketchToast({
  message,
  type = 'success',
  onClose,
  isOpen = true,
  duration = 4500,
  pauseOnHover = true,
  position = 'top-right',
  className = '',
  style = {}
}) {
  const [isHovered, setIsHovered] = useState(false);
  const remainingTimeRef = useRef(duration);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef(null);

  // Manejo de temporizador y reinicio al cambiar mensaje/visibilidad/duración
  useEffect(() => {
    if (!isOpen || !message || !duration || duration <= 0 || !onClose) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    remainingTimeRef.current = duration;
    startTimeRef.current = Date.now();
    setIsHovered(false);

    timerRef.current = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen, message, type, duration, onClose]);

  const handleMouseEnter = () => {
    if (!pauseOnHover || !duration || duration <= 0 || !onClose) return;
    setIsHovered(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    }
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover || !duration || duration <= 0 || !onClose) return;
    setIsHovered(false);
    if (remainingTimeRef.current > 0) {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        onClose();
      }, remainingTimeRef.current);
    } else {
      onClose();
    }
  };

  if (!isOpen || !message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return <SketchCheckIcon size={20} color="#16a34a" />;
      case 'warning': return <SketchAlertIcon size={20} color="#ca8a04" />;
      case 'error': return <SketchCloseIcon size={20} color="#dc2626" />;
      default: return <SketchSparkleIcon size={20} color="#2563eb" />;
    }
  };

  const getBurst = () => {
    switch (type) {
      case 'success': return '¡LISTO!';
      case 'warning': return '¡OJO!';
      case 'error': return '¡UPS!';
      default: return '¡NOTA!';
    }
  };

  return (
    <div
      className={`sketch-toast-container sketch-toast-container--${position} sketch-toast-container--${type} ${className}`}
      style={{
        '--toast-duration': `${duration || 4500}ms`,
        ...style
      }}
    >
      <div
        className={`sketch-toast ${isHovered ? 'sketch-toast--paused' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sketch-toast__tape" />
        {pauseOnHover && duration > 0 && (
          <span className="sketch-toast__pause-pill" aria-hidden="true">
            ⏸ pausa
          </span>
        )}
        <div className="sketch-toast__icon">
          {getIcon()}
        </div>
        <div className="sketch-toast__content">
          <span className="sketch-toast__burst">{getBurst()}</span> {message}
        </div>
        {onClose && (
          <SketchCloseButton
            size="xs"
            variant="ghost"
            className="sketch-toast__close"
            onClick={onClose}
            ariaLabel="Cerrar notificación"
            title="Cerrar"
          />
        )}
        {duration > 0 && (
          <div
            key={`${message}-${duration}`}
            className="sketch-toast__fuse-bar"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

export default SketchToast;

import React from 'react';
import './SketchAlert.css';
import {
  SketchAlertIcon,
  SketchCheckIcon,
  SketchLightbulbIcon,
  SketchPinIcon
} from '../SketchIcons';
import { SketchCloseButton } from '../actions/SketchCloseButton';

/**
 * SketchAlert - Alerta o llamada de atención estilo nota técnica o post-it.
 *
 * @param {Object} props
 * @param {'info'|'success'|'warning'|'error'} [props.variant='info']
 * @param {'info'|'success'|'warning'|'error'} [props.type] - Alias para variant.
 * @param {string} [props.title]
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.icon]
 * @param {Function} [props.onClose] - Callback para descartar la alerta. Muestra botón de cierre.
 * @param {boolean} [props.dismissible=false] - Muestra botón de cierre si es true.
 * @param {string} [props.className]
 */
export function SketchAlert({
  variant,
  type,
  title,
  children,
  icon,
  onClose,
  dismissible = false,
  className = '',
  ...rest
}) {
  const currentVariant = variant || type || 'info';

  const defaultIcons = {
    info: <SketchPinIcon size={20} />,
    success: <SketchCheckIcon size={20} />,
    warning: <SketchLightbulbIcon size={20} />,
    error: <SketchAlertIcon size={20} />
  };

  const renderIcon = icon !== undefined ? icon : defaultIcons[currentVariant];
  const canClose = Boolean(onClose || dismissible);

  return (
    <div
      className={`sketch-alert sketch-alert--${currentVariant} ${canClose ? 'sketch-alert--dismissible' : ''} ${className}`}
      role="alert"
      {...rest}
    >
      {renderIcon && <span className="sketch-alert__icon">{renderIcon}</span>}
      <div className="sketch-alert__content">
        {title && <div className="sketch-alert__title">{title}</div>}
        <div className="sketch-alert__body">{children}</div>
      </div>
      {canClose && (
        <SketchCloseButton
          size="sm"
          variant="ghost"
          className="sketch-alert__close-btn"
          onClick={onClose}
          ariaLabel="Cerrar alerta"
          title="Cerrar alerta"
        />
      )}
    </div>
  );
}

export default SketchAlert;

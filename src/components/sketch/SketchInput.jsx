import React, { useState } from 'react';
import './SketchInput.css';
import { SketchAlertIcon, SketchCloseIcon } from './SketchIcons';

/**
 * SketchInput - Campo de entrada con bordes de boceto o renglón de cuaderno.
 *
 * @param {Object} props
 * @param {string} [props.label] - Etiqueta de texto.
 * @param {'boxed'|'underline'} [props.variant='boxed'] - Estilo visual.
 * @param {React.ReactNode} [props.icon] - Icono dentro del input (lado izquierdo).
 * @param {React.ReactNode} [props.endAdornment] - Elemento o botón al final del input (lado derecho).
 * @param {string} [props.error] - Mensaje de error a mano.
 * @param {boolean} [props.clearable=false] - Botón para limpiar contenido.
 * @param {boolean} [props.required=false] - Campo obligatorio.
 * @param {string} [props.className] - Clases adicionales.
 */
export function SketchInput({
  label,
  variant = 'boxed',
  icon,
  endAdornment,
  error,
  clearable = false,
  required = false,
  className = '',
  id,
  value,
  onChange,
  ...rest
}) {
  const inputId = id || (label ? `sketch-in-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const hasEndElement = Boolean(endAdornment || (clearable && value));

  const inputClasses = [
    'sketch-input',
    `sketch-input--${variant}`,
    icon ? 'sketch-input--has-icon' : '',
    hasEndElement ? 'sketch-input--has-end-adornment' : '',
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'sketch-input-wrapper',
    `sketch-input-wrapper--${variant}`,
    icon ? 'sketch-input-wrapper--has-icon' : '',
    error ? 'sketch-shake' : ''
  ].filter(Boolean).join(' ');

  const handleClear = (e) => {
    e.preventDefault();
    if (onChange) {
      const event = { target: { value: '' } };
      onChange(event);
    }
  };

  return (
    <div className={`sketch-form-group ${error ? 'sketch-form-group--error' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="sketch-label">
          {label}
          {required && <span className="sketch-label__required">*</span>}
        </label>
      )}

      <div className={wrapperClasses}>
        <input
          id={inputId}
          className={inputClasses}
          value={value}
          onChange={onChange}
          {...rest}
        />
        {icon && <span className="sketch-input-icon">{icon}</span>}
        
        {endAdornment ? (
          <div className="sketch-input-end-adornment">
            {endAdornment}
          </div>
        ) : clearable && value ? (
          <button
            type="button"
            className="sketch-input-eraser sketch-clear-btn sketch-clear-btn--sm sketch-clear-btn--ghost"
            onClick={handleClear}
            title="Borrar contenido"
            aria-label="Limpiar campo"
          >
            <SketchCloseIcon size={11} strokeWidth={2.8} />
          </button>
        ) : null}

        {/* Corrección de profesor con tinta roja */}
        {error && <div className="sketch-correction-circle" aria-hidden="true" />}
      </div>

      {error && (
        <span className="sketch-error-text">
          <span className="sketch-error-arrow" aria-hidden="true">↳</span>
          <SketchAlertIcon size={14} /> {error}
        </span>
      )}
    </div>
  );
}

/**
 * SketchTextarea - Área de texto multilínea estilo bloc de notas.
 */
export function SketchTextarea({
  label,
  variant = 'boxed',
  error,
  required = false,
  className = '',
  id,
  rows = 4,
  ...rest
}) {
  const areaId = id || (label ? `sketch-ta-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const areaClasses = [
    'sketch-textarea',
    `sketch-textarea--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const currentLength = typeof rest.value === 'string' ? rest.value.length : 0;

  return (
    <div className={`sketch-form-group ${error ? 'sketch-form-group--error' : ''}`}>
      {label && (
        <label htmlFor={areaId} className="sketch-label">
          {label}
          {required && <span className="sketch-label__required">*</span>}
        </label>
      )}

      <div className={`sketch-textarea-wrapper ${error ? 'sketch-shake' : ''}`}>
        <textarea id={areaId} rows={rows} className={areaClasses} {...rest} />

        {/* Corrección de profesor con tinta roja */}
        {error && <div className="sketch-correction-circle" aria-hidden="true" />}
      </div>

      <div className="sketch-textarea-footer">
        {error ? (
          <span className="sketch-error-text">
            <span className="sketch-error-arrow" aria-hidden="true">↳</span>
            <SketchAlertIcon size={14} /> {error}
          </span>
        ) : <span />}

        {rest.maxLength && (
          <span className="sketch-char-count">
            ✏️ {currentLength} / {rest.maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

export default SketchInput;

import React from 'react';
import './SketchCheckbox.css';

/**
 * SketchCheckbox - Casilla de verificación con trazo y palomita dibujada a mano.
 * @param {'check'|'cross'} [variant='check'] - Estilo de marca (palomita o tachón en X)
 */
export function SketchCheckbox({
  label,
  checked,
  defaultChecked,
  variant = 'check',
  onChange,
  disabled = false,
  className = '',
  id,
  ...rest
}) {
  const checkboxId = id || (label ? `sketch-chk-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label className={`sketch-toggle ${disabled ? 'sketch-toggle--disabled' : ''} ${className}`}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      <span className="sketch-checkbox__box">
        {variant === 'cross' ? (
          /* SVG de tachón artesanal en X */
          <svg className="sketch-checkbox__mark sketch-checkbox__mark--cross" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* SVG de palomita imperfecta a mano */
          <svg className="sketch-checkbox__mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}

/**
 * SketchRadio - Botón de selección circular con punto dibujado al rellenar.
 */
export function SketchRadio({
  label,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  className = '',
  id,
  ...rest
}) {
  const radioId = id || (label ? `sketch-rad-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label className={`sketch-toggle ${disabled ? 'sketch-toggle--disabled' : ''} ${className}`}>
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      <span className="sketch-radio__circle">
        <span className="sketch-radio__dot" />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}

export default SketchCheckbox;

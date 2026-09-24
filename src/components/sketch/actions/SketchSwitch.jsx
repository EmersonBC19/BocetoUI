import React, { useState } from 'react';
import './SketchSwitch.css';

/**
 * SketchSwitch - Interruptor deslizante estilo dibujo artesanal con física elástica.
 *
 * @param {Object} props
 * @param {string} [props.label] - Etiqueta exterior.
 * @param {boolean} [props.checked] - Estado controlado.
 * @param {boolean} [props.defaultChecked] - Estado inicial.
 * @param {boolean} [props.showLabels=false] - Muestra texto manuscrito SÍ/NO dentro del riel.
 * @param {'default'|'crayon'|'chalk'} [props.variant='default'] - Variante estética.
 * @param {Function} [props.onChange] - Recibe (checked: boolean, event: React.ChangeEvent)
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className]
 */
export function SketchSwitch({
  label,
  checked,
  defaultChecked = false,
  showLabels = false,
  variant = 'default',
  onChange,
  disabled = false,
  className = '',
  id,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const rawValue = isControlled ? checked : internalChecked;
  const isChecked = (typeof rawValue === 'object' && rawValue !== null && 'target' in rawValue)
    ? Boolean(rawValue.target?.checked)
    : Boolean(rawValue);

  const switchId = id || (label ? `sketch-sw-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : undefined);

  const handleInputChange = (e) => {
    if (disabled) return;
    const nextVal = Boolean(e.target.checked);
    if (!isControlled) {
      setInternalChecked(nextVal);
    }
    if (rest.onCheckedChange) {
      rest.onCheckedChange(nextVal);
    }
    if (onChange) {
      onChange(nextVal, e);
    }
  };

  return (
    <label className={`sketch-switch-wrapper sketch-switch--${variant} ${disabled ? 'sketch-switch--disabled' : ''} ${className}`}>
      <input
        type="checkbox"
        id={switchId}
        checked={isChecked}
        onChange={handleInputChange}
        disabled={disabled}
        role="switch"
        aria-checked={isChecked}
        {...rest}
      />
      <span className="sketch-switch-track">
        {showLabels && (
          <span className="sketch-switch-labels" aria-hidden="true">
            <span className="sketch-switch-label-on">SÍ</span>
            <span className="sketch-switch-label-off">NO</span>
          </span>
        )}
        <span className="sketch-switch-knob" />
      </span>
      {label && <span className="sketch-switch-text">{label}</span>}
    </label>
  );
}

export default SketchSwitch;

import React, { useState } from 'react';
import './SketchSlider.css';

/**
 * SketchSlider - Deslizador estilo regla y boceto a mano.
 *
 * @param {Object} props
 * @param {string} [props.label]
 * @param {number} [props.min=0]
 * @param {number} [props.max=100]
 * @param {number} [props.step=1]
 * @param {number} [props.value]
 * @param {number} [props.defaultValue=50]
 * @param {Function} [props.onChange]
 * @param {string} [props.unit='']
 * @param {string} [props.className]
 */
export function SketchSlider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onChange,
  unit = '',
  className = '',
  id,
  ...rest
}) {
  const [internalVal, setInternalVal] = useState(value !== undefined ? value : defaultValue);
  const currentVal = value !== undefined ? value : internalVal;
  
  const percentage = Math.min(100, Math.max(0, ((currentVal - min) / (max - min)) * 100));

  const handleChange = (e) => {
    const newVal = Number(e.target.value);
    if (value === undefined) setInternalVal(newVal);
    if (onChange) onChange(newVal, e);
  };

  const sliderId = id || (label ? `sketch-sl-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={`sketch-slider-group ${className}`}>
      {(label || unit) && (
        <div className="sketch-slider-header">
          {label && <label htmlFor={sliderId} className="sketch-slider-label">{label}</label>}
          <span className="sketch-slider-value">{currentVal}{unit}</span>
        </div>
      )}

      <div className="sketch-slider-track-wrap">
        <div className="sketch-slider-track-bg" />
        <div
          className="sketch-slider-track-fill"
          style={{ width: `calc(${percentage}% - 8px)` }}
        />
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentVal}
          onChange={handleChange}
          className="sketch-slider-input"
          {...rest}
        />
      </div>

      {/* Marcas de regla milimetrada de arquitecto */}
      <div className="sketch-slider-ticks" aria-hidden="true">
        <span>|</span>
        <span>:</span>
        <span>|</span>
        <span>:</span>
        <span>|</span>
      </div>
    </div>
  );
}

export default SketchSlider;

import React, { useState } from 'react';
import './SketchColorPicker.css';
import { Pipette, Check } from 'lucide-react';

const DEFAULT_PRESETS = [
  { label: 'Tinta Negra', hex: '#1a1a1a' },
  { label: 'Grafito', hex: '#5e6472' },
  { label: 'Rojo Tinta', hex: '#b91c1c' },
  { label: 'Azul Pluma', hex: '#1d4ed8' },
  { label: 'Verde Hoja', hex: '#15803d' },
  { label: 'Resaltador Amarillo', hex: '#fef08a' },
  { label: 'Naranja Lápiz', hex: '#fed7aa' },
  { label: 'Rosa Acuarela', hex: '#fbcfe8' },
  { label: 'Lavanda', hex: '#e9d5ff' },
  { label: 'Cian Libreta', hex: '#bfdbfe' },
  { label: 'Verde Menta', hex: '#bbf7d0' },
  { label: 'Tiza Blanca', hex: '#ffffff' }
];

/**
 * SketchColorPicker - Paleta de colores artesanal estilo acuarelas y lápices
 */
export function SketchColorPicker({
  value = '#1d4ed8',
  onChange,
  presets = DEFAULT_PRESETS,
  label = 'Paleta de Color',
  className = '',
  ...props
}) {
  const [internalColor, setInternalColor] = useState(value);
  const currentColor = value || internalColor;

  const handleColorChange = (hex) => {
    setInternalColor(hex);
    onChange?.(hex);
  };

  const getContrastColor = (hex) => {
    if (!hex || hex === 'transparent') return '#1a1a1a';
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2) || '00', 16);
    const g = parseInt(c.substring(2, 4) || '00', 16);
    const b = parseInt(c.substring(4, 6) || '00', 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? '#1a1a1a' : '#ffffff';
  };

  return (
    <div className={`sketch-color-picker ${className}`} {...props}>
      {label && <div className="sketch-color-picker__label">{label}</div>}

      <div className="sketch-color-picker__swatches">
        {presets.map((preset) => {
          const hex = typeof preset === 'string' ? preset : preset.hex;
          const isActive = currentColor.toLowerCase() === hex.toLowerCase();
          const checkColor = getContrastColor(hex);

          return (
            <button
              key={hex}
              type="button"
              className={`sketch-color-picker__swatch ${isActive ? 'sketch-color-picker__swatch--active' : ''}`}
              style={{ backgroundColor: hex }}
              onClick={() => handleColorChange(hex)}
              title={typeof preset === 'object' ? preset.label : hex}
              aria-label={typeof preset === 'object' ? preset.label : hex}
            >
              {isActive && <Check size={14} color={checkColor} strokeWidth={3} className="sketch-color-picker__check" />}
            </button>
          );
        })}
      </div>

      <div className="sketch-color-picker__footer">
        <div
          className="sketch-color-picker__preview"
          style={{ backgroundColor: currentColor }}
          title={`Color activo: ${currentColor}`}
        />

        <div className="sketch-color-picker__input-wrap">
          <input
            type="text"
            className="sketch-color-picker__hex-input"
            value={currentColor}
            onChange={(e) => handleColorChange(e.target.value)}
            maxLength={7}
            placeholder="#000000"
          />
        </div>

        <div className="sketch-color-picker__native-btn" title="Selector libre de color">
          <Pipette size={15} />
          <input
            type="color"
            className="sketch-color-picker__native-input"
            value={currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : '#1d4ed8'}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SketchColorPicker;

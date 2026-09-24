import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchColorPicker } from '../../components/sketch';

export function ColorPickerDoc({ onTriggerToast }) {
  const [inkColor, setInkColor] = useState('#1d4ed8');
  const [customColor, setCustomColor] = useState('#15803d');

  const propsList = [
    { name: 'value', type: 'string', default: "'#1d4ed8'", description: 'Color hexadecimal seleccionado' },
    { name: 'onChange', type: '(hex: string) => void', default: 'undefined', description: 'Callback al cambiar o seleccionar color' },
    { name: 'label', type: 'string', default: "'Paleta de Color'", description: 'Título de la paleta' },
    { name: 'presets', type: 'Array<{label, hex} | string>', default: 'DEFAULT_PRESETS', description: 'Muestras de color preconfiguradas' }
  ];

  const codeSnippet = `import { SketchColorPicker } from 'boceto-ui';

<SketchColorPicker
  label="Tinta del Rotulador"
  value={inkColor}
  onChange={(hex) => setInkColor(hex)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchColorPicker"
      category="Formularios & Entradas"
      description="Paleta de artista y acuarelas artesanales con muestras redondeadas a mano, selector nativo con cuentagotas y campo hexadecimal."
      importCode="import { SketchColorPicker } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Paleta de Acuarela Predeterminada</span>
          <SketchColorPicker
            label="Tinta para Trazos"
            value={inkColor}
            onChange={(hex) => {
              setInkColor(hex);
              onTriggerToast?.(`Color cambiado: ${hex}`);
            }}
          />
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Paleta Personalizada con Previsualización</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
            <SketchColorPicker
              label="Color de Énfasis"
              value={customColor}
              onChange={(hex) => setCustomColor(hex)}
            />
            <div
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px dashed var(--sketch-ink)',
                backgroundColor: customColor,
                color: '#ffffff',
                fontFamily: 'var(--font-sketch-title)',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0,0,0,0.6)'
              }}
            >
              Muestra pintada con {customColor}
            </div>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default ColorPickerDoc;

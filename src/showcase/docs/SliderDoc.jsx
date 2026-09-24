import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchSlider, SketchProgress } from '../../components/sketch';

export function SliderDoc() {
  const [val1, setVal1] = useState(65);
  const [val2, setVal2] = useState(30);

  const propsList = [
    { name: 'value', type: 'number', default: '0', description: 'Valor numérico actual del control' },
    { name: 'onChange', type: '(val: number) => void', default: 'undefined', description: 'Callback inmediato al mover el pomo' },
    { name: 'min', type: 'number', default: '0', description: 'Límite inferior de la escala' },
    { name: 'max', type: 'number', default: '100', description: 'Límite superior de la escala' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Texto que describe el ajuste' },
    { name: 'unit', type: 'string', default: "''", description: 'Unidad de medida (ej. %, px, pt)' }
  ];

  const codeSnippet = `<SketchSlider
  label="Intensidad de Tinta"
  min={0}
  max={100}
  unit="%"
  value={sliderValue}
  onChange={(val) => setSliderValue(val)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchSlider"
      category="Formularios & Entradas"
      description="Control deslizante calibrado como una regla técnica milimetrada con pomo circular dibujado a mano y respuesta instantánea al arrastre."
      importCode="import { SketchSlider } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Control de Nivel Porcentual</span>
          <SketchSlider
            label="Intensidad de Plumilla"
            min={0}
            max={100}
            unit="%"
            value={val1}
            onChange={(v) => setVal1(v)}
          />

          <div style={{ marginTop: '16px' }}>
            <SketchProgress
              label="Visualización en Barra de Progreso"
              value={val1}
              variant="marker"
              instant={true}
            />
          </div>
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Calibre de Grosor de Trazo</span>
          <SketchSlider
            label="Grosor de Punta de Pluma"
            min={1}
            max={50}
            unit="pt"
            value={val2}
            onChange={(v) => setVal2(v)}
          />

          <div style={{
            marginTop: '20px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.02)',
            borderRadius: '6px'
          }}>
            <div style={{
              width: '80%',
              height: `${Math.max(2, val2 / 3)}px`,
              backgroundColor: 'var(--sketch-ink)',
              borderRadius: '2px'
            }} />
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default SliderDoc;

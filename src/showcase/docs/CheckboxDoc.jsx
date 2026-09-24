import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchCheckbox, SketchRadio } from '../../components/sketch';

export function CheckboxDoc() {
  const [chk1, setChk1] = useState(true);
  const [chk2, setChk2] = useState(true);
  const [chk3, setChk3] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('react');

  const propsList = [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Estado seleccionado o deseleccionado' },
    { name: 'onChange', type: '(e: ChangeEvent) => void', default: 'undefined', description: 'Callback al cambiar de estado' },
    { name: 'label', type: 'ReactNode', default: 'undefined', description: 'Texto que acompaña a la casilla o botón de opción' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva la interacción' }
  ];

  const codeSnippet = `<SketchCheckbox
  label="Activar bordes arquitectónicos"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>

<SketchRadio
  name="framework"
  value="react"
  label="React 19"
  checked={selected === 'react'}
  onChange={() => setSelected('react')}
/>`;

  return (
    <ComponentDocLayout
      title="SketchCheckbox & SketchRadio"
      category="Formularios & Entradas"
      description="Casillas de verificación con marca de plumilla verde trazada a mano (✔) y botones de opción con punto de tinta concéntrico artesanal."
      importCode="import { SketchCheckbox, SketchRadio } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Casillas de Verificación (SketchCheckbox)</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SketchCheckbox
              label="Activar borde de arquitecto"
              checked={chk1}
              onChange={(e) => setChk1(e.target.checked)}
            />
            <SketchCheckbox
              label="Simular papel milimetrado"
              checked={chk2}
              onChange={(e) => setChk2(e.target.checked)}
            />
            <SketchCheckbox
              label="Aceleración GPU 120 FPS"
              checked={chk3}
              onChange={(e) => setChk3(e.target.checked)}
            />
            <SketchCheckbox
              label="Opción Deshabilitada"
              disabled
              checked={true}
            />
          </div>
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Opciones de Selección Única (SketchRadio)</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SketchRadio
              name="demo-radio"
              value="react"
              label="Construido con React 19"
              checked={selectedRadio === 'react'}
              onChange={() => setSelectedRadio('react')}
            />
            <SketchRadio
              name="demo-radio"
              value="gpu"
              label="Aceleración nativa por GPU"
              checked={selectedRadio === 'gpu'}
              onChange={() => setSelectedRadio('gpu')}
            />
            <SketchRadio
              name="demo-radio"
              value="zero"
              label="Zero input lag certificado"
              checked={selectedRadio === 'zero'}
              onChange={() => setSelectedRadio('zero')}
            />
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default CheckboxDoc;

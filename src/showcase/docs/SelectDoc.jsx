import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchSelect } from '../../components/sketch';

export function SelectDoc({ onTriggerToast }) {
  const [selectedTool, setSelectedTool] = useState('pen');
  const [selectedPaper, setSelectedPaper] = useState('grid');

  const toolOptions = [
    { value: 'pen', label: 'Plumilla de Tinta China' },
    { value: 'pencil', label: 'Lápiz Grafito 2B' },
    { value: 'marker', label: 'Rotulador Fluorescente' },
    { value: 'chalk', label: 'Tiza de Pizarra Escolar' }
  ];

  const paperOptions = [
    { value: 'grid', label: 'Cuadrícula Milimetrada' },
    { value: 'lined', label: 'Cuaderno Rayado' },
    { value: 'plain', label: 'Papel Blanco Marfil' },
    { value: 'chalk', label: 'Pizarra de Tiza Oscura' }
  ];

  const propsList = [
    { name: 'options', type: 'Array<{value: string, label: string}>', default: '[]', description: 'Lista de opciones disponibles' },
    { name: 'value', type: 'string', default: 'undefined', description: 'Valor seleccionado actual (modo controlado)' },
    { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Callback al elegir una opción' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Etiqueta superior descriptiva' },
    { name: 'placeholder', type: 'string', default: "'Seleccionar...'", description: 'Texto inicial cuando no hay selección' }
  ];

  const codeSnippet = `<SketchSelect
  label="Herramienta Activa"
  options={[
    { value: 'pen', label: 'Plumilla de Tinta' },
    { value: 'pencil', label: 'Lápiz Grafito' }
  ]}
  value={selectedTool}
  onChange={(val) => setSelectedTool(val)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchSelect"
      category="Formularios & Entradas"
      description="Selector desplegable estilo popover de libreta con animación física Bungee (caída elástica con rebote al abrirse y retracción elástica al cerrarse)."
      importCode="import { SketchSelect } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Selector de Herramienta de Dibujo</span>
          <SketchSelect
            label="Herramienta de Trazo Activa"
            options={toolOptions}
            value={selectedTool}
            onChange={(val) => {
              setSelectedTool(val);
              onTriggerToast(`Herramienta: ${toolOptions.find(o => o.value === val)?.label}`);
            }}
          />

          <div style={{ marginTop: '16px', padding: '12px', border: '1.5px dashed var(--sketch-ink-light)', borderRadius: '8px' }}>
            <span style={{ fontSize: '1rem', opacity: 0.8 }}>Selección actual:</span>
            <div style={{ fontFamily: 'var(--font-sketch-title)', fontSize: '1.25rem', color: 'var(--sketch-pen-blue)' }}>
              {toolOptions.find(o => o.value === selectedTool)?.label}
            </div>
          </div>
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Selector de Textura de Papel</span>
          <SketchSelect
            label="Tipo de Soporte de Papel"
            options={paperOptions}
            value={selectedPaper}
            onChange={(val) => {
              setSelectedPaper(val);
              onTriggerToast(`Lienzo: ${paperOptions.find(o => o.value === val)?.label}`);
            }}
          />

          <p style={{ marginTop: '14px', fontSize: '1.15rem', opacity: 0.8 }}>
            Cuenta con detección de clic exterior para cerrarse automáticamente con snap elástico.
          </p>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default SelectDoc;

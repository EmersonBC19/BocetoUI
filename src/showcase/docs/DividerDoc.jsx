import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchDivider } from '../../components/sketch';

export function DividerDoc() {
  const propsList = [
    { name: 'variant', type: "'straight' | 'double' | 'dashed' | 'wavy' | 'zigzag'", default: "'straight'", description: 'Estilo de trazado de la línea artesanal' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Texto centrado opcional sobre la línea de plumilla' }
  ];

  const codeSnippet = `<SketchDivider variant="wavy" />
<SketchDivider variant="straight" label="SECCIÓN DE EJEMPLO" />`;

  return (
    <ComponentDocLayout
      title="SketchDivider"
      category="Estructura & Superficies"
      description="Líneas separadoras horizontales y de sección dibujadas a mano alzada con plumilla: curvas orgánicas, ondas, zigzag y trazos discontinuos."
      importCode="import { SketchDivider } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card" style={{ gap: '24px' }}>
        <div>
          <span className="comp-doc-card__label">1. Trazo Ondulado (wavy)</span>
          <SketchDivider variant="wavy" />
        </div>

        <div>
          <span className="comp-doc-card__label">2. Trazo en Zigzag de Boceto (zigzag)</span>
          <SketchDivider variant="zigzag" />
        </div>

        <div>
          <span className="comp-doc-card__label">3. Marco de Doble Trazo (double)</span>
          <SketchDivider variant="double" />
        </div>

        <div>
          <span className="comp-doc-card__label">4. Línea Discontinua Manual (dashed)</span>
          <SketchDivider variant="dashed" />
        </div>

        <div>
          <span className="comp-doc-card__label">5. Con Etiqueta de Texto (straight con label)</span>
          <SketchDivider variant="straight" label="DEMOSTRACIÓN ARTESANAL" />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default DividerDoc;

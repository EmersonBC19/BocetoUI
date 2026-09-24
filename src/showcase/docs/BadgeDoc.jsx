import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchBadge, SketchCheckIcon } from '../../components/sketch';

export function BadgeDoc() {
  const propsList = [
    { name: 'variant', type: "'loop-circle' | 'oval' | 'pill' | 'highlight'", default: "'loop-circle'", description: 'Trazado: bucle concéntrico, elipse u óvalo' },
    { name: 'color', type: "'default' | 'blue' | 'green' | 'red' | 'yellow'", default: "'default'", description: 'Tinta de plumilla o marcador' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Escala del círculo o etiqueta' }
  ];

  const codeSnippet = `<SketchBadge variant="loop-circle" size="lg" color="green">
  <SketchCheckIcon size={16} />
</SketchBadge>

<SketchBadge variant="oval" color="blue">
  Importante
</SketchBadge>`;

  return (
    <ComponentDocLayout
      title="SketchBadge"
      category="Visualización de Datos"
      description="Insignias y sellos de boceto con círculos trazados en varias pasadas orgánicas de lápiz, ideales para rodear cifras clave o estados."
      importCode="import { SketchBadge } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Círculos Concéntricos en Bucle (loop-circle)</span>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
            <SketchBadge variant="loop-circle" size="lg">1</SketchBadge>
            <SketchBadge variant="loop-circle" size="lg" color="red">2</SketchBadge>
            <SketchBadge variant="loop-circle" size="lg" color="blue">3</SketchBadge>
            <SketchBadge variant="loop-circle" size="lg" color="green">
              <SketchCheckIcon size={18} />
            </SketchBadge>
          </div>
          <small style={{ textAlign: 'center', opacity: 0.75 }}>Multi-trazo de plumilla simulando un trazo circular manual</small>
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Elipses Alargadas (oval)</span>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', padding: '10px 0' }}>
            <SketchBadge variant="oval">Pendiente</SketchBadge>
            <SketchBadge variant="oval" color="blue">Nuevo</SketchBadge>
            <SketchBadge variant="oval" color="red">Urgente</SketchBadge>
            <SketchBadge variant="oval" color="green">Completado</SketchBadge>
          </div>
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">3. Etiquetas Píldora y Resaltador (pill & highlight)</span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
            <SketchBadge variant="pill">Boceto 2026</SketchBadge>
            <SketchBadge variant="highlight">Resaltado Amarillo</SketchBadge>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default BadgeDoc;

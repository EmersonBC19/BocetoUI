import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchLoader } from '../../components/sketch';

export function LoaderDoc() {
  const propsList = [
    { name: 'variant', type: "'dust-run' | 'smoke-spinner' | 'impact-burst'", default: "'dust-run'", description: 'Tipo de animación cómica de aceleración o impacto' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Escala visual del cargador' },
    { name: 'text', type: 'string', default: 'undefined', description: 'Leyenda explicativa bajo la animación' }
  ];

  const codeSnippet = `<SketchLoader
  variant="dust-run"
  size="md"
  text="Estela de Aceleración"
/>`;

  return (
    <ComponentDocLayout
      title="SketchLoader"
      category="Feedback & Movimiento"
      description="Cargadores animados de estética cómica basados en secuencias de humo, polvo de derrape y destellos de impacto con trazado SVG artesanal."
      importCode="import { SketchLoader } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card" style={{ alignItems: 'center', textAlign: 'center' }}>
          <span className="comp-doc-card__label" style={{ width: '100%' }}>1. Estela de Polvo (dust-run)</span>
          <div style={{ padding: '20px 0' }}>
            <SketchLoader variant="dust-run" size="md" text="Acelerando trazo..." />
          </div>
        </div>

        <div className="comp-doc-card" style={{ alignItems: 'center', textAlign: 'center' }}>
          <span className="comp-doc-card__label" style={{ width: '100%' }}>2. Órbita de Humo (smoke-spinner)</span>
          <div style={{ padding: '20px 0' }}>
            <SketchLoader variant="smoke-spinner" size="md" text="Procesando boceto..." />
          </div>
        </div>

        <div className="comp-doc-card" style={{ alignItems: 'center', textAlign: 'center' }}>
          <span className="comp-doc-card__label" style={{ width: '100%' }}>3. Destello de Impacto (impact-burst)</span>
          <div style={{ padding: '20px 0' }}>
            <SketchLoader variant="impact-burst" size="md" text="Destello cómic activo" />
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default LoaderDoc;

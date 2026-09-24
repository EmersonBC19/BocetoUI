import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchSkeleton, SketchButton } from '../../components/sketch';
import { RotateCcw } from 'lucide-react';

export function SkeletonDoc() {
  const [isLoading, setIsLoading] = useState(true);

  const propsList = [
    { name: 'variant', type: "'text' | 'card' | 'avatar' | 'image'", default: "'text'", description: 'Geometría del contenedor placeholder' },
    { name: 'lines', type: 'number', default: '3', description: 'Número de renglones para variant="text"' },
    { name: 'width', type: 'string | number', default: 'undefined', description: 'Ancho personalizado' },
    { name: 'height', type: 'string | number', default: 'undefined', description: 'Alto personalizado' }
  ];

  const codeSnippet = `<SketchSkeleton variant="avatar" />
<SketchSkeleton variant="text" lines={3} />
<SketchSkeleton variant="image" height={140} />`;

  return (
    <ComponentDocLayout
      title="SketchSkeleton"
      category="Feedback & Movimiento"
      description="Marcadores de posición visual con estelas de nubes de humo animadas inspiradas en las viñetas de cómic y aceleración pura por GPU."
      importCode="import { SketchSkeleton } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span className="comp-doc-card__label" style={{ margin: 0 }}>
            {isLoading ? 'Estado: Simulando Carga con Estelas de Nube' : 'Estado: Contenido Cargado'}
          </span>
          <SketchButton
            size="sm"
            variant="architect"
            icon={<RotateCcw size={14} />}
            onClick={() => setIsLoading(l => !l)}
          >
            {isLoading ? 'Ver Contenido Final' : 'Volver a Cargar'}
          </SketchButton>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <SketchSkeleton variant="avatar" />
              <div style={{ flexGrow: 1 }}>
                <SketchSkeleton variant="text" lines={2} />
              </div>
            </div>
            <SketchSkeleton variant="image" height={130} />
            <SketchSkeleton variant="text" lines={3} />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '2px solid var(--sketch-ink)',
                background: 'var(--sketch-accent-yellow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sketch-title)',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>
                BUI
              </div>
              <div>
                <h4 className="sketch-title" style={{ margin: 0, fontSize: '1.3rem' }}>Leonardo DaVinci</h4>
                <p style={{ margin: 0, opacity: 0.75 }}>Pintor y Maestro de Bocetos</p>
              </div>
            </div>
            <div style={{
              height: '130px',
              border: '2px solid var(--sketch-ink)',
              borderRadius: 'var(--wobble-radius-1)',
              background: 'var(--sketch-accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sketch-title)',
              fontSize: '1.3rem'
            }}>
              Ilustración Final Renderizada a 120 FPS
            </div>
          </div>
        )}
      </div>
    </ComponentDocLayout>
  );
}

export default SkeletonDoc;

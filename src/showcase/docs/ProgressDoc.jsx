import React, { useState, useEffect, useRef } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchProgress, SketchButton, SketchSlider } from '../../components/sketch';
import { Play, Pause } from 'lucide-react';

export function ProgressDoc({ onTriggerToast }) {
  const [progVal, setProgVal] = useState(68);
  const [isSimulating, setIsSimulating] = useState(false);
  const animFrameRef = useRef(null);

  const propsList = [
    { name: 'value', type: 'number', default: '0', description: 'Porcentaje de avance (0 a 100)' },
    { name: 'variant', type: "'marker' | 'hatch' | 'marker-blue' | 'marker-green' | 'marker-pink'", default: "'marker'", description: 'Estilo de relleno del progreso' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Texto superior de la barra' },
    { name: 'showPercentage', type: 'boolean', default: 'true', description: 'Muestra la cifra en la esquina superior derecha' },
    { name: 'animated', type: 'boolean', default: 'true', description: 'Activa el flujo dinámico de hachurado a lápiz a 60/120 FPS' },
    { name: 'instant', type: 'boolean', default: 'false', description: 'Elimina la inercia para respuesta inmediata al arrastre' }
  ];

  // Simulación 120 FPS
  useEffect(() => {
    if (!isSimulating) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let start = null;
    const duration = 2800;

    const tick = (ts) => {
      if (!start) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setProgVal(Math.round(eased * 100));

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setIsSimulating(false);
        onTriggerToast('¡Carga completada al 100%!');
      }
    };

    setProgVal(0);
    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isSimulating, onTriggerToast]);

  const codeSnippet = `<SketchProgress
  value={progressValue}
  label="Cargando Bocetos"
  variant="marker"
  animated={true}
/>`;

  return (
    <ComponentDocLayout
      title="SketchProgress"
      category="Feedback & Movimiento"
      description="Barra de progreso con aceleración 100% por GPU mediante translate3d (cero reflow en CPU), nubes de velocidad reactivas y flujo continuo de hachurado a lápiz."
      importCode="import { SketchProgress } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Control en Tiempo Real & Simulación 120 FPS</span>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <SketchButton
              size="sm"
              variant="architect"
              icon={isSimulating ? <Pause size={14} /> : <Play size={14} />}
              onClick={() => setIsSimulating(s => !s)}
            >
              {isSimulating ? 'Pausar Simulación' : 'Simular Carga a 120 FPS'}
            </SketchButton>

            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 25, 50, 75, 100].map(v => (
                <button
                  key={v}
                  type="button"
                  className={`canvas-btn ${progVal === v ? 'canvas-btn--active' : ''}`}
                  onClick={() => {
                    setIsSimulating(false);
                    setProgVal(v);
                  }}
                  style={{ padding: '3px 8px', fontSize: '0.85rem' }}
                >
                  {v}%
                </button>
              ))}
            </div>
          </div>

          <SketchSlider
            label="Ajuste Manual de Progreso"
            min={0}
            max={100}
            unit="%"
            value={progVal}
            onChange={(v) => {
              setIsSimulating(false);
              setProgVal(v);
            }}
          />
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Variantes de Relleno</span>
          <SketchProgress
            label="Resaltador Amarillo con Nube de Humo"
            value={progVal}
            variant="marker"
          />

          <SketchProgress
            label="Hachurado Dinámico con Flujo Continuo"
            value={progVal}
            variant="hatch"
            animated={true}
          />

          <SketchProgress
            label="Tinta Azul Bolígrafo"
            value={progVal}
            variant="marker-blue"
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default ProgressDoc;

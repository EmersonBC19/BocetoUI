import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchTooltip, SketchButton } from '../../components/sketch';
import { HelpCircle, Info, Sparkles } from 'lucide-react';

export function TooltipDoc() {
  const propsList = [
    { name: 'content', type: 'ReactNode', default: 'undefined', description: 'Contenido flotante dentro de la viñeta' },
    { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Orientación del globo respecto al elemento' },
    { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Elemento que activa el tooltip al hacer hover o foco' }
  ];

  const codeSnippet = `<SketchTooltip content="Globo viñeta superior" position="top">
  <SketchButton variant="wobbly">Arriba (top)</SketchButton>
</SketchTooltip>

<SketchTooltip content="Detalles a la derecha" position="right">
  <SketchButton variant="dashed">Derecha (right)</SketchButton>
</SketchTooltip>`;

  return (
    <ComponentDocLayout
      title="SketchTooltip"
      category="Feedback & Movimiento"
      description="Viñeta o bocadillo de cómic flotante con flecha de plumilla y animación elástica Bungee (bungee pop) al hacer hover o foco con teclado."
      importCode="import { SketchTooltip } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card" style={{ padding: '32px 24px' }}>
        <span className="comp-doc-card__label" style={{ marginBottom: '20px' }}>
          Demostración de las 4 Posiciones Cardinales (Pasa el cursor por cada botón)
        </span>

        {/* Cuadrícula organizada con espacio holgado para que cada viñeta se expanda sin colisiones */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginTop: '12px'
        }}>
          {/* 1. Posición Arriba */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '52px 20px 24px',
            border: '1.5px dashed var(--sketch-ink-light)',
            borderRadius: 'var(--wobble-radius-1)',
            background: 'var(--sketch-bg-paper)'
          }}>
            <span style={{ fontSize: '1rem', color: 'var(--sketch-ink-muted)', marginBottom: '14px' }}>
              Orientación: top
            </span>
            <SketchTooltip content="Globo superior con flecha a lápiz" position="top">
              <SketchButton variant="wobbly" size="md">
                Arriba (top)
              </SketchButton>
            </SketchTooltip>
          </div>

          {/* 2. Posición Abajo */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 20px 52px',
            border: '1.5px dashed var(--sketch-ink-light)',
            borderRadius: 'var(--wobble-radius-1)',
            background: 'var(--sketch-bg-paper)'
          }}>
            <span style={{ fontSize: '1rem', color: 'var(--sketch-ink-muted)', marginBottom: '14px' }}>
              Orientación: bottom
            </span>
            <SketchTooltip content="Ayuda contextual inferior" position="bottom">
              <SketchButton variant="marker" size="md" icon={<HelpCircle size={16} />}>
                Abajo (bottom)
              </SketchButton>
            </SketchTooltip>
          </div>

          {/* 3. Posición Izquierda */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '36px 24px 36px 150px',
            border: '1.5px dashed var(--sketch-ink-light)',
            borderRadius: 'var(--wobble-radius-1)',
            background: 'var(--sketch-bg-paper)'
          }}>
            <span style={{ fontSize: '1rem', color: 'var(--sketch-ink-muted)', marginBottom: '14px' }}>
              Orientación: left
            </span>
            <SketchTooltip content="Información izquierda" position="left">
              <SketchButton variant="architect" size="md" icon={<Info size={16} />}>
                Izquierda (left)
              </SketchButton>
            </SketchTooltip>
          </div>

          {/* 4. Posición Derecha */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '36px 150px 36px 24px',
            border: '1.5px dashed var(--sketch-ink-light)',
            borderRadius: 'var(--wobble-radius-1)',
            background: 'var(--sketch-bg-paper)'
          }}>
            <span style={{ fontSize: '1rem', color: 'var(--sketch-ink-muted)', marginBottom: '14px' }}>
              Orientación: right
            </span>
            <SketchTooltip content="Detalles a la derecha" position="right">
              <SketchButton variant="dashed" size="md" icon={<Sparkles size={16} />}>
                Derecha (right)
              </SketchButton>
            </SketchTooltip>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default TooltipDoc;

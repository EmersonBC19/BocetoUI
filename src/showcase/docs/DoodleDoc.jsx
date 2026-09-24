import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchButton, SketchBadge } from '../../components/sketch';
import { PenTool, Highlighter, Eraser, Eye, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export function DoodleDoc({ onTriggerToast, onToggleDoodle }) {
  const propsList = [
    { name: 'isOpen', type: 'boolean', default: 'false', description: 'Controla si el estuche de herramientas y la capa de dibujo están visibles' },
    { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback ejecutado al hacer clic en la ✕ del estuche' },
    { name: 'canvasType', type: "'paper-grid' | 'paper-lined' | 'paper-plain' | 'paper-chalk'", default: "'paper-grid'", description: 'Adapta dinámicamente los colores de las puntas (ej. activa tiza blanca en modo pizarra)' },
    { name: 'defaultLineStyle', type: "'solid' | 'dashed'", default: "'solid'", description: 'Estilo de trazo inicial: continuo sólido o punteado discontinuo artesanal' },
    { name: 'onTriggerToast', type: '(msg: string) => void', default: 'undefined', description: 'Callback opcional para emitir notificaciones al limpiar o exportar' }
  ];

  const codeSnippet = `import { useState } from 'react';
import { SketchDoodleCanvas, SketchButton } from 'boceto-ui';

export function App() {
  const [doodleActive, setDoodleActive] = useState(false);

  return (
    <div>
      <SketchButton 
        variant="marker" 
        onClick={() => setDoodleActive(true)}
      >
        ✏️ Activar Garabatos
      </SketchButton>

      {/* Capa Canvas Overlay con Estuche Flotante */}
      <SketchDoodleCanvas
        isOpen={doodleActive}
        onClose={() => setDoodleActive(false)}
        canvasType="paper-grid"
      />
    </div>
  );
}`;

  return (
    <ComponentDocLayout
      title="SketchDoodleCanvas"
      category="Interacción & Pizarra Libre"
      description="Lienzo de dibujo a mano alzada a 120 FPS acelerado por GPU. Permite a los usuarios rayar, hacer flechas, rodear elementos o resaltar textos en cualquier parte de la pantalla con un estuche flotante y passthrough de clics."
      importCode="import { SketchDoodleCanvas } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
        <span className="comp-doc-card__label" style={{ marginBottom: '16px' }}>
          Lienzo de Garabatos & Anotaciones en Vivo
        </span>

        <p style={{ margin: '0 auto 20px auto', maxWidth: '620px', fontSize: '1.25rem', lineHeight: 1.5 }}>
          Experimenta el modo libre: saca el estuche flotante para rayar o anotar en los espacios vacíos y sobre los componentes. Los dibujos no se guardan en LocalStorage (se limpian con F5) y puedes interactuar con los botones de abajo usando el modo <strong>"Ver y Clic"</strong>.
        </p>

        {/* Botón para abrir el estuche */}
        <div style={{ marginBottom: '28px' }}>
          <SketchButton
            variant="architect"
            color="yellow"
            size="lg"
            icon={<PenTool size={20} />}
            onClick={() => {
              onToggleDoodle?.(true);
              onTriggerToast?.('✏️ ¡Estuche abierto! Selecciona tu lápiz abajo para rayar.');
            }}
          >
            Abrir Estuche de Lápices Ahora
          </SketchButton>
        </div>

        {/* Guía visual de herramientas del estuche */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          textAlign: 'left',
          marginTop: '20px'
        }}>
          <div style={{
            padding: '14px',
            border: '2px dashed var(--sketch-ink, #23272f)',
            borderRadius: '10px',
            background: 'var(--sketch-bg-canvas, #f8fafc)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, marginBottom: '6px' }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#23272f', display: 'inline-block' }} />
              <span>Lápiz de Grafito</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.85 }}>
              Trazo negro carbón fino (2.8px) con suavizado de curvas Bezier cuadráticas.
            </p>
          </div>

          <div style={{
            padding: '14px',
            border: '2px dashed var(--sketch-ink, #23272f)',
            borderRadius: '10px',
            background: 'var(--sketch-bg-canvas, #f8fafc)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, marginBottom: '6px' }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#dc2626', display: 'inline-block' }} />
              <span>Boli Rojo de Corrección</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.85 }}>
              Tinta roja tipo bolígrafo de profesor para tachar o marcar detalles críticos.
            </p>
          </div>

          <div style={{
            padding: '14px',
            border: '2px dashed var(--sketch-ink, #23272f)',
            borderRadius: '10px',
            background: 'var(--sketch-bg-canvas, #f8fafc)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, marginBottom: '6px' }}>
              <span style={{ width: 14, height: 10, borderRadius: 2, background: '#facc15', display: 'inline-block' }} />
              <span>Resaltador Fluorescente</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.85 }}>
              Trazo ancho translúcido (22px) ideal para subrayar títulos o párrafos reales.
            </p>
          </div>

          <div style={{
            padding: '14px',
            border: '2px dashed var(--sketch-ink, #23272f)',
            borderRadius: '10px',
            background: 'var(--sketch-bg-canvas, #f8fafc)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, marginBottom: '6px' }}>
              <svg width="20" height="14" viewBox="0 0 20 14" style={{ display: 'inline-block' }}>
                <line x1="2" y1="7" x2="18" y2="7" stroke="var(--sketch-pen-blue, #2563eb)" strokeWidth="3" strokeLinecap="round" strokeDasharray="3.5 3.5" />
              </svg>
              <span>Modo Punteado (Guías & Recortes)</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.85 }}>
              Alterna al instante entre trazo <strong>Continuo</strong> y <strong>Punteado</strong> con cualquier punta para trazar líneas de perforación, flechas de atención o bocetos arquitectónicos.
            </p>
          </div>

          <div style={{
            padding: '14px',
            border: '2px dashed var(--sketch-ink, #23272f)',
            borderRadius: '10px',
            background: 'var(--sketch-bg-canvas, #f8fafc)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, marginBottom: '6px' }}>
              <Eye size={16} color="var(--sketch-pen-blue, #2563eb)" />
              <span>Modo Passthrough (Ver y Clic)</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.85 }}>
              Congela el modo dibujo para que puedas hacer clic en los botones debajo mientras tus garabatos siguen en pantalla.
            </p>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default DoodleDoc;

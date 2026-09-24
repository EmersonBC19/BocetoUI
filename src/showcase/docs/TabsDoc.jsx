import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchTabs, SketchButton, SketchBadge } from '../../components/sketch';
import { Bookmark, Sparkles, Cpu, Palette, FileCode2, Layers, CheckCircle2 } from 'lucide-react';
import './TabsDoc.css';

export function TabsDoc({ onTriggerToast }) {
  const [selectedPaper, setSelectedPaper] = useState('grid');
  const [cqrsCount, setCqrsCount] = useState(3);

  const propsList = [
    { name: 'tabs', type: 'Array<{id, label, icon?, content}>', default: '[]', description: 'Arreglo de pestañas y sus paneles correspondientes' },
    { name: 'defaultActiveId', type: 'string', default: 'tabs[0]?.id', description: 'ID de la pestaña seleccionada por defecto' },
    { name: 'activeId', type: 'string', default: 'undefined', description: 'ID controlado para navegación externa' },
    { name: 'onChange', type: '(id: string) => void', default: 'undefined', description: 'Callback al conmutar de pestaña' },
    { name: 'variant', type: "'folder' | 'pill'", default: "'folder'", description: 'Estilo: folder (archivador clásico) o pill (píldoras resaltadas)' }
  ];

  // 1. Variante Archivador con diseños de demostración únicos por cada pestaña
  const folderTabs = [
    {
      id: 'tab-1',
      label: 'Concepto General',
      icon: <Bookmark size={15} />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <h4 className="sketch-title" style={{ margin: 0, fontSize: '1.4rem' }}>
              Diseño Artesanal de Boceto
            </h4>
            <SketchBadge variant="pill" color="yellow">v2.5 Artesanal</SketchBadge>
          </div>
          <p style={{ margin: 0, fontSize: '1.2rem', lineHeight: '1.4' }}>
            BocetoUI traslada el trazo orgánico a mano alzada a componentes de interfaz limpios,
            manteniendo máxima legibilidad con tipografías legibles y aceleración por GPU.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <SketchButton variant="primary" size="small" onClick={() => onTriggerToast('Concepto general explorado')}>
              Ver Componentes
            </SketchButton>
            <SketchBadge variant="wobble" color="green">100% Vectorial</SketchBadge>
          </div>
        </div>
      )
    },
    {
      id: 'tab-2',
      label: 'Esquinas de Arquitecto',
      icon: <FileCode2 size={15} />,
      content: (
        <div className="architect-demo-frame">
          <div className="architect-corner-tl" />
          <div className="architect-corner-tr" />
          <div className="architect-corner-bl" />
          <div className="architect-corner-br" />
          
          <div className="architect-meta-bar">
            <span>⌖ VÉRTICE CAD : X: 1024 / Y: 768</span>
            <span>📐 ESCALA TÉCNICA 1:50 [MM]</span>
          </div>

          <h4 className="sketch-title" style={{ margin: '0 0 8px 0', fontSize: '1.45rem', color: '#0369a1' }}>
            Boceto con Vértices Técnicos Cruzados
          </h4>
          <p style={{ margin: '0 0 14px 0', fontSize: '1.2rem', lineHeight: '1.35', color: '#0c4a6e' }}>
            Inspirado en los planos de dibujo técnico e ingeniería. Las líneas de borde se extienden
            ligeramente más allá del vértice recreando la soltura del estilógrafo sobre papel vegetal.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span className="architect-stamp">PLANO APROBADO: ARQ-BOCETO</span>
            <span style={{ fontSize: '1.05rem', color: '#0284c7' }}>Tolerancia artesanal: ± 1.5px</span>
          </div>
        </div>
      )
    },
    {
      id: 'tab-3',
      label: 'Cintas y Notas Washi',
      icon: <Sparkles size={15} />,
      content: (
        <div className="washi-demo-grid">
          <div className="washi-note washi-note--yellow">
            <div className="washi-tape-strip washi-tape--top-center" />
            <strong style={{ display: 'block', marginBottom: '6px', fontSize: '1.3rem' }}>Nota de Taller #1</strong>
            Tira de cinta washi adhesiva semi-transparente centrada simulando papel de arroz japonés.
          </div>
          <div className="washi-note washi-note--mint">
            <div className="washi-tape-strip washi-tape--top-left" />
            <strong style={{ display: 'block', marginBottom: '6px', fontSize: '1.3rem' }}>Nota de Campo #2</strong>
            Cinta washi con corte en ángulo de -30° en la esquina superior izquierda.
          </div>
          <div className="washi-note washi-note--rose">
            <div className="washi-tape-strip washi-tape--top-right" />
            <strong style={{ display: 'block', marginBottom: '6px', fontSize: '1.3rem' }}>Nota Rápida #3</strong>
            Pasa el cursor por encima para ver la animación de elevación táctil.
          </div>
        </div>
      )
    }
  ];

  // 2. Variante Píldoras con demostraciones dinámicas
  const pillTabs = [
    {
      id: 'pill-gpu',
      label: '120 FPS GPU',
      icon: <Cpu size={15} />,
      content: (
        <div className="gpu-demo-container">
          <div className="gpu-metric-row">
            <div className="gpu-metric-box">
              <div style={{ fontSize: '1rem', color: 'var(--sketch-ink-muted)' }}>Frecuencia de Cuadros</div>
              <div className="gpu-metric-val">120.0 FPS</div>
              <div style={{ fontSize: '0.95rem' }}>8.33 ms por fotograma</div>
            </div>
            <div className="gpu-metric-box">
              <div style={{ fontSize: '1rem', color: 'var(--sketch-ink-muted)' }}>Aceleración de Hardware</div>
              <div className="gpu-metric-val" style={{ color: '#0284c7' }}>transform3d</div>
              <div style={{ fontSize: '0.95rem' }}>Cero bloqueo en CPU</div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '1.15rem' }}>
            Todas las animaciones de rebote elástico (Bungee) se ejecutan enteramente en el compositor de la GPU mediante <code>cubic-bezier(0.34, 1.56, 0.64, 1)</code>.
          </p>
        </div>
      )
    },
    {
      id: 'pill-paper',
      label: '4 Lienzos de Papel',
      icon: <Palette size={15} />,
      content: (
        <div>
          <p style={{ margin: '0 0 12px 0', fontSize: '1.2rem' }}>
            Selecciona un lienzo para previsualizar la textura artesanal de fondo:
          </p>
          <div className="paper-swatch-grid">
            <div
              className="paper-swatch-card"
              style={{
                backgroundColor: '#ffffff',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                borderColor: selectedPaper === 'grid' ? '#0284c7' : 'var(--sketch-ink)',
                boxShadow: selectedPaper === 'grid' ? '0 0 0 2px #0284c7, 3px 3px 0 #0284c7' : undefined
              }}
              onClick={() => { setSelectedPaper('grid'); onTriggerToast('Lienzo Cuadriculado seleccionado'); }}
            >
              <strong>Cuadriculado</strong>
              <div style={{ fontSize: '1.05rem', marginTop: '4px' }}>Rejilla técnica milimetrada</div>
            </div>

            <div
              className="paper-swatch-card"
              style={{
                backgroundColor: '#fefce8',
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.18) 1.2px, transparent 1.2px)',
                backgroundSize: '16px 16px',
                borderColor: selectedPaper === 'dots' ? '#eab308' : 'var(--sketch-ink)',
                boxShadow: selectedPaper === 'dots' ? '0 0 0 2px #eab308, 3px 3px 0 #eab308' : undefined
              }}
              onClick={() => { setSelectedPaper('dots'); onTriggerToast('Lienzo Punteado Bullet Journal'); }}
            >
              <strong>Punteado</strong>
              <div style={{ fontSize: '1.05rem', marginTop: '4px' }}>Estilo Bullet Journal</div>
            </div>

            <div
              className="paper-swatch-card"
              style={{
                backgroundColor: '#f8fafc',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1.5px, transparent 1.5px)',
                backgroundSize: '100% 24px',
                borderColor: selectedPaper === 'ruled' ? '#64748b' : 'var(--sketch-ink)',
                boxShadow: selectedPaper === 'ruled' ? '0 0 0 2px #64748b, 3px 3px 0 #64748b' : undefined
              }}
              onClick={() => { setSelectedPaper('ruled'); onTriggerToast('Lienzo Rayado Escolar'); }}
            >
              <strong>Rayado</strong>
              <div style={{ fontSize: '1.05rem', marginTop: '4px' }}>Renglones de cuaderno</div>
            </div>

            <div
              className="paper-swatch-card"
              style={{
                backgroundColor: '#1e293b',
                color: '#f8fafc',
                borderColor: selectedPaper === 'slate' ? '#38bdf8' : '#f8fafc',
                boxShadow: selectedPaper === 'slate' ? '0 0 0 2px #38bdf8, 3px 3px 0 #38bdf8' : undefined
              }}
              onClick={() => { setSelectedPaper('slate'); onTriggerToast('Pizarra de Tiza Oscura'); }}
            >
              <strong>Pizarra Oscura</strong>
              <div style={{ fontSize: '1.05rem', marginTop: '4px' }}>Tiza sobre fondo oscuro</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'pill-cqrs',
      label: 'Patrón CQRS',
      icon: <Layers size={15} />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <h4 className="sketch-title" style={{ margin: 0, fontSize: '1.35rem' }}>
              Segregación Commands vs Queries
            </h4>
            <SketchBadge variant="pill" color="blue">Proyecciones Reactivas</SketchBadge>
          </div>
          <p style={{ margin: 0, fontSize: '1.2rem', lineHeight: '1.4' }}>
            Los <strong>Commands</strong> ejecutan mutaciones validadas (dispatch), mientras las <strong>Queries</strong> proyectan el estado puro mediante <code>useMemo</code> evitando re-renders innecesarios.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <SketchButton
              variant="secondary"
              size="small"
              onClick={() => {
                const next = cqrsCount + 1;
                setCqrsCount(next);
                onTriggerToast(`Command despachado: Total items = ${next}`);
              }}
            >
              Despachar Command (Incrementar)
            </SketchButton>
            <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sketch-title)' }}>
              Query proyectada: <strong>{cqrsCount} comandos registrados</strong>
            </span>
          </div>
        </div>
      )
    }
  ];

  const codeSnippet = `<SketchTabs
  variant="folder"
  tabs={[
    { id: '1', label: 'Concepto General', content: <GeneralConcept /> },
    { id: '2', label: 'Esquinas de Arquitecto', content: <ArchitectBlueprint /> },
    { id: '3', label: 'Cintas Washi', content: <WashiNotesBoard /> }
  ]}
  onChange={(id) => console.log('Pestaña activa:', id)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchTabs"
      category="Estructura & Superficies"
      description="Pestañas de navegación con estética de archivador de libreta y variante de píldoras flotantes. Cada pestaña cambia dinámicamente la demostración visual con animaciones de entrada Bungee."
      importCode="import { SketchTabs } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 className="sketch-title" style={{ fontSize: '1.35rem', marginBottom: '12px' }}>
            1. Pestañas de Archivador (variant="folder") — Cada pestaña cambia el diseño
          </h3>
          <SketchTabs
            tabs={folderTabs}
            defaultActiveId="tab-1"
            variant="folder"
            onChange={(id) => onTriggerToast(`Pestaña Archivador: ${id}`)}
          />
        </div>

        <div>
          <h3 className="sketch-title" style={{ fontSize: '1.35rem', marginBottom: '12px' }}>
            2. Pestañas de Píldoras Flotantes (variant="pill") — Módulos interactivos
          </h3>
          <SketchTabs
            tabs={pillTabs}
            defaultActiveId="pill-gpu"
            variant="pill"
            onChange={(id) => onTriggerToast(`Pestaña Píldora: ${id}`)}
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default TabsDoc;

import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchScrollArea, SketchButton, SketchBadge } from '../../components/sketch';

export function ScrollAreaDoc({ onTriggerToast }) {
  const [selectedVariant, setSelectedVariant] = useState('graphite');
  const [showProgress, setShowProgress] = useState(true);

  const propsList = [
    { name: 'height | maxHeight', type: 'string | number', default: "'300px'", description: 'Altura fija o máxima del contenedor de desplazamiento' },
    { name: 'width | maxWidth', type: 'string | number', default: "'100%'", description: 'Ancho fijo o máximo del contenedor' },
    { name: 'orientation', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Eje de desplazamiento permitido' },
    { name: 'variant', type: "'graphite' | 'wasi' | 'ruler' | 'pencil'", default: "'graphite'", description: 'Estilo artesanal: graphite (lápiz con crosshatch), wasi (cinta adhesiva), ruler (regla milimétrica), pencil (lápiz tricolor)' },
    { name: 'showIndicators', type: 'boolean', default: 'true', description: 'Muestra sombreados e indicadores si hay contenido oculto arriba/abajo' },
    { name: 'showProgress', type: 'boolean', default: 'false', description: 'Muestra badge flotante en la esquina con el porcentaje leído' }
  ];

  const codeSnippet = `import { SketchScrollArea } from 'boceto-ui';

<SketchScrollArea
  height="280px"
  variant="graphite"
  showIndicators={true}
  showProgress={true}
>
  <div style={{ padding: '16px' }}>
    <h3>Mi Manifiesto de Boceto</h3>
    <p>Contenido largo que se desplaza suavemente con una barra de grafito...</p>
  </div>
</SketchScrollArea>`;

  const paragraphList = [
    '1. Principio de imperfección estética: La línea recta absoluta es enemiga de la calidez humana. En BocetoUI cada borde tiembla como un pulso real.',
    '2. Físicas de resorte: Los elementos no se mueven como bloques rígidos de metal, sino con la elasticidad de una hoja de papel doblándose al viento.',
    '3. Paleta de tintas y tizas: Tonos orgánicos de carboncillo, grafito 2B, rotuladores escolares y tizas sobre pizarra verde bosque.',
    '4. Sin dependencias pesadas: Rendimiento a 120 FPS renderizado puramente con CSS y SVG nativo acelerado por hardware.',
    '5. Accesibilidad completa: Teclado, estados de foco bien contrastados y etiquetas ARIA estándar en todos los componentes.',
    '6. Microinteracciones de borrado: Cuando descartas o cierras algo, la «X» gira y adquiere el tono de una clásica goma de borrar Milan.',
    '7. Cuaderno encuadernado: La navegación lateral simula anillas espirales de cuaderno de artista de tapa dura.',
    '8. Exportación instantánea: Dibuja a mano con el estuche de lápices y exporta tus bocetos a PNG sin salir del navegador.'
  ];

  return (
    <ComponentDocLayout
      title="SketchScrollArea"
      category="Estructura & Layout"
      description="Contenedor con barra de desplazamiento interactiva dibujada a mano. Reemplaza la barra gris del navegador por grafito biselado, cintas washi o reglas milimétricas, con arrastre físico, clic en el carril y detector de progreso."
      importCode="import { SketchScrollArea } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        {/* Selector de Variante y Demo Vertical */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Scroll Vertical con Variantes Artesanales</span>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {['graphite', 'wasi', 'ruler', 'pencil'].map((v) => (
              <button
                key={v}
                type="button"
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1.5px solid #23272f',
                  background: selectedVariant === v ? '#fef08a' : '#ffffff',
                  fontWeight: selectedVariant === v ? 'bold' : 'normal',
                  fontFamily: 'Patrick Hand',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSelectedVariant(v);
                  onTriggerToast(`Estilo de barra: ${v}`);
                }}
              >
                {v}
              </button>
            ))}
          </div>

          <SketchScrollArea
            height="260px"
            variant={selectedVariant}
            showIndicators={true}
            showProgress={showProgress}
          >
            <div style={{ padding: '16px 24px 16px 16px' }}>
              <h4 style={{ fontFamily: 'Patrick Hand', fontSize: '1.3rem', margin: '0 0 10px 0' }}>
                📖 El Decálogo del Dibujante Digital
              </h4>
              {paragraphList.map((text, i) => (
                <p key={i} style={{ fontSize: '1rem', lineHeight: 1.6, margin: '0 0 10px 0', color: '#334155' }}>
                  {text}
                </p>
              ))}
            </div>
          </SketchScrollArea>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: '#71717a' }}>
              *Arrastra el deslizador o haz clic en el carril.
            </span>
            <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showProgress}
                onChange={(e) => setShowProgress(e.target.checked)}
              />
              Mostrar % avance
            </label>
          </div>
        </div>

        {/* Scroll Horizontal */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Scroll Horizontal (orientation="horizontal")</span>
          <p style={{ fontSize: '0.95rem', color: '#5e6472', margin: '0 0 10px 0' }}>
            Ideal para carruseles de tarjetas, galerías de planos o tablas anchas:
          </p>
          <SketchScrollArea
            orientation="horizontal"
            variant="graphite"
            height="180px"
          >
            <div style={{ display: 'flex', gap: '14px', padding: '14px', width: 'max-content' }}>
              {[
                { title: 'Boceto Inicial', color: '#fef08a', tag: 'Concepto' },
                { title: 'Tinta & Entintado', color: '#bfdbfe', tag: 'Delineado' },
                { title: 'Acuarela Digital', color: '#fbcfe8', tag: 'Color' },
                { title: 'Textura de Papel', color: '#bbf7d0', tag: 'Fondo' },
                { title: 'Cinta Adhesiva', color: '#fed7aa', tag: 'Craft' },
                { title: 'Exportación Final', color: '#e9d5ff', tag: 'Listo' }
              ].map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '160px',
                    padding: '14px',
                    backgroundColor: card.color,
                    border: '2px solid #23272f',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 0 #23272f',
                    flexShrink: 0
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{card.tag}</span>
                  <h5 style={{ fontFamily: 'Patrick Hand', fontSize: '1.15rem', margin: '8px 0 4px 0' }}>{card.title}</h5>
                  <p style={{ fontSize: '0.85rem', margin: 0, color: '#444' }}>Paso #{idx + 1} del flujo artesanal.</p>
                </div>
              ))}
            </div>
          </SketchScrollArea>
        </div>

        {/* Comparación: Estilo Regla de Madera */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">3. Variante Regla de Taller (variant="ruler")</span>
          <p style={{ fontSize: '0.95rem', color: '#5e6472', margin: '0 0 10px 0' }}>
            Incluye marcas milimétricas grabadas en el carril:
          </p>
          <SketchScrollArea
            height="180px"
            variant="ruler"
            showIndicators={true}
          >
            <div style={{ padding: '14px 22px 14px 14px' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>📏 Marcas milimétricas precisas a lo largo de todo el borde derecho.</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>📐 El deslizador simula madera de haya con bordes de terracota.</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>✏️ Se sincroniza con la rueda del ratón y con eventos táctiles.</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>🎨 Perfecto para herramientas de diseño, arquitectura e ilustración.</p>
            </div>
          </SketchScrollArea>
        </div>

        {/* Variante Lápiz */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">4. Variante Lápiz Tricolor (variant="pencil")</span>
          <p style={{ fontSize: '0.95rem', color: '#5e6472', margin: '0 0 10px 0' }}>
            El deslizador simula un clásico lápiz de madera con goma rosada y punta de grafito:
          </p>
          <SketchScrollArea
            height="180px"
            variant="pencil"
            showIndicators={true}
          >
            <div style={{ padding: '14px 22px 14px 14px' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>✏️ Un mini lápiz que sube y baja conforme exploras el documento.</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>🟡 Cuerpo amarillo barnizado con casquillo plateado.</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>🔴 Goma de borrar en el extremo superior.</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>🖤 Punta de grafito en el extremo inferior.</p>
            </div>
          </SketchScrollArea>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default ScrollAreaDoc;

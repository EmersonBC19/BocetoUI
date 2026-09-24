import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchCloseButton, SketchCard, SketchTag, SketchInput } from '../../components/sketch';

export function CloseButtonDoc({ onTriggerToast }) {
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [tags, setTags] = useState(['React', 'BocetoUI', 'Vite', 'CSS']);
  const [inputValue, setInputValue] = useState('Texto de ejemplo para borrar');

  const propsList = [
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Dimensión física del botón (18px, 24px, 30px o 36px)' },
    { name: 'variant', type: "'default' | 'ghost' | 'danger'", default: "'default'", description: 'Acabado visual: default (papel con marco y sombra), ghost (sutil y transparente), danger (rojo activo)' },
    { name: 'title', type: 'string', default: "'Cerrar'", description: 'Texto del tooltip nativo del navegador' },
    { name: 'ariaLabel', type: 'string', default: "'Cerrar'", description: 'Etiqueta accesible para lectores de pantalla' },
    { name: 'onClick', type: 'Function', default: 'undefined', description: 'Callback ejecutado al hacer clic' },
    { name: 'strokeWidth', type: 'number', default: '2.8', description: 'Grosor del trazo de tinta del aspa manual' },
    { name: 'iconSize', type: 'number', default: 'undefined', description: 'Tamaño personalizado en píxeles del icono interior' }
  ];

  const codeSnippet = `import { SketchCloseButton } from 'boceto-ui';

// 1. Cierre estándar en modal o tarjeta
<SketchCloseButton
  size="md"
  variant="default"
  onClick={() => setOpen(false)}
  title="Cerrar modal"
/>

// 2. Limpiador sutil (ghost) en input o chip
<SketchCloseButton
  size="sm"
  variant="ghost"
  onClick={() => setValue('')}
  title="Limpiar campo"
/>`;

  return (
    <ComponentDocLayout
      title="SketchCloseButton"
      category="Acciones"
      description="Botón de cierre y limpieza artesanal con trazos de tinta curvados a mano, rotación elástica de 90° con rebote en hover y cambio a tono goma de borrar rosada con tinta roja."
      importCode="import { SketchCloseButton } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        {/* Tamaños */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Tamaños Escalonados (size)</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <SketchCloseButton size="xs" onClick={() => onTriggerToast('Clic en tamaño XS (18px)')} />
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>xs (18px)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <SketchCloseButton size="sm" onClick={() => onTriggerToast('Clic en tamaño SM (24px)')} />
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>sm (24px)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <SketchCloseButton size="md" onClick={() => onTriggerToast('Clic en tamaño MD (30px)')} />
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>md (30px)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <SketchCloseButton size="lg" onClick={() => onTriggerToast('Clic en tamaño LG (36px)')} />
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>lg (36px)</span>
            </div>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#5e6472' }}>
            *Pasa el cursor por encima para ver el giro de 90° y el efecto de goma de borrar.
          </p>
        </div>

        {/* Variantes de Estilo */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Variantes de Acabado (variant)</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '10px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <SketchCloseButton variant="default" size="md" onClick={() => onTriggerToast('Variante Default')} />
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>default</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <SketchCloseButton variant="ghost" size="md" onClick={() => onTriggerToast('Variante Ghost')} />
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>ghost</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <SketchCloseButton variant="danger" size="md" onClick={() => onTriggerToast('Variante Danger')} />
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>danger</span>
            </div>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#5e6472' }}>
            La variante <code>ghost</code> se camufla sobre fondos blancos y solo destaca al interactuar.
          </p>
        </div>

        {/* Casos de Uso: Cerrar Tarjeta */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">3. En Tarjetas o Paneles Descartables</span>
          {isCardVisible ? (
            <div style={{ position: 'relative', padding: '16px', background: '#fffdfa', border: '2px solid #23272f', borderRadius: '12px' }}>
              <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <SketchCloseButton
                  size="sm"
                  onClick={() => {
                    setIsCardVisible(false);
                    onTriggerToast('Tarjeta cerrada');
                  }}
                  title="Descartar tarjeta"
                />
              </div>
              <h4 style={{ fontFamily: 'Patrick Hand', margin: '0 0 6px 0', fontSize: '1.2rem' }}>📌 Nota Rápida</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#555' }}>
                Esta tarjeta incluye un SketchCloseButton en la esquina superior derecha. Haz clic para cerrarla.
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <button
                type="button"
                style={{
                  padding: '8px 16px',
                  background: '#fef08a',
                  border: '2px solid #23272f',
                  borderRadius: '8px',
                  fontFamily: 'Patrick Hand',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                onClick={() => setIsCardVisible(true)}
              >
                ↻ Restaurar Tarjeta
              </button>
            </div>
          )}
        </div>

        {/* Casos de Uso: Limpiar Input & Tags */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">4. En Limpieza de Campos y Etiquetas</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <SketchInput
              label="Campo con botón de borrado (endAdornment)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              endAdornment={
                inputValue ? (
                  <SketchCloseButton
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setInputValue('');
                      onTriggerToast('Campo limpiado');
                    }}
                    title="Borrar texto"
                  />
                ) : null
              }
            />

            <div>
              <span style={{ fontSize: '0.9rem', color: '#71717a', display: 'block', marginBottom: '6px' }}>
                Etiquetas descartables:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tags.map((t) => (
                  <SketchTag
                    key={t}
                    color="yellow"
                    onRemove={() => {
                      setTags(tags.filter((item) => item !== t));
                      onTriggerToast(`Eliminado: ${t}`);
                    }}
                  >
                    {t}
                  </SketchTag>
                ))}
                {tags.length === 0 && (
                  <button
                    type="button"
                    style={{ fontSize: '0.85rem', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => setTags(['React', 'BocetoUI', 'Vite', 'CSS'])}
                  >
                    + Restaurar etiquetas
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default CloseButtonDoc;

import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchPopover, SketchButton, SketchInput, SketchBadge } from '../../components/sketch';
import { Filter, HelpCircle, AlertTriangle } from 'lucide-react';

export function PopoverDoc({ onTriggerToast }) {
  const [filterVal, setFilterVal] = useState('recientes');

  return (
    <ComponentDocLayout
      title="SketchPopover"
      description="Panel flotante enriquecido anclado a un elemento disparador, con botón de cierre artesanal y estilo de globo."
      badge="Superficies"
      importCode="import { SketchPopover } from 'boceto-ui';"
      propsList={[
        { name: 'trigger', type: 'ReactNode', default: 'undefined', description: 'Elemento que abre el popover al hacer clic' },
        { name: 'title', type: 'string', default: 'undefined', description: 'Título de la cabecera' },
        { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Posición relativa al trigger' },
        { name: 'width', type: 'string', default: "'280px'", description: 'Ancho personalizado del contenedor' }
      ]}
      dosAndDonts={{
        dos: [
          'Usa popovers para interacciones secundarias breves como filtros rápidos o confirmaciones puntuales.',
          'Incluye un botón de acción primario y secundario claro dentro del cuerpo.'
        ],
        donts: [
          'No metas flujos complejos de varios pasos dentro de un popover; para eso usa SketchModal o SketchDrawer.'
        ]
      }}
    >
      <div className="comp-doc-grid">
        {/* Ejemplo 1: Filtros Rápidos */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Filtros Rápidos en Popover</div>
          <div style={{ padding: '24px 0', display: 'flex', gap: '16px' }}>
            <SketchPopover
              title="Filtros del Catálogo"
              trigger={
                <SketchButton variant="wobbly">
                  <Filter size={16} /> Filtrar Contenido
                </SketchButton>
              }
              width="300px"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <SketchInput label="Buscar por etiqueta" placeholder="Ej. UI, Web..." />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <SketchButton
                    size="sm"
                    variant="marker"
                    onClick={() => onTriggerToast?.('Filtros aplicados correctamente')}
                  >
                    Aplicar
                  </SketchButton>
                </div>
              </div>
            </SketchPopover>
          </div>
        </div>

        {/* Ejemplo 2: Confirmación Destructiva */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Confirmación Flotante al Clic</div>
          <div style={{ padding: '24px 0', display: 'flex', gap: '16px' }}>
            <SketchPopover
              title="¿Archivar Proyecto?"
              trigger={
                <SketchButton variant="danger" size="sm">
                  Archivar Boceto
                </SketchButton>
              }
              width="260px"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>
                  El proyecto se moverá a tu libreta de archivo pero no se eliminará.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <SketchButton
                    size="sm"
                    variant="marker"
                    onClick={() => onTriggerToast?.('Proyecto archivado con éxito')}
                  >
                    Sí, Archivar
                  </SketchButton>
                </div>
              </div>
            </SketchPopover>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default PopoverDoc;

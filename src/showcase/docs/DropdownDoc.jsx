import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchDropdown, SketchButton, SketchBadge } from '../../components/sketch';
import { Edit2, Copy, Trash2, Share2, MoreVertical, ChevronDown, Sparkles } from 'lucide-react';

export function DropdownDoc({ onTriggerToast }) {
  const menuItems = [
    {
      id: 'edit',
      label: 'Editar Proyecto',
      icon: <Edit2 size={16} />,
      onClick: () => onTriggerToast?.('Acción: Editar Proyecto')
    },
    {
      id: 'duplicate',
      label: 'Duplicar Boceto',
      icon: <Copy size={16} />,
      badge: 'Nuevo',
      onClick: () => onTriggerToast?.('Acción: Duplicar Boceto')
    },
    {
      id: 'share',
      label: 'Compartir Enlace',
      icon: <Share2 size={16} />,
      onClick: () => onTriggerToast?.('Acción: Compartir Enlace')
    },
    { divider: true },
    {
      id: 'delete',
      label: 'Eliminar Elemento',
      icon: <Trash2 size={16} />,
      danger: true,
      onClick: () => onTriggerToast?.('Acción: Eliminar Elemento')
    }
  ];

  return (
    <ComponentDocLayout
      title="SketchDropdown"
      description="Menú desplegable flotante con trazos a pluma, flechas de cómic y soporte de acciones destructivas o separadores."
      badge="Acciones"
      importCode="import { SketchDropdown } from 'boceto-ui';"
      propsList={[
        { name: 'trigger', type: 'ReactNode', default: 'undefined', description: 'Elemento visible que abre/cierra el menú al hacer clic' },
        { name: 'items', type: 'Array<{id, label, icon, onClick, danger, disabled, divider, badge}>', default: '[]', description: 'Opciones del menú' },
        { name: 'placement', type: "'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'", default: "'bottom-left'", description: 'Dirección de despliegue' }
      ]}
      dosAndDonts={{
        dos: [
          'Usa divisores (divider: true) para agrupar lógicamente acciones relacionadas.',
          'Marca acciones destructivas como danger: true para advertir visualmente al usuario.',
          'Acompaña cada elemento con un icono representativo para escaneabilidad rápida.'
        ],
        donts: [
          'No satures el menú con más de 7 u 8 opciones; si necesitas más, usa un modal o drawer.',
          'No olvides vincular la acción onClick para dar feedback inmediato al usuario.'
        ]
      }}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Menú de Acciones con Botón Marcador</div>
          <div style={{ padding: '24px 0', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <SketchDropdown
              trigger={
                <SketchButton variant="marker">
                  Opciones del Taller <ChevronDown size={16} />
                </SketchButton>
              }
              items={menuItems}
            />

            <SketchDropdown
              trigger={
                <SketchButton variant="wobbly" size="sm">
                  <MoreVertical size={16} />
                </SketchButton>
              }
              items={menuItems}
              placement="bottom-right"
            />
          </div>
        </div>

        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Alineación Derecha (Ideal para Tablas y Tarjetas)</div>
          <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'flex-end' }}>
            <SketchDropdown
              trigger={
                <SketchButton variant="default">
                  Acciones Rápidas <ChevronDown size={16} />
                </SketchButton>
              }
              items={menuItems}
              placement="bottom-right"
            />
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default DropdownDoc;

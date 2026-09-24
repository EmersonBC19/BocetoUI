import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchDrawer, SketchButton, SketchInput, SketchSelect, SketchDivider } from '../../components/sketch';
import { SlidersHorizontal, ShoppingBag, ArrowRight } from 'lucide-react';

export function DrawerDoc({ onTriggerToast }) {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const codeSnippet = `import { SketchDrawer, SketchButton } from 'bocetoui';
import { useState } from 'react';

export default function MiPanelLateral() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <SketchButton onClick={() => setOpen(true)}>Abrir Panel</SketchButton>

      <SketchDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Filtros del Catálogo"
        placement="right" // 'right' | 'left'
        size="md" // 'sm' | 'md' | 'lg'
        footer={
          <div style={{ display: 'flex', gap: '8px' }}>
            <SketchButton variant="wobbly" onClick={() => setOpen(false)}>Cancelar</SketchButton>
            <SketchButton variant="marker" onClick={() => setOpen(false)}>Aplicar</SketchButton>
          </div>
        }
      >
        <p>Contenido del panel lateral con scroll independiente...</p>
      </SketchDrawer>
    </div>
  );
}`;

  const propsList = [
    { name: 'isOpen', type: 'boolean', default: 'false', description: 'Controla la visibilidad del panel deslizable' },
    { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback al cerrar (botón X, backdrop o tecla Escape)' },
    { name: 'title', type: 'string', default: "''", description: 'Título visible en el encabezado con cenefa washi' },
    { name: 'placement', type: "'right' | 'left'", default: "'right'", description: 'Lateral desde donde se despliega el panel' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Ancho del panel (320px, 440px o 580px)' },
    { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Botonera o acciones al pie del panel' },
    { name: 'className', type: 'string', default: "''", description: 'Clases CSS adicionales' }
  ];

  const dosAndDonts = {
    dos: [
      'Utiliza `SketchDrawer` para flujos secundarios que no ameritan cambiar de página (ej. filtros, carrito, detalles de un registro).',
      'Mantén visible el botón de cierre (X) en todo momento y garantiza el soporte de cierre con la tecla Escape.',
      'Coloca las acciones principales ("Aplicar filtros", "Completar pedido") en el footer fijado.'
    ],
    donts: [
      'No utilices paneles laterales para formularios extensos que requieran más de 5 minutos de completado (usa un wizard o página dedicada).',
      'Evita anidar modales dentro de un Drawer; satura el contexto mental del usuario.',
      'No olvides restaurar el scroll de la página una vez cerrado el panel.'
    ]
  };

  return (
    <ComponentDocLayout
      title="SketchDrawer"
      category="SUPERFICIES & PANELES"
      description="Panel lateral deslizable (offcanvas/sheet) con cinemática elástica Bungee, cenefa superior de cinta washi y fondo difuminado."
      importCode="import { SketchDrawer } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
      dosAndDonts={dosAndDonts}
    >
      <div className="comp-doc-grid">
        {/* Disparador de Panel de Filtros */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Panel de Filtros Laterales (Derecha)</div>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#71717a' }}>
            Despliega un panel derecho con controles de formulario y cenefa washi:
          </p>
          <SketchButton
            variant="wobbly"
            onClick={() => {
              setIsFilterDrawerOpen(true);
              onTriggerToast?.('Panel de filtros abierto');
            }}
          >
            <SlidersHorizontal size={16} /> Abrir Panel de Filtros
          </SketchButton>
        </div>

        {/* Disparador de Carrito Lateral */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Carrito de Compras (Izquierda)</div>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#71717a' }}>
            Despliega un panel izquierdo con resumen de compras:
          </p>
          <SketchButton
            variant="marker"
            onClick={() => {
              setIsCartDrawerOpen(true);
              onTriggerToast?.('Carrito de compras abierto');
            }}
          >
            <ShoppingBag size={16} /> Abrir Carrito Lateral
          </SketchButton>
        </div>
      </div>

      {/* Drawer 1: Filtros */}
      <SketchDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filtros del Catálogo"
        placement="right"
        size="md"
        footer={
          <div style={{ display: 'flex', gap: '8px' }}>
            <SketchButton variant="wobbly" size="sm" onClick={() => setIsFilterDrawerOpen(false)}>
              Restablecer
            </SketchButton>
            <SketchButton
              variant="marker"
              size="sm"
              onClick={() => {
                setIsFilterDrawerOpen(false);
                onTriggerToast?.('Filtros aplicados con éxito');
              }}
            >
              Aplicar Filtros
            </SketchButton>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Buscar por palabra clave</label>
            <SketchInput placeholder="Ej. Lápiz, cuaderno, tinta..." />
          </div>
          <div>
            <label style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>Categoría de dibujo</label>
            <SketchSelect
              options={[
                { value: 'all', label: 'Todas las herramientas' },
                { value: 'pencils', label: 'Lápices y carboncillos' },
                { value: 'inks', label: 'Tintas y plumillas' }
              ]}
              defaultValue="all"
            />
          </div>
          <SketchDivider variant="dashed" />
          <p style={{ fontSize: '0.9rem', color: '#71717a', margin: 0 }}>
            Puedes presionar la tecla <strong>Escape</strong> o hacer clic en el fondo difuminado para cerrar este panel.
          </p>
        </div>
      </SketchDrawer>

      {/* Drawer 2: Carrito */}
      <SketchDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        title="Tu Carrito Artesanal"
        placement="left"
        size="md"
        footer={
          <SketchButton
            variant="marker"
            size="sm"
            onClick={() => {
              setIsCartDrawerOpen(false);
              onTriggerToast?.('Iniciando proceso de checkout');
            }}
          >
            Proceder al Pago <ArrowRight size={14} />
          </SketchButton>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '12px', border: '1.5px solid #18181b', borderRadius: '6px', background: '#fff' }}>
            <strong>Cuaderno de Bocetos A4</strong>
            <p style={{ margin: '4px 0 0 0', color: '#71717a', fontSize: '0.85rem' }}>1 unidad · $18.50</p>
          </div>
          <div style={{ padding: '12px', border: '1.5px solid #18181b', borderRadius: '6px', background: '#fff' }}>
            <strong>Tinta China Negra 50ml</strong>
            <p style={{ margin: '4px 0 0 0', color: '#71717a', fontSize: '0.85rem' }}>2 unidades · $24.00</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, marginTop: '8px' }}>
            <span>Total:</span>
            <span>$42.50</span>
          </div>
        </div>
      </SketchDrawer>
    </ComponentDocLayout>
  );
}

export default DrawerDoc;

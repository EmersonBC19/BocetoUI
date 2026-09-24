import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchSidebar, SketchAvatar } from '../../components/sketch';
import { LayoutDashboard, Users, FileSpreadsheet, Settings, HelpCircle, Palette } from 'lucide-react';

export function SidebarDoc({ onTriggerToast }) {
  const [activeItem, setActiveItem] = useState('dash');
  const [collapsed, setCollapsed] = useState(false);

  const sidebarGroups = [
    {
      title: 'Espacio de Trabajo',
      items: [
        { id: 'dash', label: 'Panel General', icon: <LayoutDashboard size={18} />, badge: 3 },
        { id: 'clients', label: 'Clientes & Cuadernos', icon: <Users size={18} /> },
        { id: 'reports', label: 'Hojas de Balance', icon: <FileSpreadsheet size={18} /> }
      ]
    },
    {
      title: 'Sistema',
      items: [
        { id: 'theme', label: 'Lienzos & Tinta', icon: <Palette size={18} /> },
        { id: 'settings', label: 'Configuración', icon: <Settings size={18} /> },
        { id: 'help', label: 'Preguntas Frecuentes', icon: <HelpCircle size={18} /> }
      ]
    }
  ];

  const propsList = [
    { name: 'groups', type: 'Array<{title, items}>', default: '[]', description: 'Grupos y enlaces del menú' },
    { name: 'activeId', type: 'string', default: 'undefined', description: 'ID del elemento activo' },
    { name: 'collapsed', type: 'boolean', default: 'false', description: 'Control de colapso de la barra' },
    { name: 'onCollapseChange', type: '(collapsed) => void', default: 'undefined', description: 'Callback al alternar colapso' },
    { name: 'header', type: 'ReactNode', default: 'undefined', description: 'Contenido de la cabecera' },
    { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Contenido del pie' }
  ];

  const codeSnippet = `import { SketchSidebar } from 'boceto-ui';

<SketchSidebar
  groups={[
    {
      title: 'Menú Principal',
      items: [
        { id: 'home', label: 'Inicio', icon: <Home /> },
        { id: 'settings', label: 'Ajustes', icon: <Settings /> }
      ]
    }
  ]}
  activeId="home"
  onSelect={(item) => console.log('Seleccionado:', item)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchSidebar"
      category="Estructura & Superficies"
      description="Barra lateral colapsable con diseño artesanal, secciones agrupadas, badges de conteo y soporte para modo miniatura con iconos."
      importCode="import { SketchSidebar } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card" style={{ gridColumn: '1 / -1' }}>
          <span className="comp-doc-card__label">Barra Lateral Interactiva (Alternar Colapso con Flecha)</span>
          <div style={{ display: 'flex', height: '360px', border: '2px solid var(--sketch-ink)', borderRadius: '12px', overflow: 'hidden' }}>
            <SketchSidebar
              collapsed={collapsed}
              onCollapseChange={setCollapsed}
              header={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SketchAvatar name="Estudio Creativo" size="sm" />
                  <strong>Boceto App</strong>
                </div>
              }
              groups={sidebarGroups}
              activeId={activeItem}
              onSelect={(item) => {
                setActiveItem(item.id);
                onTriggerToast?.(`Sección elegida: ${item.label}`);
              }}
              footer={
                <span style={{ fontSize: '0.85rem', color: '#5e6472' }}>BocetoUI v1.0.0</span>
              }
            />

            <div style={{ flex: 1, padding: '24px', background: 'var(--sketch-bg-paper)' }}>
              <h3>Vista del Contenedor Principal</h3>
              <p>Módulo activo: <strong>{activeItem}</strong></p>
              <p style={{ color: '#5e6472' }}>Haz clic en la flecha de la esquina superior para colapsar o expandir la barra lateral.</p>
            </div>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default SidebarDoc;

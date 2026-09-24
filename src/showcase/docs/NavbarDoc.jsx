import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchNavbar, SketchButton, SketchBadge } from '../../components/sketch';
import { Sparkles, Home, FolderKanban, Info } from 'lucide-react';

export function NavbarDoc({ onTriggerToast }) {
  const [activeTab, setActiveTab] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Inicio', icon: <Home size={16} /> },
    { id: 'projects', label: 'Proyectos', icon: <FolderKanban size={16} /> },
    { id: 'about', label: 'Acerca de', icon: <Info size={16} /> }
  ];

  const propsList = [
    { name: 'brand', type: 'ReactNode', default: 'undefined', description: 'Logotipo o título de la aplicación' },
    { name: 'links', type: 'Array<{id, label, icon, href}>', default: '[]', description: 'Enlaces de navegación' },
    { name: 'actions', type: 'ReactNode', default: 'undefined', description: 'Botones y acciones del lado derecho' },
    { name: 'sticky', type: 'boolean', default: 'false', description: 'Fija la barra al hacer scroll' },
    { name: 'activeId', type: 'string', default: 'undefined', description: 'ID del enlace actualmente activo' }
  ];

  const codeSnippet = `import { SketchNavbar, SketchButton } from 'boceto-ui';

<SketchNavbar
  brand={<span>Mi App Cómic</span>}
  links={[
    { id: 'home', label: 'Inicio' },
    { id: 'docs', label: 'Documentos' }
  ]}
  actions={<SketchButton size="sm">Ingresar</SketchButton>}
/>`;

  return (
    <ComponentDocLayout
      title="SketchNavbar"
      category="Navegación & Estructura"
      description="Barra superior de navegación con borde inferior de rotulador, pestañas de menú con efecto resaltador y menú móvil adaptable."
      importCode="import { SketchNavbar } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card" style={{ gridColumn: '1 / -1' }}>
          <span className="comp-doc-card__label">Barra de Aplicación Completa</span>
          <div style={{ border: '2px dashed var(--sketch-ink)', borderRadius: '8px', overflow: 'hidden' }}>
            <SketchNavbar
              brand={
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} color="#b91c1c" />
                  <strong>BocetoStudio</strong>
                </span>
              }
              links={navLinks}
              activeId={activeTab}
              onNavigate={(item) => {
                setActiveTab(item.id);
                onTriggerToast?.(`Navegando a: ${item.label}`);
              }}
              actions={
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <SketchBadge variant="accent">v2.0</SketchBadge>
                  <SketchButton size="sm" onClick={() => onTriggerToast?.('¡Botón Nuevo Proyecto!')}>
                    + Nuevo
                  </SketchButton>
                </div>
              }
            />
            <div style={{ padding: '24px', textAlign: 'center', color: '#5e6472', fontStyle: 'italic' }}>
              Contenido de la página actual ({activeTab})
            </div>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default NavbarDoc;

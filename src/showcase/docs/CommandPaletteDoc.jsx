import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchCommandPalette, SketchButton } from '../../components/sketch';
import { Search, Home, FileText, Settings, Sparkles, User, Palette } from 'lucide-react';

export function CommandPaletteDoc({ onTriggerToast }) {
  const [isOpen, setIsOpen] = useState(false);

  const commandItems = [
    {
      group: 'Navegación Rápida',
      items: [
        { id: 'home', label: 'Ir a la Portada Principal', icon: <Home size={18} />, shortcut: '⌘H', onSelect: () => onTriggerToast?.('Comando: Ir al inicio') },
        { id: 'docs', label: 'Ver Documentación de Componentes', icon: <FileText size={18} />, shortcut: '⌘D', onSelect: () => onTriggerToast?.('Comando: Abrir docs') },
        { id: 'profile', label: 'Ver Mi Perfil de Dibujante', icon: <User size={18} />, onSelect: () => onTriggerToast?.('Comando: Abrir perfil') }
      ]
    },
    {
      group: 'Acciones del Sistema',
      items: [
        { id: 'theme', label: 'Cambiar a Pizarra de Tiza', icon: <Palette size={18} />, shortcut: '⌘T', onSelect: () => onTriggerToast?.('Comando: Cambiar a pizarra de tiza') },
        { id: 'new', label: 'Crear Nuevo Boceto en Blanco', icon: <Sparkles size={18} />, shortcut: '⌘N', onSelect: () => onTriggerToast?.('Comando: Crear nuevo boceto') },
        { id: 'settings', label: 'Configuración General', icon: <Settings size={18} />, onSelect: () => onTriggerToast?.('Comando: Ajustes') }
      ]
    }
  ];

  const propsList = [
    { name: 'isOpen', type: 'boolean', default: 'false', description: 'Control de visibilidad del modal de comandos' },
    { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback al cerrar el modal' },
    { name: 'items', type: 'Array<CommandGroup | CommandItem>', default: '[]', description: 'Lista de acciones agrupadas o individuales' },
    { name: 'placeholder', type: 'string', default: "'Escribe un comando...'", description: 'Placeholder del buscador' },
    { name: 'hotkey', type: 'string', default: "'k'", description: 'Tecla para el atajo Cmd+[tecla] o Ctrl+[tecla]' }
  ];

  const codeSnippet = `import { SketchCommandPalette, SketchButton } from 'boceto-ui';

const [isOpen, setIsOpen] = useState(false);

<SketchButton onClick={() => setIsOpen(true)}>
  Abrir Menú (⌘K)
</SketchButton>

<SketchCommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  items={[
    {
      group: 'Navegación',
      items: [
        { label: 'Ir al Inicio', onSelect: () => navigate('/') }
      ]
    }
  ]}
/>`;

  return (
    <ComponentDocLayout
      title="SketchCommandPalette"
      category="Navegación & Estructura"
      description="Buscador global y paleta de comandos flotante estilo Cmd+K o KBar con atajos de teclado, navegación por flechas y bordes de libreta artesanal."
      importCode="import { SketchCommandPalette } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">Demostración Interactiva</span>
          <p style={{ color: '#5e6472', marginBottom: '14px' }}>
            Pulsa el botón de abajo o presiona <strong>Ctrl + K</strong> (o <strong>⌘K</strong>) en tu teclado.
          </p>
          <SketchButton
            icon={<Search size={16} />}
            variant="wobbly"
            onClick={() => setIsOpen(true)}
          >
            Abrir Paleta de Comandos (Ctrl+K)
          </SketchButton>

          <SketchCommandPalette
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            items={commandItems}
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default CommandPaletteDoc;

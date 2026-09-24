import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchTag, SketchButton } from '../../components/sketch';
import { RotateCcw, Tag } from 'lucide-react';

export function TagDoc({ onTriggerToast }) {
  const initialTags = [
    { id: '1', label: 'React 19', color: 'blue' },
    { id: '2', label: 'Estilo Boceto', color: 'yellow' },
    { id: '3', label: '120 FPS GPU', color: 'green' },
    { id: '4', label: 'Física Bungee', color: 'purple' },
    { id: '5', label: 'Cero Emojis', color: 'red' }
  ];

  const [tagList, setTagList] = useState(initialTags);

  const propsList = [
    { name: 'color', type: "'default' | 'yellow' | 'blue' | 'green' | 'red' | 'purple'", default: "'default'", description: 'Tinta de fondo pastel' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del chip' },
    { name: 'onRemove', type: '() => void', default: 'undefined', description: 'Callback al hacer clic en la cruz de eliminación' },
    { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Icono decorativo opcional a la izquierda' }
  ];

  const handleRemove = (id) => {
    setTagList(prev => prev.filter(t => t.id !== id));
    onTriggerToast('Etiqueta descartada');
  };

  const codeSnippet = `<SketchTag
  color="yellow"
  size="md"
  onRemove={() => console.log('Eliminado')}
>
  Diseño Artesanal
</SketchTag>`;

  return (
    <ComponentDocLayout
      title="SketchTag"
      category="Visualización de Datos"
      description="Etiquetas interactivas tipo chip con trazo de pluma y botón de cierre opcional con aspa de plumilla, ideales para filtros, categorías y palabras clave."
      importCode="import { SketchTag } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span className="comp-doc-card__label" style={{ margin: 0 }}>
            Etiquetas Interactivas (Haz clic en el aspa para eliminar)
          </span>
          <SketchButton
            size="sm"
            variant="wobbly"
            icon={<RotateCcw size={14} />}
            onClick={() => setTagList(initialTags)}
          >
            Restablecer
          </SketchButton>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', padding: '16px 0' }}>
          {tagList.map((t) => (
            <SketchTag
              key={t.id}
              color={t.color}
              onRemove={() => handleRemove(t.id)}
            >
              {t.label}
            </SketchTag>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '16px' }}>
          <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>Tamaños disponibles:</span>
          <SketchTag size="sm" color="blue">Pequeño (sm)</SketchTag>
          <SketchTag size="md" color="yellow">Medio (md)</SketchTag>
          <SketchTag size="lg" color="green">Grande (lg)</SketchTag>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default TagDoc;

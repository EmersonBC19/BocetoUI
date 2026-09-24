import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import {
  SketchStickyNote,
  SketchPinIcon,
  SketchLightbulbIcon,
  SketchSparkleIcon,
  SketchCheckIcon
} from '../../components/sketch';

export function StickyNoteDoc() {
  const propsList = [
    { name: 'color', type: "'yellow' | 'pink' | 'blue' | 'green' | 'orange'", default: "'yellow'", description: 'Tonalidad pastel del papel de nota' },
    { name: 'tilt', type: 'number', default: '0', description: 'Ángulo de inclinación orgánica en grados' },
    { name: 'hasPin', type: 'boolean', default: 'true', description: 'Muestra una chincheta realista fijada en la parte superior' }
  ];

  const codeSnippet = `<SketchStickyNote color="yellow" tilt={-2} hasPin={true}>
  <strong>Recordatorio:</strong>
  <p>Entregar bocetos finales de la arquitectura.</p>
</SketchStickyNote>`;

  return (
    <ComponentDocLayout
      title="SketchStickyNote"
      category="Estructura & Superficies"
      description="Notas adhesivas Post-It de colores pastel con chinchetas realistas dibujadas a mano e inclinación asimétrica para avisos e ideas."
      importCode="import { SketchStickyNote } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <SketchStickyNote color="yellow" tilt={-2}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <SketchPinIcon size={18} />
            <strong>Recordatorio:</strong>
          </div>
          <p style={{ marginTop: '4px' }}>Rendimiento optimizado a nivel profesional: cero caída de cuadros.</p>
        </SketchStickyNote>

        <SketchStickyNote color="pink" tilt={2}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <SketchLightbulbIcon size={18} />
            <strong>Idea Creativa:</strong>
          </div>
          <p style={{ marginTop: '4px' }}>Puedes cambiar la textura del lienzo arriba para ver el contraste.</p>
        </SketchStickyNote>

        <SketchStickyNote color="blue" tilt={-1}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <SketchSparkleIcon size={18} />
            <strong>Estilo Cómic:</strong>
          </div>
          <p style={{ marginTop: '4px' }}>Efecto visual artesanal sin necesidad de librerías externas pesadas.</p>
        </SketchStickyNote>

        <SketchStickyNote color="green" tilt={3}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <SketchCheckIcon size={18} />
            <strong>Listo para Usar:</strong>
          </div>
          <p style={{ marginTop: '4px' }}>Exporta los componentes a cualquier vista de tu aplicación.</p>
        </SketchStickyNote>
      </div>
    </ComponentDocLayout>
  );
}

export default StickyNoteDoc;

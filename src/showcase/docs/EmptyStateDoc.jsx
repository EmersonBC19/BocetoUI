import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchEmptyState, SketchButton } from '../../components/sketch';
import { Plus, RotateCcw, Search } from 'lucide-react';

export function EmptyStateDoc({ onTriggerToast }) {
  const [selectedIllustration, setSelectedIllustration] = useState('box');

  const codeSnippet = `import { SketchEmptyState, SketchButton } from 'bocetoui';
import { Plus } from 'lucide-react';

export default function MiBandejaVacia() {
  return (
    <SketchEmptyState
      illustration="box" // 'box' | 'search' | 'document'
      title="No hay proyectos creados"
      description="Comienza dibujando tu primera idea o importa una plantilla prediseñada."
      action={
        <SketchButton variant="marker" onClick={() => alert('Crear')}>
          <Plus size={16} /> Crear Primer Proyecto
        </SketchButton>
      }
    />
  );
}`;

  const propsList = [
    { name: 'illustration', type: "'box' | 'search' | 'document' | ReactNode", default: "'box'", description: 'Ilustración vectorial doodle central' },
    { name: 'title', type: 'string', default: "'No hay elementos por aquí'", description: 'Título principal descriptivo' },
    { name: 'description', type: 'string', default: "'...'", description: 'Mensaje explicativo con sugerencias de acción' },
    { name: 'action', type: 'ReactNode', default: 'undefined', description: 'Botón o llamada a la acción principal' },
    { name: 'className', type: 'string', default: "''", description: 'Clases CSS adicionales' }
  ];

  const dosAndDonts = {
    dos: [
      'Proporciona siempre una vía de escape o acción constructiva (ej. "Limpiar búsqueda" o "Crear nuevo apunte").',
      'Utiliza un tono amigable, humano y constructivo en lugar de mensajes de error fríos como "0 registros".',
      'Adapta la ilustración al contexto específico: lupa para búsquedas sin éxito, caja vacía para listas y hoja para documentos.'
    ],
    donts: [
      'No dejes una pantalla en blanco sin mensaje cuando una consulta no retorne resultados.',
      'Evita textos demasiado largos o desalentadores; el usuario debe saber qué hacer en menos de 3 segundos.',
      'No coloques más de 2 botones de acción en el pie del estado vacío para no generar indecisión.'
    ]
  };

  const getIllustrationContent = () => {
    switch (selectedIllustration) {
      case 'search':
        return {
          title: 'Sin coincidencias de búsqueda',
          desc: 'No encontramos ningún boceto con esos términos. Prueba usando palabras más generales.',
          btn: (
            <SketchButton
              size="sm"
              variant="wobbly"
              onClick={() => onTriggerToast?.('Filtros de búsqueda restablecidos')}
            >
              <RotateCcw size={14} /> Restablecer Búsqueda
            </SketchButton>
          )
        };
      case 'document':
        return {
          title: 'Libreta de apuntes vacía',
          desc: 'Esta libreta todavía no contiene hojas ni diagramas anotados.',
          btn: (
            <SketchButton
              size="sm"
              variant="marker"
              onClick={() => onTriggerToast?.('Creando nuevo apunte')}
            >
              <Plus size={14} /> Escribir Primer Apunte
            </SketchButton>
          )
        };
      case 'box':
      default:
        return {
          title: 'Tu bandeja está completamente limpia',
          desc: 'Todas las tareas y revisiones artesanales han sido procesadas con éxito.',
          btn: (
            <SketchButton
              size="sm"
              variant="marker"
              onClick={() => onTriggerToast?.('Creando nuevo pedido artesanal')}
            >
              <Plus size={14} /> Crear Nuevo Pedido
            </SketchButton>
          )
        };
    }
  };

  const content = getIllustrationContent();

  return (
    <ComponentDocLayout
      title="SketchEmptyState"
      category="FEEDBACK & ESTADOS"
      description="Pantalla de estado vacío con ilustraciones vectoriales dibujadas a mano, mensajes humanos y botón de acción primario."
      importCode="import { SketchEmptyState } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
      dosAndDonts={dosAndDonts}
    >
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-sketch-title)', fontWeight: 700 }}>Variante de Ilustración:</span>
        {['box', 'search', 'document'].map((variant) => (
          <button
            key={variant}
            type="button"
            className={`cursor-btn ${selectedIllustration === variant ? 'cursor-btn--active' : ''}`}
            onClick={() => setSelectedIllustration(variant)}
          >
            {variant === 'box' && '📦 Caja Vacía'}
            {variant === 'search' && '🔍 Búsqueda Lupa'}
            {variant === 'document' && '📄 Hoja Apunte'}
          </button>
        ))}
      </div>

      <div className="comp-doc-card">
        <SketchEmptyState
          illustration={selectedIllustration}
          title={content.title}
          description={content.desc}
          action={content.btn}
        />
      </div>
    </ComponentDocLayout>
  );
}

export default EmptyStateDoc;

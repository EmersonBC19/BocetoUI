import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import {
  SketchCard,
  SketchButton,
  SketchCheckbox,
  SketchBadge,
  SketchProgress,
  SketchCloseIcon
} from '../../components/sketch';
import { useTaskBoardCQRS } from '../hooks/useTaskBoardCQRS';
import { Plus, Copy, Sparkles, Database, Layers } from 'lucide-react';

const INITIAL_DEMO_TASKS = [
  { id: 1, text: 'Definir bordes de boceto arquitectónico y blueprint', done: true },
  { id: 2, text: 'Recrear cinta washi adhesiva y esquinas dobladas', done: true },
  { id: 3, text: 'Implementar círculos en bucle concéntrico artesanales', done: true },
  { id: 4, text: 'Optimizar performance a 120 FPS sin filtros lentos', done: true },
  { id: 5, text: 'Segregar arquitectura CQRS: Commands vs Queries', done: true },
  { id: 6, text: 'Menú interactivo y fichas de componentes con diseño propio', done: true }
];

export function PlaygroundDoc({ onTriggerToast, onCopyCode }) {
  const [newText, setNewText] = useState('');
  const { query, commands } = useTaskBoardCQRS(INITIAL_DEMO_TASKS, onTriggerToast);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (commands.addTask(newText)) {
      setNewText('');
    }
  };

  const codeSnippet = `// Hook CQRS: Separación estricta de Commands y Queries
const { query, commands } = useTaskBoardCQRS(initialTasks);

// Commands (Mutaciones)
commands.addTask('Nueva tarea de boceto');
commands.toggleTask(taskId);
commands.changeFilter('pending');

// Queries (Lectura pura proyectada con useMemo)
const { tasks, stats, currentFilter } = query;`;

  return (
    <ComponentDocLayout
      title="Tablero CQRS en Vivo"
      category="Arquitectura & Playground"
      description="Demostración práctica del patrón CQRS (Command Query Responsibility Segregation) en React: los Commands ejecutan mutaciones validadas mientras las Queries proyectan filtros y estadísticas en tiempo real sin recálculos en la vista."
      importCode="import { useTaskBoardCQRS } from '../hooks/useTaskBoardCQRS';"
      codeSnippet={codeSnippet}
    >
      <div className="demo-board-grid">
        {/* Lista con Cinta Washi */}
        <SketchCard
          variant="taped"
          tapePosition="top-center"
          title="Lista de Tareas del Boceto"
          headerAction={
            <SketchBadge variant="pill">
              {query.stats.completed}/{query.stats.total}
            </SketchBadge>
          }
          footer={
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <input
                type="text"
                className="sketch-input sketch-input--boxed"
                placeholder="Añadir nueva tarea interactiva..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                style={{ flexGrow: 1 }}
              />
              <SketchButton type="submit" variant="wobbly" icon={<Plus size={16} />}>
                Añadir
              </SketchButton>
            </form>
          }
        >
          {/* Filtros CQRS */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', borderBottom: '1px dashed var(--sketch-ink-light)', paddingBottom: '10px' }}>
            <button
              type="button"
              className={`canvas-btn ${query.currentFilter === 'all' ? 'canvas-btn--active' : ''}`}
              onClick={() => commands.changeFilter('all')}
              style={{ fontSize: '0.95rem', padding: '4px 10px' }}
            >
              Todas ({query.stats.total})
            </button>
            <button
              type="button"
              className={`canvas-btn ${query.currentFilter === 'pending' ? 'canvas-btn--active' : ''}`}
              onClick={() => commands.changeFilter('pending')}
              style={{ fontSize: '0.95rem', padding: '4px 10px' }}
            >
              Pendientes ({query.stats.pending})
            </button>
            <button
              type="button"
              className={`canvas-btn ${query.currentFilter === 'completed' ? 'canvas-btn--active' : ''}`}
              onClick={() => commands.changeFilter('completed')}
              style={{ fontSize: '0.95rem', padding: '4px 10px' }}
            >
              Completadas ({query.stats.completed})
            </button>
          </div>

          {/* Lista Proyectada */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {query.tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  backgroundColor: task.done ? 'rgba(0,0,0,0.03)' : 'transparent',
                  transition: 'all 0.12s ease'
                }}
              >
                <div
                  onClick={() => commands.toggleTask(task.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    textDecoration: task.done ? 'line-through' : 'none',
                    opacity: task.done ? 0.6 : 1,
                    flexGrow: 1
                  }}
                >
                  <SketchCheckbox checked={task.done} onChange={() => {}} />
                  <span style={{ fontSize: '1.25rem' }}>{task.text}</span>
                </div>
                <button
                  type="button"
                  onClick={() => commands.removeTask(task.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.5, padding: '4px' }}
                  aria-label="Eliminar"
                >
                  <SketchCloseIcon size={12} />
                </button>
              </div>
            ))}
          </div>
        </SketchCard>

        {/* Métricas CQRS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SketchCard variant="blueprint" title="Proyección CQRS en Tiempo Real">
            <SketchProgress
              label="Porcentaje de Realización"
              value={query.stats.progressPercent}
              variant="marker"
            />

            <ul style={{ paddingLeft: '18px', marginTop: '16px', lineHeight: '1.7', fontSize: '1.15rem' }}>
              <li><strong>Total Tareas:</strong> {query.stats.total}</li>
              <li><strong>Pendientes:</strong> {query.stats.pending}</li>
              <li><strong>Completadas:</strong> {query.stats.completed}</li>
              <li><strong>Desacoplamiento:</strong> Componente puro de vista</li>
            </ul>

            <div style={{ marginTop: '16px' }}>
              <SketchButton
                variant="marker"
                size="sm"
                onClick={() => onCopyCode?.("const { query, commands } = useTaskBoardCQRS(initialData);")}
              >
                <Copy size={14} /> Copiar Hook CQRS
              </SketchButton>
            </div>
          </SketchCard>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default PlaygroundDoc;

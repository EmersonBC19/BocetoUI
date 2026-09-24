import { useState, useMemo, useCallback } from 'react';

/**
 * Hook CQRS para el Tablero Interactivo de Bocetos
 * 
 * Separa de manera estricta:
 * - COMMANDS (Escritura / Intenciones de Mutación): addTask, toggleTask, removeTask, setFilter
 * - QUERIES (Lectura / Proyecciones de Estado): filteredTasks, stats, currentFilter
 */
export function useTaskBoardCQRS(initialTasks = [], onNotification) {
  // Estado base (Write Model / Single Source of Truth)
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  // ==========================================
  // COMMANDS (Mutaciones / Intención de cambio)
  // ==========================================
  const addTask = useCallback((text) => {
    const trimmed = text?.trim();
    if (!trimmed) return false;

    const newTask = {
      id: Date.now(),
      text: trimmed,
      done: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTasks(prev => [newTask, ...prev]);
    if (onNotification) onNotification('¡Nota rápida fijada al tablero!');
    return true;
  }, [onNotification]);

  const toggleTask = useCallback((id) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const removeTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    if (onNotification) onNotification('Nota descartada del boceto');
  }, [onNotification]);

  const changeFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  // ==========================================
  // QUERIES (Lecturas / Proyecciones optimizadas)
  // ==========================================
  const query = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.done).length;
    const pending = total - completed;
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    let filtered = tasks;
    if (filter === 'pending') {
      filtered = tasks.filter(t => !t.done);
    } else if (filter === 'completed') {
      filtered = tasks.filter(t => t.done);
    }

    return {
      tasks: filtered,
      stats: {
        total,
        completed,
        pending,
        progressPercent
      },
      currentFilter: filter
    };
  }, [tasks, filter]);

  const commands = useMemo(() => ({
    addTask,
    toggleTask,
    removeTask,
    changeFilter
  }), [addTask, toggleTask, removeTask, changeFilter]);

  return { query, commands };
}

export default useTaskBoardCQRS;

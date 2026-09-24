import React, { useState } from 'react';
import {
  SketchBreadcrumb,
  SketchStatCard,
  SketchTable,
  SketchBadge,
  SketchAvatar,
  SketchButton,
  SketchInput,
  SketchSelect,
  SketchRating,
  SketchTag,
  SketchDivider,
  SketchCard,
  SketchStickyNote,
  SketchProgress,
  SketchAlert,
  SketchSlider,
  SketchCodeBlock,
  SketchCheckbox,
  SketchIcon
} from '../../components/sketch';
import {
  GraduationCap,
  Kanban,
  ShoppingBag,
  BookOpen,
  CheckCircle,
  Plus,
  Trash2,
  ExternalLink,
  DollarSign,
  Star,
  Clock,
  Sparkles
} from 'lucide-react';

export function TemplatesDoc({ onTriggerToast }) {
  const [activePlatform, setActivePlatform] = useState('aula');

  // Estado para Aula Creativa
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Boceto a grafito de la figura humana (proporciones)', done: true },
    { id: 2, title: 'Lámina de tramas paralelas a 45° con estilógrafo', done: true },
    { id: 3, title: 'Ejercicio de aguada con tinta china sobre papel 300g', done: false },
    { id: 4, title: 'Entrega final: Cómic de 4 viñetas entintadas', done: false }
  ]);
  const [lessonRating, setLessonRating] = useState(5);

  const completedTasks = tasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedTasks / tasks.length) * 100);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    onTriggerToast?.('¡Lista de tareas del aula actualizada!');
  };

  // Estado para Taller Kanban
  const [kanbanTasks, setKanbanTasks] = useState([
    { id: 'k1', col: 'todo', title: 'Diseñar icono de brújula a mano', priority: 'Media', color: 'blue', user: 'Ana M.' },
    { id: 'k2', col: 'todo', title: 'Ajustar contraste en lienzo de pizarra', priority: 'Alta', color: 'red', user: 'Carlos G.' },
    { id: 'k3', col: 'in_progress', title: 'Refactorizar animaciones Bungee 120 FPS', priority: 'Urgente', color: 'red', user: 'Lucía S.' },
    { id: 'k4', col: 'in_progress', title: 'Test de compatibilidad con Next.js 15', priority: 'Media', color: 'blue', user: 'David R.' },
    { id: 'k5', col: 'done', title: 'Sistema de iconografía nativa SketchIcon', priority: 'Baja', color: 'green', user: 'Ana M.' },
    { id: 'k6', col: 'done', title: 'Lienzo de dibujo libre SketchDoodleCanvas', priority: 'Alta', color: 'green', user: 'Lucía S.' }
  ]);

  const addKanbanTask = () => {
    const newTask = {
      id: `k${Date.now()}`,
      col: 'todo',
      title: 'Nueva propuesta de componente artesanal',
      priority: 'Media',
      color: 'blue',
      user: 'Tú'
    };
    setKanbanTasks(prev => [newTask, ...prev]);
    onTriggerToast?.('¡Nueva tarjeta agregada a la columna "Por Bocetar"!');
  };

  // Estado para Boceto Market
  const [maxPrice, setMaxPrice] = useState(60);
  const [cartCount, setCartCount] = useState(2);
  const [cartTotal, setCartTotal] = useState(56.00);

  const PRODUCTS = [
    { id: 'p1', name: 'Cuaderno Moleskine Cuadrícula 180g', price: 24.00, rating: 5, category: 'Papelería', icon: 'notebook' },
    { id: 'p2', name: 'Pluma Estilográfica Plumilla Fina', price: 42.00, rating: 5, category: 'Herramientas', icon: 'pen' },
    { id: 'p3', name: 'Kit de Tintas Índigo & Carbón 60ml', price: 32.00, rating: 4, category: 'Tintas', icon: 'palette' },
    { id: 'p4', name: 'Regla de Precisión en Madera & Latón', price: 18.00, rating: 4, category: 'Accesorios', icon: 'ruler' }
  ];

  const filteredProducts = PRODUCTS.filter(p => p.price <= maxPrice);

  const addToCart = (product) => {
    setCartCount(c => c + 1);
    setCartTotal(t => +(t + product.price).toFixed(2));
    onTriggerToast?.(`¡"${product.name}" añadido al carrito!`);
  };

  return (
    <article className="comp-doc">
      <header className="comp-doc__header">
        <div className="comp-doc__badges">
          <SketchBadge variant="pill" size="sm">ARQUITECTURA DE PRODUCTO</SketchBadge>
          <SketchBadge variant="highlight" size="sm">4 Plataformas Reales</SketchBadge>
        </div>
        <h1 className="comp-doc__title sketch-title">Plantillas de Plataformas en el Mundo Real</h1>
        <p className="comp-doc__desc">
          Explora 4 aplicaciones completas, navegables e interactivas construidas 100% con los componentes de BocetoUI.
        </p>

        {/* Selector de Plataforma */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
          <button
            type="button"
            className={`cursor-btn ${activePlatform === 'aula' ? 'cursor-btn--active' : ''}`}
            onClick={() => setActivePlatform('aula')}
          >
            <GraduationCap size={16} /> 🎒 Aula Creativa (LMS)
          </button>
          <button
            type="button"
            className={`cursor-btn ${activePlatform === 'kanban' ? 'cursor-btn--active' : ''}`}
            onClick={() => setActivePlatform('kanban')}
          >
            <Kanban size={16} /> 📋 Taller Kanban (SaaS)
          </button>
          <button
            type="button"
            className={`cursor-btn ${activePlatform === 'market' ? 'cursor-btn--active' : ''}`}
            onClick={() => setActivePlatform('market')}
          >
            <ShoppingBag size={16} /> 🛒 Boceto Market (E-Comm)
          </button>
          <button
            type="button"
            className={`cursor-btn ${activePlatform === 'devpad' ? 'cursor-btn--active' : ''}`}
            onClick={() => setActivePlatform('devpad')}
          >
            <BookOpen size={16} /> 📚 DevPad (Wiki Técnica)
          </button>
        </div>
      </header>

      {/* =========================================================================
          PLATAFORMA 1: AULA CREATIVA (LMS / EDUCACIÓN)
          ========================================================================= */}
      {activePlatform === 'aula' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Cabecera del Curso */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            background: 'var(--sketch-bg-surface, #ffffff)',
            border: '2px solid var(--sketch-ink, #23272f)',
            borderRadius: '12px',
            padding: '20px 24px',
            boxShadow: '4px 5px 0px var(--sketch-ink, #23272f)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <SketchBadge color="blue">CURSO PROFESIONAL</SketchBadge>
                <span style={{ fontSize: '0.95rem', opacity: 0.75 }}>Módulo 3 de 6</span>
              </div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-sketch-title)', fontSize: '1.9rem' }}>
                Técnicas de Entintado & Caligrafía Japonesa
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <SketchAvatar name="Kenji Sato" size="md" isOnline={true} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Prof. Kenji Sato</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Tutor del Taller</div>
              </div>
            </div>
          </div>

          {/* Barra de Progreso del Módulo */}
          <div className="comp-doc-card" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>Progreso de Entregas del Estudiante</span>
              <SketchBadge color={progressPercent === 100 ? 'green' : 'yellow'}>
                {completedTasks} de {tasks.length} tareas ({progressPercent}%)
              </SketchBadge>
            </div>
            <SketchProgress value={progressPercent} variant="stripes" />
          </div>

          {/* Cuadrícula: Tareas vs Nota del Profesor */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Lista de Tareas Interactivas */}
            <div className="comp-doc-card" style={{ padding: '20px 24px' }}>
              <div className="comp-doc-card__label" style={{ marginBottom: '14px' }}>
                Checklist de Tareas del Taller (Haz clic para marcar)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1.5px dashed var(--sketch-ink, #23272f)',
                      backgroundColor: task.done ? 'rgba(22, 163, 74, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <SketchCheckbox checked={task.done} readOnly />
                    <span style={{
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      textDecoration: task.done ? 'line-through' : 'none',
                      opacity: task.done ? 0.65 : 1
                    }}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nota Adhesiva con corrección del Profesor y Feedback */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <SketchStickyNote color="yellow" rotation={-1.5}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <SketchIcon name="pencil" size={18} color="#dc2626" />
                  <strong style={{ color: '#dc2626', fontSize: '1.2rem' }}>Revisión del Profesor:</strong>
                </div>
                <p style={{ margin: 0, fontSize: '1.15rem', lineHeight: 1.45 }}>
                  "Excelente trazo en la lámina 2. Recuerda inclinar la pluma a 45 grados en los remates curvos para no salpicar tinta. Vas muy bien encaminado hacia la entrega final."
                </p>
                <div style={{ marginTop: '12px', textAlign: 'right', fontWeight: 800, fontSize: '0.95rem' }}>
                  — Prof. Kenji S. (Ayer a las 18:30)
                </div>
              </SketchStickyNote>

              <div className="comp-doc-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Califica la Lección</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>¿Te resultó claro el ejercicio?</div>
                </div>
                <SketchRating value={lessonRating} onChange={setLessonRating} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PLATAFORMA 2: TALLER KANBAN (GESTIÓN ÁGIL & SAAS)
          ========================================================================= */}
      {activePlatform === 'kanban' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Barra superior de acciones */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-sketch-title)', fontSize: '1.8rem' }}>
                Tablero Sprint #14 — Entintado y Frontend
              </h2>
              <SketchBadge color="blue">{kanbanTasks.length} Tareas Totales</SketchBadge>
            </div>
            <SketchButton variant="architect" color="yellow" icon={<Plus size={16} />} onClick={addKanbanTask}>
              Nueva Tarea
            </SketchButton>
          </div>

          {/* Columnas Kanban */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {/* Columna 1: Por Bocetar */}
            <div style={{
              background: 'var(--sketch-bg-canvas, #f8fafc)',
              border: '2px dashed var(--sketch-ink, #23272f)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '1.25rem' }}>
                <span>💡 Por Bocetar</span>
                <SketchBadge color="purple">{kanbanTasks.filter(t => t.col === 'todo').length}</SketchBadge>
              </div>

              {kanbanTasks.filter(t => t.col === 'todo').map(task => (
                <SketchCard key={task.id} style={{ padding: '14px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <SketchTag color={task.color} size="sm">{task.priority}</SketchTag>
                    <SketchAvatar name={task.user} size="xs" />
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>{task.title}</div>
                </SketchCard>
              ))}
            </div>

            {/* Columna 2: En Entintado */}
            <div style={{
              background: 'var(--sketch-bg-canvas, #f8fafc)',
              border: '2px dashed var(--sketch-ink, #23272f)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '1.25rem' }}>
                <span>✒️ En Entintado</span>
                <SketchBadge color="yellow">{kanbanTasks.filter(t => t.col === 'in_progress').length}</SketchBadge>
              </div>

              {kanbanTasks.filter(t => t.col === 'in_progress').map(task => (
                <SketchCard key={task.id} style={{ padding: '14px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <SketchTag color={task.color} size="sm">{task.priority}</SketchTag>
                    <SketchAvatar name={task.user} size="xs" />
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>{task.title}</div>
                </SketchCard>
              ))}
            </div>

            {/* Columna 3: Listo & Firmado */}
            <div style={{
              background: 'var(--sketch-bg-canvas, #f8fafc)',
              border: '2px dashed var(--sketch-ink, #23272f)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '1.25rem' }}>
                <span>✅ Listo & Firmado</span>
                <SketchBadge color="green">{kanbanTasks.filter(t => t.col === 'done').length}</SketchBadge>
              </div>

              {kanbanTasks.filter(t => t.col === 'done').map(task => (
                <SketchCard key={task.id} style={{ padding: '14px', textAlign: 'left', opacity: 0.85 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <SketchTag color={task.color} size="sm">{task.priority}</SketchTag>
                    <SketchAvatar name={task.user} size="xs" />
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3, textDecoration: 'line-through' }}>{task.title}</div>
                </SketchCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PLATAFORMA 3: BOCETO MARKET (E-COMMERCE DE CREADORES)
          ========================================================================= */}
      {activePlatform === 'market' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Barra de Filtro y Resumen del Carrito */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            background: 'var(--sketch-bg-surface, #ffffff)',
            border: '2px solid var(--sketch-ink, #23272f)',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '4px 5px 0px var(--sketch-ink, #23272f)'
          }}>
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontWeight: 700 }}>
                <span>Filtrar por Precio Máximo:</span>
                <span style={{ color: 'var(--sketch-pen-blue)' }}>Hasta ${maxPrice}.00 USD</span>
              </div>
              <SketchSlider min={15} max={60} value={maxPrice} onChange={setMaxPrice} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total en Carrito:</div>
                <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#16a34a' }}>${cartTotal.toFixed(2)}</div>
              </div>
              <SketchButton
                variant="marker"
                icon={<ShoppingBag size={16} />}
                onClick={() => onTriggerToast?.(`Iniciando checkout de ${cartCount} productos por $${cartTotal.toFixed(2)}`)}
              >
                Comprar ({cartCount})
              </SketchButton>
            </div>
          </div>

          {/* Cuadrícula de Productos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {filteredProducts.map(prod => (
              <SketchCard key={prod.id} style={{ padding: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <SketchBadge color="purple">{prod.category}</SketchBadge>
                    <SketchRating value={prod.rating} size="sm" readOnly />
                  </div>
                  <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                    <SketchIcon name={prod.icon} size={48} color="var(--sketch-ink)" animate="wiggle" />
                  </div>
                  <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-sketch-title)', fontSize: '1.35rem', lineHeight: 1.25 }}>
                    {prod.name}
                  </h3>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1.5px dashed var(--sketch-ink)', paddingTop: '14px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>${prod.price.toFixed(2)}</div>
                  <SketchButton size="sm" variant="architect" color="yellow" onClick={() => addToCart(prod)}>
                    Añadir +
                  </SketchButton>
                </div>
              </SketchCard>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          PLATAFORMA 4: DEVPAD (WIKI TÉCNICA & DOCS)
          ========================================================================= */}
      {activePlatform === 'devpad' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <SketchBreadcrumb
            items={[
              { id: '1', label: 'DevPad Wiki' },
              { id: '2', label: 'Componentes' },
              { id: '3', label: 'Guía de Arquitectura' }
            ]}
          />

          <SketchAlert
            type="info"
            title="Aviso de Versión 1.0"
            description="Todos los componentes de BocetoUI implementan aceleración por GPU a 120 FPS y estilos de contorno orgánico sin romper la accesibilidad nativa del DOM."
          />

          <div className="comp-doc-card" style={{ padding: '24px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 12px 0', fontFamily: 'var(--font-sketch-title)', fontSize: '1.5rem' }}>
              Ejemplo de Configuración de Tema en React
            </h3>
            <SketchCodeBlock
              language="javascript"
              code={`import { BocetoProvider, SketchButton, SketchToast } from 'boceto-ui';

export function MiApp() {
  return (
    <BocetoProvider theme="paper-grid" cursor="comic">
      <main className="mi-lienzo">
        <h1>¡Bienvenido a BocetoUI!</h1>
        <SketchButton variant="architect" color="yellow">
          Comenzar a Dibujar
        </SketchButton>
      </main>
    </BocetoProvider>
  );
}`}
            />
          </div>
        </div>
      )}
    </article>
  );
}

export default TemplatesDoc;

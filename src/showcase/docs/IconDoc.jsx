import React, { useState, useMemo } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import {
  SketchIcon,
  SKETCH_GLYPHS,
  SKETCH_ICON_CATEGORIES,
  SketchBadge,
  SketchButton,
  SketchInput,
  SketchSelect
} from '../../components/sketch';
import { Search, Copy, Check, Sparkles, Sliders } from 'lucide-react';

export function IconDoc({ onTriggerToast }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [iconSize, setIconSize] = useState(28);
  const [iconColor, setIconColor] = useState('currentColor');
  const [iconAnimate, setIconAnimate] = useState('none');
  const [copiedIcon, setCopiedIcon] = useState(null);

  // Lista de todos los nombres de iconos disponibles
  const allIconNames = useMemo(() => Object.keys(SKETCH_GLYPHS), []);

  // Iconos filtrados por categoría y búsqueda
  const filteredIcons = useMemo(() => {
    return allIconNames.filter((name) => {
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;
      if (selectedCategory === 'all') return true;

      const catGroup = SKETCH_ICON_CATEGORIES[selectedCategory];
      return catGroup ? catGroup.icons.includes(name) : true;
    });
  }, [allIconNames, search, selectedCategory]);

  const handleCopyCode = (iconName) => {
    const code = `<SketchIcon name="${iconName}" size={${iconSize}}${iconAnimate !== 'none' ? ` animate="${iconAnimate}"` : ''} />`;
    navigator.clipboard?.writeText(code);
    setCopiedIcon(iconName);
    onTriggerToast?.(`¡Código copiado: <SketchIcon name="${iconName}" />!`);
    setTimeout(() => setCopiedIcon(null), 1800);
  };

  const propsList = [
    { name: 'name', type: 'string', default: "'pencil'", description: 'Nombre del glifo artesanal (ej. "pencil", "trash", "star", "home")' },
    { name: 'size', type: 'number', default: '20', description: 'Dimensiones cuadradas en píxeles (ancho y alto)' },
    { name: 'color', type: 'string', default: "'currentColor'", description: 'Color de trazo SVG (admite hex, rgb, variables CSS)' },
    { name: 'animate', type: "'none' | 'wiggle' | 'draw' | 'boil' | 'pulse'", default: "'none'", description: 'Micro-animación temática de boceto a 120 FPS' },
    { name: 'strokeWidth', type: 'number', default: '2.2', description: 'Grosor del trazo imperfecto dibujado a mano' },
    { name: 'interactive', type: 'boolean', default: 'false', description: 'Efecto hover elástico con escala y giro de boceto' }
  ];

  const codeSnippet = `import { SketchIcon } from 'boceto-ui';

export function Example() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <SketchIcon name="pencil" size={24} color="#2563eb" animate="wiggle" />
      <SketchIcon name="trash" size={24} color="#dc2626" interactive />
      <SketchIcon name="star" size={24} color="#ca8a04" animate="pulse" />
      <SketchIcon name="heart" size={24} color="#e11d48" animate="draw" />
    </div>
  );
}`;

  return (
    <ComponentDocLayout
      title="SketchIcon"
      category="Iconografía Nativa Artesanal"
      description="Colección de más de 40 glifos vectoriales hechos a mano alzada para sustituir los vectores rectos tradicionales. Incluye soporte de micro-animaciones temáticas (wiggle, draw, boil, pulse), grosor variable y copia de JSX en un clic."
      importCode="import { SketchIcon } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card" style={{ padding: '28px 24px' }}>
        <span className="comp-doc-card__label" style={{ marginBottom: '16px' }}>
          Explorador & Catálogo de Iconos Artesanales ({allIconNames.length} Glifos)
        </span>

        {/* Panel de Controles Interactivos (Tamaño, Color, Animación) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--sketch-bg-canvas, #f8fafc)',
          border: '2px dashed var(--sketch-ink, #23272f)',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '20px'
        }}>
          {/* Búsqueda */}
          <div style={{ flex: '1 1 220px', minWidth: '200px' }}>
            <SketchInput
              placeholder="Buscar icono por nombre (ej. pencil, heart, bell)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search size={16} />}
            />
          </div>

          {/* Ajuste de Tamaño */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700 }}>Tamaño:</span>
            {[20, 28, 36, 48].map((s) => (
              <button
                key={s}
                type="button"
                className={`cursor-btn ${iconSize === s ? 'cursor-btn--active' : ''}`}
                onClick={() => setIconSize(s)}
                style={{ padding: '4px 8px', fontSize: '0.9rem' }}
              >
                {s}px
              </button>
            ))}
          </div>

          {/* Ajuste de Color */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700 }}>Tinta:</span>
            {[
              { label: 'Tinta', val: 'currentColor', col: '#23272f' },
              { label: 'Rojo', val: '#dc2626', col: '#dc2626' },
              { label: 'Azul', val: '#2563eb', col: '#2563eb' },
              { label: 'Verde', val: '#16a34a', col: '#16a34a' },
              { label: 'Amarillo', val: '#ca8a04', col: '#ca8a04' },
              { label: 'Púrpura', val: '#9333ea', col: '#9333ea' }
            ].map(({ label, val, col }) => (
              <button
                key={val}
                type="button"
                onClick={() => setIconColor(val)}
                title={label}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: col,
                  border: iconColor === val ? '3px solid var(--sketch-pen-blue, #2563eb)' : '2px solid var(--sketch-ink, #23272f)',
                  cursor: 'pointer',
                  transform: iconColor === val ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.15s ease'
                }}
              />
            ))}
          </div>

          {/* Ajuste de Animación */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700 }}>Animación:</span>
            {['none', 'wiggle', 'draw', 'boil', 'pulse'].map((anim) => (
              <button
                key={anim}
                type="button"
                className={`cursor-btn ${iconAnimate === anim ? 'cursor-btn--active' : ''}`}
                onClick={() => setIconAnimate(anim)}
                style={{ padding: '4px 8px', fontSize: '0.9rem' }}
              >
                {anim}
              </button>
            ))}
          </div>
        </div>

        {/* Filtros de Categorías */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button
            type="button"
            className={`cursor-btn ${selectedCategory === 'all' ? 'cursor-btn--active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Todos ({allIconNames.length})
          </button>
          {Object.entries(SKETCH_ICON_CATEGORIES).map(([catKey, cat]) => (
            <button
              key={catKey}
              type="button"
              className={`cursor-btn ${selectedCategory === catKey ? 'cursor-btn--active' : ''}`}
              onClick={() => setSelectedCategory(catKey)}
            >
              {cat.label} ({cat.icons.length})
            </button>
          ))}
        </div>

        {/* Cuadrícula de Iconos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '14px',
          textAlign: 'center'
        }}>
          {filteredIcons.map((name) => {
            const isCopied = copiedIcon === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => handleCopyCode(name)}
                style={{
                  background: 'var(--sketch-bg-surface, #ffffff)',
                  border: isCopied ? '2px solid #16a34a' : '2px solid var(--sketch-ink, #23272f)',
                  borderRadius: '10px',
                  padding: '16px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: isCopied ? '3px 3px 0px #16a34a' : '3px 3px 0px var(--sketch-ink, #23272f)',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
                className="sketch-icon-card"
                title={`Haz clic para copiar: <SketchIcon name="${name}" />`}
              >
                <div style={{ height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SketchIcon
                    name={name}
                    size={iconSize}
                    color={iconColor}
                    animate={iconAnimate}
                    interactive
                  />
                </div>
                <span style={{
                  fontFamily: 'var(--font-sketch-title, inherit)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--sketch-ink, #23272f)',
                  wordBreak: 'break-all'
                }}>
                  {name}
                </span>

                {isCopied && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '6px',
                    background: '#16a34a',
                    color: '#fff',
                    fontSize: '0.75rem',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontFamily: 'inherit',
                    fontWeight: 800
                  }}>
                    ¡Copiado!
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {filteredIcons.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center', opacity: 0.8 }}>
            <p style={{ fontSize: '1.25rem' }}>No se encontraron iconos artesanales con el término "{search}".</p>
          </div>
        )}
      </div>
    </ComponentDocLayout>
  );
}

export default IconDoc;

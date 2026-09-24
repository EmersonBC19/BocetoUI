import React, { useState, useEffect, useRef, useMemo } from 'react';
import './SketchCommandPalette.css';
import { Search } from 'lucide-react';

/**
 * SketchCommandPalette - Paleta de comandos artesanal flotante (Cmd+K / KBar)
 */
export function SketchCommandPalette({
  isOpen,
  onClose,
  items = [],
  placeholder = 'Escribe un comando o busca...',
  hotkey = 'k',
  className = ''
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Escuchar atajo global Cmd+K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === hotkey.toLowerCase()) {
        e.preventDefault();
        if (onClose) {
          onClose(!isOpen);
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, hotkey]);

  // Reset y focus al abrir
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Aplanar y filtrar items
  const filteredItems = useMemo(() => {
    const q = query.toLowerCase();
    const flat = [];

    items.forEach((groupOrItem) => {
      if (groupOrItem.items) {
        // Es un grupo
        groupOrItem.items.forEach((item) => {
          if (!q || item.label.toLowerCase().includes(q) || (item.keywords && item.keywords.some(k => k.toLowerCase().includes(q)))) {
            flat.push({ ...item, group: groupOrItem.group });
          }
        });
      } else {
        // Es un item directo
        if (!q || groupOrItem.label.toLowerCase().includes(q)) {
          flat.push(groupOrItem);
        }
      }
    });

    return flat;
  }, [items, query]);

  // Manejar teclado dentro del diálogo
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose?.();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      if (filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].onSelect?.();
        onClose?.();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="sketch-cmd-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={`sketch-cmd-dialog ${className}`} role="dialog" aria-modal="true">
        <div className="sketch-cmd-header">
          <span className="sketch-cmd-icon">
            <Search size={20} />
          </span>
          <input
            ref={inputRef}
            type="text"
            className="sketch-cmd-input"
            value={query}
            placeholder={placeholder}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <span className="sketch-cmd-badge">ESC</span>
        </div>

        <ul className="sketch-cmd-list" role="listbox">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const showGroupHeader =
                item.group &&
                (index === 0 || filteredItems[index - 1]?.group !== item.group);

              return (
                <React.Fragment key={item.id || item.label + index}>
                  {showGroupHeader && (
                    <li className="sketch-cmd-group-label">{item.group}</li>
                  )}
                  <li
                    role="option"
                    aria-selected={isSelected}
                    className={`sketch-cmd-item ${isSelected ? 'sketch-cmd-item--selected' : ''}`}
                    onClick={() => {
                      item.onSelect?.();
                      onClose?.();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="sketch-cmd-item-left">
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.label}</span>
                    </div>
                    {item.shortcut && (
                      <span className="sketch-cmd-item-shortcut">{item.shortcut}</span>
                    )}
                  </li>
                </React.Fragment>
              );
            })
          ) : (
            <li className="sketch-cmd-empty" style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--sketch-ink-muted)' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>✏️</div>
              <div>No encontramos bocetos para &ldquo;<strong>{query}</strong>&rdquo;</div>
              <div style={{ fontSize: '0.85em', opacity: 0.7, marginTop: '4px' }}>Prueba con otra palabra o revisa tus notas</div>
            </li>
          )}
        </ul>

        <div className="sketch-cmd-footer">
          <div className="sketch-cmd-keys">
            <span>↑↓ para navegar</span>
            <span>↵ para seleccionar</span>
          </div>
          <span>BocetoUI Command</span>
        </div>
      </div>
    </div>
  );
}

export default SketchCommandPalette;

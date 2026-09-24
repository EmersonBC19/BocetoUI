import React, { useState } from 'react';
import './SketchSidebar.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * SketchSidebar - Panel lateral colapsable artesanal para aplicaciones
 */
export function SketchSidebar({
  header,
  groups = [],
  footer,
  activeId,
  onSelect,
  collapsed: controlledCollapsed,
  onCollapseChange,
  className = '',
  ...props
}) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapseChange?.(next);
  };

  return (
    <aside
      className={`sketch-sidebar ${isCollapsed ? 'sketch-sidebar--collapsed' : ''} ${className}`}
      {...props}
    >
      <div className="sketch-sidebar__header">
        {!isCollapsed && header}
        <button
          type="button"
          className="sketch-sidebar__toggle-btn"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
          title={isCollapsed ? 'Expandir' : 'Colapsar'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sketch-sidebar__nav">
        {groups.map((group, gIdx) => (
          <div key={group.title || gIdx} className="sketch-sidebar__group">
            {!isCollapsed && group.title && (
              <div className="sketch-sidebar__group-title">{group.title}</div>
            )}

            {group.items?.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id || item.label}
                  className={`sketch-sidebar__item ${isActive ? 'sketch-sidebar__item--active' : ''}`}
                  onClick={() => {
                    item.onClick?.();
                    onSelect?.(item);
                  }}
                  title={isCollapsed ? item.label : undefined}
                  role="button"
                  tabIndex={0}
                >
                  {item.icon && <span className="sketch-sidebar__item-icon">{item.icon}</span>}
                  {!isCollapsed && (
                    <>
                      <span className="sketch-sidebar__item-label">{item.label}</span>
                      {isActive && <span className="sketch-sidebar__active-arrow" aria-hidden="true">👈</span>}
                      {item.badge !== undefined && (
                        <span className="sketch-sidebar__item-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {footer && (
        <div className="sketch-sidebar__footer">
          {!isCollapsed && footer}
        </div>
      )}
    </aside>
  );
}

export default SketchSidebar;

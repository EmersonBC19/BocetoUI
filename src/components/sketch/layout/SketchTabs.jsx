import React, { useState } from 'react';
import './SketchTabs.css';

/**
 * SketchTabs - Pestañas de navegación estilo archivador o resaltador.
 *
 * @param {Object} props
 * @param {Array<{id: string, label: string, icon?: React.ReactNode, content: React.ReactNode}>} props.tabs
 * @param {string} [props.defaultActiveId]
 * @param {string} [props.activeId]
 * @param {Function} [props.onChange]
 * @param {'folder'|'pill'} [props.variant='folder']
 * @param {string} [props.className]
 */
export function SketchTabs({
  tabs = [],
  defaultActiveId,
  activeId,
  onChange,
  variant = 'folder',
  className = '',
  ...rest
}) {
  const [internalActiveId, setInternalActiveId] = useState(
    activeId !== undefined ? activeId : defaultActiveId || (tabs[0]?.id)
  );

  const currentId = activeId !== undefined ? activeId : internalActiveId;

  const handleTabClick = (id) => {
    if (activeId === undefined) setInternalActiveId(id);
    if (onChange) onChange(id);
  };

  const activeTab = tabs.find(t => t.id === currentId) || tabs[0];

  return (
    <div className={`sketch-tabs-container sketch-tabs--${variant} ${className}`} {...rest}>
      <div className="sketch-tabs-list" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === currentId;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              className={`sketch-tab-btn ${isActive ? 'sketch-tab-btn--active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.icon && <span className="sketch-tab-icon">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div key={currentId} className="sketch-tab-panel" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  );
}

export default SketchTabs;

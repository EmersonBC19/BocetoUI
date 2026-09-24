import React, { useState } from 'react';
import './SketchAccordion.css';

/**
 * SketchAccordion - Paneles plegables con animación elástica de rebote (bungee)
 *
 * @param {Object} props
 * @param {Array<{id?: string|number, title: React.ReactNode, content: React.ReactNode, icon?: React.ReactNode}>} props.items
 * @param {boolean} [props.allowMultiple=false] - Si es true, permite abrir varios paneles a la vez
 * @param {number|string|null} [props.defaultOpenId=null] - ID del panel abierto por defecto
 * @param {'default'|'card'|'separated'} [props.variant='default']
 * @param {string} [props.className]
 */
export function SketchAccordion({
  items = [],
  allowMultiple = false,
  defaultOpenId = null,
  variant = 'default',
  className = '',
  ...rest
}) {
  // Normalizar items para asegurar que cada uno tenga un ID único
  const normalizedItems = items.map((item, idx) => ({
    ...item,
    id: item.id !== undefined ? String(item.id) : `acc-item-${idx}`
  }));

  const getInitialOpen = () => {
    if (defaultOpenId !== null && defaultOpenId !== undefined) {
      return [String(defaultOpenId)];
    }
    return normalizedItems.length > 0 ? [normalizedItems[0].id] : [];
  };

  const [openItems, setOpenItems] = useState(getInitialOpen);

  const toggleItem = (id) => {
    setOpenItems((prev) => {
      const isAlreadyOpen = prev.includes(id);
      if (allowMultiple) {
        return isAlreadyOpen ? prev.filter((item) => item !== id) : [...prev, id];
      } else {
        return isAlreadyOpen ? [] : [id];
      }
    });
  };

  return (
    <div className={`sketch-accordion sketch-accordion--${variant} ${className}`} {...rest}>
      {normalizedItems.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div
            key={item.id}
            className={`sketch-accordion-item ${isOpen ? 'sketch-accordion-item--open' : ''}`}
          >
            <button
              type="button"
              className="sketch-accordion-header"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
            >
              <div className="sketch-accordion-title-wrap">
                {item.icon && <span className="sketch-accordion-icon">{item.icon}</span>}
                <span>{item.title}</span>
              </div>
              <span className="sketch-accordion-chevron">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            {/* Contenedor con animación bungee de apertura y cierre */}
            <div
              className={`sketch-accordion-collapse ${
                isOpen ? 'sketch-accordion-collapse--open' : ''
              }`}
              aria-hidden={!isOpen}
            >
              <div className="sketch-accordion-body">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SketchAccordion;

import React, { useState, useRef, useEffect } from 'react';
import './SketchDropdown.css';

/**
 * SketchDropdown - Menú desplegable contextual estilo boceto
 * @param {React.ReactNode} trigger - Elemento disparador
 * @param {Array} items - Elementos del menú [{ id, label, icon, onClick, danger, disabled, divider, badge }]
 * @param {('bottom-left'|'bottom-right'|'top-left'|'top-right')} [placement='bottom-left'] - Alineación
 * @param {string} [className=''] - Clases adicionales
 */
export function SketchDropdown({
  trigger,
  items = [],
  placement = 'bottom-left',
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Cierra al hacer clic fuera del menú
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      ref={containerRef}
      className={`sketch-dropdown ${className}`}
      {...props}
    >
      <div
        className="sketch-dropdown__trigger"
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`sketch-dropdown__menu sketch-dropdown__menu--${placement}`}
          role="menu"
        >
          {/* Mini perforaciones de libreta arrancable */}
          <div className="sketch-dropdown__notepad-top" aria-hidden="true">
            <span className="sketch-dropdown__notch" />
            <span className="sketch-dropdown__notch" />
            <span className="sketch-dropdown__notch" />
            <span className="sketch-dropdown__notch" />
          </div>

          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div key={item.id || `div-${index}`} className="sketch-dropdown__divider">
                  <span className="sketch-dropdown__scissor" aria-hidden="true">✂</span>
                </div>
              );
            }

            const itemClass = [
              'sketch-dropdown__item',
              item.danger ? 'sketch-dropdown__item--danger' : '',
              item.disabled ? 'sketch-dropdown__item--disabled' : ''
            ].filter(Boolean).join(' ');

            return (
              <button
                key={item.id || index}
                type="button"
                className={itemClass}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;
                  item.onClick?.();
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                {item.icon && <span className="sketch-dropdown__item-icon">{item.icon}</span>}
                <span className="sketch-dropdown__item-label">{item.label}</span>
                {item.badge && <span className="sketch-dropdown__item-badge">{item.badge}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SketchDropdown;

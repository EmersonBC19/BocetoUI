import React from 'react';
import './SketchBreadcrumb.css';
import { ChevronRight, Slash, ArrowRight, Home } from 'lucide-react';

/**
 * SketchBreadcrumb - Componente de migas de pan artesanal
 * @param {Array} items - [{ id, label, icon, href, onClick }]
 * @param {string} separator - 'chevron' | 'slash' | 'arrow' | 'dot'
 * @param {boolean} showHome - Si muestra el icono de inicio en el primer nodo
 */
export function SketchBreadcrumb({
  items = [],
  separator = 'chevron',
  showHome = true,
  className = '',
  ...props
}) {
  const renderSeparator = () => {
    switch (separator) {
      case 'hand-arrow':
        return <span className="sketch-breadcrumb__separator sketch-breadcrumb__separator--hand">~&gt;</span>;
      case 'slash':
        return <Slash size={14} className="sketch-breadcrumb__separator" />;
      case 'arrow':
        return <ArrowRight size={14} className="sketch-breadcrumb__separator" />;
      case 'dot':
        return <span className="sketch-breadcrumb__separator">•</span>;
      case 'chevron':
      default:
        return <ChevronRight size={14} className="sketch-breadcrumb__separator" />;
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Migas de pan" className={`sketch-breadcrumb ${className}`} {...props}>
      <ol className="sketch-breadcrumb__list">
        {showHome && (
          <li className="sketch-breadcrumb__item">
            <button
              type="button"
              className="sketch-breadcrumb__link"
              onClick={() => items[0]?.onClick?.()}
              title="Inicio"
              aria-label="Página principal"
            >
              <Home size={15} />
            </button>
            {renderSeparator()}
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={item.id || item.label || index}
              className={`sketch-breadcrumb__item ${isLast ? 'sketch-breadcrumb__item--active' : ''}`}
            >
              {isLast ? (
                <span className="sketch-breadcrumb__current" aria-current="page">
                  {item.icon && <span className="sketch-breadcrumb__icon">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              ) : (
                <>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="sketch-breadcrumb__link"
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick(e);
                        }
                      }}
                    >
                      {item.icon && <span className="sketch-breadcrumb__icon">{item.icon}</span>}
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="sketch-breadcrumb__link"
                      onClick={item.onClick}
                    >
                      {item.icon && <span className="sketch-breadcrumb__icon">{item.icon}</span>}
                      <span>{item.label}</span>
                    </button>
                  )}
                  {renderSeparator()}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default SketchBreadcrumb;

import React, { useState } from 'react';
import './SketchNavbar.css';
import { Menu, X } from 'lucide-react';

/**
 * SketchNavbar - Barra de navegación superior artesanal para aplicaciones
 */
export function SketchNavbar({
  brand,
  links = [],
  actions,
  sticky = false,
  activeId,
  onNavigate,
  className = '',
  children,
  ...props
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (item, e) => {
    if (item.onClick) {
      item.onClick(e);
    }
    onNavigate?.(item);
    setMobileOpen(false);
  };

  return (
    <header
      className={`sketch-navbar ${sticky ? 'sketch-navbar--sticky' : ''} ${className}`}
      {...props}
    >
      <div className="sketch-navbar__inner">
        <div className="sketch-navbar__brand">
          {brand}
        </div>

        {links.length > 0 && (
          <nav className="sketch-navbar__nav" aria-label="Navegación principal">
            {links.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id || item.label}
                  href={item.href || '#'}
                  className={`sketch-navbar__link ${isActive ? 'sketch-navbar__link--active' : ''}`}
                  onClick={(e) => {
                    if (!item.href || item.href === '#') e.preventDefault();
                    handleLinkClick(item, e);
                  }}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                  {isActive && <span className="sketch-navbar__active-dot" aria-hidden="true" />}
                </a>
              );
            })}
          </nav>
        )}

        {children}

        <div className="sketch-navbar__actions">
          {actions}

          {links.length > 0 && (
            <button
              type="button"
              className="sketch-navbar__mobile-toggle"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {links.length > 0 && (
        <div className={`sketch-navbar__mobile-menu ${mobileOpen ? 'sketch-navbar__mobile-menu--open' : ''}`}>
          {links.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id || item.label}
                href={item.href || '#'}
                className={`sketch-navbar__link ${isActive ? 'sketch-navbar__link--active' : ''}`}
                onClick={(e) => {
                  if (!item.href || item.href === '#') e.preventDefault();
                  handleLinkClick(item, e);
                }}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default SketchNavbar;

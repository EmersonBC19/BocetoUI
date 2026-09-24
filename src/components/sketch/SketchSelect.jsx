import React, { useState, useRef, useEffect } from 'react';
import './SketchSelect.css';
import { SketchCheckIcon } from './SketchIcons';

/**
 * SketchSelect - Selector desplegable con animación elástica de rebote (bungee)
 *
 * @param {Object} props
 * @param {string} [props.label]
 * @param {Array<{value: string, label: string}>} props.options
 * @param {string} [props.value]
 * @param {string} [props.defaultValue]
 * @param {Function} [props.onChange]
 * @param {string} [props.placeholder='Seleccionar...']
 * @param {string} [props.className]
 */
export function SketchSelect({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Seleccionar...',
  className = '',
  id,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [internalVal, setInternalVal] = useState(value !== undefined ? value : defaultValue);
  const dropdownRef = useRef(null);

  const selectedValue = value !== undefined ? value : internalVal;
  const selectedOption = options.find(o => o.value === selectedValue);

  const displayedOptions = options.filter(o => 
    !filterText || o.label.toLowerCase().includes(filterText.toLowerCase())
  );

  const closeDropdown = () => {
    if (!isOpen || isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 190);
  };

  const openDropdown = () => {
    setIsClosing(false);
    setIsOpen(true);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const handleSelect = (val) => {
    if (value === undefined) setInternalVal(val);
    if (onChange) onChange(val);
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isClosing]);

  const selectId = id || (label ? `sketch-sel-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={`sketch-select-group ${className}`} ref={dropdownRef} {...rest}>
      {label && (
        <label htmlFor={selectId} className="sketch-label">
          {label}
        </label>
      )}

      <button
        id={selectId}
        type="button"
        className={`sketch-select-trigger ${isOpen ? 'sketch-select-trigger--open' : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className={`sketch-select-arrow ${isOpen ? 'sketch-select-arrow--open' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {(isOpen || isClosing) && (
        <div
          className={`sketch-select-menu ${
            isClosing ? 'sketch-select-menu--closing' : 'sketch-select-menu--opening'
          }`}
          role="listbox"
        >
          {options.length >= 6 && (
            <div className="sketch-select-search-wrap">
              <input
                type="text"
                className="sketch-select-search-input"
                placeholder="🔍 Filtrar lista..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <ul className="sketch-select-list">
            {displayedOptions.length > 0 ? (
              displayedOptions.map((option) => {
                const isSelected = option.value === selectedValue;
                return (
                  <li
                    key={option.value}
                    className={`sketch-select-option ${isSelected ? 'sketch-select-option--selected' : ''}`}
                    onClick={() => handleSelect(option.value)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>{option.label}</span>
                    {isSelected && <SketchCheckIcon size={16} />}
                  </li>
                );
              })
            ) : (
              <li className="sketch-select-empty">
                No hay opciones para &ldquo;{filterText}&rdquo;
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SketchSelect;

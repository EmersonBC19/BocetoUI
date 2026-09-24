import React, { useState, useRef, useEffect, useMemo } from 'react';
import './SketchAutocomplete.css';
import { SketchCloseButton } from '../actions/SketchCloseButton';
import { Search } from 'lucide-react';

/**
 * SketchAutocomplete - Buscador y autocompletado en tiempo real con estética sketch
 */
export function SketchAutocomplete({
  options = [],
  value = '',
  onChange,
  onSelect,
  placeholder = 'Buscar opción...',
  label,
  emptyText = 'No se encontraron coincidencias',
  className = '',
  ...props
}) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const [prevVal, setPrevVal] = useState(value);
  if (value !== prevVal) {
    setPrevVal(value);
    setQuery(value);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Normalizar opciones
  const normalizedOptions = useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === 'string') {
        return { label: opt, value: opt };
      }
      return opt;
    });
  }, [options]);

  // Filtrar según query
  const filteredOptions = useMemo(() => {
    if (!query) return normalizedOptions;
    const q = query.toLowerCase();
    return normalizedOptions.filter((opt) =>
      opt.label.toLowerCase().includes(q) ||
      (opt.hint && opt.hint.toLowerCase().includes(q))
    );
  }, [query, normalizedOptions]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onChange?.(val);
    setIsOpen(true);
    setFocusedIndex(-1);
  };

  const handleSelectOption = (opt) => {
    setQuery(opt.label);
    onChange?.(opt.label);
    onSelect?.(opt);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    onChange?.('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === 'Enter') {
      if (isOpen && focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
        e.preventDefault();
        handleSelectOption(filteredOptions[focusedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Resaltado de coincidencias
  const renderHighlighted = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i} className="sketch-autocomplete__match">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef} className={`sketch-autocomplete ${className}`} {...props}>
      {label && <label className="sketch-label">{label}</label>}

      <div className="sketch-autocomplete__input-wrapper">
        <span className="sketch-autocomplete__icon-search">
          <Search size={16} />
        </span>

        <input
          ref={inputRef}
          type="text"
          className="sketch-autocomplete__input"
          value={query}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {query && (
          <SketchCloseButton
            size="sm"
            variant="ghost"
            className="sketch-autocomplete__clear-btn"
            onClick={handleClear}
            title="Limpiar búsqueda"
            ariaLabel="Limpiar búsqueda"
          />
        )}
      </div>

      {isOpen && (
        <ul className="sketch-autocomplete__dropdown" role="listbox">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => {
              const isFocused = index === focusedIndex;
              return (
                <li
                  key={opt.value || opt.label}
                  role="option"
                  aria-selected={isFocused}
                  className={`sketch-autocomplete__item ${isFocused ? 'sketch-autocomplete__item--focused' : ''}`}
                  onClick={() => handleSelectOption(opt)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <span>{renderHighlighted(opt.label, query)}</span>
                  {opt.hint && (
                    <span className="sketch-autocomplete__item-hint">{opt.hint}</span>
                  )}
                </li>
              );
            })
          ) : (
            <li className="sketch-autocomplete__empty">{emptyText}</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SketchAutocomplete;

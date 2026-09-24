import React, { useState, useRef, useEffect } from 'react';
import './SketchDatePicker.css';
import { SketchInput } from '../SketchInput';
import { SketchCloseButton } from '../actions/SketchCloseButton';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const WEEKDAY_NAMES = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

/**
 * SketchCalendar - Calendario artesanal tipo bloc de notas mensual
 */
export function SketchCalendar({
  value,
  onChange,
  minDate,
  maxDate,
  className = '',
  ...props
}) {
  const selectedDate = value ? new Date(value + (value.length === 10 ? 'T00:00:00' : '')) : null;
  const initialView = selectedDate && !isNaN(selectedDate.getTime()) ? selectedDate : new Date();

  const [viewYear, setViewYear] = useState(initialView.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialView.getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday

  const today = new Date();
  const isToday = (day) =>
    today.getDate() === day &&
    today.getMonth() === viewMonth &&
    today.getFullYear() === viewYear;

  const isSelected = (day) => {
    if (!selectedDate || isNaN(selectedDate.getTime())) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getFullYear() === viewYear
    );
  };

  const isDisabled = (day) => {
    const cur = new Date(viewYear, viewMonth, day);
    if (minDate && cur < new Date(minDate)) return true;
    if (maxDate && cur > new Date(maxDate)) return true;
    return false;
  };

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day) => {
    if (isDisabled(day)) return;
    const m = String(viewMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    const formatted = `${viewYear}-${m}-${d}`;
    onChange?.(formatted);
  };

  return (
    <div className={`sketch-calendar ${className}`} {...props}>
      <div className="sketch-calendar__header">
        <button
          type="button"
          className="sketch-calendar__nav-btn"
          onClick={handlePrevMonth}
          aria-label="Mes anterior"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="sketch-calendar__title">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          className="sketch-calendar__nav-btn"
          onClick={handleNextMonth}
          aria-label="Mes siguiente"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="sketch-calendar__grid">
        {WEEKDAY_NAMES.map((name) => (
          <div key={name} className="sketch-calendar__weekday">
            {name}
          </div>
        ))}

        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx}`} className="sketch-calendar__day sketch-calendar__day--empty" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const selected = isSelected(day);
          const disabled = isDisabled(day);
          const currentDay = isToday(day);

          return (
            <button
              key={`day-${day}`}
              type="button"
              disabled={disabled}
              className={[
                'sketch-calendar__day',
                selected ? 'sketch-calendar__day--selected' : '',
                currentDay ? 'sketch-calendar__day--today' : '',
                disabled ? 'sketch-calendar__day--disabled' : ''
              ].filter(Boolean).join(' ')}
              onClick={() => handleSelectDay(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * SketchDatePicker - Selector desplegable de fechas estilo boceto
 */
export function SketchDatePicker({
  value,
  onChange,
  label,
  placeholder = 'Selecciona una fecha',
  minDate,
  maxDate,
  error,
  required = false,
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDateChange = (newDate) => {
    onChange?.(newDate);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.('');
  };

  return (
    <div ref={containerRef} className={`sketch-datepicker-container ${className}`}>
      <div className="sketch-datepicker__trigger" onClick={() => setIsOpen((prev) => !prev)}>
        <SketchInput
          label={label}
          placeholder={placeholder}
          value={value || ''}
          readOnly
          required={required}
          error={error}
          icon={<CalendarIcon size={18} />}
          endAdornment={
            value ? (
              <SketchCloseButton
                size="sm"
                variant="ghost"
                onClick={handleClear}
                title="Limpiar fecha"
                ariaLabel="Limpiar fecha"
              />
            ) : null
          }
          {...props}
        />
      </div>

      {isOpen && (
        <div className="sketch-datepicker__popup">
          <SketchCalendar
            value={value}
            onChange={handleDateChange}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
}

export default SketchDatePicker;

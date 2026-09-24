import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchDatePicker, SketchCalendar } from '../../components/sketch';

export function DatePickerDoc({ onTriggerToast }) {
  const [selectedDate, setSelectedDate] = useState('2026-09-24');
  const [calendarDate, setCalendarDate] = useState('2026-09-30');

  const propsList = [
    { name: 'value', type: 'string', default: "''", description: 'Fecha seleccionada en formato YYYY-MM-DD' },
    { name: 'onChange', type: '(date: string) => void', default: 'undefined', description: 'Callback al seleccionar una fecha' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Etiqueta superior descriptiva' },
    { name: 'placeholder', type: 'string', default: "'Selecciona una fecha'", description: 'Texto del campo vacío' },
    { name: 'minDate', type: 'string', default: 'undefined', description: 'Fecha mínima permitida (YYYY-MM-DD)' },
    { name: 'maxDate', type: 'string', default: 'undefined', description: 'Fecha máxima permitida (YYYY-MM-DD)' }
  ];

  const codeSnippet = `import { SketchDatePicker, SketchCalendar } from 'boceto-ui';

// Modo desplegable
<SketchDatePicker
  label="Fecha de Entrega"
  value={selectedDate}
  onChange={(d) => setSelectedDate(d)}
/>

// Modo calendario integrado (en línea)
<SketchCalendar
  value={calendarDate}
  onChange={(d) => setCalendarDate(d)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchDatePicker & SketchCalendar"
      category="Formularios & Entradas"
      description="Selector y calendario de escritorio artesanal con cuadrícula de días dibujada a mano, navegación entre meses y resaltador en la fecha seleccionada."
      importCode="import { SketchDatePicker, SketchCalendar } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Selector Desplegable (DatePicker)</span>
          <SketchDatePicker
            label="Fecha del Proyecto"
            value={selectedDate}
            onChange={(d) => {
              setSelectedDate(d);
              onTriggerToast?.(`Fecha elegida: ${d}`);
            }}
          />
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Calendario en Línea (SketchCalendar)</span>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SketchCalendar
              value={calendarDate}
              onChange={(d) => {
                setCalendarDate(d);
                onTriggerToast?.(`Día seleccionado: ${d}`);
              }}
            />
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default DatePickerDoc;

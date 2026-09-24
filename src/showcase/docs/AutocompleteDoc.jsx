import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchAutocomplete } from '../../components/sketch';

export function AutocompleteDoc({ onTriggerToast }) {
  const [selectedHero, setSelectedHero] = useState('');

  const superheroOptions = [
    { label: 'Hombre Araña (Spider-Man)', value: 'spiderman', hint: 'Marvel Comics' },
    { label: 'Batman (El Caballero de la Noche)', value: 'batman', hint: 'DC Comics' },
    { label: 'Hombre de Hierro (Iron Man)', value: 'ironman', hint: 'Marvel Comics' },
    { label: 'Mujer Maravilla (Wonder Woman)', value: 'wonderwoman', hint: 'DC Comics' },
    { label: 'Capitán América', value: 'captainamerica', hint: 'Marvel Comics' },
    { label: 'Flash (Barry Allen)', value: 'flash', hint: 'DC Comics' },
    { label: 'Wolverine (Logan)', value: 'wolverine', hint: 'X-Men' }
  ];

  const propsList = [
    { name: 'options', type: 'Array<{label, value, hint} | string>', default: '[]', description: 'Lista de opciones sugeridas' },
    { name: 'value', type: 'string', default: "''", description: 'Texto del campo de búsqueda' },
    { name: 'onChange', type: '(query: string) => void', default: 'undefined', description: 'Callback en cada tipeo' },
    { name: 'onSelect', type: '(option: object) => void', default: 'undefined', description: 'Callback al elegir una sugerencia' },
    { name: 'placeholder', type: 'string', default: "'Buscar opción...'", description: 'Placeholder del buscador' }
  ];

  const codeSnippet = `import { SketchAutocomplete } from 'boceto-ui';

<SketchAutocomplete
  label="Personaje de Cómic"
  placeholder="Empieza a escribir..."
  options={[
    { label: 'Batman', value: 'batman', hint: 'DC Comics' },
    { label: 'Spider-Man', value: 'spiderman', hint: 'Marvel' }
  ]}
  onSelect={(opt) => console.log('Seleccionado:', opt)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchAutocomplete"
      category="Formularios & Entradas"
      description="Campo de entrada y lista desplegable con filtrado en tiempo real, resaltado de texto coincidente con marcador amarillo y soporte para teclado (flechas y Enter)."
      importCode="import { SketchAutocomplete } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Búsqueda con Sugerencias y Pistas</span>
          <SketchAutocomplete
            label="Superhéroe Favorito"
            placeholder="Escribe 'man', 'bat' o 'cap'..."
            options={superheroOptions}
            value={selectedHero}
            onChange={setSelectedHero}
            onSelect={(opt) => {
              onTriggerToast?.(`Seleccionado: ${opt.label}`);
            }}
          />
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Autocomplete con Lista Simple de Ciudades</span>
          <SketchAutocomplete
            label="Destino de Viaje"
            placeholder="Buscar ciudad..."
            options={['Madrid', 'Bogotá', 'Buenos Aires', 'Ciudad de México', 'Lima', 'Santiago', 'Barcelona', 'Medellín']}
            onSelect={(opt) => onTriggerToast?.(`Destino fijado: ${opt.label}`)}
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default AutocompleteDoc;

import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchCodeBlock } from '../../components/sketch';

export function CodeBlockDoc() {
  const sampleJsx = `import React, { useState } from 'react';
import { SketchButton, SketchBadge } from 'boceto-ui';

export function MiComponente() {
  const [contador, setContador] = useState(0);

  // Función artesanal de incremento
  function handleIncrement() {
    setContador((c) => c + 1);
  }

  return (
    <div className="contenedor">
      <SketchBadge variant="accent">Clics: {contador}</SketchBadge>
      <SketchButton variant="wobbly" onClick={handleIncrement}>
        ¡Dibujar otro!
      </SketchButton>
    </div>
  );
}`;

  const propsList = [
    { name: 'code', type: 'string', default: "''", description: 'Código fuente a renderizar' },
    { name: 'language', type: 'string', default: "'jsx'", description: 'Etiqueta del lenguaje (ej. jsx, bash, css)' },
    { name: 'showLineNumbers', type: 'boolean', default: 'true', description: 'Muestra numeración de líneas con margen rojo' }
  ];

  const codeSnippet = `import { SketchCodeBlock } from 'boceto-ui';

<SketchCodeBlock
  language="jsx"
  code={\`const saludo = "¡Hola BocetoUI!";\`}
/>`;

  return (
    <ComponentDocLayout
      title="SketchCodeBlock"
      category="Datos & Visualización"
      description="Visualizador de código fuente con estilo de libreta técnica o cuaderno de apuntes, numeración de líneas con margen rojo y botón para copiar con un clic."
      importCode="import { SketchCodeBlock } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card" style={{ gridColumn: '1 / -1' }}>
          <span className="comp-doc-card__label">Bloque de Código con Numeración y Resaltado Sintáctico</span>
          <SketchCodeBlock
            language="jsx"
            code={sampleJsx}
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default CodeBlockDoc;

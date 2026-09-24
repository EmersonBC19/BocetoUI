import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchInput, SketchTextarea } from '../../components/sketch';
import { PenTool, Mail, Lock, User } from 'lucide-react';

export function InputDoc() {
  const [demoText, setDemoText] = useState('');
  const [demoArea, setDemoArea] = useState('');

  const propsList = [
    { name: 'variant', type: "'boxed' | 'underline'", default: "'boxed'", description: 'Caja asimétrica o renglón subrayado de libreta' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Etiqueta superior' },
    { name: 'placeholder', type: 'string', default: 'undefined', description: 'Texto de sugerencia en tinta tenue' },
    { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Icono decorativo en el lado izquierdo' },
    { name: 'error', type: 'string', default: 'undefined', description: 'Mensaje de error en tinta roja correctora' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Indica si el campo es obligatorio' }
  ];

  const codeSnippet = `<SketchInput
  label="Correo Electrónico"
  placeholder="usuario@ejemplo.com"
  icon={<Mail size={16} />}
  required
/>

<SketchInput
  variant="underline"
  label="Renglón de Libreta"
  placeholder="Escribe sobre la línea..."
/>

<SketchTextarea
  label="Observaciones"
  rows={3}
  placeholder="Notas a mano alzada..."
/>`;

  return (
    <ComponentDocLayout
      title="SketchInput & SketchTextarea"
      category="Formularios & Entradas"
      description="Campos de texto ultra optimizados sin latencia de teclado (zero input lag), con borde orgánico asimétrico o renglón subrayado de libreta."
      importCode="import { SketchInput, SketchTextarea } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Variantes de Estilo</span>
          <SketchInput
            label="Estilo Recuadro Asimétrico (boxed)"
            placeholder="Escribe con total fluidez..."
            icon={<User size={16} />}
            value={demoText}
            onChange={(e) => setDemoText(e.target.value)}
          />

          <SketchInput
            label="Renglón Subrayado de Libreta (underline)"
            variant="underline"
            placeholder="Escribe sobre la línea trazada..."
            icon={<PenTool size={16} />}
          />
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Estados & Validación</span>
          <SketchInput
            label="Contraseña con Icono"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={16} />}
          />

          <SketchInput
            label="Estado con Error de Validación"
            defaultValue="Entrada inválida"
            error="Debes corregir este campo a mano alzada"
          />
        </div>

        <div className="comp-doc-card" style={{ gridColumn: '1 / -1' }}>
          <span className="comp-doc-card__label">3. Área de Texto Multilínea (SketchTextarea)</span>
          <SketchTextarea
            label="Bitácora de Diseño"
            placeholder="Anotaciones extensas del proyecto..."
            rows={3}
            value={demoArea}
            onChange={(e) => setDemoArea(e.target.value)}
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default InputDoc;

import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchSteps, SketchButton, SketchDivider } from '../../components/sketch';
import { ShoppingCart, Truck, CreditCard, CheckCircle } from 'lucide-react';

export function StepsDoc({ onTriggerToast }) {
  const [currentStep, setCurrentStep] = useState(1);

  const wizardSteps = [
    { id: 'cart', title: 'Carrito', description: '3 artículos listos', icon: <ShoppingCart size={18} /> },
    { id: 'shipping', title: 'Envío', description: 'Dirección postal', icon: <Truck size={18} /> },
    { id: 'payment', title: 'Pago', description: 'Tarjeta o transferencia', icon: <CreditCard size={18} /> },
    { id: 'done', title: 'Confirmado', description: 'Recibo y orden', icon: <CheckCircle size={18} /> }
  ];

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      onTriggerToast?.(`Avanzaste a: ${wizardSteps[next].title}`);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      onTriggerToast?.(`Regresaste a: ${wizardSteps[prev].title}`);
    }
  };

  const codeSnippet = `import { SketchSteps, SketchButton } from 'bocetoui';
import { useState } from 'react';

const steps = [
  { id: '1', title: 'Cuenta', description: 'Datos personales' },
  { id: '2', title: 'Perfil', description: 'Preferencias' },
  { id: '3', title: 'Finalizar', description: 'Confirmación' }
];

export default function MiWizard() {
  const [current, setCurrent] = useState(1);

  return (
    <div>
      <SketchSteps
        steps={steps}
        current={current}
        onChange={(idx) => setCurrent(idx)}
        orientation="horizontal"
      />
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <SketchButton onClick={() => setCurrent(c => Math.max(0, c - 1))}>Anterior</SketchButton>
        <SketchButton onClick={() => setCurrent(c => Math.min(2, c + 1))}>Siguiente</SketchButton>
      </div>
    </div>
  );
}`;

  const propsList = [
    { name: 'steps', type: 'Array<{id, title, description, icon}>', default: '[]', description: 'Array de pasos a renderizar' },
    { name: 'current', type: 'number', default: '0', description: 'Índice del paso activo (0-indexed)' },
    { name: 'onChange', type: '(stepIndex) => void', default: 'undefined', description: 'Callback al hacer clic en un paso completado o activo' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Disposición espacial del asistente' },
    { name: 'className', type: 'string', default: "''", description: 'Clases CSS adicionales' }
  ];

  const dosAndDonts = {
    dos: [
      'Mantén los títulos de los pasos en 1 o 2 palabras clave concisas (ej. "Envío", "Pago").',
      'Permite que el usuario pueda hacer clic en los pasos completados anteriores para regresar y corregir información.',
      'En interfaces móviles o modales estrechos, utiliza la orientación vertical para evitar compresión de texto.'
    ],
    donts: [
      'No utilices más de 5 pasos en un solo flujo; si el proceso es muy extenso, agrúpalo en fases lógicas.',
      'No bloquees el botón de paso anterior a menos que el paso actual represente una transacción irreversible.',
      'No ocultes la descripción del paso si el título requiere contexto adicional para el usuario.'
    ]
  };

  return (
    <ComponentDocLayout
      title="SketchSteps"
      category="NAVEGACIÓN"
      description="Asistente paso a paso para flujos de onboarding, wizards de registro y compras, con nodos circulares numerados y conectores elásticos."
      importCode="import { SketchSteps } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
      dosAndDonts={dosAndDonts}
    >
      <div className="comp-doc-grid" style={{ gridTemplateColumns: '1fr' }}>
        {/* Asistente Horizontal Interactivo */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Checkout Wizard Horizontal (Interactivo)</div>
          <p style={{ margin: '0 0 24px 0', fontSize: '0.9rem', color: '#71717a' }}>
            Avanza o retrocede los pasos para comprobar los estados de completado (verde), activo (azul) y pendiente:
          </p>

          <SketchSteps
            steps={wizardSteps}
            current={currentStep}
            onChange={(idx) => {
              setCurrentStep(idx);
              onTriggerToast?.(`Seleccionaste el paso: ${wizardSteps[idx].title}`);
            }}
            orientation="horizontal"
          />

          <div style={{ display: 'flex', gap: '12px', marginTop: '32px', justifyContent: 'center' }}>
            <SketchButton
              size="sm"
              variant="wobbly"
              disabled={currentStep === 0}
              onClick={handlePrev}
            >
              ← Paso Anterior
            </SketchButton>
            <SketchButton
              size="sm"
              variant="marker"
              disabled={currentStep === wizardSteps.length - 1}
              onClick={handleNext}
            >
              Siguiente Paso →
            </SketchButton>
          </div>
        </div>

        {/* Asistente Vertical */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Orientación Vertical (Ruta Logística)</div>
          <SketchSteps
            steps={[
              { id: '1', title: 'Orden Recibida', description: 'Boceto registrado en el taller (10:30 AM)' },
              { id: '2', title: 'Entintado & Revisión', description: 'Tinta fresca aplicada y secando (12:45 PM)' },
              { id: '3', title: 'En Camino', description: 'Mensajero artesanal en ruta' }
            ]}
            current={1}
            orientation="vertical"
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default StepsDoc;

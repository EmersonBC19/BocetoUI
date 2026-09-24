import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchAccordion, SketchSwitch, SketchBadge } from '../../components/sketch';
import { HelpCircle, Sparkles, Cpu, ShieldCheck, Layers } from 'lucide-react';

export function AccordionDoc({ onTriggerToast }) {
  const [allowMultiple, setAllowMultiple] = useState(false);

  const propsList = [
    { name: 'items', type: 'Array<{id: string, title: ReactNode, content: ReactNode, icon?: ReactNode}>', default: '[]', description: 'Arreglo de paneles colapsables' },
    { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Permite abrir varios paneles de forma independiente sin cerrar los demás' },
    { name: 'defaultOpenId', type: 'string | number', default: 'items[0]?.id', description: 'ID del panel abierto inicialmente' },
    { name: 'variant', type: "'default' | 'card'", default: "'default'", description: 'Estilo visual de los marcos plegables' }
  ];

  const faqItems = [
    {
      id: 'faq-1',
      title: '¿Por qué las animaciones utilizan física Bungee?',
      icon: <Sparkles size={18} />,
      content: 'El efecto bungee (squash & stretch) simula la inercia elástica de un resorte o tira de goma al desplegarse, estirándose verticalmente más allá de su tamaño antes de rebotar y asentarse de forma orgánica.'
    },
    {
      id: 'faq-2',
      title: '¿Cómo garantizan 120 FPS sin latencia de teclado?',
      icon: <Cpu size={18} />,
      content: 'Eliminamos los filtros pesados SVG feTurbulence en elementos interactivos, sustituyéndolos por border-radius asimétricos y aceleración nativa por GPU en el hilo del compositor.'
    },
    {
      id: 'faq-3',
      title: '¿Se puede alternar entre modo individual y múltiple?',
      icon: <ShieldCheck size={18} />,
      content: 'Sí, mediante la prop allowMultiple puedes decidir si al abrir un panel se colapsan los demás (modo acordeón clásico) o si cada panel es 100% independiente.'
    }
  ];

  const codeSnippet = `<SketchAccordion
  allowMultiple={true}
  defaultOpenId="item-1"
  items={[
    { id: 'item-1', title: 'Pregunta 1', content: 'Respuesta 1' },
    { id: 'item-2', title: 'Pregunta 2', content: 'Respuesta 2' }
  ]}
/>`;

  return (
    <ComponentDocLayout
      title="SketchAccordion"
      category="Estructura & Superficies"
      description="Paneles desplegables con física elástica Bungee (estiramiento y rebote), flecha rotatoria de plumilla y control independiente de colapso."
      importCode="import { SketchAccordion } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Control interactivo de allowMultiple */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          backgroundColor: 'var(--sketch-bg-surface)',
          border: '2px solid var(--sketch-ink)',
          borderRadius: 'var(--wobble-radius-1)',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <SketchSwitch
            checked={allowMultiple}
            onChange={(val) => {
              setAllowMultiple(val);
              onTriggerToast(val ? 'Modo Múltiple activado' : 'Modo Acordeón clásico activado');
            }}
            label="Permitir Múltiples Paneles Abiertos (allowMultiple)"
          />
          <SketchBadge variant="pill" color={allowMultiple ? 'blue' : 'yellow'}>
            {allowMultiple ? 'Modo: Múltiple' : 'Modo: Exclusivo'}
          </SketchBadge>
        </div>

        <div>
          <h3 className="sketch-title" style={{ fontSize: '1.35rem', marginBottom: '12px' }}>
            <HelpCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            Preguntas Frecuentes con Animación Bungee
          </h3>
          <SketchAccordion
            items={faqItems}
            allowMultiple={allowMultiple}
            defaultOpenId="faq-1"
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default AccordionDoc;

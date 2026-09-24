import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchModal, SketchButton } from '../../components/sketch';
import { Eye, Sparkles } from 'lucide-react';

export function ModalDoc({ onTriggerToast }) {
  const [isOpen, setIsOpen] = useState(false);

  const propsList = [
    { name: 'isOpen', type: 'boolean', default: 'false', description: 'Controla si el diálogo está visible' },
    { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback al cerrar (Escape, botón cruz o backdrop)' },
    { name: 'title', type: 'ReactNode', default: 'undefined', description: 'Título en la cabecera del diálogo' },
    { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Botones de acción en el pie' },
    { name: 'hasTape', type: 'boolean', default: 'true', description: 'Muestra la tira de cinta adhesiva washi en el borde superior' }
  ];

  const codeSnippet = `<SketchModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmación de Boceto"
  footer={
    <>
      <SketchButton variant="wobbly" onClick={() => setIsOpen(false)}>Cancelar</SketchButton>
      <SketchButton variant="architect" color="blue">Aceptar</SketchButton>
    </>
  }
>
  <p>¿Deseas guardar los cambios realizados en el lienzo?</p>
</SketchModal>`;

  return (
    <ComponentDocLayout
      title="SketchModal"
      category="Estructura & Superficies"
      description="Diálogo emergente flotante con animación Bungee de caída y rebote elástico, tira de cinta washi adhesiva superior y botón de cierre dibujado a mano."
      importCode="import { SketchModal } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card" style={{ textAlign: 'center', padding: '36px' }}>
        <h3 className="sketch-title" style={{ fontSize: '1.45rem', marginBottom: '8px' }}>
          Prueba el Diálogo Modal con Caída Bungee
        </h3>
        <p style={{ margin: '0 auto 20px auto', maxWidth: '500px', fontSize: '1.2rem' }}>
          Al abrirse, cae desde la parte superior estirándose y rebotando en el centro de la pantalla; al cerrarse, se retrae elásticamente.
        </p>

        <SketchButton
          size="lg"
          variant="architect"
          icon={<Eye size={20} />}
          onClick={() => setIsOpen(true)}
        >
          Abrir Ventana Modal (SketchModal)
        </SketchButton>

        <SketchModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Diálogo Flotante BocetoUI"
          footer={
            <>
              <SketchButton variant="wobbly" onClick={() => setIsOpen(false)}>
                Cancelar
              </SketchButton>
              <SketchButton
                variant="architect"
                color="blue"
                onClick={() => {
                  onTriggerToast('¡Acción confirmada con éxito!');
                  setIsOpen(false);
                }}
              >
                Confirmar
              </SketchButton>
            </>
          }
        >
          <p>
            Este diálogo modal cuenta con una tira de cinta adhesiva washi en el borde superior,
            animación elástica y un botón de cierre dibujado a mano.
          </p>
          <p style={{ marginTop: '12px' }}>
            Puedes cerrarlo haciendo clic en el aspa de plumilla, pulsando <strong>Escape</strong> en tu teclado
            o haciendo clic fuera del recuadro.
          </p>
        </SketchModal>
      </div>
    </ComponentDocLayout>
  );
}

export default ModalDoc;

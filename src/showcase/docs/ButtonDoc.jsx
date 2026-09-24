import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchButton } from '../../components/sketch';
import { Sparkles, Download, Check, Trash2, Send } from 'lucide-react';

export function ButtonDoc({ onTriggerToast }) {
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const propsList = [
    { name: 'variant', type: "'wobbly' | 'architect' | 'double-line' | 'marker' | 'dashed' | 'grunge'", default: "'wobbly'", description: 'Variación de trazo y esquinas de boceto' },
    { name: 'color', type: "'default' | 'blue' | 'green' | 'red' | 'yellow'", default: "'default'", description: 'Tinta de acento artesanal' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del botón' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Muestra una micro-bocanada de humo animada en la punta' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva eventos con reducción de opacidad y trazo tenue' },
    { name: 'icon', type: 'React.ReactNode', default: 'null', description: 'Icono opcional antes del texto' }
  ];

  const codeSnippet = `<SketchButton
  variant="architect"
  color="blue"
  size="md"
  icon={<Sparkles size={16} />}
  onClick={() => console.log('¡Clic táctil!')}
>
  Botón de Arquitecto
</SketchButton>`;

  return (
    <ComponentDocLayout
      title="SketchButton"
      category="Acciones"
      description="Botón interactivo con retroalimentación táctil de pulsación, esquinas cruzadas de planos técnicos y estados de carga con humo animado."
      importCode="import { SketchButton } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        {/* Variantes de Trazo */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Variantes de Trazo (variant)</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <SketchButton variant="wobbly" onClick={() => setClickCount(c => c + 1)}>
              Trazo Orgánico ({clickCount})
            </SketchButton>
            <SketchButton variant="architect" onClick={() => onTriggerToast('Variante arquitecto')}>
              Esquinas Cruzadas (architect)
            </SketchButton>
            <SketchButton variant="double-line" onClick={() => onTriggerToast('Variante doble línea')}>
              Marco Doble (double-line)
            </SketchButton>
            <SketchButton variant="marker" icon={<Sparkles size={16} />} onClick={() => onTriggerToast('Resaltador')}>
              Efecto Resaltador Hover
            </SketchButton>
            <SketchButton variant="dashed" onClick={() => onTriggerToast('Línea punteada')}>
              Trazo Punteado (dashed)
            </SketchButton>
            <SketchButton variant="grunge" onClick={() => onTriggerToast('Tinta gruesa')}>
              Tinta Gruesa Grunge (grunge)
            </SketchButton>
          </div>
        </div>

        {/* Colores & Tintas */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Gama de Colores (color)</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <SketchButton color="default" variant="architect">Tinta Negra Carbón</SketchButton>
            <SketchButton color="blue" variant="wobbly" icon={<Download size={16} />}>Azul Plumilla</SketchButton>
            <SketchButton color="green" variant="architect" icon={<Check size={16} />}>Verde Aprobado</SketchButton>
            <SketchButton color="red" variant="dashed" icon={<Trash2 size={16} />}>Rojo Peligro</SketchButton>
          </div>
        </div>

        {/* Tamaños y Estados */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">3. Tamaños & Estados (size, loading, disabled)</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <SketchButton size="sm" variant="wobbly">Pequeño (sm)</SketchButton>
              <SketchButton size="md" variant="wobbly">Medio (md)</SketchButton>
              <SketchButton size="lg" variant="wobbly">Grande (lg)</SketchButton>
            </div>

            <SketchButton
              variant="architect"
              loading={isLoading}
              icon={<Send size={16} />}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  onTriggerToast('¡Mensaje enviado con éxito!');
                }, 2000);
              }}
            >
              {isLoading ? 'Dibujando y enviando...' : 'Probar Carga con Humo'}
            </SketchButton>

            <SketchButton variant="wobbly" disabled>
              Botón Deshabilitado
            </SketchButton>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default ButtonDoc;

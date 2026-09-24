import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchCarousel, SketchCard, SketchButton, SketchBadge } from '../../components/sketch';
import { Sparkles, Palette, Zap } from 'lucide-react';

export function CarouselDoc({ onTriggerToast }) {
  const slides = [
    <div key="1" style={{ padding: '20px', textAlign: 'center' }}>
      <SketchBadge variant="accent" style={{ marginBottom: '10px' }}>Diapositiva 1</SketchBadge>
      <h3 style={{ fontFamily: 'var(--font-sketch-title)', fontSize: '1.4rem', margin: '8px 0' }}>
        Trazos Orgánicos y Únicos
      </h3>
      <p style={{ color: '#5e6472' }}>
        Cada componente de BocetoUI tiene bordes asimétricos y sombras duras de tinta china.
      </p>
      <SketchButton size="sm" onClick={() => onTriggerToast?.('¡Explorando trazos!')}>
        Saber Más
      </SketchButton>
    </div>,

    <div key="2" style={{ padding: '20px', textAlign: 'center' }}>
      <SketchBadge variant="primary" style={{ marginBottom: '10px' }}>Diapositiva 2</SketchBadge>
      <h3 style={{ fontFamily: 'var(--font-sketch-title)', fontSize: '1.4rem', margin: '8px 0' }}>
        Punteros Cómic Artesanales
      </h3>
      <p style={{ color: '#5e6472' }}>
        Guantes de caricatura, tijeras para cortar y lápices de dibujo interactivos.
      </p>
      <SketchButton size="sm" color="blue" onClick={() => onTriggerToast?.('¡Activando punteros!')}>
        Ver Punteros
      </SketchButton>
    </div>,

    <div key="3" style={{ padding: '20px', textAlign: 'center' }}>
      <SketchBadge variant="warning" style={{ marginBottom: '10px' }}>Diapositiva 3</SketchBadge>
      <h3 style={{ fontFamily: 'var(--font-sketch-title)', fontSize: '1.4rem', margin: '8px 0' }}>
        Lienzos Intercambiables
      </h3>
      <p style={{ color: '#5e6472' }}>
        Alterna entre papel milimetrado, cuaderno rayado, papel marfil o pizarra de tiza oscura.
      </p>
      <SketchButton size="sm" color="green" onClick={() => onTriggerToast?.('¡Cambiando de lienzo!')}>
        Probar Lienzos
      </SketchButton>
    </div>
  ];

  const propsList = [
    { name: 'items', type: 'ReactNode[]', default: '[]', description: 'Diapositivas a mostrar en el carrusel' },
    { name: 'autoplay', type: 'boolean', default: 'false', description: 'Reproducción automática de diapositivas' },
    { name: 'interval', type: 'number', default: '4000', description: 'Milisegundos entre cada diapositiva' },
    { name: 'showArrows', type: 'boolean', default: 'true', description: 'Botones anterior y siguiente' },
    { name: 'showDots', type: 'boolean', default: 'true', description: 'Paginación de puntos inferiores' }
  ];

  const codeSnippet = `import { SketchCarousel } from 'boceto-ui';

<SketchCarousel autoplay={true} interval={3500}>
  <div>Diapositiva 1</div>
  <div>Diapositiva 2</div>
  <div>Diapositiva 3</div>
</SketchCarousel>`;

  return (
    <ComponentDocLayout
      title="SketchCarousel"
      category="Datos & Visualización"
      description="Galería deslizable artesanal para tarjetas, imágenes y testimonios con controles circulares dibujados a mano y puntos de paginación con marcador."
      importCode="import { SketchCarousel } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card" style={{ gridColumn: '1 / -1' }}>
          <span className="comp-doc-card__label">Carrusel de Tarjetas Informativas</span>
          <div style={{ padding: '20px 0' }}>
            <SketchCarousel autoplay={true} interval={4000} items={slides} />
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default CarouselDoc;

import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchCard, SketchButton, SketchBadge } from '../../components/sketch';
import { Bookmark, Share2, Copy, Heart, Sparkles } from 'lucide-react';

export function CardDoc({ onTriggerToast, onCopyCode }) {
  const propsList = [
    { name: 'variant', type: "'blueprint' | 'taped' | 'folded' | 'notepad' | 'double-line' | 'wavy'", default: "'blueprint'", description: 'Estilo estructural del marco' },
    { name: 'title', type: 'React.ReactNode', default: 'undefined', description: 'Título en la cabecera de la tarjeta' },
    { name: 'headerAction', type: 'React.ReactNode', default: 'undefined', description: 'Acción o icono en la esquina superior derecha' },
    { name: 'footer', type: 'React.ReactNode', default: 'undefined', description: 'Contenedor del pie con línea discontinua' },
    { name: 'tapePosition', type: "'top-center' | 'top-left' | 'top-right'", default: "'top-center'", description: 'Posición de la tira washi tape (para variant="taped")' }
  ];

  const codeSnippet = `<SketchCard
  variant="taped"
  tapePosition="top-center"
  title="Nota de Campo con Cinta Washi"
  headerAction={<SketchBadge variant="pill">Nuevo</SketchBadge>}
  footer={
    <SketchButton size="sm" variant="marker">Guardar</SketchButton>
  }
>
  <p>Contenido artesanal dentro de la tarjeta.</p>
</SketchCard>`;

  return (
    <ComponentDocLayout
      title="SketchCard"
      category="Estructura & Superficies"
      description="Contenedores modulares que adaptan notas fijadas con cinta adhesiva translúcida, esquinas dobladas con hachurado diagonal y marcos de planos técnicos."
      importCode="import { SketchCard } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <SketchCard
          variant="blueprint"
          title="Esquinas Cruzadas (blueprint)"
          headerAction={<Bookmark size={18} />}
          footer={
            <SketchButton size="sm" variant="wobbly" onClick={() => onTriggerToast('Plano copiado')}>
              <Copy size={13} /> Copiar
            </SketchButton>
          }
        >
          <p>Líneas que sobrepasan las esquinas emulando el dibujo rápido a lápiz de planos técnicos.</p>
        </SketchCard>

        <SketchCard
          variant="taped"
          tapePosition="top-center"
          title="Cinta Washi (taped)"
          headerAction={<Share2 size={18} />}
          footer={
            <SketchButton size="sm" variant="marker" onClick={() => onTriggerToast('Cinta washi')}>
              <Sparkles size={13} /> Destacar
            </SketchButton>
          }
        >
          <p>Tira de cinta adhesiva decorativa translúcida con micro-bordes rasgados fijada en la parte superior.</p>
        </SketchCard>

        <SketchCard
          variant="folded"
          title="Página Doblada (folded)"
          headerAction={<Heart size={18} />}
          footer={
            <SketchButton size="sm" variant="architect" onClick={() => onTriggerToast('Esquina doblada')}>
              <Copy size={13} /> Detalle
            </SketchButton>
          }
        >
          <p>Esquina inferior derecha con pliegue tridimensional y sombreado de líneas diagonales de plumilla.</p>
        </SketchCard>

        <SketchCard
          variant="notepad"
          title="Bloc Perforado (notepad)"
          footer={
            <SketchButton size="sm" variant="double-line" onClick={() => onTriggerToast('Bloc')}>
              Leer
            </SketchButton>
          }
        >
          <p>Anillas y perforaciones en la parte superior para simular un cuaderno de notas de espiral.</p>
        </SketchCard>

        <SketchCard
          variant="double-line"
          title="Marco Doble (double-line)"
          footer={
            <SketchButton size="sm" variant="dashed" onClick={() => onTriggerToast('Marco')}>
              Ver Más
            </SketchButton>
          }
        >
          <p>Dos contornos paralelos dibujados con ligera asimetría manual y textura de rotulador.</p>
        </SketchCard>

        <SketchCard
          variant="wavy"
          title="Borde Estampilla (wavy)"
          footer={
            <SketchButton size="sm" variant="wobbly" onClick={() => onTriggerToast('Sello')}>
              Canjear
            </SketchButton>
          }
        >
          <p>Contorno festoneado ondulado tipo sello postal para destacar cupones, tarjetas VIP o avisos.</p>
        </SketchCard>
      </div>
    </ComponentDocLayout>
  );
}

export default CardDoc;

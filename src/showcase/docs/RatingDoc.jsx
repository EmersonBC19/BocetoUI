import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchRating } from '../../components/sketch';

export function RatingDoc({ onTriggerToast }) {
  const [userRating, setUserRating] = useState(4);
  const [surveyRating, setSurveyRating] = useState(5);

  const codeSnippet = `import { SketchRating } from 'bocetoui';
import { useState } from 'react';

export default function CalificacionProducto() {
  const [rating, setRating] = useState(4);

  return (
    <div>
      {/* Calificación Interactiva */}
      <SketchRating
        value={rating}
        onChange={(val) => setRating(val)}
        showValue={true}
        size="md" // 'sm' | 'md' | 'lg'
      />

      {/* Modo Solo Lectura para Reseñas */}
      <SketchRating
        value={4.5}
        readOnly={true}
        showValue={true}
        size="sm"
      />
    </div>
  );
}`;

  const propsList = [
    { name: 'value', type: 'number', default: '0', description: 'Puntuación numérica actual (0 a max)' },
    { name: 'max', type: 'number', default: '5', description: 'Número total de estrellas a mostrar' },
    { name: 'readOnly', type: 'boolean', default: 'false', description: 'Desactiva la interacción y fija el valor' },
    { name: 'showValue', type: 'boolean', default: 'false', description: 'Muestra una etiqueta con el puntaje numérico' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Escala visual de las estrellas' },
    { name: 'onChange', type: '(rating) => void', default: 'undefined', description: 'Callback al hacer clic en una estrella' }
  ];

  const dosAndDonts = {
    dos: [
      'Acompaña las valoraciones de solo lectura con el número total de reseñas (ej. "(128 reseñas)").',
      'Utiliza `size="sm"` para tarjetas de producto en grillas densas y `size="lg"` para modales de encuesta dedicados.',
      'Proporciona retroalimentación inmediata con un mensaje de agradecimiento al recibir la puntuación.'
    ],
    donts: [
      'No utilices más de 5 estrellas en una escala estándar para no confundir la convención mental del usuario.',
      'Evita estrellas de trazo ultra-fino que pierdan legibilidad al rellenarse de color dorado.',
      'No dejes el componente sin etiqueta de accesibilidad (`aria-label`) para lectores de pantalla.'
    ]
  };

  return (
    <ComponentDocLayout
      title="SketchRating"
      category="DATOS & VALORACIÓN"
      description="Componente de calificación con estrellas trazadas a mano alzada, soporte de medias estrellas, animaciones al pasar el cursor y modo solo lectura."
      importCode="import { SketchRating } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
      dosAndDonts={dosAndDonts}
    >
      <div className="comp-doc-grid">
        {/* Ejemplo 1: Calificación Interactiva */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Calificación Interactiva (Haz clic para calificar)</div>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#71717a' }}>
            Pasa el cursor para ver el relleno previo y haz clic para puntuar:
          </p>
          <SketchRating
            value={userRating}
            onChange={(val) => {
              setUserRating(val);
              onTriggerToast?.(`¡Gracias por calificar con ${val} estrella${val > 1 ? 's' : ''}!`);
            }}
            showValue={true}
            size="lg"
          />
        </div>

        {/* Ejemplo 2: Reseña de Producto Solo Lectura */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Modo Solo Lectura con Medias Estrellas</div>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#71717a' }}>
            Visualización con gradiente a media estrella:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SketchRating value={4.5} readOnly={true} showValue={true} size="md" />
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>(348 valoraciones)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SketchRating value={3.5} readOnly={true} showValue={true} size="sm" />
              <span style={{ fontSize: '0.85rem', color: '#71717a' }}>(42 valoraciones)</span>
            </div>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default RatingDoc;

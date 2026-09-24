import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchPagination } from '../../components/sketch';

export function PaginationDoc({ onTriggerToast }) {
  const [page, setPage] = useState(1);

  const propsList = [
    { name: 'currentPage', type: 'number', default: '1', description: 'Número de la página activa' },
    { name: 'totalPages', type: 'number', default: '5', description: 'Cantidad total de páginas' },
    { name: 'onPageChange', type: '(page: number) => void', default: 'undefined', description: 'Callback al seleccionar una página o usar flechas' }
  ];

  const codeSnippet = `<SketchPagination
  currentPage={currentPage}
  totalPages={5}
  onPageChange={(p) => setCurrentPage(p)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchPagination"
      category="Visualización de Datos"
      description="Control de paginación para tablas y listas con recuadros numerados asimétricos, página activa resaltada con rotulador y flechas dibujadas a mano."
      importCode="import { SketchPagination } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card" style={{ textAlign: 'center', padding: '32px' }}>
        <span className="comp-doc-card__label" style={{ marginBottom: '16px' }}>
          Navegación Interactiva de Páginas
        </span>

        <p style={{ margin: '0 0 16px 0', fontSize: '1.25rem' }}>
          Página actual seleccionada: <strong>{page}</strong> de 6
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SketchPagination
            currentPage={page}
            totalPages={6}
            onPageChange={(p) => {
              setPage(p);
              onTriggerToast(`Cargando registros de la página ${p}`);
            }}
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default PaginationDoc;

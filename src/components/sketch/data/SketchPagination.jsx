import React from 'react';
import './SketchPagination.css';

/**
 * SketchPagination - Control de paginación con recuadros dibujados a mano.
 * 
 * @param {number} currentPage - Página actual (1-indexed)
 * @param {number} totalPages - Total de páginas
 * @param {Function} onPageChange - Callback al cambiar de página (pageNumber)
 */
export function SketchPagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange
}) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="sketch-pagination" aria-label="Navegación de páginas">
      <button
        type="button"
        className="sketch-pagination__btn sketch-pagination__btn--prev"
        disabled={currentPage <= 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      <div className="sketch-pagination__numbers">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              className={`sketch-pagination__page ${isActive ? 'sketch-pagination__page--active' : ''}`}
              onClick={() => onPageChange && onPageChange(p)}
              aria-current={isActive ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="sketch-pagination__btn sketch-pagination__btn--next"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        aria-label="Página siguiente"
      >
        Siguiente →
      </button>
    </nav>
  );
}

export default SketchPagination;

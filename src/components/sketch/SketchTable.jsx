import React from 'react';
import './SketchTable.css';

/**
 * SketchTable - Tabla de datos con estética de plano y libreta rayada.
 *
 * @param {Object} props
 * @param {Array<{key: string, title: string, render?: Function}>} [props.columns]
 * @param {Array<string>} [props.headers] - Compatibilidad alternativa con cabeceras simples
 * @param {Array<Object>} [props.data]
 * @param {boolean} [props.striped=true]
 * @param {React.ReactNode} [props.children] - Opcional para composición manual (thead, tbody)
 * @param {string} [props.className]
 */
export function SketchTable({
  columns,
  headers,
  data,
  striped = true,
  children,
  className = '',
  ...rest
}) {
  // Normalización resiliente de columnas: soporta columns, headers o auto-derivación desde data
  const effectiveColumns = React.useMemo(() => {
    if (Array.isArray(columns) && columns.length > 0) {
      return columns;
    }
    if (Array.isArray(headers) && headers.length > 0) {
      return headers.map((h) =>
        typeof h === 'string' ? { key: h, title: h } : h
      );
    }
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      return Object.keys(data[0]).map((k) => ({ key: k, title: k }));
    }
    return [];
  }, [columns, headers, data]);

  return (
    <div className="sketch-table-wrapper">
      <table className={`sketch-table ${striped ? 'sketch-table--striped' : ''} ${className}`} {...rest}>
        {effectiveColumns.length > 0 && (
          <thead>
            <tr>
              {effectiveColumns.map((col, idx) => (
                <th key={col.key || idx}>{col.title || col.key}</th>
              ))}
            </tr>
          </thead>
        )}

        {Array.isArray(data) && data.length > 0 && effectiveColumns.length > 0 && (
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={row.id || rowIdx}>
                {effectiveColumns.map((col, colIdx) => (
                  <td key={col.key || colIdx}>
                    {col.render
                      ? col.render(row[col.key], row, rowIdx)
                      : row[col.key] !== undefined
                      ? row[col.key]
                      : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}

        {children}
      </table>
    </div>
  );
}

export default SketchTable;

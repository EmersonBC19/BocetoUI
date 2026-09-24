import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchTable, SketchBadge, SketchButton } from '../../components/sketch';
import { Copy } from 'lucide-react';

export function TableDoc({ onTriggerToast }) {
  const propsList = [
    { name: 'columns', type: 'Array<{key: string, title: ReactNode, render?: (val, row) => ReactNode}>', default: '[]', description: 'Definición de columnas y cabeceras' },
    { name: 'data', type: 'Array<Object>', default: '[]', description: 'Arreglo de filas de datos' },
    { name: 'striped', type: 'boolean', default: 'true', description: 'Alterna franjas de papel sombreado en filas pares' }
  ];

  const columns = [
    { key: 'name', title: 'Componente' },
    { key: 'category', title: 'Categoría' },
    {
      key: 'fps',
      title: 'Tasa de Cuadros',
      render: (val) => (
        <SketchBadge variant="pill" color="green" size="sm">
          {val}
        </SketchBadge>
      )
    },
    {
      key: 'action',
      title: 'Acción',
      render: (_, row) => (
        <SketchButton
          size="sm"
          variant="marker"
          onClick={() => onTriggerToast(`Copiado: <${row.name} />`)}
        >
          <Copy size={12} /> Copiar
        </SketchButton>
      )
    }
  ];

  const data = [
    { id: 1, name: 'SketchButton', category: 'Acciones', fps: '120 FPS' },
    { id: 2, name: 'SketchCard', category: 'Estructura', fps: '120 FPS' },
    { id: 3, name: 'SketchSelect', category: 'Formularios', fps: '120 FPS' },
    { id: 4, name: 'SketchAccordion', category: 'Estructura', fps: '120 FPS' },
    { id: 5, name: 'SketchProgress', category: 'Feedback', fps: '120 FPS' }
  ];

  const codeSnippet = `<SketchTable
  striped={true}
  columns={[
    { key: 'nombre', title: 'Nombre' },
    { key: 'estado', title: 'Estado', render: (v) => <SketchBadge>{v}</SketchBadge> }
  ]}
  data={dataList}
/>`;

  return (
    <ComponentDocLayout
      title="SketchTable"
      category="Visualización de Datos"
      description="Tabla de datos estructurada con cabeceras de plano técnico arquitectónico, filas rayadas de libreta y sombreado con resaltador al posar el cursor."
      importCode="import { SketchTable } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card">
        <span className="comp-doc-card__label">Tabla de Rendimiento de Componentes</span>
        <SketchTable columns={columns} data={data} striped={true} />
      </div>
    </ComponentDocLayout>
  );
}

export default TableDoc;

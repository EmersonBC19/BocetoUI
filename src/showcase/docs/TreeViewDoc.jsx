import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchTreeView } from '../../components/sketch';

export function TreeViewDoc({ onTriggerToast }) {
  const [selectedNode, setSelectedNode] = useState('app.jsx');

  const treeData = [
    {
      id: 'src',
      label: 'src',
      defaultExpanded: true,
      children: [
        {
          id: 'components',
          label: 'components',
          defaultExpanded: true,
          children: [
            { id: 'sketch-btn', label: 'SketchButton.jsx' },
            { id: 'sketch-card', label: 'SketchCard.jsx' },
            { id: 'sketch-input', label: 'SketchInput.jsx' }
          ]
        },
        {
          id: 'styles',
          label: 'styles',
          children: [
            { id: 'theme-css', label: 'sketch-theme.css' },
            { id: 'cursors-css', label: 'sketch-cursors.css' }
          ]
        },
        { id: 'app.jsx', label: 'App.jsx' },
        { id: 'index.css', label: 'index.css' }
      ]
    },
    {
      id: 'public',
      label: 'public',
      children: [
        { id: 'favicon', label: 'favicon.ico' },
        { id: 'logo-svg', label: 'boceto-logo.svg' }
      ]
    },
    { id: 'package.json', label: 'package.json' },
    { id: 'readme', label: 'README.md' }
  ];

  const propsList = [
    { name: 'data', type: 'Array<TreeNode>', default: '[]', description: 'Estructura jerárquica de carpetas y archivos' },
    { name: 'selectedId', type: 'string', default: 'undefined', description: 'ID del nodo seleccionado actualmente' },
    { name: 'onSelect', type: '(node) => void', default: 'undefined', description: 'Callback al hacer clic en un nodo' },
    { name: 'defaultExpandedIds', type: 'string[]', default: '[]', description: 'IDs de nodos que inician abiertos' }
  ];

  const codeSnippet = `import { SketchTreeView } from 'boceto-ui';

<SketchTreeView
  data={[
    {
      id: 'src',
      label: 'src',
      children: [
        { id: 'btn', label: 'Button.jsx' }
      ]
    }
  ]}
  selectedId="btn"
  onSelect={(node) => console.log('Seleccionado:', node)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchTreeView"
      category="Datos & Visualización"
      description="Explorador de árbol jerárquico para carpetas, archivos y taxonomías con conectores de línea punteada artesanal y resaltador en el nodo seleccionado."
      importCode="import { SketchTreeView } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">Explorador de Archivos del Proyecto</span>
          <div style={{ maxWidth: '340px' }}>
            <SketchTreeView
              data={treeData}
              selectedId={selectedNode}
              onSelect={(node) => {
                setSelectedNode(node.id);
                onTriggerToast?.(`Nodo seleccionado: ${node.label}`);
              }}
            />
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default TreeViewDoc;

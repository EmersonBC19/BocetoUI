import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchBreadcrumb, SketchDivider } from '../../components/sketch';
import { Folder, FileText, ShoppingBag, Laptop, Shield } from 'lucide-react';

export function BreadcrumbDoc({ onTriggerToast }) {
  const [activeSeparator, setActiveSeparator] = useState('chevron');

  const ecommerceItems = [
    { id: 'store', label: 'Tienda', icon: <ShoppingBag size={14} />, onClick: () => onTriggerToast?.('Navegando a: Tienda') },
    { id: 'tech', label: 'Electrónica', icon: <Laptop size={14} />, onClick: () => onTriggerToast?.('Navegando a: Electrónica') },
    { id: 'audio', label: 'Bocinas & Audio' }
  ];

  const docsItems = [
    { id: 'docs', label: 'Documentación', icon: <Folder size={14} />, onClick: () => onTriggerToast?.('Navegando a: Documentación') },
    { id: 'security', label: 'Seguridad', icon: <Shield size={14} />, onClick: () => onTriggerToast?.('Navegando a: Seguridad') },
    { id: 'auth', label: 'Autenticación CQRS', icon: <FileText size={14} /> }
  ];

  const codeSnippet = `import { SketchBreadcrumb } from 'bocetoui';
import { ShoppingBag, Laptop } from 'lucide-react';

const items = [
  { id: 'home', label: 'Tienda', icon: <ShoppingBag size={14} />, onClick: () => navigate('/store') },
  { id: 'cat', label: 'Electrónica', icon: <Laptop size={14} />, onClick: () => navigate('/electronics') },
  { id: 'product', label: 'Auriculares Hi-Fi' }
];

export default function MiNavegacion() {
  return (
    <SketchBreadcrumb
      items={items}
      separator="chevron" // 'chevron' | 'slash' | 'arrow' | 'dot'
      showHome={true}
    />
  );
}`;

  const propsList = [
    { name: 'items', type: 'Array<{id, label, icon, href, onClick}>', default: '[]', description: 'Lista de niveles de migas de pan' },
    { name: 'separator', type: "'chevron' | 'slash' | 'arrow' | 'dot'", default: "'chevron'", description: 'Estilo de separador dibujado entre nodos' },
    { name: 'showHome', type: 'boolean', default: 'true', description: 'Muestra el icono de inicio en el primer nodo' },
    { name: 'className', type: 'string', default: "''", description: 'Clases CSS adicionales' }
  ];

  const dosAndDonts = {
    dos: [
      'Coloca las migas de pan siempre en la parte superior izquierda de la pantalla, justo antes del título principal H1.',
      'Asegúrate de que el último nodo represente la página actual y no sea interactivo para no desorientar al usuario.',
      'Utiliza iconos sutiles de 14px para reforzar el contexto visual de cada sección jerárquica.'
    ],
    donts: [
      'No utilices más de 5 niveles de migas de pan; si la ruta es muy profunda, agrupa los niveles intermedios con puntos suspensivos.',
      'Evita usar separadores pesados o texto largo en el último nodo en pantallas móviles.',
      'No sustituyas la navegación principal con migas de pan; son un complemento de orientación secundaria.'
    ]
  };

  return (
    <ComponentDocLayout
      title="SketchBreadcrumb"
      category="NAVEGACIÓN"
      description="Ruta de navegación jerárquica con separadores trazados a mano, resaltado de página activa y soporte para eventos táctiles."
      importCode="import { SketchBreadcrumb } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
      dosAndDonts={dosAndDonts}
    >
      <div className="comp-doc-grid">
        {/* Ejemplo 1: E-commerce */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">E-commerce con Separador Dinámico</div>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#71717a' }}>
            Selecciona el separador de trazo manual:
          </p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {['chevron', 'slash', 'arrow', 'dot'].map((sep) => (
              <button
                key={sep}
                type="button"
                className={`cursor-btn ${activeSeparator === sep ? 'cursor-btn--active' : ''}`}
                onClick={() => setActiveSeparator(sep)}
                style={{ padding: '4px 10px', fontSize: '0.85rem' }}
              >
                {sep}
              </button>
            ))}
          </div>
          <SketchBreadcrumb
            items={ecommerceItems}
            separator={activeSeparator}
            showHome={true}
          />
        </div>

        {/* Ejemplo 2: Documentación Técnica */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Jerarquía de Documentación Técnica</div>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#71717a' }}>
            Con separador de flecha de tinta y resaltador amarillo en el elemento actual.
          </p>
          <SketchBreadcrumb
            items={docsItems}
            separator="arrow"
            showHome={true}
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default BreadcrumbDoc;

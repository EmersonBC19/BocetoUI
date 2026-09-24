import React, { useState } from 'react';
import './ComponentDocLayout.css';
import { SketchBadge, SketchButton, SketchCodeBlock } from '../../components/sketch';
import { Copy, Check, Code, Eye, Sparkles, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

/**
 * ComponentDocLayout - Shell estandarizado para la documentación de cada componente
 */
export function ComponentDocLayout({
  title,
  category,
  description,
  importCode,
  propsList = [],
  children,
  codeSnippet,
  dosAndDonts,
  onCopyCode
}) {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    if (onCopyCode) onCopyCode(text);
    setTimeout(() => setCopied(false), 2000);
  };

  const effectiveDos = dosAndDonts?.dos || [
    `Utiliza ${title} para reforzar la jerarquía visual respetando la cuadrícula o el tipo de lienzo de fondo.`,
    'Mantén un espaciado perimetral holgado (mínimo 16px) alrededor de los trazos irregulares para evitar colisiones.',
    'Combina estados de hover y activo con la física de rebote elástico Bungee de 120 FPS para máxima inmersión.'
  ];

  const effectiveDonts = dosAndDonts?.donts || [
    `No abuses de múltiples variantes con asimetría extrema en una misma pantalla para no fatigar la lectura.`,
    'Evita tintas de trazo fino con bajo contraste sobre texturas de fondo oscuras o pizarra de tiza.',
    'No anides más de 2 niveles de componentes con rotaciones manuales pronunciadas.'
  ];

  return (
    <article className="comp-doc">
      {/* 1. Cabecera y Metadatos */}
      <header className="comp-doc__header">
        <div className="comp-doc__badges">
          <SketchBadge variant="pill" size="sm">
            {category}
          </SketchBadge>
          <SketchBadge variant="highlight" size="sm">
            120 FPS GPU
          </SketchBadge>
        </div>

        <h1 className="comp-doc__title sketch-title">{title}</h1>
        <p className="comp-doc__desc">{description}</p>

        {/* 2. Código de Importación */}
        {importCode && (
          <div className="comp-doc__import-box">
            <code>{importCode}</code>
            <SketchButton
              size="sm"
              variant="marker"
              onClick={() => handleCopy(importCode)}
              aria-label="Copiar import"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </SketchButton>
          </div>
        )}
      </header>

      {/* Selector de Pestañas: Vista Previa vs Código vs Buenas Prácticas vs Integración */}
      <div className="comp-doc__tabs-bar">
        <button
          type="button"
          className={`comp-doc__tab-btn ${activeTab === 'preview' ? 'comp-doc__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          <Eye size={15} /> Vista Previa & Ejemplos
        </button>
        {codeSnippet && (
          <button
            type="button"
            className={`comp-doc__tab-btn ${activeTab === 'code' ? 'comp-doc__tab-btn--active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <Code size={15} /> Código JSX
          </button>
        )}
        <button
          type="button"
          className={`comp-doc__tab-btn ${activeTab === 'integration' ? 'comp-doc__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('integration')}
        >
          <Sparkles size={15} /> Guía de Integración (Next.js / Vite)
        </button>
        <button
          type="button"
          className={`comp-doc__tab-btn ${activeTab === 'guidelines' ? 'comp-doc__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('guidelines')}
        >
          <ShieldCheck size={15} /> Buenas Prácticas UX
        </button>
      </div>

      {/* 3. Contenido según pestaña */}
      {activeTab === 'preview' && (
        <div className="comp-doc__content">
          {children}
        </div>
      )}

      {activeTab === 'code' && codeSnippet && (
        <div className="comp-doc__code-panel">
          <div className="comp-doc__code-header">
            <span>Ejemplo de Implementación JSX</span>
            <SketchButton
              size="sm"
              variant="wobbly"
              onClick={() => handleCopy(codeSnippet)}
            >
              <Copy size={14} /> Copiar Código
            </SketchButton>
          </div>
          <pre className="comp-doc__code-block">
            <code>{codeSnippet}</code>
          </pre>
        </div>
      )}

      {activeTab === 'integration' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          {/* 1. Prerequisitos */}
          <div className="comp-doc-card" style={{ padding: '20px 24px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', fontFamily: 'var(--font-sketch-title)' }}>
              1. Prerrequisitos de Estilos & Tipografía
            </h4>
            <p style={{ margin: '0 0 14px 0', fontSize: '1.05rem', lineHeight: 1.45, opacity: 0.9 }}>
              BocetoUI utiliza fuentes de caligrafía artesanal (<em>Caveat</em> y <em>Architects Daughter</em>). Importa los estilos globales en tu archivo raíz (<code>main.jsx</code> o <code>layout.jsx</code>):
            </p>
            <SketchCodeBlock
              language="javascript"
              showLineNumbers={false}
              code={`// En tu main.jsx / index.js / layout.jsx
import 'boceto-ui/dist/styles.css';`}
            />
          </div>

          {/* 2. Vite / React SPA */}
          <div className="comp-doc-card" style={{ padding: '20px 24px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', fontFamily: 'var(--font-sketch-title)' }}>
              2. Uso en React + Vite (SPA)
            </h4>
            <p style={{ margin: '0 0 14px 0', fontSize: '1.05rem', lineHeight: 1.45, opacity: 0.9 }}>
              Importa el componente directamente desde la librería:
            </p>
            <SketchCodeBlock
              language="javascript"
              showLineNumbers={false}
              code={`import { ${title} } from 'boceto-ui';

export function MiVista() {
  return (
    <div className="mi-contenedor">
      <${title} />
    </div>
  );
}`}
            />
          </div>

          {/* 3. Next.js App Router */}
          <div className="comp-doc-card" style={{ padding: '20px 24px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', fontFamily: 'var(--font-sketch-title)' }}>
              3. Uso en Next.js (App Router)
            </h4>
            <p style={{ margin: '0 0 14px 0', fontSize: '1.05rem', lineHeight: 1.45, opacity: 0.9 }}>
              Si el componente maneja interactividad, clics o animaciones, agrega la directiva <code>'use client'</code> en la primera línea:
            </p>
            <SketchCodeBlock
              language="javascript"
              showLineNumbers={false}
              code={`'use client';

import { ${title} } from 'boceto-ui';

export default function Pagina() {
  return (
    <main>
      <${title} />
    </main>
  );
}`}
            />
          </div>

          {/* 4. TypeScript */}
          <div className="comp-doc-card" style={{ padding: '20px 24px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', fontFamily: 'var(--font-sketch-title)' }}>
              4. Tipado con TypeScript
            </h4>
            <p style={{ margin: '0 0 14px 0', fontSize: '1.05rem', lineHeight: 1.45, opacity: 0.9 }}>
              Importa las definiciones e interfaces directamente:
            </p>
            <SketchCodeBlock
              language="typescript"
              showLineNumbers={false}
              code={`import type { ${title}Props } from 'boceto-ui';
import { ${title} } from 'boceto-ui';`}
            />
          </div>
        </div>
      )}

      {activeTab === 'guidelines' && (
        <div className="comp-doc__guidelines-panel">
          <div className="comp-doc__guideline-card comp-doc__guideline-card--do">
            <div className="comp-doc__guideline-header">
              <CheckCircle2 size={20} />
              <span>Qué Hacer (Do)</span>
            </div>
            <ul className="comp-doc__guideline-list">
              {effectiveDos.map((item, idx) => (
                <li key={idx} className="comp-doc__guideline-item">
                  <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="comp-doc__guideline-card comp-doc__guideline-card--dont">
            <div className="comp-doc__guideline-header">
              <XCircle size={20} />
              <span>Qué Evitar (Don't)</span>
            </div>
            <ul className="comp-doc__guideline-list">
              {effectiveDonts.map((item, idx) => (
                <li key={idx} className="comp-doc__guideline-item">
                  <span style={{ color: '#dc2626', fontWeight: 'bold', flexShrink: 0, marginRight: '4px' }}>✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 4. Tabla de Props / API */}
      {propsList.length > 0 && (
        <section className="comp-doc__api-section">
          <h3 className="sketch-title comp-doc__api-title">
            <Sparkles size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            API & Propiedades ({title})
          </h3>
          <div className="comp-doc__table-wrap">
            <table className="comp-doc__table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Tipo</th>
                  <th>Default</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {propsList.map((p) => (
                  <tr key={p.name}>
                    <td><code>{p.name}</code></td>
                    <td><span className="comp-doc__type">{p.type}</span></td>
                    <td><code>{p.default || '-'}</code></td>
                    <td>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </article>
  );
}

export default ComponentDocLayout;

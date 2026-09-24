import React from 'react';
import { SketchBadge, SketchDivider, SketchButton } from '../../components/sketch';
import { Sparkles, Palette, Zap, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';

export function DesignSystemDoc() {
  const inkTokens = [
    { name: 'Tinta Carboncillo', hex: '#18181b', role: 'Bordes estructurales, textos principales y sombras duras', bg: '#18181b', color: '#fff' },
    { name: 'Azul Bolígrafo / Cobalto', hex: '#0284c7', role: 'Enlaces, focos interactivos y estados activos', bg: '#0284c7', color: '#fff' },
    { name: 'Amarillo Rotulador', hex: '#fef08a', role: 'Resaltado de texto, acentos y fondos luminosos', bg: '#fef08a', color: '#18181b' },
    { name: 'Verde Aprobación', hex: '#16a34a', role: 'Checks completados, validaciones y tendencias al alza', bg: '#16a34a', color: '#fff' },
    { name: 'Rojo Corrector', hex: '#dc2626', role: 'Alertas de error, caídas de métricas y botones destructivos', bg: '#dc2626', color: '#fff' },
    { name: 'Papel Blanco Cálido', hex: '#fdfbf7', role: 'Lienzo principal de fondo con textura orgánica', bg: '#fdfbf7', color: '#18181b' }
  ];

  return (
    <article className="comp-doc">
      <header className="comp-doc__header">
        <div className="comp-doc__badges">
          <SketchBadge variant="pill" size="sm">SISTEMA DE DISEÑO</SketchBadge>
          <SketchBadge variant="highlight" size="sm">Filosofía & Tokens</SketchBadge>
        </div>
        <h1 className="comp-doc__title sketch-title">Principios UX/UI & Design Tokens</h1>
        <p className="comp-doc__desc">
          Guía integral de fundamentos estéticos, psicología de interacción humana, variables de color y física elástica Bungee que gobiernan la librería BocetoUI.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* 1. Filosofía */}
        <section className="comp-doc-card">
          <div className="comp-doc-card__label">
            <Sparkles size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            1. Psicología y Propósito UX
          </div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            En un ecosistema digital dominado por interfaces corporativas homogéneas y excesivamente rígidas,
            <strong> BocetoUI</strong> introduce una experiencia táctil, cercana y humana. Los trazos asimétricos
            y los micro-rebotes reducen la fricción cognitiva y la ansiedad ante formularios complejos, generando un
            entorno lúdico y memorable que estimula la interacción sin comprometer la legibilidad ni la rigurosidad técnica.
          </p>
        </section>

        {/* 2. Paleta de Tintas */}
        <section className="comp-doc-card">
          <div className="comp-doc-card__label">
            <Palette size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            2. Paleta Cromática de Tintas & Papel
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {inkTokens.map((t) => (
              <div
                key={t.name}
                style={{
                  border: '2px solid #18181b',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '2px 2px 0 #18181b'
                }}
              >
                <div style={{ background: t.bg, height: '48px', color: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', borderBottom: '1.5px solid #18181b' }}>
                  {t.hex}
                </div>
                <div style={{ padding: '12px' }}>
                  <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>{t.name}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#71717a' }}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Cinemática Bungee */}
        <section className="comp-doc-card">
          <div className="comp-doc-card__label">
            <Zap size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            3. Física Elástica Bungee (120 FPS GPU)
          </div>
          <p style={{ margin: '0 0 16px 0', lineHeight: 1.6 }}>
            Las animaciones en BocetoUI no utilizan transiciones lineales mecánicas. Cada apertura de modal,
            despliegue de menú o activación de botón emplea la curva cúbica de sobreimpulso elástico:
          </p>
          <div style={{ background: '#1e293b', color: '#f8fafc', padding: '12px 16px', borderRadius: '6px', fontFamily: 'var(--font-sketch-code)', fontSize: '0.9rem', marginBottom: '16px' }}>
            cubic-bezier(0.34, 1.56, 0.64, 1) /* Efecto muelle con aceleración por hardware */
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#71717a' }}>
            Garantiza una tasa sostenida de 120 FPS al restringir las mutaciones a <code>transform</code> y <code>opacity</code>.
          </p>
        </section>

        {/* 4. Accesibilidad */}
        <section className="comp-doc-card">
          <div className="comp-doc-card__label">
            <ShieldCheck size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            4. Accesibilidad & Contraste WCAG 2.1 AA
          </div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            A pesar del estilo dibujado a mano, todos los elementos interactivos cuentan con bordes sólidos de 2px en tinta negra,
            garantizando un ratio de contraste superior a 7:1 sobre cualquier textura de fondo claro. La navegación por teclado
            incluye indicadores <code>:focus-visible</code> mediante recuadros de trazo discontinuo de alta visibilidad.
          </p>
        </section>
      </div>
    </article>
  );
}

export default DesignSystemDoc;

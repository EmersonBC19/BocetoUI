import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchCard, SketchButton, SketchBadge } from '../../components/sketch';
import { Copy, Check, Terminal, Package, ArrowRight, Sparkles } from 'lucide-react';

export function QuickStartDoc({ onTriggerToast }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copySnippet = (text, idx) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(idx);
    onTriggerToast?.('¡Comando copiado al portapapeles!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const installCode = `npm install boceto-ui lucide-react`;
  const importCode = `import { BocetoProvider, SketchCard, SketchButton, SketchInput } from 'boceto-ui';
import 'boceto-ui/styles.css';`;

  const fullExample = `import React from 'react';
import { BocetoProvider, SketchCard, SketchButton, SketchInput } from 'boceto-ui';
import 'boceto-ui/styles.css';

export default function MiApp() {
  return (
    <BocetoProvider cursor="comic" canvas="paper-grid">
      <div style={{ maxWidth: '460px', margin: '40px auto', padding: '16px' }}>
        <SketchCard title="¡Hola BocetoUI!">
          <p style={{ margin: '0 0 16px 0', color: '#555' }}>
            Componentes artesanales listos para producción.
          </p>
          <SketchInput label="Tu Correo" placeholder="usuario@correo.com" />
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <SketchButton variant="marker">Crear Cuenta</SketchButton>
          </div>
        </SketchCard>
      </div>
    </BocetoProvider>
  );
}`;

  return (
    <ComponentDocLayout
      title="Guía de Instalación & Uso de la Librería"
      description="Cómo integrar BocetoUI en cualquier proyecto nuevo o existente de React (Next.js, Vite, Remix o Astro) vía npm."
      badge="npm v1.0.0"
      importCode={installCode}
      propsList={[
        { name: 'cursor', type: "'comic' | 'native'", default: "'comic'", description: 'Activa el sistema de punteros con ráfagas al clic' },
        { name: 'canvas', type: "'paper-grid' | 'paper-dots' | 'paper-lined' | 'paper-chalk' | 'none'", default: "'none'", description: 'Textura de fondo artesanal' },
        { name: 'theme', type: "'light' | 'chalkboard'", default: "'light'", description: 'Modo visual claro o pizarra' },
        { name: 'applyToRoot', type: 'boolean', default: 'false', description: 'Inyecta los atributos en la etiqueta <html>' }
      ]}
      dosAndDonts={{
        dos: [
          'Importa "boceto-ui/styles.css" una sola vez en el archivo raíz de tu app.',
          'Envuelve tu árbol con <BocetoProvider> para habilitar cursores y texturas sin CSS adicional.',
          'Aprovecha las variantes marker y wobbly para darle personalidad lúdica a tus llamadas a la acción.'
        ],
        donts: [
          'No olvides instalar lucide-react, ya que varios componentes aprovechan sus iconos vectoriales.',
          'No sobrescribas los wobble-radius directamente en elementos hijos; usa las clases provistas.'
        ]
      }}
    >
      <div className="comp-doc-grid" style={{ gridTemplateColumns: '1fr' }}>
        {/* Paso 1: Instalación */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Paso 1: Instalación del Paquete</div>
          <p style={{ margin: '0 0 12px 0', color: '#71717a', fontSize: '0.95rem' }}>
            Ejecuta el siguiente comando en la raíz de tu proyecto de React:
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#18181b', color: '#f4f4f5', padding: '12px 18px', borderRadius: '8px', fontFamily: 'monospace' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={18} color="#38bdf8" />
              <span>{installCode}</span>
            </div>
            <SketchButton size="sm" variant="marker" onClick={() => copySnippet(installCode, 1)}>
              {copiedIndex === 1 ? <Check size={14} /> : <Copy size={14} />}
              {copiedIndex === 1 ? ' Copiado' : ' Copiar'}
            </SketchButton>
          </div>
        </div>

        {/* Paso 2: Importación de Estilos */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Paso 2: Importar Estilos en tu Entrada Principal</div>
          <p style={{ margin: '0 0 12px 0', color: '#71717a', fontSize: '0.95rem' }}>
            En tu <code>main.jsx</code>, <code>_app.jsx</code> o <code>layout.jsx</code>, añade la hoja de estilos:
          </p>
          <pre style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', padding: '14px', borderRadius: '8px', overflowX: 'auto', margin: 0, fontSize: '0.9rem' }}>
            <code>{importCode}</code>
          </pre>
        </div>

        {/* Paso 3: Ejemplo Completo */}
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Paso 3: Plantilla Mínima Funcional</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
            <SketchButton size="sm" variant="wobbly" onClick={() => copySnippet(fullExample, 2)}>
              {copiedIndex === 2 ? <Check size={14} /> : <Copy size={14} />}
              {copiedIndex === 2 ? ' ¡Copiado!' : ' Copiar Código'}
            </SketchButton>
          </div>
          <pre style={{ background: '#18181b', color: '#e4e4e7', padding: '18px', borderRadius: '8px', overflowX: 'auto', margin: 0, fontSize: '0.85rem' }}>
            <code>{fullExample}</code>
          </pre>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default QuickStartDoc;

import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchAvatar } from '../../components/sketch';

export function AvatarDoc() {
  const propsList = [
    { name: 'name', type: 'string', default: "''", description: 'Nombre para generar iniciales automáticas de plumilla' },
    { name: 'src', type: 'string', default: 'undefined', description: 'URL de imagen de perfil' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dimensiones del avatar' },
    { name: 'status', type: "'online' | 'busy' | 'offline'", default: 'undefined', description: 'Punto de estado en el borde inferior derecho' }
  ];

  const codeSnippet = `<SketchAvatar
  name="Leonardo DaVinci"
  size="lg"
  status="online"
/>`;

  return (
    <ComponentDocLayout
      title="SketchAvatar"
      category="Visualización de Datos"
      description="Avatares circulares de boceto con cálculo automático de iniciales en tinta tipográfica y puntos de estado activo."
      importCode="import { SketchAvatar } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Avatares con Iniciales & Estados</span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
            <SketchAvatar name="Leonardo DaVinci" size="lg" status="online" />
            <SketchAvatar name="Arqui Tech" size="lg" status="busy" />
            <SketchAvatar name="Pluma Tinta" size="lg" status="offline" />
          </div>
          <small style={{ textAlign: 'center', opacity: 0.75 }}>Verde: Activo • Amarillo: Ocupado • Gris: Desconectado</small>
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Escala de Tamaños</span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
            <SketchAvatar name="Small Avatar" size="sm" />
            <SketchAvatar name="Medium Avatar" size="md" />
            <SketchAvatar name="Large Avatar" size="lg" />
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default AvatarDoc;

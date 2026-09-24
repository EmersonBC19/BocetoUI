import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchSwitch } from '../../components/sketch';

export function SwitchDoc({ onTriggerToast }) {
  const [wifi, setWifi] = useState(true);
  const [sound, setSound] = useState(false);
  const [dark, setDark] = useState(true);

  const propsList = [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Estado activo o inactivo del interruptor (modo controlado)' },
    { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Estado inicial (modo no controlado)' },
    { name: 'onChange', type: '(checked: boolean, event) => void', default: 'undefined', description: 'Callback que recibe el nuevo valor booleano' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Texto descriptivo que acompaña a la palanca' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva la interacción' }
  ];

  const codeSnippet = `<SketchSwitch
  checked={isEnabled}
  onChange={(val) => setIsEnabled(val)}
  label="Modo Avión Activado"
/>`;

  return (
    <ComponentDocLayout
      title="SketchSwitch"
      category="Acciones"
      description="Interruptor tipo palanca dibujado a mano con relleno verde al activarse, neutro al apagarse y animación elástica Bungee del botón de contacto."
      importCode="import { SketchSwitch } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Ejemplos Interactivos (Haz clic para activar o desactivar)</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <SketchSwitch
              checked={wifi}
              onChange={(val) => {
                setWifi(val);
                onTriggerToast(val ? 'Conexión Wi-Fi activada' : 'Wi-Fi desconectado');
              }}
              label={`Conexión Wi-Fi (${wifi ? 'Activa' : 'Desactivada'})`}
            />
            <SketchSwitch
              checked={sound}
              onChange={(val) => {
                setSound(val);
                onTriggerToast(val ? 'Efectos de sonido táctil activados' : 'Silencio');
              }}
              label={`Sonido Táctil (${sound ? 'Activo' : 'Desactivado'})`}
            />
            <SketchSwitch
              checked={dark}
              onChange={(val) => {
                setDark(val);
                onTriggerToast(val ? 'Modo 120 FPS activo' : 'Modo 60 FPS estándar');
              }}
              label={`Aceleración GPU 120 FPS (${dark ? 'Activa' : 'Desactivada'})`}
            />
          </div>
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. Estados Deshabilitados (disabled)</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <SketchSwitch
              checked={true}
              disabled
              label="Opción Bloqueada (Activada fija)"
            />
            <SketchSwitch
              checked={false}
              disabled
              label="Opción Bloqueada (Desactivada fija)"
            />
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default SwitchDoc;

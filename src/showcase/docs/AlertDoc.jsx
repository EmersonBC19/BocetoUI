import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchAlert, SketchButton, SketchBadge } from '../../components/sketch';
import { RotateCcw, PlusCircle } from 'lucide-react';

export function AlertDoc({ onTriggerToast }) {
  const [alerts, setAlerts] = useState({
    info: true,
    success: true,
    warning: true,
    error: true
  });

  const propsList = [
    { name: 'variant / type', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Tonalidad e icono temático del aviso' },
    { name: 'title', type: 'ReactNode', default: 'undefined', description: 'Título destacado de la alerta' },
    { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback al descartar. Muestra botón de cierre (X)' },
    { name: 'icon', type: 'ReactNode', default: 'SVG según variante', description: 'Icono personalizado o null para ocultar' }
  ];

  const closeAlert = (key, label) => {
    setAlerts(prev => ({ ...prev, [key]: false }));
    if (onTriggerToast) onTriggerToast(`Alerta de ${label} descartada`);
  };

  const openAlert = (key, label) => {
    setAlerts(prev => ({ ...prev, [key]: true }));
    if (onTriggerToast) onTriggerToast(`Alerta de ${label} activada`);
  };

  const resetAlerts = () => {
    setAlerts({ info: true, success: true, warning: true, error: true });
    if (onTriggerToast) onTriggerToast('Todas las alertas restauradas');
  };

  const activeCount = Object.values(alerts).filter(Boolean).length;

  const codeSnippet = `<SketchAlert
  variant="success"
  title="Compilación Exitosa"
  onClose={() => console.log('Cerrado')}
>
  Tu diseño ha sido renderizado a 120 FPS sin errores.
</SketchAlert>`;

  return (
    <ComponentDocLayout
      title="SketchAlert"
      category="Feedback & Movimiento"
      description="Cajas de advertencia e información con marcos orgánicos de plumilla, 4 colores pastel diferenciados, iconos vectoriales y botón de descarte táctil con rebote elástico."
      importCode="import { SketchAlert } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card">
        {/* Barra de Controles Interactivos */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <span className="comp-doc-card__label" style={{ margin: 0 }}>
              Alertas Interactivas (Cierra con la 'X' o actívalas abajo)
            </span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
              <SketchButton
                size="sm"
                variant={alerts.info ? 'primary' : 'dashed'}
                onClick={() => (alerts.info ? closeAlert('info', 'información') : openAlert('info', 'información'))}
              >
                {alerts.info ? 'Ocultar Info' : '+ Activar Info'}
              </SketchButton>
              <SketchButton
                size="sm"
                variant={alerts.success ? 'primary' : 'dashed'}
                onClick={() => (alerts.success ? closeAlert('success', 'éxito') : openAlert('success', 'éxito'))}
              >
                {alerts.success ? 'Ocultar Éxito' : '+ Activar Éxito'}
              </SketchButton>
              <SketchButton
                size="sm"
                variant={alerts.warning ? 'primary' : 'dashed'}
                onClick={() => (alerts.warning ? closeAlert('warning', 'advertencia') : openAlert('warning', 'advertencia'))}
              >
                {alerts.warning ? 'Ocultar Aviso' : '+ Activar Aviso'}
              </SketchButton>
              <SketchButton
                size="sm"
                variant={alerts.error ? 'primary' : 'dashed'}
                onClick={() => (alerts.error ? closeAlert('error', 'error') : openAlert('error', 'error'))}
              >
                {alerts.error ? 'Ocultar Error' : '+ Activar Error'}
              </SketchButton>
            </div>
          </div>

          <SketchButton size="sm" variant="architect" icon={<RotateCcw size={14} />} onClick={resetAlerts}>
            Restaurar Alertas ({activeCount}/4)
          </SketchButton>
        </div>

        {/* Lista de Alertas con Botón de Cierre */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {alerts.info && (
            <SketchAlert
              variant="info"
              title="Información de Rendimiento"
              onClose={() => closeAlert('info', 'información')}
            >
              Las transformaciones por hardware GPU eliminan cuellos de botella en la CPU.
            </SketchAlert>
          )}

          {alerts.success && (
            <SketchAlert
              variant="success"
              title="Compilación Exitosa"
              onClose={() => closeAlert('success', 'éxito')}
            >
              Se han generado 21 componentes reutilizables con cero emojis y física Bungee.
            </SketchAlert>
          )}

          {alerts.warning && (
            <SketchAlert
              variant="warning"
              title="Precaución de Trazado"
              onClose={() => closeAlert('warning', 'advertencia')}
            >
              Evita añadir filtros feTurbulence a elementos con animación continua de texto.
            </SketchAlert>
          )}

          {alerts.error && (
            <SketchAlert
              variant="error"
              title="Error al Cargar Módulo"
              onClose={() => closeAlert('error', 'error')}
            >
              El archivo solicitado supera el límite permitido o no existe en el directorio.
            </SketchAlert>
          )}

          {activeCount === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '32px 16px',
              border: '2px dashed var(--sketch-ink-light)',
              borderRadius: 'var(--wobble-radius-1)',
              background: 'var(--sketch-bg-paper)'
            }}>
              <p style={{ margin: '0 0 10px 0', fontSize: '1.25rem' }}>
                Todas las alertas han sido descartadas.
              </p>
              <SketchButton size="sm" variant="marker" icon={<PlusCircle size={15} />} onClick={resetAlerts}>
                Restaurar Todas las Alertas
              </SketchButton>
            </div>
          )}
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default AlertDoc;

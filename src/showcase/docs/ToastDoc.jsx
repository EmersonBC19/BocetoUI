import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchToast, SketchButton, SketchBadge, SketchSwitch } from '../../components/sketch';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, Timer, Sparkles, PauseCircle } from 'lucide-react';

export function ToastDoc() {
  const [duration, setDuration] = useState(4500);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success', key: 0 });

  const trigger = (message, type) => {
    // Generamos una clave única en cada llamada para forzar reinicio limpio del componente y su mecha
    setToast({
      isOpen: true,
      message,
      type,
      key: Date.now()
    });
  };

  const DURATION_PRESETS = [
    { label: '3.0s (Rápido)', value: 3000, desc: 'Avisos breves y confirmaciones ágiles' },
    { label: '4.5s (Estándar ⭐)', value: 4500, desc: 'Lectura cómoda recomendada' },
    { label: '7.0s (Extendido)', value: 7000, desc: 'Mensajes largos o advertencias detalladas' },
    { label: 'Permanente (Manual ✕)', value: 0, desc: 'Permanece visible hasta hacer clic en ✕' }
  ];

  const propsList = [
    { name: 'message', type: 'string', default: "''", description: 'Texto del aviso flotante' },
    { name: 'type', type: "'success' | 'info' | 'warning' | 'error'", default: "'success'", description: 'Tonalidad, onomatopeya temática (¡LISTO!, ¡OJO!, ¡UPS!, ¡NOTA!) e icono' },
    { name: 'position', type: "'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'", default: "'top-right'", description: 'Ubicación en pantalla. Por defecto se ubica arriba para no obstaculizar la barra inferior de dibujo' },
    { name: 'isOpen', type: 'boolean', default: 'true', description: 'Visibilidad del toast' },
    { name: 'duration', type: 'number', default: '4500', description: 'Tiempo en ms antes de auto-desaparecer (0 para deshabilitar auto-cierre)' },
    { name: 'pauseOnHover', type: 'boolean', default: 'true', description: 'Pausa el temporizador y congela la mecha animada al situar el puntero' },
    { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback al cerrar manualmente con el aspa o al expirar el tiempo' }
  ];

  const codeSnippet = `<SketchToast
  isOpen={isOpen}
  type="success"
  position="top-right"
  message="¡Boceto guardado con éxito!"
  duration={4500}
  pauseOnHover={true}
  onClose={() => setIsOpen(false)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchToast"
      category="Feedback & Movimiento"
      description="Notificación flotante fijada con tira de cinta adhesiva washi, marco orgánico, animación Bungee de caída con balanceo elástico, barra de mecha sincronizada y pausa en hover."
      importCode="import { SketchToast } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-card" style={{ padding: '28px 24px' }}>
        <span className="comp-doc-card__label" style={{ marginBottom: '16px' }}>
          Demostración y Control de Duración en Vivo
        </span>

        {/* Consejo de usabilidad y lectura */}
        <div style={{
          backgroundColor: 'var(--sketch-bg-canvas, rgba(254, 240, 138, 0.2))',
          border: '2px solid var(--sketch-ink, #23272f)',
          borderRadius: '10px',
          padding: '12px 18px',
          marginBottom: '22px',
          textAlign: 'left',
          boxShadow: '3px 3px 0px var(--sketch-ink, #23272f)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Sparkles size={22} color="var(--sketch-pen-blue, #2563eb)" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.45 }}>
            <strong>Consejo de Usabilidad:</strong> Las alertas flotantes se muestran durante <strong>4.5 segundos</strong> por defecto para una lectura cómoda. La barra de mecha inferior indica el tiempo restante y <strong>se pausa automáticamente si el usuario coloca el cursor encima</strong> para que no se cierre mientras lee.
          </p>
        </div>

        {/* Selector interactivo de duraciones */}
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Timer size={18} />
            <strong style={{ fontSize: '1.15rem' }}>Selecciona la Duración de Prueba:</strong>
            <SketchBadge color={duration === 4500 ? 'green' : duration === 0 ? 'purple' : 'blue'}>
              {duration > 0 ? `${(duration / 1000).toFixed(1)} segundos (${duration}ms)` : 'Permanente'}
            </SketchBadge>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {DURATION_PRESETS.map((preset) => {
              const isSelected = duration === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setDuration(preset.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: isSelected ? '2px solid var(--sketch-pen-blue, #2563eb)' : '2px dashed var(--sketch-ink, #23272f)',
                    backgroundColor: isSelected ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                    color: 'var(--sketch-ink, #23272f)',
                    fontFamily: 'inherit',
                    fontSize: '1.05rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{preset.label}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '2px' }}>
                    {preset.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Toggle de pausa en hover */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', width: 'fit-content' }}>
            <PauseCircle size={18} />
            <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>Pausa interactiva al pasar el ratón (Pause on Hover):</span>
            <SketchSwitch
              checked={pauseOnHover}
              onChange={(e) => setPauseOnHover(e.target.checked)}
              aria-label="Alternar pausa en hover"
            />
          </div>
        </div>

        {/* Botones de disparo de Toast */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ margin: '0 auto 16px auto', fontSize: '1.15rem', fontWeight: 600 }}>
            Haz clic en cualquiera de los botones para ver aparecer la alerta con su cinta adhesiva y rebote elástico:
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <SketchButton
              variant="architect"
              color="green"
              icon={<CheckCircle2 size={16} />}
              onClick={() => trigger('¡Operación realizada con éxito en el lienzo!', 'success')}
            >
              Toast Éxito
            </SketchButton>

            <SketchButton
              variant="double-line"
              color="blue"
              icon={<Info size={16} />}
              onClick={() => trigger('Aviso del sistema: Nuevo trazo registrado', 'info')}
            >
              Toast Información
            </SketchButton>

            <SketchButton
              variant="marker"
              icon={<AlertTriangle size={16} />}
              onClick={() => trigger('Atención: Revisa el trazo a lápiz antes de entintar', 'warning')}
            >
              Toast Advertencia
            </SketchButton>

            <SketchButton
              variant="dashed"
              color="red"
              icon={<AlertCircle size={16} />}
              onClick={() => trigger('Error: No se pudo conectar al lienzo compartido', 'error')}
            >
              Toast Error
            </SketchButton>
          </div>
        </div>

        {/* Renderizado de SketchToast con key única para reinicio en clics rápidos */}
        <SketchToast
          key={toast.key}
          isOpen={toast.isOpen}
          message={toast.message}
          type={toast.type}
          duration={duration}
          pauseOnHover={pauseOnHover}
          onClose={() => setToast(prev => ({ ...prev, isOpen: false }))}
        />
      </div>
    </ComponentDocLayout>
  );
}

export default ToastDoc;

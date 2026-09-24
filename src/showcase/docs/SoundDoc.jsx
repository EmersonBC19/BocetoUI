import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import {
  SketchSoundToggle,
  SketchButton,
  SketchCard,
  useSketchSound,
  playSketchSound
} from '../../components/sketch';
import {
  Volume2,
  VolumeX,
  Sparkles,
  PenTool,
  Dices,
  BookOpen,
  Eraser,
  Palette
} from 'lucide-react';

export function SoundDoc({ onTriggerToast }) {
  const { isSoundEnabled, toggleSound, playSound } = useSketchSound();

  const propsList = [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'sm'", description: 'Dimensión física del botón conmutador' },
    { name: 'variant', type: "'pill' | 'badge' | 'ghost'", default: "'pill'", description: 'Acabado geométrico: píldora ondulada, insignia con borde o transparente ghost' },
    { name: 'showLabel', type: 'boolean', default: 'true', description: 'Muestra u oculta la etiqueta de texto ("Sonido" / "Silencio")' },
    { name: 'onTriggerToast', type: 'Function', default: 'undefined', description: 'Callback opcional que recibe el mensaje de confirmación al alternar' },
    { name: 'className', type: 'string', default: "''", description: 'Clases CSS adicionales para personalización' }
  ];

  const codeSnippet = `import { SketchSoundToggle, useSketchSound, playSketchSound } from 'boceto-ui';

// 1. Botón conmutador visual con estado sincronizado
<SketchSoundToggle
  size="sm"
  variant="pill"
  onTriggerToast={(msg) => console.log(msg)}
/>

// 2. Uso con Hook en tus componentes
function MiFormulario() {
  const { isSoundEnabled, toggleSound, playSound } = useSketchSound();

  const handleSubmit = () => {
    playSound('marker'); // 'pencil' | 'marker' | 'paper' | 'chalk' | 'dice' | 'bocetin' | 'eraser'
    alert('Guardado!');
  };

  return <button onClick={handleSubmit}>Guardar</button>;
}

// 3. Disparo directo sin hooks
playSketchSound('pencil');`;

  const SOUND_EFFECTS = [
    { id: 'pencil', label: '✏️ Lápiz de Grafito', desc: 'Fricción acústica de mina sobre grano de papel', icon: <PenTool size={16} /> },
    { id: 'marker', label: '🖊️ Clic de Marcador', desc: 'Destape con resonancia elástica tipo Copic', icon: <Sparkles size={16} /> },
    { id: 'paper', label: '📖 Paso de Hoja', desc: 'Susurro suave de página de cuaderno escolar', icon: <BookOpen size={16} /> },
    { id: 'chalk', label: '🖍️ Tiza sobre Pizarra', desc: 'Impacto aterciopelado mate con polvillo', icon: <Palette size={16} /> },
    { id: 'dice', label: '🎲 Dados de Madera', desc: 'Repiqueteo en rebote de dados sobre madera', icon: <Dices size={16} /> },
    { id: 'bocetin', label: '🧸 Mascota Bocetín', desc: 'Chirp ascendente alegre con vibrato caricaturesco', icon: <Sparkles size={16} /> },
    { id: 'eraser', label: '🧽 Goma de Borrar', desc: 'Fricción de borrador de vinilo sobre trazo', icon: <Eraser size={16} /> },
  ];

  return (
    <ComponentDocLayout
      title="SketchSound & SFX"
      category="Audio & Háptica"
      description="Sistema de efectos sonoros físicos procedurales sintetizados mediante Web Audio API nativo. Cero descargas de archivos MP3 pesados, cero latencia (< 3ms) y variaciones acústicas orgánicas en cada clic."
      importCode="import { SketchSoundToggle, useSketchSound, playSketchSound } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        {/* 1. Botón Conmutador y Variantes */}
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. Conmutador Artesanal (SketchSoundToggle)</span>
          <p style={{ margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--sketch-ink-muted)' }}>
            Estado actual: <strong>{isSoundEnabled ? '🔊 Sonido Activado' : '🔇 Silenciado'}</strong>
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <SketchSoundToggle size="sm" variant="pill" onTriggerToast={onTriggerToast} />
            <SketchSoundToggle size="md" variant="badge" onTriggerToast={onTriggerToast} />
            <SketchSoundToggle size="lg" variant="pill" showLabel={false} onTriggerToast={onTriggerToast} />
          </div>
        </div>

        {/* 2. Soundboard de Efectos Acústicos Físicos */}
        <div className="comp-doc-card" style={{ gridColumn: '1 / -1' }}>
          <span className="comp-doc-card__label">2. Mesa de Mezclas & Pruebas en Vivo (Soundboard)</span>
          <p style={{ margin: '0 0 14px 0', fontSize: '1.05rem', color: 'var(--sketch-ink-muted)' }}>
            Haz clic en cada botón para escuchar la síntesis física en tiempo real {!isSoundEnabled && '(Se activará el audio automáticamente)'}:
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            {SOUND_EFFECTS.map((snd) => (
              <div
                key={snd.id}
                style={{
                  background: 'var(--sketch-bg-paper)',
                  border: '1.8px solid var(--sketch-ink)',
                  borderRadius: 'var(--wobble-radius-1, 6px)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: '2px 2px 0 var(--sketch-ink)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--sketch-ink)' }}>{snd.label}</strong>
                  <span style={{ color: 'var(--sketch-ink-muted)' }}>{snd.icon}</span>
                </div>
                <span style={{ fontSize: '0.9rem', color: 'var(--sketch-ink-muted)', flex: 1 }}>{snd.desc}</span>
                <SketchButton
                  size="xs"
                  variant="sketch"
                  onClick={() => {
                    if (!isSoundEnabled) toggleSound();
                    playSound(snd.id);
                    onTriggerToast?.(`🎶 Reproduciendo efecto: ${snd.id}`);
                  }}
                >
                  Probar sonido
                </SketchButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default SoundDoc;

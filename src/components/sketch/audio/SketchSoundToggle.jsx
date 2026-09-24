import React from 'react';
import './SketchSoundToggle.css';
import { useSketchSound } from './useSketchSound';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * SketchSoundToggle — Botón artesanal interactivo para alternar efectos sonoros de grafito y papel.
 *
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} [props.size='sm']
 * @param {'pill'|'badge'|'ghost'} [props.variant='pill']
 * @param {boolean} [props.showLabel=true] - Si muestra la etiqueta de texto junto al altavoz.
 * @param {(msg: string) => void} [props.onTriggerToast] - Callback opcional para emitir un toast de confirmación.
 * @param {string} [props.className]
 */
export function SketchSoundToggle({
  size = 'sm',
  variant = 'pill',
  showLabel = true,
  onTriggerToast,
  className = '',
  ...rest
}) {
  const { isSoundEnabled, toggleSound } = useSketchSound();

  const handleToggle = (e) => {
    e.stopPropagation();
    const next = toggleSound();
    if (onTriggerToast) {
      onTriggerToast(
        next
          ? '🔊 Efectos sonoros activados: grafito, tiza y papel'
          : '🔇 Efectos de sonido silenciados'
      );
    }
  };

  return (
    <button
      type="button"
      className={`sketch-sound-toggle sketch-sound-toggle--${size} sketch-sound-toggle--${variant} ${
        isSoundEnabled ? 'sketch-sound-toggle--active' : 'sketch-sound-toggle--muted'
      } ${className}`}
      onClick={handleToggle}
      title={
        isSoundEnabled
          ? 'Silenciar efectos sonoros de grafito y papel'
          : 'Activar efectos sonoros artesanales'
      }
      aria-label={isSoundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
      {...rest}
    >
      <span className="sketch-sound-toggle__icon" aria-hidden="true">
        {isSoundEnabled ? <Volume2 size={size === 'lg' ? 18 : 14} /> : <VolumeX size={size === 'lg' ? 18 : 14} />}
      </span>
      {showLabel && (
        <span className="sketch-sound-toggle__label">
          {isSoundEnabled ? 'Sonido' : 'Silencio'}
        </span>
      )}
    </button>
  );
}

export default SketchSoundToggle;

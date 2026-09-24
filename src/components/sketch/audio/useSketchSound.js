import { useState, useEffect, useCallback } from 'react';
import {
  sketchAudio,
  playSketchSound,
  isSketchAudioEnabled,
  setSketchAudioEnabled
} from './sketchAudio';

/**
 * useSketchSound — Hook de React para reproducir efectos de sonido artesanales y controlar el estado.
 *
 * @returns {{
 *   isSoundEnabled: boolean,
 *   toggleSound: () => boolean,
 *   setSoundEnabled: (enabled: boolean) => boolean,
 *   playSound: (type: 'pencil'|'marker'|'paper'|'chalk'|'dice'|'bocetin'|'eraser', volume?: number) => void
 * }}
 */
export function useSketchSound() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => isSketchAudioEnabled());

  useEffect(() => {
    // Sincronizar estado global
    const handleStorageChange = (e) => {
      if (e.key === 'boceto_sound_enabled') {
        setIsSoundEnabled(e.newValue === 'true');
      }
    };

    const handleCustomSoundChange = (e) => {
      setIsSoundEnabled(e.detail.enabled);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sketch-sound-change', handleCustomSoundChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sketch-sound-change', handleCustomSoundChange);
    };
  }, []);

  const toggleSound = useCallback(() => {
    const next = !isSketchAudioEnabled();
    setSketchAudioEnabled(next);
    setIsSoundEnabled(next);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('sketch-sound-change', { detail: { enabled: next } })
      );
    }
    return next;
  }, []);

  const setSound = useCallback((enabled) => {
    const res = setSketchAudioEnabled(enabled);
    setIsSoundEnabled(res);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('sketch-sound-change', { detail: { enabled: res } })
      );
    }
    return res;
  }, []);

  const playSound = useCallback((type, volume) => {
    playSketchSound(type, volume);
  }, []);

  return {
    isSoundEnabled,
    toggleSound,
    setSoundEnabled: setSound,
    playSound
  };
}

export default useSketchSound;

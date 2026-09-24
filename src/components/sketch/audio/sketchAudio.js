/**
 * sketchAudio.js — Motor de Síntesis de Sonido Artesanal para BocetoUI
 *
 * Utiliza Web Audio API nativo con síntesis procedural acústica física:
 * - Cero dependencias y cero archivos de audio externos (0 KB de descargas).
 * - Cero latencia (< 3ms) y variaciones orgánicas aleatorias en cada trazo.
 * - Respeta las políticas de autoplay y persistencia en localStorage.
 */

let audioCtx = null;
let isAudioEnabled = false;

// Inicializar preferencia guardada
if (typeof window !== 'undefined') {
  try {
    isAudioEnabled = localStorage.getItem('boceto_sound_enabled') === 'true';
  } catch (e) {
    isAudioEnabled = false;
  }
}

/**
 * Obtiene o inicializa perezosamente el AudioContext tras la primera interacción del usuario.
 */
function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Generador procedural de buffer de Ruido Rosa (Pink Noise)
 * Emula la respuesta acústica del grano del papel y la fricción de materiales orgánicos.
 */
function createPinkNoiseBuffer(ctx, duration = 0.4) {
  const sampleRate = ctx.sampleRate;
  const bufferSize = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);

  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
    b6 = white * 0.115926;
  }
  return buffer;
}

// ============================================================================
// 1. SÍNTESIS DE EFECTOS ARTESANALES
// ============================================================================

/**
 * ✏️ Rasgado de Grafito sobre Papel (Pencil Stroke)
 * Sonido orgánico de lápiz escribiendo con ligera variación aleatoria de frecuencia.
 */
function synthesizePencil(ctx, volume = 0.22) {
  const t0 = ctx.currentTime;
  const duration = 0.075;
  const noise = ctx.createBufferSource();
  noise.buffer = createPinkNoiseBuffer(ctx, duration);

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  // Variación sutil de frecuencia para que cada trazo suene único
  filter.frequency.setValueAtTime(3200 + (Math.random() * 600 - 300), t0);
  filter.Q.setValueAtTime(1.9, t0);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(t0);
  noise.stop(t0 + duration);
}

/**
 * 🖊️ Destape de Marcador / Clic de Rotulador (Marker Pop)
 * Sonido percutivo elástico con caída rápida de tono.
 */
function synthesizeMarkerPop(ctx, volume = 0.24) {
  const t0 = ctx.currentTime;
  const duration = 0.06;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(540, t0);
  osc.frequency.exponentialRampToValueAtTime(120, t0 + duration);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(750, t0);
  filter.Q.setValueAtTime(3.5, t0);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(t0);
  osc.stop(t0 + duration);
}

/**
 * 📖 Paso de Hoja de Cuaderno (Paper Flip)
 * Susurro suave de papel al hojear o abrir un menú.
 */
function synthesizePaperFlip(ctx, volume = 0.18) {
  const t0 = ctx.currentTime;
  const duration = 0.14;

  const noise = ctx.createBufferSource();
  noise.buffer = createPinkNoiseBuffer(ctx, duration);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1600, t0);
  filter.frequency.exponentialRampToValueAtTime(350, t0 + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(t0);
  noise.stop(t0 + duration);
}

/**
 * 🖍️ Golpe Suave de Tiza sobre Pizarra (Chalk Tap)
 * Golpe aterciopelado con resonancia mate.
 */
function synthesizeChalk(ctx, volume = 0.20) {
  const t0 = ctx.currentTime;
  const duration = 0.07;

  // Cuerpo de impacto mate
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(130, t0);
  osc.frequency.exponentialRampToValueAtTime(45, t0 + duration);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(volume * 0.8, t0);
  oscGain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);

  // Polvillo de tiza (fricción de alta frecuencia)
  const noise = ctx.createBufferSource();
  noise.buffer = createPinkNoiseBuffer(ctx, duration);

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2600, t0);
  filter.Q.setValueAtTime(2.2, t0);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume * 0.45, t0);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  osc.start(t0);
  osc.stop(t0 + duration);
  noise.start(t0);
  noise.stop(t0 + duration);
}

/**
 * 🎲 Repiqueteo de Dados de Madera (Dice Roll)
 * 3 micro-impactos con resonancia de madera para el botón "¡Sorpréndeme!".
 */
function synthesizeDice(ctx, volume = 0.22) {
  const delays = [0, 0.045, 0.09];
  const pitches = [760, 920, 680];

  delays.forEach((delay, idx) => {
    const t = ctx.currentTime + delay;
    const dur = 0.035;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitches[idx] + (Math.random() * 60 - 30), t);

    const gain = ctx.createGain();
    const hitVol = volume * (idx === delays.length - 1 ? 1 : 0.7);
    gain.gain.setValueAtTime(hitVol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + dur);
  });
}

/**
 * ✏️ Rebote Alegre de Bocetín (Bocetín Squeak)
 * Tono elástico de caricatura cuando se pulsa la mascota.
 */
function synthesizeBocetin(ctx, volume = 0.20) {
  const t0 = ctx.currentTime;
  const duration = 0.13;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, t0);
  osc.frequency.exponentialRampToValueAtTime(680, t0 + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(t0);
  osc.stop(t0 + duration);
}

/**
 * 🧽 Goma de Borrar (Eraser Rub)
 * Fricción de borrador plástico sobre papel.
 */
function synthesizeEraser(ctx, volume = 0.18) {
  const t0 = ctx.currentTime;
  const duration = 0.09;

  const noise = ctx.createBufferSource();
  noise.buffer = createPinkNoiseBuffer(ctx, duration);

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(950, t0);
  filter.Q.setValueAtTime(1.5, t0);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(t0);
  noise.stop(t0 + duration);
}

// ============================================================================
// 2. API PÚBLICA DE AUDIO
// ============================================================================

export const sketchAudio = {
  /**
   * Consulta si el audio artesanal está activado.
   */
  isEnabled() {
    return isAudioEnabled;
  },

  /**
   * Activa o desactiva los efectos de sonido.
   * Guarda la preferencia en localStorage.
   */
  setEnabled(enabled) {
    isAudioEnabled = Boolean(enabled);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('boceto_sound_enabled', isAudioEnabled ? 'true' : 'false');
      } catch (e) {}
    }
    // Si se activa, reproducir de inmediato un sonido de bienvenida
    if (isAudioEnabled) {
      this.play('marker');
    }
    return isAudioEnabled;
  },

  /**
   * Alterna el estado de sonido.
   */
  toggle() {
    return this.setEnabled(!isAudioEnabled);
  },

  /**
   * Reproduce un efecto sonoro artesanal por nombre.
   * Tipos soportados: 'pencil' | 'marker' | 'paper' | 'chalk' | 'dice' | 'bocetin' | 'eraser'
   */
  play(soundType = 'marker', customVolume) {
    if (!isAudioEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      switch (soundType) {
        case 'pencil':
          synthesizePencil(ctx, customVolume);
          break;
        case 'marker':
        case 'click':
        case 'pop':
          synthesizeMarkerPop(ctx, customVolume);
          break;
        case 'paper':
        case 'flip':
        case 'page':
          synthesizePaperFlip(ctx, customVolume);
          break;
        case 'chalk':
          synthesizeChalk(ctx, customVolume);
          break;
        case 'dice':
          synthesizeDice(ctx, customVolume);
          break;
        case 'bocetin':
        case 'mascot':
          synthesizeBocetin(ctx, customVolume);
          break;
        case 'eraser':
          synthesizeEraser(ctx, customVolume);
          break;
        default:
          synthesizeMarkerPop(ctx, customVolume);
          break;
      }
    } catch (err) {
      // Ignorar de forma segura si el navegador bloquea el hilo de audio
    }
  }
};

/**
 * Función directa para disparar sonidos con comodidad.
 * @param {'pencil'|'marker'|'paper'|'chalk'|'dice'|'bocetin'|'eraser'} soundType
 */
export function playSketchSound(soundType = 'marker', customVolume) {
  sketchAudio.play(soundType, customVolume);
}

export function isSketchAudioEnabled() {
  return sketchAudio.isEnabled();
}

export function setSketchAudioEnabled(enabled) {
  return sketchAudio.setEnabled(enabled);
}

export default sketchAudio;

import React, { useRef, useState, useEffect, useCallback } from 'react';
import './SketchDoodleCanvas.css';
import {
  PenTool,
  Highlighter,
  Eraser,
  RotateCcw,
  Trash2,
  Download,
  Eye,
  Edit3,
  X,
  Sparkles
} from 'lucide-react';
import { SketchCloseButton } from '../actions/SketchCloseButton';
import { playSketchSound } from '../audio/sketchAudio';

/**
 * SketchDoodleCanvas — Capa de dibujo libre a mano alzada a 120 FPS.
 * Permite garabatear sobre la interfaz, resaltar textos, hacer flechas y círculos
 * con estuche flotante y passthrough para interactuar con la web.
 */
export function SketchDoodleCanvas({
  isOpen = false,
  onClose,
  canvasType = 'paper-grid',
  defaultLineStyle = 'solid',
  onTriggerToast
}) {
  const canvasRef = useRef(null);
  const strokesRef = useRef([]); // Historial de trazos [{ tool, color, width, opacity, composite, lineStyle, dash, points: [{x,y}] }]
  const redoStackRef = useRef([]); // Pila para rehacer trazos deshechos
  const currentStrokeRef = useRef(null);
  const lastSoundTimeRef = useRef(0);
  const [activeTool, setActiveTool] = useState('pencil');
  const [lineStyle, setLineStyle] = useState(defaultLineStyle); // 'solid' | 'dashed'
  const [isPassthrough, setIsPassthrough] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);

  const isDarkChalk = canvasType === 'paper-chalk';

  // Configuración de herramienta según la punta y el estilo de línea
  const getToolConfig = useCallback((toolId, style = lineStyle) => {
    let base = {};
    switch (toolId) {
      case 'red-pen':
        base = {
          color: '#dc2626',
          width: 3.2,
          opacity: 0.95,
          composite: 'source-over',
          cap: 'round'
        };
        break;
      case 'blue-pen':
        base = {
          color: '#2563eb',
          width: 3.2,
          opacity: 0.95,
          composite: 'source-over',
          cap: 'round'
        };
        break;
      case 'highlighter':
        base = {
          color: '#facc15',
          width: 22,
          opacity: 0.45,
          composite: 'source-over',
          cap: 'square'
        };
        break;
      case 'chalk':
        base = {
          color: isDarkChalk ? '#ffffff' : '#fef08a',
          width: 4.8,
          opacity: 0.88,
          composite: 'source-over',
          cap: 'round'
        };
        break;
      case 'eraser':
        base = {
          color: 'rgba(0,0,0,1)',
          width: 28,
          opacity: 1,
          composite: 'destination-out',
          cap: 'round'
        };
        break;
      case 'pencil':
      default:
        base = {
          color: isDarkChalk ? '#f8fafc' : '#23272f',
          width: 2.8,
          opacity: 0.9,
          composite: 'source-over',
          cap: 'round'
        };
        break;
    }

    const isDashed = style === 'dashed' && toolId !== 'eraser';
    // Patrón de guiones / puntos orgánicos:
    // Para el resaltador trazo largo [18, 10]; para lápices y rotuladores [8, 6]
    const dash = isDashed
      ? (toolId === 'highlighter' ? [18, 10] : [8, 6])
      : [];

    return {
      ...base,
      tool: toolId,
      lineStyle: isDashed ? 'dashed' : 'solid',
      dash
    };
  }, [isDarkChalk, lineStyle]);

  // Si se cambia a pizarra, sugerir tiza si está en lápiz negro
  useEffect(() => {
    if (isDarkChalk && activeTool === 'pencil') {
      setActiveTool('chalk');
    }
  }, [isDarkChalk]);

  // Dibuja un trazo individual con soporte para línea continua o punteada
  const drawSingleStroke = (ctx, stroke) => {
    const pts = stroke.points;
    if (!pts || pts.length === 0) return;

    ctx.save();
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.globalAlpha = stroke.opacity;
    ctx.globalCompositeOperation = stroke.composite || 'source-over';
    ctx.lineCap = stroke.cap || 'round';
    ctx.lineJoin = 'round';

    if (stroke.dash && stroke.dash.length > 0) {
      ctx.setLineDash(stroke.dash);
    } else {
      ctx.setLineDash([]);
    }

    if (pts.length === 1) {
      // Trazo de un solo punto / clic rápido
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, stroke.width / 2, 0, Math.PI * 2);
      ctx.fillStyle = stroke.color;
      ctx.fill();
    } else if (pts.length === 2) {
      // Conexión directa entre 2 puntos
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      ctx.lineTo(pts[1].x, pts[1].y);
      ctx.stroke();
    } else {
      // Curva Bezier cuadrática continua con cálculo continuo de guiones
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const midX = (pts[i].x + pts[i + 1].x) / 2;
        const midY = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
    }
    ctx.restore();
  };

  // Redibuja todos los trazos almacenados en memoria y opcionalmente el trazo activo en vivo
  const redrawAllStrokes = useCallback((extraStroke = null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Limpieza física completa del buffer independiente de escalados
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Dibujar trazos históricos consolidados
    strokesRef.current.forEach((stroke) => {
      drawSingleStroke(ctx, stroke);
    });

    // Dibujar trazo en curso en tiempo real
    if (extraStroke) {
      drawSingleStroke(ctx, extraStroke);
    }
  }, []);

  // Inicialización y redimensionado del canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      redrawAllStrokes();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawAllStrokes]);

  // Si se abre el lienzo, asegurar dimensiones y redibujar trazos
  useEffect(() => {
    if (isOpen) {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        redrawAllStrokes();
      }
    }
  }, [isOpen, redrawAllStrokes]);

  // Iniciar trazo (Pointer Down)
  const handlePointerDown = (e) => {
    if (isPassthrough || !isOpen) return;
    if (e.button !== 0) return; // Solo clic primario izquierdo
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (_) {}

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const config = getToolConfig(activeTool, lineStyle);
    const newStroke = {
      ...config,
      points: [{ x, y }]
    };
    currentStrokeRef.current = newStroke;

    playSketchSound(activeTool === 'eraser' ? 'eraser' : (canvasType === 'paper-chalk' ? 'chalk' : 'pencil'), 0.22);

    redrawAllStrokes(newStroke);
  };

  // Mover trazo continuo y fluido (Pointer Move) a 120 FPS
  const handlePointerMove = (e) => {
    if (!currentStrokeRef.current || isPassthrough || !isOpen) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const stroke = currentStrokeRef.current;
    const pts = stroke.points;
    const lastPt = pts[pts.length - 1];

    // Ignorar micro-movimientos para evitar agrupamientos de puntos (jitter < 2.5px)
    const distSq = (x - lastPt.x) ** 2 + (y - lastPt.y) ** 2;
    if (distSq < 6.25) return;

    pts.push({ x, y });

    // Efecto sonoro de trazo de grafito o tiza en tiempo real
    const now = Date.now();
    if (now - lastSoundTimeRef.current > 85) {
      lastSoundTimeRef.current = now;
      playSketchSound(activeTool === 'eraser' ? 'eraser' : (canvasType === 'paper-chalk' ? 'chalk' : 'pencil'), 0.16);
    }

    // Redibujado suave e instantáneo del trazo completo en vivo (sólido o punteado)
    redrawAllStrokes(stroke);
  };

  // Finalizar trazo al soltar el clic (Pointer Up)
  const handlePointerUp = (e) => {
    if (!currentStrokeRef.current) return;

    try {
      e?.target?.releasePointerCapture?.(e?.pointerId);
    } catch (_) {}

    const stroke = currentStrokeRef.current;
    currentStrokeRef.current = null;

    if (stroke && stroke.points.length > 0) {
      if (e && e.clientX !== undefined) {
        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const endX = e.clientX - rect.left;
          const endY = e.clientY - rect.top;
          const lastPt = stroke.points[stroke.points.length - 1];
          const distSq = (endX - lastPt.x) ** 2 + (endY - lastPt.y) ** 2;
          if (distSq >= 4) {
            stroke.points.push({ x: endX, y: endY });
          }
        }
      }

      // Guardar el trazo completo como UNA sola acción atómica exacta
      strokesRef.current.push(stroke);
      redoStackRef.current = []; // Toda acción nueva resetea la pila de rehacer
      setStrokeCount(strokesRef.current.length);

      // Consolidar trazo final
      redrawAllStrokes();
    }
  };

  // Deshacer última acción (Ctrl+Z o botón en estuche) con precisión exacta
  const handleUndo = useCallback(() => {
    if (strokesRef.current.length === 0) {
      // Si no hay trazos pero se había limpiado el lienzo, restaurar
      if (redoStackRef.current.length > 0) {
        strokesRef.current = [...redoStackRef.current];
        redoStackRef.current = [];
        setStrokeCount(strokesRef.current.length);
        redrawAllStrokes();
        onTriggerToast?.('Lienzo restaurado');
      }
      return;
    }

    const removedStroke = strokesRef.current.pop();
    if (removedStroke) {
      redoStackRef.current.push(removedStroke);
      setStrokeCount(strokesRef.current.length);
      redrawAllStrokes();
      onTriggerToast?.('Última acción deshecha (Ctrl+Z)');
    }
  }, [redrawAllStrokes, onTriggerToast]);

  // Rehacer acción (Ctrl+Shift+Z o Ctrl+Y)
  const handleRedo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;
    const restoredStroke = redoStackRef.current.pop();
    if (restoredStroke) {
      strokesRef.current.push(restoredStroke);
      setStrokeCount(strokesRef.current.length);
      redrawAllStrokes();
      onTriggerToast?.('Acción restaurada');
    }
  }, [redrawAllStrokes, onTriggerToast]);

  // Atajo de teclado Ctrl+Z / Cmd+Z para deshacer con precisión quirúrgica
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Ignorar si el usuario está escribiendo en campos de formulario
      const target = e.target;
      const isInput = target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      );
      if (isInput) return;

      const isZ = e.key.toLowerCase() === 'z';
      const isY = e.key.toLowerCase() === 'y';
      const isModifier = e.ctrlKey || e.metaKey;

      if (isModifier && isZ) {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if (isModifier && isY) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleUndo, handleRedo]);

  // Borrar todos los trazos (permite deshacer con Ctrl+Z)
  const handleClear = () => {
    if (strokesRef.current.length === 0) return;
    playSketchSound('eraser');
    redoStackRef.current = [...strokesRef.current];
    strokesRef.current = [];
    setStrokeCount(0);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
    onTriggerToast?.('Lienzo limpiado. Pulsa Deshacer (Ctrl+Z) si fue un error.');
  };

  // Exportar captura en PNG
  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas || strokesRef.current.length === 0) {
      onTriggerToast?.('Dibuja algún trazo antes de exportar');
      return;
    }

    const link = document.createElement('a');
    link.download = `garabato-boceto-ui-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onTriggerToast?.('¡Garabato descargado como imagen PNG!');
  };

  return (
    <>
      {/* Capa de Canvas */}
      <canvas
        ref={canvasRef}
        className={`sketch-doodle-canvas ${
          isOpen ? 'sketch-doodle-canvas--active' : ''
        } ${isPassthrough ? 'sketch-doodle-canvas--passthrough' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      {/* Píldora de aviso de Modo Passthrough */}
      {isOpen && isPassthrough && (
        <button
          type="button"
          className="sketch-doodle-passthrough-pill"
          onClick={() => setIsPassthrough(false)}
          title="Haz clic para volver a pintar"
        >
          <Eye size={18} />
          <span>Modo Navegación Activo — Clic aquí para volver a dibujar</span>
          <Edit3 size={16} />
        </button>
      )}

      {/* Estuche Flotante de Herramientas */}
      {isOpen && (
        <div className="sketch-doodle-toolbar" role="toolbar" aria-label="Estuche de dibujo">
          <div className="sketch-doodle-toolbar__tape" />

          {/* Grupo de Lápices y Rotuladores */}
          <div className="sketch-doodle-group">
            <button
              type="button"
              className={`sketch-doodle-btn ${activeTool === 'pencil' ? 'sketch-doodle-btn--active' : ''}`}
              onClick={() => { setActiveTool('pencil'); setIsPassthrough(false); }}
              title="Lápiz de Grafito"
            >
              <span className={`sketch-doodle-tip sketch-doodle-tip--graphite ${lineStyle === 'dashed' ? 'sketch-doodle-tip--dashed' : ''}`} />
              <span>Lápiz</span>
            </button>

            <button
              type="button"
              className={`sketch-doodle-btn ${activeTool === 'red-pen' ? 'sketch-doodle-btn--active' : ''}`}
              onClick={() => { setActiveTool('red-pen'); setIsPassthrough(false); }}
              title="Boli Rojo de Profesor"
            >
              <span className={`sketch-doodle-tip sketch-doodle-tip--red ${lineStyle === 'dashed' ? 'sketch-doodle-tip--dashed' : ''}`} />
              <span>Rojo</span>
            </button>

            <button
              type="button"
              className={`sketch-doodle-btn ${activeTool === 'blue-pen' ? 'sketch-doodle-btn--active' : ''}`}
              onClick={() => { setActiveTool('blue-pen'); setIsPassthrough(false); }}
              title="Rotulador Azul de Arquitecto"
            >
              <span className={`sketch-doodle-tip sketch-doodle-tip--blue ${lineStyle === 'dashed' ? 'sketch-doodle-tip--dashed' : ''}`} />
              <span>Azul</span>
            </button>

            <button
              type="button"
              className={`sketch-doodle-btn ${activeTool === 'highlighter' ? 'sketch-doodle-btn--active' : ''}`}
              onClick={() => { setActiveTool('highlighter'); setIsPassthrough(false); }}
              title="Resaltador Fluorescente"
            >
              <span className={`sketch-doodle-tip sketch-doodle-tip--highlighter ${lineStyle === 'dashed' ? 'sketch-doodle-tip--dashed' : ''}`} />
              <span>Resaltador</span>
            </button>

            <button
              type="button"
              className={`sketch-doodle-btn ${activeTool === 'chalk' ? 'sketch-doodle-btn--active' : ''}`}
              onClick={() => { setActiveTool('chalk'); setIsPassthrough(false); }}
              title="Tiza Suave"
            >
              <span className={`sketch-doodle-tip sketch-doodle-tip--chalk ${lineStyle === 'dashed' ? 'sketch-doodle-tip--dashed' : ''}`} />
              <span>Tiza</span>
            </button>
          </div>

          <div className="sketch-doodle-separator" />

          {/* Selector de Estilo de Trazo: Continuo (Sólido) vs Punteado (Guiones / Anotación) */}
          <div className="sketch-doodle-group sketch-doodle-style-group" role="radiogroup" aria-label="Estilo de trazo">
            <button
              type="button"
              className={`sketch-doodle-btn sketch-doodle-btn--style ${lineStyle === 'solid' ? 'sketch-doodle-btn--active' : ''}`}
              onClick={() => {
                setLineStyle('solid');
                setIsPassthrough(false);
                onTriggerToast?.('✏️ Trazo continuo activado');
              }}
              title="Trazo Continuo (Sólido)"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" className="sketch-doodle-line-icon">
                <line x1="1" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span>Continuo</span>
            </button>

            <button
              type="button"
              className={`sketch-doodle-btn sketch-doodle-btn--style ${lineStyle === 'dashed' ? 'sketch-doodle-btn--active' : ''}`}
              onClick={() => {
                setLineStyle('dashed');
                setIsPassthrough(false);
                onTriggerToast?.('✂️ Trazo Punteado activado (ideal para guías, flechas y recortes)');
              }}
              title="Trazo Punteado / Discontinuo con cualquier herramienta"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" className="sketch-doodle-line-icon">
                <line x1="1" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3.2 2.8" />
              </svg>
              <span>Punteado</span>
            </button>
          </div>

          <div className="sketch-doodle-separator" />

          {/* Goma de Borrar y Deshacer */}
          <div className="sketch-doodle-group">
            <button
              type="button"
              className={`sketch-doodle-btn ${activeTool === 'eraser' ? 'sketch-doodle-btn--active' : ''}`}
              onClick={() => { setActiveTool('eraser'); setIsPassthrough(false); }}
              title="Goma de Borrar"
            >
              <Eraser size={16} />
              <span>Goma</span>
            </button>

            <button
              type="button"
              className="sketch-doodle-btn"
              onClick={handleUndo}
              disabled={strokeCount === 0 && redoStackRef.current.length === 0}
              title="Deshacer última acción (Ctrl+Z)"
              style={{ opacity: (strokeCount === 0 && redoStackRef.current.length === 0) ? 0.4 : 1 }}
            >
              <RotateCcw size={15} />
              <span>Deshacer</span>
            </button>

            <button
              type="button"
              className="sketch-doodle-btn"
              onClick={handleClear}
              disabled={strokeCount === 0}
              title="Limpiar todo el lienzo"
              style={{ opacity: strokeCount === 0 ? 0.4 : 1 }}
            >
              <Trash2 size={15} color="#dc2626" />
            </button>
          </div>

          <div className="sketch-doodle-separator" />

          {/* Acciones Especiales: Passthrough, Exportar PNG y Cerrar */}
          <div className="sketch-doodle-group">
            <button
              type="button"
              className={`sketch-doodle-btn ${isPassthrough ? 'sketch-doodle-btn--active' : ''}`}
              onClick={() => setIsPassthrough(!isPassthrough)}
              title={isPassthrough ? "Volver a dibujar" : "Permitir hacer clic en los componentes mientras se ven los garabatos"}
            >
              <Eye size={16} />
              <span>{isPassthrough ? 'Interactuar (ON)' : 'Ver y Clic'}</span>
            </button>

            <button
              type="button"
              className="sketch-doodle-btn"
              onClick={handleExportPNG}
              disabled={strokeCount === 0}
              title="Descargar garabato en PNG transparente"
              style={{ opacity: strokeCount === 0 ? 0.4 : 1 }}
            >
              <Download size={15} />
            </button>

            <SketchCloseButton
              size="sm"
              variant="default"
              className="sketch-doodle-btn-close"
              onClick={onClose}
              title="Cerrar estuche de dibujo"
              ariaLabel="Cerrar estuche de dibujo"
              style={{ marginLeft: '4px' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SketchDoodleCanvas;

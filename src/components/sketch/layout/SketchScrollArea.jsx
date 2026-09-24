import React, { useRef, useState, useEffect, useCallback } from 'react';
import './SketchScrollArea.css';

/**
 * SketchScrollArea - Contenedor con barra de desplazamiento interactiva dibujada a mano.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido a desplazar
 * @param {string|number} [props.height] - Altura fija del contenedor
 * @param {string|number} [props.maxHeight] - Altura máxima (ej. 300, '400px')
 * @param {string|number} [props.width] - Ancho fijo
 * @param {string|number} [props.maxWidth] - Ancho máximo
 * @param {'vertical'|'horizontal'|'both'} [props.orientation='vertical'] - Dirección del scroll
 * @param {'graphite'|'wasi'|'ruler'|'pencil'} [props.variant='graphite'] - Estilo artesanal
 * @param {boolean} [props.showIndicators=true] - Muestra sombras/guías de desbordamiento (arriba/abajo)
 * @param {boolean} [props.showProgress=false] - Muestra badge flotante con porcentaje de avance
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {Object} [props.style] - Estilos en línea adicionales
 */
export function SketchScrollArea({
  children,
  height,
  maxHeight,
  width,
  maxWidth,
  orientation = 'vertical',
  variant = 'graphite',
  showIndicators = true,
  showProgress = false,
  className = '',
  style = {},
  ...props
}) {
  const viewportRef = useRef(null);
  const trackVRef = useRef(null);
  const trackHRef = useRef(null);

  // Estados de cálculo para Scroll Vertical
  const [thumbVHeight, setThumbVHeight] = useState(0);
  const [thumbVTop, setThumbVTop] = useState(0);
  const [hasScrollV, setHasScrollV] = useState(false);
  const [isDraggingV, setIsDraggingV] = useState(false);

  // Estados de cálculo para Scroll Horizontal
  const [thumbHWidth, setThumbHWidth] = useState(0);
  const [thumbHLeft, setThumbHLeft] = useState(0);
  const [hasScrollH, setHasScrollH] = useState(false);
  const [isDraggingH, setIsDraggingH] = useState(false);

  // Indicadores de desbordamiento y porcentaje
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  // Refs de arrastre
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  // Recalcular métricas
  const updateMetrics = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = el;

    // Métricas Verticales
    if (orientation === 'vertical' || orientation === 'both') {
      const scrollableHeight = scrollHeight - clientHeight;
      const canV = scrollableHeight > 2;
      setHasScrollV(canV);

      if (canV && trackVRef.current) {
        const trackHeight = trackVRef.current.clientHeight;
        const calculatedThumbH = Math.max(30, (clientHeight / scrollHeight) * trackHeight);
        const maxThumbTop = trackHeight - calculatedThumbH;
        const currentThumbTop = (scrollTop / scrollableHeight) * maxThumbTop;

        setThumbVHeight(calculatedThumbH);
        setThumbVTop(currentThumbTop);

        const percent = Math.min(100, Math.max(0, Math.round((scrollTop / scrollableHeight) * 100)));
        setProgressPercent(percent);
      } else {
        setThumbVHeight(0);
        setThumbVTop(0);
        setProgressPercent(0);
      }

      setCanScrollUp(scrollTop > 6);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 6);
    }

    // Métricas Horizontales
    if (orientation === 'horizontal' || orientation === 'both') {
      const scrollableWidth = scrollWidth - clientWidth;
      const canH = scrollableWidth > 2;
      setHasScrollH(canH);

      if (canH && trackHRef.current) {
        const trackWidth = trackHRef.current.clientWidth;
        const calculatedThumbW = Math.max(30, (clientWidth / scrollWidth) * trackWidth);
        const maxThumbLeft = trackWidth - calculatedThumbW;
        const currentThumbLeft = (scrollLeft / scrollableWidth) * maxThumbLeft;

        setThumbHWidth(calculatedThumbW);
        setThumbHLeft(currentThumbLeft);
      } else {
        setThumbHWidth(0);
        setThumbHLeft(0);
      }
    }
  }, [orientation]);

  // Listener del scroll interno
  const handleScroll = () => {
    updateMetrics();
  };

  // ResizeObserver para detectar cambios en el contenido o tamaño
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    updateMetrics();

    const resizeObserver = new ResizeObserver(() => {
      updateMetrics();
    });

    resizeObserver.observe(el);
    if (el.firstElementChild) {
      resizeObserver.observe(el.firstElementChild);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateMetrics, children]);

  // Arrastre Vertical (Drag)
  const handleThumbVMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingV(true);
    dragStartYRef.current = e.clientY;
    dragStartScrollTopRef.current = viewportRef.current?.scrollTop || 0;
  };

  // Arrastre Horizontal (Drag)
  const handleThumbHMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingH(true);
    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = viewportRef.current?.scrollLeft || 0;
  };

  // Eventos globales de mouse para arrastre suave
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingV && viewportRef.current && trackVRef.current) {
        const deltaY = e.clientY - dragStartYRef.current;
        const trackHeight = trackVRef.current.clientHeight;
        const scrollableTrack = trackHeight - thumbVHeight;
        const { scrollHeight, clientHeight } = viewportRef.current;
        const scrollableContent = scrollHeight - clientHeight;

        if (scrollableTrack > 0) {
          const scrollFactor = scrollableContent / scrollableTrack;
          viewportRef.current.scrollTop = dragStartScrollTopRef.current + deltaY * scrollFactor;
        }
      }

      if (isDraggingH && viewportRef.current && trackHRef.current) {
        const deltaX = e.clientX - dragStartXRef.current;
        const trackWidth = trackHRef.current.clientWidth;
        const scrollableTrack = trackWidth - thumbHWidth;
        const { scrollWidth, clientWidth } = viewportRef.current;
        const scrollableContent = scrollWidth - clientWidth;

        if (scrollableTrack > 0) {
          const scrollFactor = scrollableContent / scrollableTrack;
          viewportRef.current.scrollLeft = dragStartScrollLeftRef.current + deltaX * scrollFactor;
        }
      }
    };

    const handleMouseUp = () => {
      if (isDraggingV) setIsDraggingV(false);
      if (isDraggingH) setIsDraggingH(false);
    };

    if (isDraggingV || isDraggingH) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDraggingV, isDraggingH, thumbVHeight, thumbHWidth]);

  // Clic en el track vertical para saltar
  const handleTrackVClick = (e) => {
    if (!viewportRef.current || !trackVRef.current) return;
    const rect = trackVRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const { scrollHeight, clientHeight } = viewportRef.current;
    const targetScrollTop = (clickY / trackHeight) * (scrollHeight - clientHeight);
    viewportRef.current.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
  };

  // Clic en el track horizontal para saltar
  const handleTrackHClick = (e) => {
    if (!viewportRef.current || !trackHRef.current) return;
    const rect = trackHRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const trackWidth = rect.width;
    const { scrollWidth, clientWidth } = viewportRef.current;
    const targetScrollLeft = (clickX / trackWidth) * (scrollWidth - clientWidth);
    viewportRef.current.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
  };

  // Estilos del contenedor
  const containerStyle = {
    height: typeof height === 'number' ? `${height}px` : height,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    width: typeof width === 'number' ? `${width}px` : width,
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    ...style
  };

  return (
    <div
      className={`sketch-scroll-area sketch-scroll-area--${variant} ${className}`}
      style={containerStyle}
      {...props}
    >
      {/* Indicador de más contenido arriba */}
      {showIndicators && hasScrollV && (
        <div className={`sketch-scroll-indicator-top ${canScrollUp ? 'is-visible' : ''}`} aria-hidden="true">
          ▲ Más arriba
        </div>
      )}

      {/* Badge flotante de porcentaje de avance */}
      {showProgress && hasScrollV && (
        <div className="sketch-scroll-progress-badge" aria-hidden="true">
          ✏️ {progressPercent}%
        </div>
      )}

      {/* Viewport de scroll interactivo */}
      <div
        ref={viewportRef}
        className="sketch-scroll-viewport"
        onScroll={handleScroll}
      >
        <div className="sketch-scroll-content">
          {children}
        </div>
      </div>

      {/* Indicador de más contenido abajo */}
      {showIndicators && hasScrollV && (
        <div className={`sketch-scroll-indicator-bottom ${canScrollDown ? 'is-visible' : ''}`} aria-hidden="true">
          ▼ Continúa abajo
        </div>
      )}

      {/* Carril y Deslizador Vertical */}
      {(orientation === 'vertical' || orientation === 'both') && hasScrollV && (
        <div
          ref={trackVRef}
          className="sketch-scroll-track-v"
          onClick={handleTrackVClick}
          aria-hidden="true"
        >
          <div
            className={`sketch-scroll-thumb-v ${isDraggingV ? 'is-dragging' : ''}`}
            style={{
              height: `${thumbVHeight}px`,
              transform: `translateY(${thumbVTop}px)`
            }}
            onMouseDown={handleThumbVMouseDown}
          />
        </div>
      )}

      {/* Carril y Deslizador Horizontal */}
      {(orientation === 'horizontal' || orientation === 'both') && hasScrollH && (
        <div
          ref={trackHRef}
          className="sketch-scroll-track-h"
          onClick={handleTrackHClick}
          aria-hidden="true"
        >
          <div
            className={`sketch-scroll-thumb-h ${isDraggingH ? 'is-dragging' : ''}`}
            style={{
              width: `${thumbHWidth}px`,
              transform: `translateX(${thumbHLeft}px)`
            }}
            onMouseDown={handleThumbHMouseDown}
          />
        </div>
      )}
    </div>
  );
}

export default SketchScrollArea;

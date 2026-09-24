import React, { useState, useRef } from 'react';
import './SketchChartShared.css';
import './SketchLineChart.css';
import { generateSmoothLinePath, formatChartValue } from './chartUtils';

export function SketchLineChart({
  data = [],
  series = [{ key: 'value', name: 'Métrica', color: '#0284c7' }],
  title,
  subtitle,
  height = 260,
  showArea = true,
  showDots = true,
  showGrid = true,
  unit = '',
  className = '',
  onPointClick
}) {
  const [activeIdx, setActiveIdx] = useState(null);
  const containerRef = useRef(null);

  if (!data || data.length === 0) {
    return <div className="sketch-chart-empty">No hay datos para graficar</div>;
  }

  const svgWidth = 560;
  const svgHeight = height;
  const padding = { top: 30, right: 25, bottom: 40, left: 45 };

  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Cálculo de valores extremos en todas las series
  let allVals = [];
  series.forEach((s) => {
    data.forEach((d) => {
      if (typeof d[s.key] === 'number') allVals.push(d[s.key]);
    });
  });
  if (allVals.length === 0) allVals = [0, 10];

  const maxVal = Math.max(...allVals);
  const minVal = Math.min(...allVals, 0);
  const niceMax = Math.ceil(maxVal * 1.12) || 10;
  const range = niceMax - minVal || 1;

  // Ticks de la retícula Y
  const numGridLines = 4;
  const gridTicks = Array.from({ length: numGridLines + 1 }, (_, i) => {
    const val = minVal + (range / numGridLines) * i;
    const y = padding.top + plotHeight - ((val - minVal) / range) * plotHeight;
    return { val: Math.round(val), y };
  });

  // Puntos X para cada categoría
  const stepX = data.length > 1 ? plotWidth / (data.length - 1) : plotWidth;
  const xCoords = data.map((_, i) => padding.left + i * stepX);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const relativeX = (mouseX / rect.width) * svgWidth;

    let closestIdx = 0;
    let minDiff = Infinity;
    xCoords.forEach((x, idx) => {
      const diff = Math.abs(relativeX - x);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    if (minDiff < stepX * 1.2) {
      setActiveIdx(closestIdx);
    } else {
      setActiveIdx(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`sketch-chart-container sketch-line-chart ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveIdx(null)}
    >
      {(title || subtitle) && (
        <div className="sketch-chart-header">
          {title && <span className="sketch-chart-title">{title}</span>}
          {subtitle && <span className="sketch-chart-subtitle">{subtitle}</span>}
        </div>
      )}

      {/* Tooltip Dinámico */}
      {activeIdx !== null && data[activeIdx] && (
        <div
          className="sketch-chart-tooltip"
          style={{
            left: `${(xCoords[activeIdx] / svgWidth) * 100}%`,
            top: '24px'
          }}
        >
          <span className="sketch-chart-tooltip__label">{data[activeIdx].label}</span>
          {series.map((s) => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: s.color }} />
              <span style={{ fontSize: '0.82rem', color: '#52525b' }}>{s.name}:</span>
              <span className="sketch-chart-tooltip__value">
                {formatChartValue(data[activeIdx][s.key], unit)}
              </span>
            </div>
          ))}
        </div>
      )}

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="sketch-chart-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {series.map((s, idx) => (
            <linearGradient key={idx} id={`sketch-line-grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.02" />
            </linearGradient>
          ))}
        </defs>

        {/* Retícula */}
        {showGrid &&
          gridTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={padding.left}
                y1={tick.y}
                x2={svgWidth - padding.right}
                y2={tick.y}
                className="sketch-chart-grid-line"
              />
              <text x={padding.left - 8} y={tick.y + 4} textAnchor="end" className="sketch-chart-tick-text">
                {formatChartValue(tick.val)}
              </text>
            </g>
          ))}

        {/* Eje X */}
        <line
          x1={padding.left - 4}
          y1={padding.top + plotHeight}
          x2={svgWidth - padding.right + 6}
          y2={padding.top + plotHeight}
          className="sketch-chart-axis-line"
        />

        {/* Línea vertical de seguimiento (Crosshair) */}
        {activeIdx !== null && (
          <line
            x1={xCoords[activeIdx]}
            y1={padding.top}
            x2={xCoords[activeIdx]}
            y2={padding.top + plotHeight}
            stroke="#18181b"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
        )}

        {/* Renderizado de Series */}
        {series.map((s, sIdx) => {
          const points = data.map((d, i) => {
            const val = typeof d[s.key] === 'number' ? d[s.key] : minVal;
            const y = padding.top + plotHeight - ((val - minVal) / range) * plotHeight;
            return { x: xCoords[i], y, val };
          });

          const linePath = generateSmoothLinePath(points);
          const firstX = points[0].x;
          const lastX = points[points.length - 1].x;
          const baseY = padding.top + plotHeight;
          const areaPath = `${linePath} L ${lastX},${baseY} L ${firstX},${baseY} Z`;

          return (
            <g key={s.key} className="sketch-line-series">
              {showArea && (
                <path d={areaPath} fill={`url(#sketch-line-grad-${sIdx})`} pointerEvents="none" />
              )}

              {/* Sombra de tinta de la línea */}
              <path
                d={linePath}
                fill="none"
                stroke="#18181b"
                strokeWidth="4"
                strokeLinecap="round"
                transform="translate(1.5, 2)"
                opacity="0.4"
              />

              {/* Línea principal trazada a mano */}
              <path
                d={linePath}
                fill="none"
                stroke={s.color}
                strokeWidth="3.2"
                strokeLinecap="round"
                className="sketch-line-path"
              />

              {/* Puntos de datos */}
              {showDots &&
                points.map((pt, pIdx) => {
                  const isActive = activeIdx === pIdx;
                  return (
                    <g
                      key={pIdx}
                      className={`sketch-line-dot-group ${isActive ? 'sketch-line-dot--active' : ''}`}
                      onClick={() => onPointClick?.(data[pIdx], s)}
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isActive ? 6.5 : 4}
                        fill="#ffffff"
                        stroke="#18181b"
                        strokeWidth="2.5"
                        style={{ cursor: 'pointer' }}
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isActive ? 3.5 : 2}
                        fill={s.color}
                        pointerEvents="none"
                      />
                    </g>
                  );
                })}
            </g>
          );
        })}

        {/* Etiquetas de categoría Eje X */}
        {data.map((d, i) => (
          <text
            key={i}
            x={xCoords[i]}
            y={padding.top + plotHeight + 22}
            textAnchor="middle"
            className={`sketch-chart-tick-text ${activeIdx === i ? 'sketch-line-label--active' : ''}`}
          >
            {d.label}
          </text>
        ))}
      </svg>

      {/* Leyenda de Series */}
      {series.length > 1 && (
        <div className="sketch-chart-legend">
          {series.map((s) => (
            <div key={s.key} className="sketch-chart-legend__item">
              <span className="sketch-chart-legend__color" style={{ background: s.color }} />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SketchLineChart;

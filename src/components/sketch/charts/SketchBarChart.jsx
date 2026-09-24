import React, { useState } from 'react';
import './SketchChartShared.css';
import './SketchBarChart.css';
import { generateWobblyRect, formatChartValue } from './chartUtils';

const DEFAULT_COLORS = ['#fef08a', '#bfdbfe', '#bbf7d0', '#fbcfe8', '#fed7aa', '#ddd6fe'];

export function SketchBarChart({
  data = [],
  title,
  subtitle,
  height = 240,
  variant = 'solid',
  unit = '',
  showGrid = true,
  className = '',
  onBarClick
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  if (!data || data.length === 0) {
    return <div className="sketch-chart-empty">No hay datos para mostrar</div>;
  }

  const svgWidth = 500;
  const svgHeight = height;
  const padding = { top: 25, right: 20, bottom: 35, left: 45 };

  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const rawValues = data.map((d) => d.value || 0);
  const maxVal = Math.max(...rawValues, 10);
  const niceMax = Math.ceil(maxVal * 1.15);

  const numGridLines = 4;
  const gridTicks = Array.from({ length: numGridLines + 1 }, (_, i) => {
    const val = (niceMax / numGridLines) * i;
    const y = padding.top + plotHeight - (val / niceMax) * plotHeight;
    return { val: Math.round(val), y };
  });

  const barCount = data.length;
  const slotWidth = plotWidth / barCount;
  const barWidth = Math.min(slotWidth * 0.68, 54);

  return (
    <div className={`sketch-chart-container sketch-bar-chart ${className}`}>
      {(title || subtitle) && (
        <div className="sketch-chart-header">
          {title && <span className="sketch-chart-title">{title}</span>}
          {subtitle && <span className="sketch-chart-subtitle">{subtitle}</span>}
        </div>
      )}

      {/* Tooltip Flotante */}
      {hoveredIdx !== null && data[hoveredIdx] && (
        <div
          className="sketch-chart-tooltip"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <span className="sketch-chart-tooltip__label">{data[hoveredIdx].label}</span>
          <span className="sketch-chart-tooltip__value">
            {formatChartValue(data[hoveredIdx].value, unit)}
          </span>
        </div>
      )}

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="sketch-chart-svg"
        preserveAspectRatio="xMidYMid meet"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <defs>
          {/* Patrón de Tramado Diagonal (Ink Hatching) */}
          <pattern id="sketch-hatch-pattern" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#18181b" strokeWidth="1.5" />
          </pattern>
        </defs>

        {/* Retícula Horizontal */}
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
              <text
                x={padding.left - 8}
                y={tick.y + 4}
                textAnchor="end"
                className="sketch-chart-tick-text"
              >
                {formatChartValue(tick.val)}
              </text>
            </g>
          ))}

        {/* Eje X artesanal */}
        <line
          x1={padding.left - 4}
          y1={padding.top + plotHeight}
          x2={svgWidth - padding.right + 6}
          y2={padding.top + plotHeight}
          className="sketch-chart-axis-line"
        />

        {/* Renderizado de Barras */}
        {data.map((item, idx) => {
          const val = item.value || 0;
          const barHeight = Math.max((val / niceMax) * plotHeight, 4);
          const x = padding.left + idx * slotWidth + (slotWidth - barWidth) / 2;
          const y = padding.top + plotHeight - barHeight;
          const color = item.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
          const isHovered = hoveredIdx === idx;

          const barPath = generateWobblyRect(x, y, barWidth, barHeight);
          const shadowPath = generateWobblyRect(x + 3, y + 3, barWidth, barHeight);

          return (
            <g
              key={idx}
              className={`sketch-bar-item ${isHovered ? 'sketch-bar-item--active' : ''}`}
              onMouseEnter={(e) => {
                setHoveredIdx(idx);
                const rect = e.currentTarget.getBoundingClientRect();
                const parentRect = e.currentTarget.closest('.sketch-chart-container')?.getBoundingClientRect();
                if (parentRect) {
                  setTooltipPos({
                    x: rect.left + rect.width / 2 - parentRect.left,
                    y: rect.top - parentRect.top - 6
                  });
                }
              }}
              onClick={() => onBarClick?.(item, idx)}
            >
              {/* Sombra de tinta dura */}
              <path d={shadowPath} fill="#18181b" opacity="0.85" />

              {/* Relleno de Barra (Color o Tramado) */}
              <path
                d={barPath}
                fill={variant === 'hatch' ? color : color}
                stroke="#18181b"
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="sketch-bar-surface"
              />

              {variant === 'hatch' && (
                <path d={barPath} fill="url(#sketch-hatch-pattern)" opacity="0.35" pointerEvents="none" />
              )}

              {/* Cifra flotante en hover */}
              {isHovered && (
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  className="sketch-bar-active-text"
                >
                  {formatChartValue(val, unit)}
                </text>
              )}

              {/* Etiqueta Eje X */}
              <text
                x={x + barWidth / 2}
                y={padding.top + plotHeight + 20}
                textAnchor="middle"
                className={`sketch-chart-tick-text ${isHovered ? 'sketch-bar-label--active' : ''}`}
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default SketchBarChart;

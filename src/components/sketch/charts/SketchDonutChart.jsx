import React, { useState } from 'react';
import './SketchChartShared.css';
import './SketchDonutChart.css';
import { describeArcSegment, formatChartValue } from './chartUtils';

const DEFAULT_DONUT_COLORS = [
  '#fef08a', '#bfdbfe', '#bbf7d0', '#fbcfe8', '#fed7aa', '#ddd6fe', '#cbd5e1'
];

export function SketchDonutChart({
  data = [],
  title,
  subtitle,
  size = 190,
  innerRadiusRatio = 0.58,
  unit = '',
  centerLabel,
  centerValue,
  showLegend = true,
  className = '',
  onSliceClick
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) {
    return <div className="sketch-chart-empty">No hay datos circulares</div>;
  }

  const total = data.reduce((acc, d) => acc + (d.value || 0), 0) || 1;
  const outerRadius = size / 2 - 12;
  const innerRadius = outerRadius * innerRadiusRatio;
  const center = size / 2;

  // Cálculo de ángulos acumulados para cada rebanada
  let currentAngle = 0;
  const slices = data.map((item, idx) => {
    const val = item.value || 0;
    const sliceAngle = (val / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + Math.max(sliceAngle - 1.5, 0.5); // gap artesanal
    currentAngle += sliceAngle;

    const midAngle = startAngle + sliceAngle / 2;
    const rad = ((midAngle - 90) * Math.PI) / 180;
    // Vector de desplazamiento elástico hacia afuera (Explode)
    const explodeDistance = 6;
    const dx = Math.cos(rad) * explodeDistance;
    const dy = Math.sin(rad) * explodeDistance;

    const color = item.color || DEFAULT_DONUT_COLORS[idx % DEFAULT_DONUT_COLORS.length];
    const pathD = describeArcSegment(center, center, innerRadius, outerRadius, startAngle, endAngle);

    return {
      ...item,
      startAngle,
      endAngle,
      midAngle,
      dx,
      dy,
      color,
      pathD,
      percentage: ((val / total) * 100).toFixed(1)
    };
  });

  const activeSlice = hoveredIdx !== null ? slices[hoveredIdx] : null;

  return (
    <div className={`sketch-chart-container sketch-donut-chart ${className}`}>
      {(title || subtitle) && (
        <div className="sketch-chart-header">
          {title && <span className="sketch-chart-title">{title}</span>}
          {subtitle && <span className="sketch-chart-subtitle">{subtitle}</span>}
        </div>
      )}

      <div className="sketch-donut-wrapper">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          className="sketch-chart-svg sketch-donut-svg"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <g>
            {slices.map((slice, idx) => {
              const isHovered = hoveredIdx === idx;
              const transform = isHovered
                ? `translate(${slice.dx.toFixed(1)}, ${slice.dy.toFixed(1)})`
                : 'translate(0, 0)';

              return (
                <g
                  key={idx}
                  className={`sketch-donut-slice ${isHovered ? 'sketch-donut-slice--active' : ''}`}
                  transform={transform}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onClick={() => onSliceClick?.(slice, idx)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Sombra de tinta */}
                  <path
                    d={slice.pathD}
                    fill="#18181b"
                    opacity="0.3"
                    transform="translate(2, 3)"
                  />
                  {/* Sector principal */}
                  <path
                    d={slice.pathD}
                    fill={slice.color}
                    stroke="#18181b"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    className="sketch-donut-path"
                  />
                </g>
              );
            })}
          </g>

          {/* Centro Dinámico de la Dona */}
          <g className="sketch-donut-center" pointerEvents="none">
            <text
              x={center}
              y={center - 2}
              textAnchor="middle"
              className="sketch-donut-center-value"
            >
              {activeSlice
                ? formatChartValue(activeSlice.value, unit)
                : (centerValue ? formatChartValue(centerValue, unit) : formatChartValue(total, unit))}
            </text>
            <text
              x={center}
              y={center + 13}
              textAnchor="middle"
              className="sketch-donut-center-label"
            >
              {activeSlice ? `${activeSlice.label} (${activeSlice.percentage}%)` : (centerLabel || 'Total')}
            </text>
          </g>
        </svg>
      </div>

      {/* Leyenda */}
      {showLegend && (
        <div className="sketch-chart-legend">
          {slices.map((slice, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                className={`sketch-chart-legend__item ${isHovered ? 'sketch-chart-legend__item--active' : ''}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span className="sketch-chart-legend__color" style={{ background: slice.color }} />
                <span>{slice.label}</span>
                <span className="sketch-chart-legend__pct">({slice.percentage}%)</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SketchDonutChart;

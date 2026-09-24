import React from 'react';
import './SketchStatCard.css';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * SketchStatCard - Tarjeta de KPI y estadísticas con sparkline artesanal
 * @param {string} title - Título de la métrica (ej. "Ingresos Totales")
 * @param {string|number} value - Cifra destacada (ej. "$48,920")
 * @param {string} change - Variación porcentual (ej. "+14.8%")
 * @param {string} trend - 'up' | 'down' | 'neutral'
 * @param {string} subtitle - Texto explicativo (ej. "vs. mes anterior")
 * @param {ReactNode} icon - Icono en la esquina superior
 * @param {Array<number>} sparklineData - Puntos para la gráfica de tendencia
 */
export function SketchStatCard({
  title,
  value,
  change,
  trend = 'up',
  subtitle,
  icon,
  sparklineData = [12, 18, 14, 25, 22, 38, 34, 48],
  className = '',
  ...props
}) {
  // Cálculo de coordenadas SVG para el Sparkline
  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length < 2) return null;

    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min || 1;

    const points = sparklineData.map((val, idx) => {
      const x = 4 + (idx / (sparklineData.length - 1)) * 92;
      const y = 36 - ((val - min) / range) * 28;
      return { x, y };
    });

    const linePath = points.reduce(
      (acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`,
      ''
    );

    const firstPt = points[0];
    const lastPt = points[points.length - 1];
    const areaPath = `${linePath} L ${lastPt.x.toFixed(1)},40 L ${firstPt.x.toFixed(1)},40 Z`;

    const isTrendUp = trend === 'up';
    const isTrendDown = trend === 'down';
    const strokeColor = isTrendUp ? '#16a34a' : isTrendDown ? '#dc2626' : '#0284c7';
    const areaColor = isTrendUp
      ? 'rgba(22, 163, 74, 0.15)'
      : isTrendDown
      ? 'rgba(220, 38, 38, 0.15)'
      : 'rgba(2, 132, 199, 0.12)';

    return (
      <div className="sketch-stat-card__sparkline-wrap">
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="sketch-stat-card__sparkline"
          aria-hidden="true"
        >
          {/* Relleno translúcido del área */}
          <path d={areaPath} fill={areaColor} />
          {/* Trazo continuo a mano */}
          <path
            d={linePath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Nodo final de pulso */}
          <circle
            cx={lastPt.x}
            cy={lastPt.y}
            r="3"
            fill="#ffffff"
            stroke={strokeColor}
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  };

  return (
    <article className={`sketch-stat-card ${className}`} {...props}>
      <header className="sketch-stat-card__header">
        <span className="sketch-stat-card__title">{title}</span>
        {icon && <div className="sketch-stat-card__icon-wrap">{icon}</div>}
      </header>

      <div className="sketch-stat-card__body">
        <span className="sketch-stat-card__value">{value}</span>
        {change && (
          <span className={`sketch-stat-card__trend sketch-stat-card__trend--${trend}`}>
            {trend === 'up' && <TrendingUp size={14} />}
            {trend === 'down' && <TrendingDown size={14} />}
            {trend === 'neutral' && <Minus size={14} />}
            <span>{change}</span>
            <span className="sketch-stat-card__exclamation">
              {trend === 'up' ? '¡Genial!' : trend === 'down' ? '¡Atento!' : ''}
            </span>
          </span>
        )}
      </div>

      {renderSparkline()}

      {subtitle && <footer className="sketch-stat-card__footer">{subtitle}</footer>}
    </article>
  );
}

export default SketchStatCard;

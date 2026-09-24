/**
 * chartUtils.js — Utilidades matemáticas y generadores de trazos para gráficas BocetoUI
 */

// Genera un rectángulo con bordes irregulares dibujados a mano
export function generateWobblyRect(x, y, w, h, offset = 1.8) {
  if (w <= 0 || h <= 0) return '';
  const rnd = (seed) => ((Math.sin(seed * 999) + 1) / 2) * offset;

  const x0 = x + rnd(x * 1);
  const y0 = y + rnd(y * 1.5);
  const x1 = x + w - rnd(x * 2);
  const y1 = y + rnd(y * 2.5);
  const x2 = x + w - rnd(x * 3);
  const y2 = y + h - rnd(y * 3.5);
  const x3 = x + rnd(x * 4);
  const y3 = y + h - rnd(y * 4.5);

  return `M ${x0.toFixed(1)},${y0.toFixed(1)} ` +
         `L ${x1.toFixed(1)},${y1.toFixed(1)} ` +
         `L ${x2.toFixed(1)},${y2.toFixed(1)} ` +
         `L ${x3.toFixed(1)},${y3.toFixed(1)} Z`;
}

// Convierte coordenadas polares a cartesianas para gráficas circulares
export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

// Construye el path SVG de un segmento de arco (para Donut / Pie)
export function describeArcSegment(x, y, innerRadius, outerRadius, startAngle, endAngle) {
  const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
  const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
  const startInner = polarToCartesian(x, y, innerRadius, startAngle);
  const endInner = polarToCartesian(x, y, innerRadius, endAngle);

  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    `M ${startOuter.x.toFixed(1)} ${startOuter.y.toFixed(1)}`,
    `A ${outerRadius} ${outerRadius} 0 ${arcSweep} 0 ${endOuter.x.toFixed(1)} ${endOuter.y.toFixed(1)}`,
    `L ${startInner.x.toFixed(1)} ${startInner.y.toFixed(1)}`,
    `A ${innerRadius} ${innerRadius} 0 ${arcSweep} 1 ${endInner.x.toFixed(1)} ${endInner.y.toFixed(1)}`,
    'Z'
  ].join(' ');
}

// Genera una curva suave Bézier para líneas de tendencia
export function generateSmoothLinePath(points) {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

  let d = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

// Formateador estándar de cifras
export function formatChartValue(val, unit = '') {
  if (typeof val !== 'number') return `${val}${unit ? ` ${unit}` : ''}`;
  if (Math.abs(val) >= 1000000) return `${(val / 1000000).toFixed(1)}M${unit ? ` ${unit}` : ''}`;
  if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(1)}k${unit ? ` ${unit}` : ''}`;
  return `${val}${unit ? ` ${unit}` : ''}`;
}

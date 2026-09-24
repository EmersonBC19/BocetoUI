import React from 'react';

/**
 * Iconos de Boceto con estética de dibujo a mano artesanal
 * Trazos irregulares, extremos redondeados y filtro de tinta.
 */

const baseIconStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  overflow: 'visible'
};

export function SketchGridIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon ${className}`}
    >
      {/* Marco exterior con esquinas cruzadas */}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      {/* Líneas de cuadrícula internas */}
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}

export function SketchNotebookIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon ${className}`}
    >
      <rect x="5" y="3" width="15" height="18" rx="2" />
      {/* Renglones */}
      <line x1="9" y1="8" x2="16" y2="8" />
      <line x1="9" y1="12" x2="16" y2="12" />
      <line x1="9" y1="16" x2="14" y2="16" />
      {/* Anillas laterales */}
      <path d="M3 6h3 M3 10h3 M3 14h3 M3 18h3" />
    </svg>
  );
}

export function SketchPaperIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon ${className}`}
    >
      {/* Hoja con esquina doblada */}
      <path d="M4 4v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9l-5-5H5a1 1 0 0 0-1 1z" />
      <polyline points="14 4 14 9 19 9" />
    </svg>
  );
}

export function SketchChalkboardIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon ${className}`}
    >
      {/* Pizarra con marco y base */}
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="2" y1="16" x2="22" y2="16" strokeWidth="2.5" />
      <line x1="7" y1="16" x2="5" y2="21" />
      <line x1="17" y1="16" x2="19" y2="21" />
    </svg>
  );
}

export function SketchPinIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon ${className}`}
    >
      <path d="M12 2v5" />
      <ellipse cx="12" cy="7" rx="5" ry="3" />
      <path d="M9 10l-1 5h8l-1-5" />
      <line x1="12" y1="15" x2="12" y2="22" strokeWidth="2.4" />
    </svg>
  );
}

export function SketchCheckIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon ${className}`}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function SketchCloseIcon({ size = 18, color = 'currentColor', strokeWidth = 2.8, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon sketch-icon--close ${className}`}
    >
      {/* Trazo 1: Diagonal descendente dibujada a mano con suave curvatura */}
      <path d="M18.2 5.8 C14.6 9.4 9.5 14.5 5.8 18.2" />
      {/* Trazo 2: Diagonal ascendente cruzada con leve sobregiro artesanal */}
      <path d="M5.9 6.1 C9.6 9.7 14.4 14.3 18.1 18" />
    </svg>
  );
}

export function SketchAlertIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon ${className}`}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <circle cx="12" cy="17" r="1" fill={color} />
    </svg>
  );
}

export function SketchLightbulbIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon ${className}`}
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
    </svg>
  );
}

export function SketchSparkleIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon ${className}`}
    >
      <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />
    </svg>
  );
}

export function SketchPencilIcon({ size = 18, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={baseIconStyle}
      className={`sketch-icon ${className}`}
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

import React from 'react';

const SIZE_MAP = {
  xs: 24,
  sm: 32,
  md: 42,
  lg: 56,
  xl: 72
};

export function SketchIsotype({
  size = 'md',
  color = '#fef08a',
  stroke = '#18181b',
  sparkle = true,
  className = '',
  style = {}
}) {
  const dimension = typeof size === 'number' ? size : (SIZE_MAP[size] || 42);

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`sketch-isotype ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        overflow: 'visible',
        filter: 'drop-shadow(2px 2.5px 0px #18181b)',
        ...style
      }}
      aria-label="Isotipo BocetoUI"
      role="img"
    >
      {/* Sombra de tinta offset */}
      <path
        d="M 16 16 C 14 12, 20 8, 28 9 C 52 7, 74 9, 86 11 C 90 12, 93 16, 92 22 C 93 46, 91 72, 90 82 C 89 87, 85 89, 78 88 C 52 89, 28 88, 18 86 C 13 85, 12 81, 13 74 Z"
        fill="#18181b"
        transform="translate(3, 4)"
      />

      {/* Cuadrante / Papel de Boceto con borde wobbly artesanal */}
      <path
        d="M 16 16 C 14 12, 20 8, 28 9 C 52 7, 74 9, 86 11 C 90 12, 93 16, 92 22 C 93 46, 91 72, 90 82 C 89 87, 85 89, 78 88 C 52 89, 28 88, 18 86 C 13 85, 12 81, 13 74 Z"
        fill={color}
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Textura de cuaderno rayado tenue interna */}
      <line x1="22" y1="36" x2="82" y2="35" stroke="rgba(24, 24, 27, 0.12)" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="22" y1="52" x2="82" y2="51" stroke="rgba(24, 24, 27, 0.12)" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="22" y1="68" x2="82" y2="67" stroke="rgba(24, 24, 27, 0.12)" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Lápiz / Pincel que forma la columna vertebral de la 'B' */}
      <g>
        {/* Cuerpo del lápiz */}
        <path
          d="M 28 24 L 38 24 L 38 66 L 33 74 L 28 66 Z"
          fill="#38bdf8"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Mina de grafito */}
        <polygon points="31,71 35,71 33,74" fill={stroke} />
        {/* Línea central del lápiz */}
        <line x1="33" y1="24" x2="33" y2="66" stroke={stroke} strokeWidth="1.5" />
      </g>

      {/* Los dos bucles de la 'B' dibujados a mano */}
      {/* Bucle Superior */}
      <path
        d="M 38 24 C 54 22, 68 25, 68 38 C 68 46, 54 48, 38 48"
        fill="none"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Rayado de sombreado bucle superior */}
      <path d="M 44 29 L 52 43" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
      <path d="M 52 29 L 60 43" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />

      {/* Bucle Inferior (un poco más amplio, estilo cómic) */}
      <path
        d="M 38 48 C 58 47, 74 50, 74 65 C 74 77, 54 78, 38 74"
        fill="none"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Rayado bucle inferior */}
      <path d="M 44 54 L 56 70" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
      <path d="M 54 54 L 66 70" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />

      {/* Ráfagas de Chispas Cómic (Identidad visual exclusiva de BocetoUI) */}
      {sparkle && (
        <g stroke={stroke} strokeWidth="2.5" strokeLinecap="round">
          {/* Chispa 1 (diagonal) */}
          <line x1="88" y1="12" x2="98" y2="4" stroke="#e11d48" strokeWidth="3" />
          {/* Chispa 2 (horizontal) */}
          <line x1="93" y1="22" x2="103" y2="20" stroke="#f59e0b" strokeWidth="2.8" />
          {/* Chispa 3 (vertical) */}
          <line x1="78" y1="4" x2="81" y2="-4" stroke="#0284c7" strokeWidth="2.8" />
          {/* Punto de impacto estrella */}
          <circle cx="89" cy="8" r="2" fill="#ef4444" />
        </g>
      )}
    </svg>
  );
}

export default SketchIsotype;

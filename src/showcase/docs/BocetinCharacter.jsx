import React from 'react';
import './BocetinCharacter.css';

/**
 * BocetinCharacter — Mascota oficial artesanal de BocetoUI.
 * Lápiz ilustrador vivo con facetas de madera, boina francesa,
 * brazos expresivos, ojos animados y reacciones dinámicas al slider y clics.
 */
export function BocetinCharacter({
  energy = 70,
  lightOn = true,
  isBouncing = false,
  onClick
}) {
  // Estados de ánimo según el nivel de energía
  const isZen = energy < 35;
  const isComic = energy >= 75;
  const isInspired = !isZen && !isComic;

  return (
    <div
      className={`bocetin-wrapper ${isBouncing ? 'bocetin-wrapper--bouncing' : ''} ${
        isComic ? 'bocetin-wrapper--comic' : isZen ? 'bocetin-wrapper--zen' : 'bocetin-wrapper--inspired'
      }`}
      onClick={onClick}
      title="¡Hola! Soy Bocetín, tu lápiz ilustrador. ¡Mueve el slider o pulsa el botón!"
    >
      <svg
        viewBox="0 0 140 160"
        width="116"
        height="132"
        className="bocetin-svg"
      >
        <defs>
          {/* Degradado metálico para el anillo de latón */}
          <linearGradient id="bocetin-brass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ca8a04" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Sombra suave de suelo */}
          <radialGradient id="bocetin-ground-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(24, 24, 27, 0.28)" />
            <stop offset="100%" stopColor="rgba(24, 24, 27, 0)" />
          </radialGradient>
        </defs>

        {/* 1. Sombra en el suelo interactiva con el salto */}
        <ellipse
          cx="70"
          cy="150"
          rx={isBouncing ? 24 : 36}
          ry={isBouncing ? 4 : 7}
          fill="url(#bocetin-ground-shadow)"
          className="bocetin-shadow"
        />

        {/* 2. Efectos de fondo reactivos a la energía */}
        {/* A) Modo Zen: Letras Z flotando */}
        {isZen && (
          <g className="bocetin-zen-group">
            <text x="96" y="36" className="bocetin-zzz bocetin-zzz-1">z</text>
            <text x="108" y="24" className="bocetin-zzz bocetin-zzz-2">Z</text>
            <text x="118" y="14" className="bocetin-zzz bocetin-zzz-3">z</text>
          </g>
        )}

        {/* B) Modo Inspirado: Bombilla de ideas sobre la cabeza */}
        {isInspired && lightOn && (
          <g className="bocetin-idea-bulb">
            {/* Rayos de luz de la bombilla */}
            <line x1="70" y1="2" x2="70" y2="7" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
            <line x1="82" y1="6" x2="78" y2="10" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
            <line x1="58" y1="6" x2="62" y2="10" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
            {/* Cristal amarillo */}
            <path
              d="M 64 12 C 60 12 59 17 62 20 C 64 22 65 24 66 26 L 74 26 C 75 24 76 22 78 20 C 81 17 80 12 76 12 Z"
              fill="#fde047"
              stroke="#18181b"
              strokeWidth="1.8"
            />
            {/* Casquillo de la bombilla */}
            <rect x="66" y="26" width="8" height="3" rx="1" fill="#71717a" stroke="#18181b" strokeWidth="1.2" />
          </g>
        )}

        {/* C) Modo Súper Cómic: Líneas de velocidad y chispas */}
        {isComic && (
          <g className="bocetin-comic-aura">
            {/* Ráfagas de acción */}
            <line x1="16" y1="36" x2="32" y2="46" stroke="#ea580c" strokeWidth="2.5" strokeDasharray="5 3" />
            <line x1="12" y1="75" x2="30" y2="75" stroke="#ea580c" strokeWidth="2.5" strokeDasharray="5 3" />
            <line x1="124" y1="36" x2="108" y2="46" stroke="#ea580c" strokeWidth="2.5" strokeDasharray="5 3" />
            <line x1="128" y1="75" x2="110" y2="75" stroke="#ea580c" strokeWidth="2.5" strokeDasharray="5 3" />
            {/* Rayos de cómic flotantes */}
            <path d="M 24 50 L 32 58 L 28 60 L 36 70 L 26 62 L 30 60 Z" fill="#facc15" stroke="#18181b" strokeWidth="1.5" />
            <path d="M 112 52 L 120 60 L 116 62 L 124 72 L 114 64 L 118 62 Z" fill="#facc15" stroke="#18181b" strokeWidth="1.5" />
          </g>
        )}

        {/* 3. Brazo Izquierdo (Saludando alegremente) */}
        <g className="bocetin-arm-left">
          {/* Brazo curvo */}
          <path
            d="M 46 72 Q 28 66 22 52"
            fill="none"
            stroke="#18181b"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Guante blanco de 3 dedos saludando */}
          <g transform="translate(14, 40) rotate(-15)">
            <ellipse cx="8" cy="8" rx="6" ry="7" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
            {/* Dedos */}
            <path d="M 6 2 Q 8 -1 10 2" stroke="#18181b" strokeWidth="1.8" fill="#ffffff" />
            <path d="M 10 3 Q 13 1 14 5" stroke="#18181b" strokeWidth="1.8" fill="#ffffff" />
          </g>
        </g>

        {/* 4. Zapatitos / Pies de Bocetín */}
        <g className="bocetin-feet">
          {/* Zapato Izquierdo */}
          <path
            d="M 52 140 C 52 148 36 148 36 144 C 36 139 46 137 52 140"
            fill="#18181b"
            stroke="#18181b"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M 38 145 Q 45 147 51 145" stroke="#ffffff" strokeWidth="1.6" fill="none" />

          {/* Zapato Derecho */}
          <path
            d="M 88 140 C 88 148 104 148 104 144 C 104 139 94 137 88 140"
            fill="#18181b"
            stroke="#18181b"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M 89 145 Q 95 147 102 145" stroke="#ffffff" strokeWidth="1.6" fill="none" />
        </g>

        {/* 5. Cono de Madera Afilada y Punta de Grafito (Base del lápiz) */}
        <g className="bocetin-pencil-tip">
          {/* Madera tallada con ondas auténticas de sacapuntas */}
          <path
            d="M 46 112 Q 58 116 70 112 Q 82 116 94 112 L 70 142 Z"
            fill="#fde68a"
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Grano de madera sutil */}
          <path d="M 64 120 Q 70 126 76 120" stroke="#d97706" strokeWidth="1.2" fill="none" opacity="0.6" />
          {/* Núcleo de mina de grafito negro */}
          <path
            d="M 64 135 L 70 142 L 76 135 Z"
            fill="#27272a"
            stroke="#18181b"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Brillo en la punta de grafito */}
          <circle cx="68" cy="138" r="0.9" fill="#ffffff" />
        </g>

        {/* 6. Cuerpo Hexagonal del Lápiz (3 Facetas con volumen) */}
        <g className="bocetin-body">
          {/* Faceta Izquierda (Luz / Amarillo suave) */}
          <path
            d="M 46 44 L 60 44 L 60 113 L 46 112 Z"
            fill={lightOn ? '#fef08a' : '#e4e4e7'}
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Faceta Central (Frontal / Amarillo saturado) */}
          <path
            d="M 60 44 L 80 44 L 80 113 L 60 113 Z"
            fill={lightOn ? '#facc15' : '#d4d4d8'}
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Faceta Derecha (Sombra / Amarillo dorado) */}
          <path
            d="M 80 44 L 94 44 L 94 112 L 80 113 Z"
            fill={lightOn ? '#eab308' : '#a1a1aa'}
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Sello estampado de fábrica en el lateral "BOCETO 2B" */}
          <text
            x="88"
            y="98"
            transform="rotate(-90 88 98)"
            fill="#78350f"
            fontSize="7"
            fontWeight="900"
            fontFamily="monospace"
            letterSpacing="1.2"
            opacity="0.85"
          >
            BOCETO 2B
          </text>
        </g>

        {/* 7. Anillo de Latón / Virola Metálica */}
        <g className="bocetin-ferrule">
          <rect
            x="44"
            y="32"
            width="52"
            height="12"
            rx="2"
            fill="url(#bocetin-brass)"
            stroke="#18181b"
            strokeWidth="2.5"
          />
          {/* Estrías horizontales grabadas */}
          <line x1="44" y1="36" x2="96" y2="36" stroke="#18181b" strokeWidth="1.4" strokeDasharray="3 2" />
          <line x1="44" y1="40" x2="96" y2="40" stroke="#18181b" strokeWidth="1.4" strokeDasharray="3 2" />
          {/* Destello de brillo metálico */}
          <line x1="56" y1="33" x2="56" y2="43" stroke="#ffffff" strokeWidth="2.5" opacity="0.75" />
        </g>

        {/* 8. Cabeza / Goma de Borrar Rosa */}
        <g className="bocetin-eraser">
          <path
            d="M 46 32 C 46 16 94 16 94 32 Z"
            fill="#fb7185"
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Brillo suave de la goma */}
          <path
            d="M 52 24 Q 62 20 74 21"
            stroke="#fecdd3"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 9. Accesorio Especial: Boina Francesa de Artista (Modo Inspirado) */}
        {isInspired && (
          <g className="bocetin-beret">
            {/* Cuerpo de la boina marinera */}
            <path
              d="M 38 28 C 34 10 88 6 102 20 C 106 27 92 31 38 28 Z"
              fill="#1e3a8a"
              stroke="#18181b"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Rabito de la boina */}
            <path
              d="M 70 8 Q 71 3 74 3"
              stroke="#18181b"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {/* 10. Rostro Expresivo de Bocetín (Ojos, Mejillas, Boca) */}
        <g className="bocetin-face">
          {/* MODO ZEN: Ojos descansando y sonrisa calma */}
          {isZen && (
            <>
              {/* Ojos cerrados sonrientes */}
              <path d="M 54 66 Q 60 72 66 66" stroke="#18181b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 74 66 Q 80 72 86 66" stroke="#18181b" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Boca relajada */}
              <path d="M 64 80 Q 70 84 76 80" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* MODO INSPIRADO: Ojos grandes brillantes con parpadeo y sonrisa abierta */}
          {isInspired && (
            <>
              {/* Ojo Izquierdo con animación de parpadeo */}
              <g className="bocetin-eye-group">
                <ellipse cx="60" cy="66" rx="5.5" ry="7.5" fill="#18181b" />
                <circle cx="58.5" cy="63.5" r="2.2" fill="#ffffff" />
                <circle cx="62" cy="68" r="1.1" fill="#ffffff" />
              </g>

              {/* Ojo Derecho con animación de parpadeo */}
              <g className="bocetin-eye-group">
                <ellipse cx="80" cy="66" rx="5.5" ry="7.5" fill="#18181b" />
                <circle cx="78.5" cy="63.5" r="2.2" fill="#ffffff" />
                <circle cx="82" cy="68" r="1.1" fill="#ffffff" />
              </g>

              {/* Mejillas sonrosadas */}
              <ellipse cx="52" cy="74" rx="4" ry="2.5" fill="#f87171" opacity="0.65" />
              <ellipse cx="88" cy="74" rx="4" ry="2.5" fill="#f87171" opacity="0.65" />

              {/* Boca sonriente con lengua */}
              <path
                d="M 64 78 Q 70 90 76 78 Z"
                fill="#dc2626"
                stroke="#18181b"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path d="M 66 83 Q 70 81 74 83" fill="#fca5a5" />
            </>
          )}

          {/* MODO SÚPER CÓMIC: Gafas de sol negras retro y sonrisa triunfal */}
          {isComic && (
            <>
              {/* Montura de gafas de sol de cómic */}
              <path d="M 48 58 L 68 58 L 65 73 L 51 73 Z" fill="#18181b" stroke="#18181b" strokeWidth="2.2" />
              <path d="M 72 58 L 92 58 L 89 73 L 75 73 Z" fill="#18181b" stroke="#18181b" strokeWidth="2.2" />
              <line x1="68" y1="63" x2="72" y2="63" stroke="#18181b" strokeWidth="3" />
              {/* Destellos amarillos de cómic sobre las lentes */}
              <line x1="53" y1="62" x2="62" y2="71" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
              <line x1="77" y1="62" x2="86" y2="71" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />

              {/* Sonrisa triunfal grande con línea de dientes */}
              <path
                d="M 58 80 Q 70 98 82 80 Z"
                fill="#ef4444"
                stroke="#18181b"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path d="M 60 84 L 80 84" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* 11. Brazo Derecho (Sosteniendo una pluma o estilógrafo de dibujo) */}
        <g className="bocetin-arm-right">
          {/* Brazo curvo */}
          <path
            d="M 94 72 Q 112 70 116 82"
            fill="none"
            stroke="#18181b"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Manito sosteniendo el minilápiz */}
          <ellipse cx="116" cy="82" rx="5" ry="5" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
          {/* Minilápiz azul creador */}
          <line x1="113" y1="78" x2="126" y2="92" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <polygon points="126,92 129,95 125,95" fill="#18181b" />
          {/* Trazo de garabato dorado que sale de la punta */}
          <path
            d="M 129 95 Q 135 98 132 104 Q 128 108 135 110"
            fill="none"
            stroke="#facc15"
            strokeWidth="2"
            strokeLinecap="round"
            className="bocetin-drawn-spark"
          />
        </g>
      </svg>
    </div>
  );
}

export default BocetinCharacter;

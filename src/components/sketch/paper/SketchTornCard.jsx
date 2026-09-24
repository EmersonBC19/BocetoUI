import React, { useState } from 'react';
import './SketchTornCard.css';
import { Scissors, RotateCcw } from 'lucide-react';

/**
 * Componente visual de dientes rasgados en SVG nativo para el borde perforado del cupón.
 */
function JaggedPerforation({ position = 'bottom', color = '#fef08a' }) {
  return (
    <div className={`sketch-ticket-jagged-wrapper sketch-ticket-jagged-wrapper--${position}`}>
      <svg
        className="sketch-ticket-jagged-svg"
        viewBox="0 0 400 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 0,0 
             L 10,0 L 12,8 L 14,0 
             L 26,0 L 28,9 L 30,0 
             L 42,0 L 44,7 L 46,0 
             L 58,0 L 60,10 L 62,0 
             L 74,0 L 76,8 L 78,0 
             L 90,0 L 92,9 L 94,0 
             L 106,0 L 108,7 L 110,0 
             L 122,0 L 124,10 L 126,0 
             L 138,0 L 140,8 L 142,0 
             L 154,0 L 156,9 L 158,0 
             L 170,0 L 172,7 L 174,0 
             L 186,0 L 188,10 L 190,0 
             L 202,0 L 204,8 L 206,0 
             L 218,0 L 220,9 L 222,0 
             L 234,0 L 236,7 L 238,0 
             L 250,0 L 252,10 L 254,0 
             L 266,0 L 268,8 L 270,0 
             L 282,0 L 284,9 L 286,0 
             L 298,0 L 300,7 L 302,0 
             L 314,0 L 316,10 L 318,0 
             L 330,0 L 332,8 L 334,0 
             L 346,0 L 348,9 L 350,0 
             L 362,0 L 364,7 L 366,0 
             L 378,0 L 380,10 L 382,0 
             L 394,0 L 396,8 L 400,0 
             Z"
          fill={color}
          stroke="var(--sketch-ink, #18181b)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function SketchTornCard({
  children,
  variant = 'torn',
  orientation = 'vertical',
  tornEdge = 'bottom',
  title,
  badge,
  couponCode,
  discount,
  barcode,
  onTear,
  className = '',
  style = {},
  ...props
}) {
  const [isTorn, setIsTorn] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const isTicket = variant === 'ticket';
  const showBarcode = Boolean(barcode || (isTicket && couponCode));

  const handleTear = () => {
    if (isTorn) {
      setIsTorn(false);
      setIsCutting(false);
      onTear?.('restored');
      return;
    }

    setIsCutting(true);
    setTimeout(() => {
      setIsTorn(true);
      setIsCutting(false);
      if (couponCode) {
        navigator.clipboard?.writeText(couponCode);
      }
      onTear?.(couponCode || 'torn');
    }, 550);
  };

  // ==========================================================================
  // VARIANTE TICKET / CUPÓN CON TALÓN DESPRENDIBLE REAL (TWO-PIECE SYSTEM)
  // ==========================================================================
  if (isTicket) {
    return (
      <div
        className={`sketch-ticket-assembly sketch-ticket-assembly--${orientation} ${isTorn ? 'sketch-ticket-assembly--torn' : ''} ${isCutting ? 'sketch-ticket-assembly--cutting' : ''} ${className}`}
        style={style}
        {...props}
      >
        {/* PIEZA 1: EL TALÓN DEL CUPÓN (STUB DESPRENDIBLE) */}
        <div className={`sketch-ticket-stub ${isTorn ? 'sketch-ticket-stub--detached' : ''}`}>
          {/* Muescas circulares laterales del corte */}
          <div className="sketch-ticket-notch sketch-ticket-notch--left" />
          <div className="sketch-ticket-notch sketch-ticket-notch--right" />

          {/* Orificios decorativos de perforación en las esquinas */}
          <div className="sketch-ticket-punch-hole sketch-ticket-punch-hole--tl" />
          <div className="sketch-ticket-punch-hole sketch-ticket-punch-hole--tr" />

          <div className="sketch-ticket-stub__header">
            <div className="sketch-ticket-stub__discount-badge">
              <span className="sketch-ticket-stub__discount-text">{discount || '50% OFF'}</span>
            </div>

            <div className="sketch-ticket-stub__info">
              <div className="sketch-ticket-stub__title">{title || 'Cupón Oficial'}</div>
              <div className="sketch-ticket-stub__serial">
                VALE OFICIAL · {couponCode ? couponCode.slice(-6) : '849201'}
              </div>
            </div>

            {/* Sello de canje cuando está cortado */}
            {isTorn && (
              <div className="sketch-ticket-stub__stamped-badge">
                <span>✓ CANJEADO</span>
              </div>
            )}
          </div>

          {/* Barra de Perforación y Guía de Tijera */}
          <div className="sketch-ticket-stub__perf-bar">
            <div className="sketch-ticket-stub__perf-line" />

            {/* Tijera animada que se desliza de extremo a extremo cortando el papel */}
            {isCutting && (
              <div className="sketch-ticket-scissors-slide">
                <Scissors size={20} className="sketch-ticket-scissors-snip" />
                <span className="sketch-ticket-cut-sparkle">✂</span>
              </div>
            )}

            {/* Botón interactivo de corte / restauración */}
            <button
              type="button"
              className={`sketch-ticket-cut-btn ${isTorn ? 'sketch-ticket-cut-btn--torn' : ''}`}
              onClick={handleTear}
              title={isTorn ? 'Clic para pegar el cupón de nuevo' : 'Clic para cortar el cupón por la línea de puntos'}
            >
              {isCutting ? (
                <>
                  <Scissors size={14} className="sketch-ticket-btn-icon--cutting" />
                  <span>CORTANDO...</span>
                </>
              ) : isTorn ? (
                <>
                  <RotateCcw size={14} />
                  <span>🩹 UNIR DE NUEVO</span>
                </>
              ) : (
                <>
                  <Scissors size={14} />
                  <span>✂ CORTAR CUPÓN</span>
                </>
              )}
            </button>
          </div>

          {/* Dientes dentados de papel perforado rasgado en la base del talón */}
          {isTorn && <JaggedPerforation position="bottom" color="var(--sketch-accent-yellow, #fef08a)" />}
        </div>

        {/* PIEZA 2: EL CUERPO PRINCIPAL DEL BOLETO / TICKET */}
        <div className={`sketch-ticket-body ${isTorn ? 'sketch-ticket-body--detached' : ''}`}>
          {/* Dientes dentados de papel perforado rasgado en la parte superior del cuerpo */}
          {isTorn && <JaggedPerforation position="top" color="var(--sketch-bg-surface, #ffffff)" />}

          <div className="sketch-ticket-body__inner">
            {children}

            {/* Código de barras artesanal bocetado */}
            {showBarcode && (
              <div className="sketch-torn-card__barcode-container">
                <svg viewBox="0 0 180 38" className="sketch-torn-card__barcode-svg" aria-label="Código de barras bocetado">
                  <g stroke="currentColor" strokeLinecap="round">
                    <line x1="8" y1="2" x2="8" y2="26" strokeWidth="2.5" />
                    <line x1="13" y1="2" x2="13" y2="26" strokeWidth="1.2" />
                    <line x1="17" y1="2" x2="17" y2="26" strokeWidth="3" />
                    <line x1="23" y1="2" x2="23" y2="26" strokeWidth="1" />
                    <line x1="28" y1="2" x2="28" y2="26" strokeWidth="2" />
                    <line x1="33" y1="2" x2="33" y2="26" strokeWidth="1.5" />
                    <line x1="38" y1="2" x2="38" y2="26" strokeWidth="3.5" />
                    <line x1="45" y1="2" x2="45" y2="26" strokeWidth="1" />
                    <line x1="50" y1="2" x2="50" y2="26" strokeWidth="2.5" />
                    <line x1="56" y1="2" x2="56" y2="26" strokeWidth="1.5" />
                    <line x1="62" y1="2" x2="62" y2="26" strokeWidth="3" />
                    <line x1="68" y1="2" x2="68" y2="26" strokeWidth="1" />
                    <line x1="74" y1="2" x2="74" y2="26" strokeWidth="2" />
                    <line x1="80" y1="2" x2="80" y2="26" strokeWidth="1.5" />
                    <line x1="86" y1="2" x2="86" y2="26" strokeWidth="3" />
                    <line x1="93" y1="2" x2="93" y2="26" strokeWidth="1" />
                    <line x1="99" y1="2" x2="99" y2="26" strokeWidth="2.5" />
                    <line x1="106" y1="2" x2="106" y2="26" strokeWidth="1.5" />
                    <line x1="112" y1="2" x2="112" y2="26" strokeWidth="3" />
                    <line x1="118" y1="2" x2="118" y2="26" strokeWidth="1" />
                    <line x1="124" y1="2" x2="124" y2="26" strokeWidth="2" />
                    <line x1="130" y1="2" x2="130" y2="26" strokeWidth="1.5" />
                    <line x1="137" y1="2" x2="137" y2="26" strokeWidth="3.5" />
                    <line x1="144" y1="2" x2="144" y2="26" strokeWidth="1.2" />
                    <line x1="150" y1="2" x2="150" y2="26" strokeWidth="2.5" />
                    <line x1="156" y1="2" x2="156" y2="26" strokeWidth="1.5" />
                    <line x1="162" y1="2" x2="162" y2="26" strokeWidth="3" />
                    <line x1="170" y1="2" x2="170" y2="26" strokeWidth="2" />
                  </g>
                  <text x="90" y="36" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" letterSpacing="3">
                    {typeof barcode === 'string' ? barcode : (couponCode || '7 501234 892015')}
                  </text>
                </svg>
              </div>
            )}

            {/* Código del cupón */}
            {couponCode && (
              <div className="sketch-torn-card__code-box">
                <span className="sketch-torn-card__code-label">Código:</span>
                <code className="sketch-torn-card__code">{couponCode}</code>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

/**
 * Componente de borde de papel rasgado orgánico en SVG para cuadernos y fichas.
 */
function TornPaperEdge({ edge = 'bottom' }) {
  if (edge === 'right') {
    return (
      <div className="sketch-torn-paper-edge sketch-torn-paper-edge--right" aria-hidden="true">
        <svg viewBox="0 0 16 500" className="sketch-torn-paper-edge__svg" preserveAspectRatio="none">
          <path
            d="M 0 0 
               C 5 15, 15 30, 6 45 
               C -1 60, 13 75, 4 95 
               C -2 110, 14 125, 6 145 
               C 0 160, 13 175, 5 195 
               C -2 210, 15 228, 6 245 
               C 0 260, 14 278, 4 295 
               C -2 310, 13 328, 5 345 
               C 0 360, 15 378, 6 395 
               C -2 410, 14 428, 4 445 
               C 0 460, 13 478, 5 495 
               L 0 500 Z"
            fill="var(--sketch-bg-surface, #ffffff)"
            stroke="var(--sketch-ink, #18181b)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (edge === 'left') {
    return (
      <div className="sketch-torn-paper-edge sketch-torn-paper-edge--left" aria-hidden="true">
        <svg viewBox="0 0 16 500" className="sketch-torn-paper-edge__svg" preserveAspectRatio="none">
          <path
            d="M 16 0 
               C 11 15, 1 30, 10 45 
               C 17 60, 3 75, 12 95 
               C 18 110, 2 125, 10 145 
               C 16 160, 3 175, 11 195 
               C 18 210, 1 228, 10 245 
               C 16 260, 2 278, 12 295 
               C 18 310, 3 328, 11 345 
               C 16 360, 1 378, 10 395 
               C 18 410, 2 428, 12 445 
               C 16 460, 3 478, 11 495 
               L 16 500 Z"
            fill="var(--sketch-bg-surface, #ffffff)"
            stroke="var(--sketch-ink, #18181b)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // bottom edge
  return (
    <div className="sketch-torn-paper-edge sketch-torn-paper-edge--bottom" aria-hidden="true">
      <svg viewBox="0 0 500 16" className="sketch-torn-paper-edge__svg" preserveAspectRatio="none">
        <path
          d="M 0 0 
             C 15 5, 30 15, 45 6 
             C 60 -1, 75 13, 95 4 
             C 110 -2, 125 14, 145 6 
             C 160 0, 175 13, 195 5 
             C 210 -2, 228 15, 245 6 
             C 260 0, 278 14, 295 4 
             C 310 -2, 328 13, 345 5 
             C 360 0, 378 15, 395 6 
             C 410 -2, 428 14, 445 4 
             C 460 0, 478 13, 495 5 
             L 500 0 Z"
          fill="var(--sketch-bg-surface, #ffffff)"
          stroke="var(--sketch-ink, #18181b)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

  // ==========================================================================
  // VARIANTE CUADERNO / HOJA DE NOTAS RASGADA (TORN NOTEBOOK PAGE)
  // ==========================================================================
  return (
    <div
      className={`sketch-torn-card sketch-torn-card--${variant} sketch-torn-card--edge-${tornEdge} ${isCutting ? 'sketch-torn-card--cutting' : ''} ${isTorn ? 'sketch-torn-card--torn' : ''} ${className}`}
      style={style}
      {...props}
    >
      {/* Contenido Principal */}
      <div className="sketch-torn-card__content">
        {title && (
          <div className="sketch-torn-card__header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="sketch-torn-card__title">{title}</h3>
              {badge && <span className="sketch-torn-card__badge">{badge}</span>}
            </div>

            {/* Botón interactivo de Rasgar Hoja */}
            <button
              type="button"
              className={`sketch-torn-card__tear-action-btn ${isTorn ? 'sketch-torn-card__tear-action-btn--torn' : ''}`}
              onClick={handleTear}
              title={isTorn ? 'Pegar hoja de nuevo' : 'Rasgar borde de papel'}
            >
              {isCutting ? '✂️ Rasgando...' : isTorn ? '🩹 Pegar Hoja' : '✂️ Rasgar Hoja'}
            </button>
          </div>
        )}

        {children}

        {/* Código de barras artesanal si se solicita */}
        {showBarcode && (
          <div className="sketch-torn-card__barcode-container">
            <svg viewBox="0 0 180 38" className="sketch-torn-card__barcode-svg" aria-label="Código de barras bocetado">
              <g stroke="currentColor" strokeLinecap="round">
                <line x1="8" y1="2" x2="8" y2="26" strokeWidth="2.5" />
                <line x1="13" y1="2" x2="13" y2="26" strokeWidth="1.2" />
                <line x1="17" y1="2" x2="17" y2="26" strokeWidth="3" />
                <line x1="23" y1="2" x2="23" y2="26" strokeWidth="1" />
                <line x1="28" y1="2" x2="28" y2="26" strokeWidth="2" />
                <line x1="33" y1="2" x2="33" y2="26" strokeWidth="1.5" />
                <line x1="38" y1="2" x2="38" y2="26" strokeWidth="3.5" />
                <line x1="45" y1="2" x2="45" y2="26" strokeWidth="1" />
                <line x1="50" y1="2" x2="50" y2="26" strokeWidth="2.5" />
                <line x1="56" y1="2" x2="56" y2="26" strokeWidth="1.5" />
                <line x1="62" y1="2" x2="62" y2="26" strokeWidth="3" />
                <line x1="68" y1="2" x2="68" y2="26" strokeWidth="1" />
                <line x1="74" y1="2" x2="74" y2="26" strokeWidth="2" />
                <line x1="80" y1="2" x2="80" y2="26" strokeWidth="1.5" />
                <line x1="86" y1="2" x2="86" y2="26" strokeWidth="3" />
                <line x1="93" y1="2" x2="93" y2="26" strokeWidth="1" />
                <line x1="99" y1="2" x2="99" y2="26" strokeWidth="2.5" />
                <line x1="106" y1="2" x2="106" y2="26" strokeWidth="1.5" />
                <line x1="112" y1="2" x2="112" y2="26" strokeWidth="3" />
                <line x1="118" y1="2" x2="118" y2="26" strokeWidth="1" />
                <line x1="124" y1="2" x2="124" y2="26" strokeWidth="2" />
                <line x1="130" y1="2" x2="130" y2="26" strokeWidth="1.5" />
                <line x1="137" y1="2" x2="137" y2="26" strokeWidth="3.5" />
                <line x1="144" y1="2" x2="144" y2="26" strokeWidth="1.2" />
                <line x1="150" y1="2" x2="150" y2="26" strokeWidth="2.5" />
                <line x1="156" y1="2" x2="156" y2="26" strokeWidth="1.5" />
                <line x1="162" y1="2" x2="162" y2="26" strokeWidth="3" />
                <line x1="170" y1="2" x2="170" y2="26" strokeWidth="2" />
              </g>
              <text x="90" y="36" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" letterSpacing="3">
                {typeof barcode === 'string' ? barcode : (couponCode || '7 501234 892015')}
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Guía punteada previa al rasgado */}
      {!isTorn && <div className={`sketch-torn-intact-guide sketch-torn-intact-guide--${tornEdge}`} />}

      {/* Tira que se desprende y cae físicamente durante la animación */}
      {isCutting && <div className={`sketch-torn-strip-peel sketch-torn-strip-peel--${tornEdge}`} />}

      {/* Borde rasgado orgánico expuesto tras rasgar */}
      {isTorn && <TornPaperEdge edge={tornEdge} />}

      {/* Detalle visual de hoja arrancada con polvo de fibras */}
      {isTorn && tornEdge === 'bottom' && (
        <div className="sketch-torn-card__torn-indicator">
          <span className="sketch-torn-card__fiber-dust">·· · ·· · ··· ··</span>
          <span className="sketch-torn-card__torn-label">HOJA DESPRENDIDA DEL CUADERNO</span>
        </div>
      )}
    </div>
  );
}

export default SketchTornCard;

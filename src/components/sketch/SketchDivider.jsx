import React from 'react';
import './SketchDivider.css';

/**
 * SketchDivider - Separador dibujado a mano alzada.
 *
 * @param {Object} props
 * @param {'straight'|'double'|'dashed'|'wavy'|'zigzag'} [props.variant='straight']
 * @param {React.ReactNode} [props.label] - Texto opcional en el centro.
 * @param {string} [props.className]
 */
export function SketchDivider({
  variant = 'straight',
  label,
  className = '',
  ...rest
}) {
  if (variant === 'wavy') {
    return (
      <div className={`sketch-divider sketch-divider--wavy ${className}`} {...rest}>
        <svg viewBox="0 0 1200 20" preserveAspectRatio="none" fill="none">
          <path
            d="M0,10 Q30,0 60,10 T120,10 T180,10 T240,10 T300,10 T360,10 T420,10 T480,10 T540,10 T600,10 T660,10 T720,10 T780,10 T840,10 T900,10 T960,10 T1020,10 T1080,10 T1140,10 T1200,10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'zigzag') {
    return (
      <div className={`sketch-divider sketch-divider--zigzag ${className}`} {...rest}>
        <svg viewBox="0 0 1200 20" preserveAspectRatio="none" fill="none">
          <path
            d="M0,10 L15,3 L30,17 L45,3 L60,17 L75,3 L90,17 L105,3 L120,17 L135,3 L150,17 L165,3 L180,17 L195,3 L210,17 L225,3 L240,17 L255,3 L270,17 L285,3 L300,17 L315,3 L330,17 L345,3 L360,17 L375,3 L390,17 L405,3 L420,17 L435,3 L450,17 L465,3 L480,17 L495,3 L510,17 L525,3 L540,17 L555,3 L570,17 L585,3 L600,17 L615,3 L630,17 L645,3 L660,17 L675,3 L690,17 L705,3 L720,17 L735,3 L750,17 L765,3 L780,17 L795,3 L810,17 L825,3 L840,17 L855,3 L870,17 L885,3 L900,17 L915,3 L930,17 L945,3 L960,17 L975,3 L990,17 L1005,3 L1020,17 L1035,3 L1050,17 L1065,3 L1080,17 L1095,3 L1110,17 L1125,3 L1140,17 L1155,3 L1170,17 L1185,3 L1200,10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'cut') {
    return (
      <div className={`sketch-divider sketch-divider--cut ${className}`} {...rest}>
        <div className="sketch-divider__cut-line" />
        <span className="sketch-divider__scissor-icon" aria-hidden="true">✂</span>
        {label && <span className="sketch-divider__label">{label}</span>}
        <div className="sketch-divider__cut-line" />
      </div>
    );
  }

  return (
    <div className={`sketch-divider sketch-divider--${variant} ${className}`} {...rest}>
      <div className="sketch-divider__line" />
      {label && <span className="sketch-divider__label">{label}</span>}
      {label && <div className="sketch-divider__line" />}
    </div>
  );
}

export default SketchDivider;

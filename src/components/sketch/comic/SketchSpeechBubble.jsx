import React from 'react';
import './SketchSpeechBubble.css';

export function SketchSpeechBubble({
  children,
  variant = 'speech',
  tail = 'bottom-left',
  color = 'yellow',
  title,
  avatar,
  avatarPosition = 'left',
  animate = true,
  className = '',
  style = {},
  ...props
}) {
  const isThought = variant === 'thought';
  const isShout = variant === 'shout';
  const isWhisper = variant === 'whisper';

  const getShoutPoints = () => {
    const isTailBL = tail === 'bottom-left';
    const isTailBR = tail === 'bottom-right';
    const isTailTL = tail === 'top-left';
    const isTailTR = tail === 'top-right';

    const pTL = isTailTL ? '18,-14' : '22,2';
    const pTR = isTailTR ? '92,-14' : '90,1';
    const pBL = isTailBL ? '10,115' : '14,98';
    const pBR = isTailBR ? '90,115' : '88,98';

    return `10,16 ${pTL} 32,14 45,0 56,15 68,2 78,14 ${pTR} 88,18 100,26 89,38 99,52 88,64 100,78 86,84 ${pBR} 76,85 64,100 52,86 40,99 28,85 ${pBL} 12,82 0,72 12,58 1,46 11,32 0,18`;
  };

  // Orient tail towards avatar if avatar provided and default tail was used
  const effectiveTail =
    avatar && tail === 'bottom-left' && avatarPosition === 'right'
      ? 'bottom-right'
      : tail;

  const bubbleNode = (
    <div
      className={`sketch-speech-bubble sketch-speech-bubble--${variant} sketch-speech-bubble--tail-${effectiveTail} sketch-speech-bubble--${color} ${animate ? 'sketch-speech-bubble--animated' : ''} ${!avatar ? className : ''}`}
      style={!avatar ? style : undefined}
      role="region"
      {...props}
    >
      {/* Fondo de Explosión / Grito Cómic en SVG Nativo */}
      {isShout && (
        <svg
          className="sketch-speech-bubble__shout-svg"
          viewBox={
            effectiveTail === 'top-left' || effectiveTail === 'top-right'
              ? '0 -15 100 115'
              : effectiveTail === 'bottom-left' || effectiveTail === 'bottom-right'
              ? '0 0 100 115'
              : '0 0 100 100'
          }
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon
            points={getShoutPoints()}
            fill="#18181b"
            transform="translate(1.4, 2)"
          />
          <polygon
            points={getShoutPoints()}
            className="sketch-speech-bubble__shout-polygon"
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="miter"
            strokeMiterlimit="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {/* Cuerpo del Globo */}
      <div className="sketch-speech-bubble__body">
        {title && <span className="sketch-speech-bubble__title">{title}</span>}
        <div className="sketch-speech-bubble__content">{children}</div>
      </div>

      {/* Cola de Diálogo (SVG) */}
      {!isShout && !isThought && (
        <svg
          viewBox="0 0 24 24"
          className={`sketch-speech-bubble__tail-svg sketch-speech-bubble__tail-svg--${effectiveTail}`}
          aria-hidden="true"
        >
          <path
            d="M 2 2 Q 12 14 22 22 Q 14 12 18 2 Z"
            className="sketch-speech-bubble__tail-path"
            strokeDasharray={isWhisper ? '3.5 2.5' : undefined}
          />
        </svg>
      )}

      {/* Burbujas de Pensamiento (Thought Cloud) */}
      {isThought && (
        <div className={`sketch-speech-bubble__thought-dots sketch-speech-bubble__thought-dots--${effectiveTail}`}>
          <span className="sketch-speech-bubble__dot sketch-speech-bubble__dot--1" />
          <span className="sketch-speech-bubble__dot sketch-speech-bubble__dot--2" />
          <span className="sketch-speech-bubble__dot sketch-speech-bubble__dot--3" />
        </div>
      )}
    </div>
  );

  if (avatar) {
    return (
      <div
        className={`sketch-speech-bubble-anchor-wrapper sketch-speech-bubble-anchor-wrapper--${avatarPosition} ${className}`}
        style={style}
      >
        <div className="sketch-speech-bubble__avatar-slot">{avatar}</div>
        {bubbleNode}
      </div>
    );
  }

  return bubbleNode;
}

export default SketchSpeechBubble;

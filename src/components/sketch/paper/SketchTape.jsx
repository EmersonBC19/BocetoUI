import React, { useState } from 'react';
import './SketchTape.css';

export function SketchTape({
  children,
  pattern = 'masking',
  color,
  rotation = -2,
  width = 110,
  height = 28,
  placement,
  corner,
  interactive = false,
  className = '',
  style = {},
  onClick,
  ...props
}) {
  const [peeled, setPeeled] = useState(false);
  const isWrapper = Boolean(children);
  const effectivePlacement = corner ? `corner-${corner}` : placement;

  const handleClick = (e) => {
    if (interactive) {
      setPeeled((prev) => !prev);
    }
    if (onClick) onClick(e);
  };

  const tapeElement = (
    <div
      className={`sketch-tape sketch-tape--${pattern} ${effectivePlacement ? `sketch-tape--${effectivePlacement}` : ''} ${interactive ? 'sketch-tape--interactive' : ''} ${peeled ? 'sketch-tape--peeled' : ''} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        transform: !effectivePlacement ? `rotate(${rotation}deg)` : undefined,
        backgroundColor: color,
        cursor: interactive ? 'pointer' : undefined,
        ...style
      }}
      onClick={handleClick}
      aria-hidden={!children}
      title={interactive ? (peeled ? 'Despegado (clic para fijar)' : 'Clic para despegar cinta') : undefined}
      {...props}
    />
  );

  if (!isWrapper) return tapeElement;

  return (
    <div className="sketch-tape-wrapper">
      {tapeElement}
      {children}
    </div>
  );
}

export default SketchTape;

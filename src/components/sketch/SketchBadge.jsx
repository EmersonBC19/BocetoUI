import React from 'react';
import './SketchBadge.css';

/**
 * SketchBadge - Círculos y óvalos trazados a mano para rodear cifras, tags y texto.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Texto o número interior.
 * @param {'loop-circle'|'oval'|'pill'|'highlight'} [props.variant='oval']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {'default'|'red'|'blue'|'green'} [props.color='default']
 * @param {string} [props.className]
 */
export function SketchBadge({
  children,
  variant = 'oval',
  size = 'md',
  color = 'default',
  className = '',
  ...rest
}) {
  const classes = [
    'sketch-badge',
    `sketch-badge--${variant}`,
    `sketch-badge--${size}`,
    color !== 'default' ? `sketch-badge--${color}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}

export default SketchBadge;

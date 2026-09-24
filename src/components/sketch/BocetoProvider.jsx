import React, { useEffect } from 'react';
import './styles.css';

/**
 * BocetoProvider - Proveedor de contexto visual para BocetoUI
 * Configura automáticamente el modo de cursor, el tema y la textura de lienzo.
 *
 * @param {('comic'|'native')} [cursor='comic'] - Sistema de punteros activos
 * @param {('paper-grid'|'paper-dots'|'paper-lined'|'paper-chalk'|'none')} [canvas='none'] - Fondo de papel artesanal
 * @param {('light'|'chalkboard')} [theme='light'] - Tema visual claro o pizarra
 * @param {boolean} [applyToRoot=false] - Si es true, inyecta atributos en <html>
 * @param {React.ReactNode} children - Componentes hijos
 */
export function BocetoProvider({
  cursor = 'comic',
  canvas = 'none',
  theme = 'light',
  applyToRoot = false,
  className = '',
  style = {},
  children,
  ...props
}) {
  useEffect(() => {
    if (applyToRoot && typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-cursor', cursor);
      if (theme === 'chalkboard') {
        root.setAttribute('data-theme', 'chalkboard');
      } else {
        root.removeAttribute('data-theme');
      }
    }
  }, [cursor, theme, applyToRoot]);

  const canvasClass = canvas !== 'none' ? `canvas-${canvas}` : '';
  const combinedClass = `boceto-provider-root ${canvasClass} ${className}`.trim();

  return (
    <div
      className={combinedClass}
      data-cursor={cursor}
      data-theme={theme === 'chalkboard' ? 'chalkboard' : undefined}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export default BocetoProvider;

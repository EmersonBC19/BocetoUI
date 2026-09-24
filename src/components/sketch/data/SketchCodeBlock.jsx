import React, { useState } from 'react';
import './SketchCodeBlock.css';
import { Copy, Check } from 'lucide-react';

// Lightweight token highlighter for JS/TS/HTML/CSS
function highlightTokens(line) {
  // Regex to match comments, strings, keywords, numbers, tags
  const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:import|export|from|default|const|let|var|function|return|if|else|switch|case|break|for|while|class|extends|new|true|false|null|undefined|async|await|try|catch)\b|\b\d+\b|<\/?[a-zA-Z0-9_\-]+(?:\s|>|\/)|[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.substring(lastIndex, match.index));
    }
    const token = match[0];
    let className = '';

    if (token.startsWith('//') || token.startsWith('/*')) {
      className = 'sketch-token--comment';
    } else if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
      className = 'sketch-token--string';
    } else if (/^\d+$/.test(token)) {
      className = 'sketch-token--number';
    } else if (token.startsWith('<')) {
      className = 'sketch-token--tag';
    } else if (/^(?:import|export|from|default|const|let|var|function|return|if|else|switch|case|break|for|while|class|extends|new|true|false|null|undefined|async|await|try|catch)$/.test(token)) {
      className = 'sketch-token--keyword';
    } else {
      className = 'sketch-token--function';
    }

    parts.push(
      <span key={match.index} className={className}>
        {token}
      </span>
    );
    lastIndex = match.index + token.length;
  }

  if (lastIndex < line.length) {
    parts.push(line.substring(lastIndex));
  }

  return parts.length > 0 ? parts : line;
}

/**
 * SketchCodeBlock - Bloque de código artesanal con estilo de cuaderno técnico
 */
export function SketchCodeBlock({
  code = '',
  language = 'jsx',
  showLineNumbers = true,
  className = '',
  ...props
}) {
  const [copied, setCopied] = useState(false);

  const lines = code.trim().split('\n');

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`sketch-codeblock ${className}`} {...props}>
      <div className="sketch-codeblock__header">
        <div className="sketch-codeblock__dots" aria-hidden="true">
          <span className="sketch-codeblock__dot sketch-codeblock__dot--red" />
          <span className="sketch-codeblock__dot sketch-codeblock__dot--yellow" />
          <span className="sketch-codeblock__dot sketch-codeblock__dot--green" />
        </div>
        <span className="sketch-codeblock__lang-badge">{language}</span>
        <button
          type="button"
          className="sketch-codeblock__copy-btn"
          onClick={handleCopy}
          aria-label="Copiar código"
        >
          {copied ? (
            <>
              <Check size={14} color="#16a34a" />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      <div className="sketch-codeblock__body">
        {showLineNumbers && (
          <div className="sketch-codeblock__line-numbers" aria-hidden="true">
            {lines.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
        )}
        <pre className="sketch-codeblock__pre">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="sketch-codeblock__line">
                {highlightTokens(line)}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default SketchCodeBlock;

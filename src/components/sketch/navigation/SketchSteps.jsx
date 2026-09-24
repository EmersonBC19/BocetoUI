import React from 'react';
import './SketchSteps.css';
import { Check } from 'lucide-react';

/**
 * SketchSteps - Asistente y Stepper multi-paso artesanal
 * @param {Array} steps - [{ id, title, description, icon }]
 * @param {number} current - Índice del paso activo (0-indexed)
 * @param {function} onChange - Callback al seleccionar un paso interactivo
 * @param {string} orientation - 'horizontal' | 'vertical'
 */
export function SketchSteps({
  steps = [],
  current = 0,
  onChange,
  orientation = 'horizontal',
  className = '',
  ...props
}) {
  if (!steps || steps.length === 0) return null;

  return (
    <div
      className={`sketch-steps sketch-steps--${orientation} ${className}`}
      role="navigation"
      aria-label="Progreso de pasos"
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < current;
        const isActive = index === current;
        const isPending = index > current;
        const isLast = index === steps.length - 1;
        const isClickable = Boolean(onChange && (isCompleted || isActive));

        let statusClass = 'sketch-step-item--pending';
        if (isCompleted) statusClass = 'sketch-step-item--completed';
        if (isActive) statusClass = 'sketch-step-item--active';

        return (
          <div key={step.id || index} className={`sketch-step-item ${statusClass}`}>
            {/* Conector lineal entre pasos */}
            {!isLast && (
              <div
                className={`sketch-step-connector ${
                  isCompleted
                    ? orientation === 'horizontal'
                      ? 'sketch-step-connector--completed'
                      : 'sketch-step-connector--completed-vertical'
                    : ''
                }`}
                aria-hidden="true"
              />
            )}

            {/* Nodo circular interactivo */}
            <div
              className={`sketch-step-node ${isClickable ? 'sketch-step-node--clickable' : ''}`}
              onClick={() => isClickable && onChange(index)}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              aria-current={isActive ? 'step' : undefined}
              title={step.title}
            >
              {isCompleted ? (
                <Check size={20} strokeWidth={2.5} />
              ) : step.icon ? (
                step.icon
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            {/* Contenido descriptivo */}
            <div className="sketch-step-content">
              <span className="sketch-step-title">
                {step.title}
                {isCompleted && <span className="sketch-step-status-tag sketch-step-status-tag--done">✓ Aprobado</span>}
                {isActive && <span className="sketch-step-status-tag sketch-step-status-tag--active">En tinta</span>}
              </span>
              {step.description && (
                <span className="sketch-step-desc">{step.description}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SketchSteps;

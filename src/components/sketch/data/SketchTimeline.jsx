import React from 'react';
import './SketchTimeline.css';
import { Check, Clock, AlertCircle } from 'lucide-react';

/**
 * SketchTimeline - Línea de tiempo y seguimiento de eventos artesanal
 * @param {Array} items - [{ id, title, time, description, icon, status, tag }]
 */
export function SketchTimeline({ items = [], className = '', ...props }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`sketch-timeline ${className}`} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const status = item.status || 'pending';

        return (
          <div key={item.id || index} className={`sketch-timeline-item sketch-timeline-item--${status}`}>
            {/* Hilo conector vertical */}
            {!isLast && <div className="sketch-timeline-line" aria-hidden="true" />}

            {/* Nodo artesanal */}
            <div className="sketch-timeline-node">
              {item.icon ? (
                item.icon
              ) : status === 'completed' ? (
                <Check size={14} strokeWidth={3} />
              ) : status === 'active' ? (
                <Clock size={14} strokeWidth={2.5} />
              ) : status === 'danger' ? (
                <AlertCircle size={14} strokeWidth={2.5} />
              ) : (
                <span className="sketch-timeline-dot" />
              )}
            </div>

            {/* Contenido de la entrada */}
            <div className="sketch-timeline-content">
              <div className="sketch-timeline-header">
                <span className="sketch-timeline-title">{item.title}</span>
                {item.time && <span className="sketch-timeline-time">{item.time}</span>}
                {item.tag && <span className="sketch-timeline-tag">{item.tag}</span>}
              </div>
              {item.description && (
                <p className="sketch-timeline-desc">{item.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SketchTimeline;

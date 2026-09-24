import React, { useState } from 'react';
import {
  SketchCard, SketchButton, SketchInput,
  SketchSwitch, SketchRating, SketchCheckbox,
  SketchStickyNote, SketchStatCard, SketchTag,
  SketchIcon
} from '../../components/sketch';

export function WelcomeGallery({ onTriggerToast, onToggleDoodle }) {
  const [sampleRating, setSampleRating] = useState(5);
  const [sampleSwitch, setSampleSwitch] = useState(true);
  const [sampleCheck, setSampleCheck] = useState(true);

  return (
    <section className="welcome-section" id="galeria">
      <div className="welcome-section__header">
        <span className="welcome-section__tag">SHOWCASE INTERACTIVO</span>
        <h2 className="welcome-section__title">Componentes vivos diseñados para enamorar</h2>
        <p className="welcome-section__desc">
          Cada pieza de BocetoUI combina imperfección estética deliberada con rigurosa ingeniería de software:
        </p>
      </div>

      <div className="welcome-showcase-grid">
        {/* Card 1: Acciones & Botones */}
        <SketchCard title="Acciones & Feedback" badge="Interactivo">
          <div className="welcome-card-content">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <SketchButton size="sm" variant="marker" onClick={() => onTriggerToast?.('¡Botón Marker pulsado!')}>
                Marker
              </SketchButton>
              <SketchButton size="sm" variant="wobbly" onClick={() => onTriggerToast?.('¡Botón Wobbly pulsado!')}>
                Wobbly
              </SketchButton>
              <SketchButton size="sm" variant="sketch" onClick={() => onTriggerToast?.('¡Botón Sketch!')}>
                Boceto
              </SketchButton>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>Calificación:</span>
              <SketchRating value={sampleRating} onChange={setSampleRating} />
            </div>
          </div>
        </SketchCard>

        {/* Card 2: Formularios con Personalidad */}
        <SketchCard title="Formularios Artesanales" badge="Entradas">
          <div className="welcome-card-content" style={{ gap: '14px' }}>
            <SketchInput placeholder="Tu nombre artístico..." size="sm" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '2px' }}>
              <SketchCheckbox
                label="Trazos orgánicos a mano"
                checked={sampleCheck}
                onChange={(e) => setSampleCheck(e.target.checked)}
              />
              <SketchSwitch
                size="sm"
                label={sampleSwitch ? 'Efecto elástico: Activo' : 'Efecto elástico: Pausa'}
                checked={sampleSwitch}
                onChange={setSampleSwitch}
              />
            </div>
          </div>
        </SketchCard>

        {/* Card 3: Post-it & Notas */}
        <SketchCard title="Superficies & Notas" badge="Papel">
          <div className="welcome-card-content">
            <SketchStickyNote color="yellow" rotation={-1.5} pin={false}>
              <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: 1.35 }}>
                "La creatividad no nace de la perfección estéril, sino de la expresión humana."
              </p>
            </SketchStickyNote>
          </div>
        </SketchCard>

        {/* Card 4: Métricas del Mundo Real */}
        <SketchCard title="Datos & Métricas" badge="SaaS">
          <div className="welcome-card-content">
            <SketchStatCard
              title="Usuarios Activos"
              value="14,820"
              change="+38.4%"
              trend="up"
              style={{ border: 'none', padding: 0, minWidth: 0, width: '100%', boxShadow: 'none' }}
            />
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
              <SketchTag variant="marker">React 19</SketchTag>
              <SketchTag variant="wobbly">Dual Build</SketchTag>
              <SketchTag variant="default">52 kB</SketchTag>
            </div>
          </div>
        </SketchCard>

        {/* Card 5: Iconos Artesanales Propios */}
        <SketchCard title="Iconos Artesanales" badge="40+ Glifos">
          <div className="welcome-card-content">
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0' }}>
              <SketchIcon
                name="pencil"
                size={28}
                color="#2563eb"
                animate="wiggle"
                interactive
                onClick={() => onTriggerToast?.('✏️ Lápiz: ¡Wiggle animado nativo!')}
              />
              <SketchIcon
                name="star"
                size={28}
                color="#ca8a04"
                animate="pulse"
                interactive
                onClick={() => onTriggerToast?.('⭐ Estrella: ¡Pulse temático!')}
              />
              <SketchIcon
                name="heart"
                size={28}
                color="#dc2626"
                animate="draw"
                interactive
                onClick={() => onTriggerToast?.('❤️ Corazón: ¡Trazo en vivo!')}
              />
              <SketchIcon
                name="flame"
                size={28}
                color="#ea580c"
                interactive
                onClick={() => onTriggerToast?.('🔥 Llama: ¡Fuego artesanal!')}
              />
              <SketchIcon
                name="sparkle"
                size={28}
                color="#9333ea"
                interactive
                onClick={() => onTriggerToast?.('✨ Chispa: ¡Efecto mágico!')}
              />
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.92rem', opacity: 0.85, lineHeight: 1.35 }}>
              40+ glifos vectoriales trazados a mano con micro-animaciones temáticas nativas al hover o clic.
            </p>
          </div>
        </SketchCard>

        {/* Card 6: Lienzo de Garabatos Libre */}
        <SketchCard title="Modo Garabato Libre" badge="120 FPS">
          <div className="welcome-card-content">
            <p style={{ margin: '0 0 8px 0', fontSize: '0.92rem', opacity: 0.85, lineHeight: 1.35 }}>
              Raya, subraya y haz anotaciones sobre la interfaz como en Paint sin recargar.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <SketchButton
                size="sm"
                variant="architect"
                color="yellow"
                onClick={() => {
                  onToggleDoodle?.(true);
                  onTriggerToast?.('✏️ ¡Estuche abierto! Puedes rayar sobre la pantalla.');
                }}
              >
                ✏️ Probar Garabato en Vivo
              </SketchButton>
              {/* Garabato vectorial decorativo animado */}
              <svg viewBox="0 0 60 22" width="60" height="22" style={{ overflow: 'visible' }}>
                <path
                  d="M 2 11 Q 14 2 28 12 Q 42 22 56 8"
                  fill="none"
                  stroke="#ca8a04"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray="40"
                  strokeDashoffset="0"
                />
              </svg>
            </div>
          </div>
        </SketchCard>
      </div>
    </section>
  );
}

export default WelcomeGallery;

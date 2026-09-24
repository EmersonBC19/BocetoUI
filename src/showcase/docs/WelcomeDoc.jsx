import React, { useState } from 'react';
import './WelcomeDoc.css';
import { HeroPlayground } from './HeroPlayground';
import { WelcomeGallery } from './WelcomeGallery';
import {
  SketchButton,
  SketchBadge,
  SketchDivider,
  SketchLogo,
  SketchGridIcon,
  SketchNotebookIcon,
  SketchPaperIcon,
  SketchChalkboardIcon,
  SketchIcon
} from '../../components/sketch';
import {
  Terminal, Copy, Check, ArrowRight, Sparkles,
  MousePointer, Palette, Zap, ShieldCheck, PenTool,
  GraduationCap, Kanban, ShoppingBag, BookOpen
} from 'lucide-react';

const CANVAS_OPTIONS = [
  { id: 'paper-grid', label: 'Cuadrícula', Icon: SketchGridIcon },
  { id: 'paper-lined', label: 'Cuaderno', Icon: SketchNotebookIcon },
  { id: 'paper-plain', label: 'Blanco', Icon: SketchPaperIcon },
  { id: 'paper-chalk', label: 'Pizarra', Icon: SketchChalkboardIcon },
];

export function WelcomeDoc({
  onNavigate,
  onTriggerToast,
  canvasType = 'paper-grid',
  onSetCanvasType,
  cursorMode = 'comic',
  onSetCursorMode,
  isDoodleOpen,
  onToggleDoodle
}) {
  const [copied, setCopied] = useState(false);
  const installCommand = 'npm install boceto-ui lucide-react';

  const copyInstall = () => {
    navigator.clipboard?.writeText(installCommand);
    setCopied(true);
    onTriggerToast?.('¡Comando npm copiado al portapapeles!');
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="welcome-page">
      {/* 1. NAVBAR DE PRESENTACIÓN */}
      <nav className="welcome-nav" aria-label="Navegación principal de presentación">
        <div className="welcome-nav__brand">
          <SketchLogo size="md" />
        </div>

        <div className="welcome-nav__links">
          <a href="#taller" className="welcome-nav__link">Taller Vivo</a>
          <a href="#galeria" className="welcome-nav__link">Galería</a>
          <a href="#por-que" className="welcome-nav__link">Manifiesto</a>
          <a href="#plantillas" className="welcome-nav__link">Plantillas</a>
        </div>

        <div className="welcome-nav__actions">
          {/* Selector de Papel / Pizarra */}
          {onSetCanvasType && (
            <div className="welcome-nav__canvas-selector">
              {CANVAS_OPTIONS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSetCanvasType(id)}
                  title={`Cambiar fondo a ${label}`}
                  className={`welcome-nav__canvas-btn ${canvasType === id ? 'welcome-nav__canvas-btn--active' : ''}`}
                >
                  <Icon size={13} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Selector de Puntero */}
          {onSetCursorMode && (
            <button
              type="button"
              className={`welcome-nav__tool-btn ${cursorMode === 'comic' ? 'welcome-nav__tool-btn--active' : ''}`}
              onClick={() => {
                const next = cursorMode === 'comic' ? 'native' : 'comic';
                onSetCursorMode(next);
                onTriggerToast?.(next === 'comic' ? 'Puntero Cómic activado' : 'Puntero Nativo');
              }}
              title="Alternar puntero cómic con ráfagas al clic"
            >
              <MousePointer size={14} />
              {cursorMode === 'comic' ? 'Puntero Cómic' : 'Puntero Nativo'}
            </button>
          )}

          {/* Activar Modo Garabato */}
          {onToggleDoodle && (
            <button
              type="button"
              className={`welcome-nav__tool-btn ${isDoodleOpen ? 'welcome-nav__tool-btn--active' : ''}`}
              onClick={() => {
                onToggleDoodle(!isDoodleOpen);
                if (!isDoodleOpen) onTriggerToast?.('✏️ ¡Estuche abierto! Puedes rayar sobre la pantalla.');
              }}
              title="Activar lienzo de dibujo libre y garabatos"
            >
              <PenTool size={14} />
              <span>Garabato</span>
            </button>
          )}

          <SketchButton
            size="sm"
            variant="marker"
            onClick={() => onNavigate?.('quickstart')}
          >
            Get Started <ArrowRight size={14} />
          </SketchButton>
        </div>
      </nav>

      {/* 2. HERO SPLIT: PRESENTACIÓN + TALLER VIVO */}
      <header className="welcome-hero-split" id="taller">
        <div className="welcome-hero__left">
          {/* Fila superior con Badge y Avioncito de papel animado */}
          <div className="welcome-hero__top-row">
            <div className="welcome-hero__badge-container">
              <span className="welcome-hero__badge">
                <Sparkles size={15} className="welcome-hero__sparkle" />
                BocetoUI v1.0.0 · Biblioteca React Artesanal
              </span>
            </div>

            {/* Avioncito de papel vector animado volando con estela punteada */}
            <div className="welcome-hero__plane-decor" title="Diseño artesanal que despega">
              <svg className="welcome-hero__plane-svg" viewBox="0 0 176 56" width="168" height="52">
                <path
                  d="M 6 44 Q 35 50 56 32 Q 74 14 62 4 Q 50 -2 44 14 Q 38 30 64 32 Q 100 34 140 18"
                  fill="none"
                  stroke="var(--sketch-ink, #18181b)"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  className="welcome-hero__plane-trail"
                />
                <g transform="translate(140, 18) rotate(-22)" className="welcome-hero__plane-wrapper">
                  <g className="welcome-hero__plane-glyph">
                    <polygon points="0,0 26,0 6,-8" fill="#ffffff" stroke="#18181b" strokeWidth="1.8" strokeLinejoin="round" />
                    <polygon points="0,0 26,0 7,3" fill="#f4f4f5" stroke="#18181b" strokeWidth="1.8" strokeLinejoin="round" />
                    <polygon points="7,3 26,0 4,9" fill="#e4e4e7" stroke="#18181b" strokeWidth="1.8" strokeLinejoin="round" />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <h1 className="welcome-hero__title">
            Haz que tus interfaces{' '}
            <span className="welcome-hero__highlight">
              cobren vida
              {/* Trazo de subrayador animado dibujado a mano */}
              <svg className="welcome-hero__highlight-svg" viewBox="0 0 240 24" preserveAspectRatio="none">
                <path
                  d="M 4 16 Q 60 11 120 14 Q 180 16 236 12"
                  stroke="var(--sketch-accent-yellow, #fef08a)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                  className="welcome-hero__highlight-path"
                />
              </svg>
            </span>{' '}
            con trazo a mano.
          </h1>

          <p className="welcome-hero__subtitle">
            Dile adiós a las interfaces corporativas frías y aburridas.
            <strong> Más de 50 componentes para React</strong> con bordes tambaleantes orgánicos,
            física Bungee elástica, lienzo interactivo de dibujo libre a 120 FPS, catálogo de 40+ iconos vectoriales
            y un sistema exclusivo de <strong>punteros cómic con ráfagas al clic</strong>.
          </p>

          {/* Barra de instalación npm */}
          <div className="welcome-hero__cli-bar">
            <div className="welcome-hero__cli-code">
              <Terminal size={17} color="#0284c7" />
              <code>{installCommand}</code>
            </div>
            <SketchButton size="sm" variant="marker" onClick={copyInstall}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? ' ¡Copiado!' : ' Copiar'}
            </SketchButton>
          </div>

          {/* Botones de acción principales */}
          <div className="welcome-hero__actions">
            <SketchButton
              size="lg"
              variant="marker"
              onClick={() => onNavigate?.('quickstart')}
            >
              Comenzar (Get Started) <ArrowRight size={18} />
            </SketchButton>

            <SketchButton
              size="lg"
              variant="wobbly"
              onClick={() => onNavigate?.('all')}
            >
              Explorar 50+ Componentes
            </SketchButton>

            <SketchButton
              size="lg"
              variant="default"
              onClick={() => onNavigate?.('templates')}
            >
              Ver 4 Plataformas Reales
            </SketchButton>
          </div>

          {/* Badges de confianza y flecha interactiva hacia Bocetín */}
          <div className="welcome-hero__stats-and-arrow">
            <div className="welcome-hero__stats-row">
              <span className="welcome-hero__stat-pill">⭐ 50+ Componentes UX</span>
              <span className="welcome-hero__stat-pill">✏️ Modo Garabato 120 FPS</span>
              <span className="welcome-hero__stat-pill">🎨 40+ Iconos Artesanales</span>
              <span className="welcome-hero__stat-pill">💥 Ráfagas al Clic</span>
              <span className="welcome-hero__stat-pill">🎯 Cero Librerías CSS</span>
            </div>

            {/* Flecha cómic artesanal que invita a interactuar con Bocetín */}
            <div className="welcome-hero__arrow-callout" title="¡Prueba el taller vivo a la derecha!">
              <svg viewBox="0 0 140 44" width="130" height="42" className="welcome-hero__arrow-svg">
                <path
                  d="M 6 16 Q 48 4 80 20 Q 98 30 120 32"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  className="welcome-hero__arrow-path"
                />
                <path
                  d="M 108 24 L 124 33 L 111 40"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="welcome-hero__arrow-text">¡Prueba a Bocetín! ➔</span>
            </div>
          </div>
        </div>

        {/* Taller Interactivo Vivo en el Hero con Sello Artesanal Giratorio */}
        <div className="welcome-hero__right">
          <div className="welcome-hero__stamp-container">
            {/* Sello de arquitecto giratorio artesanal */}
            <div className="welcome-hero__stamp" title="100% Hecho a Mano · Sin Dependencias CSS">
              <svg viewBox="0 0 100 100" width="78" height="78" className="welcome-hero__stamp-svg">
                <circle cx="50" cy="50" r="45" strokeWidth="2.2" strokeDasharray="140 4" className="welcome-hero__stamp-circle-outer" />
                <circle cx="50" cy="50" r="39" fill="none" strokeWidth="1.2" className="welcome-hero__stamp-circle-inner" />
                <path id="stamp-text-path" d="M 50 17 A 33 33 0 1 1 49.9 17" fill="none" />
                <text fontSize="7.8" fontWeight="900" letterSpacing="1.8" className="welcome-hero__stamp-rotating-text welcome-hero__stamp-text">
                  <textPath href="#stamp-text-path">
                    ★ 100% HECHO A MANO · REACT 19 ·
                  </textPath>
                </text>
                <text x="50" y="46" textAnchor="middle" fontSize="11" fontWeight="900" className="welcome-hero__stamp-text">BOCETO</text>
                <text x="50" y="58" textAnchor="middle" fontSize="8" fontWeight="800" className="welcome-hero__stamp-text">★ ORIGINAL ★</text>
              </svg>
            </div>
            <HeroPlayground onTriggerToast={onTriggerToast} />
          </div>
        </div>
      </header>

      <SketchDivider variant="wavy" />

      {/* 3. GALERÍA INTERACTIVA DE COMPONENTES */}
      <WelcomeGallery onTriggerToast={onTriggerToast} onToggleDoodle={onToggleDoodle} />

      <SketchDivider variant="zigzag" />

      {/* 4. EL MANIFIESTO: ¿POR QUÉ BOCETO-UI? (ILUSTRACIONES VECTORIALES ANIMADAS) */}
      <section className="welcome-section" id="por-que">
        <div className="welcome-section__header">
          <span className="welcome-section__tag">EL MANIFIESTO</span>
          <h2 className="welcome-section__title">Las 4 Claves de BocetoUI</h2>
          <p className="welcome-section__desc">
            Diseñada desde cero para desarrolladores que buscan identidad visual sin sacrificar rendimiento:
          </p>
        </div>

        <div className="welcome-manifest-grid">
          {/* Clave 1: Paleta con gotas de acuarela vivas */}
          <div className="welcome-manifest-card">
            <div className="welcome-manifest-icon" style={{ background: '#fef08a' }}>
              <svg viewBox="0 0 44 44" width="28" height="28" className="welcome-manifest-svg">
                <path
                  d="M 10 24 C 6 12 30 6 38 16 C 44 24 38 34 32 36 C 28 37 25 33 22 34 C 18 35 16 38 12 36 C 9 34 9 28 10 24 Z"
                  fill="#fef9c3"
                  stroke="#18181b"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="18" cy="18" r="3" fill="#ef4444" className="manifesto-anim-blob1" />
                <circle cx="28" cy="16" r="3" fill="#3b82f6" className="manifesto-anim-blob2" />
                <circle cx="34" cy="24" r="3" fill="#16a34a" className="manifesto-anim-blob3" />
                <circle cx="22" cy="28" r="2.5" fill="#ca8a04" />
              </svg>
            </div>
            <h3 className="welcome-manifest-title">0% Genérico, 100% Memorable</h3>
            <p className="welcome-manifest-text">
              Bordes irregulares generados con radios tambaleantes, sombras de tinta dura y texturas de papel real y pizarra.
            </p>
          </div>

          {/* Clave 2: Lápiz trazando garabatos dinámicos */}
          <div className="welcome-manifest-card">
            <div className="welcome-manifest-icon" style={{ background: '#fde047' }}>
              <svg viewBox="0 0 44 44" width="28" height="28" className="welcome-manifest-svg">
                <path
                  d="M 4 38 Q 14 36 20 42 Q 26 46 34 36 Q 40 28 42 36"
                  fill="none"
                  stroke="#854d0e"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="manifesto-anim-stroke"
                />
                <g transform="translate(14, 8) rotate(32)" className="manifesto-anim-pencil">
                  <polygon points="0,0 20,0 20,6 0,6" fill="#facc15" stroke="#18181b" strokeWidth="1.5" />
                  <polygon points="20,0 26,3 20,6" fill="#fde68a" stroke="#18181b" strokeWidth="1.2" />
                  <polygon points="24,2 26,3 24,4" fill="#18181b" />
                  <rect x="-4" y="0" width="4" height="6" fill="#fb7185" stroke="#18181b" strokeWidth="1.2" />
                </g>
              </svg>
            </div>
            <h3 className="welcome-manifest-title">Modo Garabato & Anotaciones</h3>
            <p className="welcome-manifest-text">
              Dibuja a mano alzada a 120 FPS, subraya y haz notas sobre la pantalla con estuche de lápices flotante y passthrough.
            </p>
          </div>

          {/* Clave 3: Racimo de estrellas cómic pulsantes */}
          <div className="welcome-manifest-card">
            <div className="welcome-manifest-icon" style={{ background: '#bfdbfe' }}>
              <svg viewBox="0 0 44 44" width="28" height="28" className="welcome-manifest-svg">
                {/* Estrella principal */}
                <path
                  d="M 22 4 L 26 16 L 38 18 L 28 26 L 32 38 L 22 30 L 12 38 L 16 26 L 6 18 L 18 16 Z"
                  fill="#60a5fa"
                  stroke="#18181b"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  className="manifesto-anim-star"
                />
                {/* Chispita pequeña orbitando */}
                <path
                  d="M 34 6 L 36 10 L 40 10 L 37 13 L 38 16 L 34 14 L 30 16 L 31 13 L 28 10 L 32 10 Z"
                  fill="#ca8a04"
                  className="manifesto-anim-sparkle"
                />
              </svg>
            </div>
            <h3 className="welcome-manifest-title">40+ Iconos Artesanales</h3>
            <p className="welcome-manifest-text">
              Glifos vectoriales trazados a mano para sustituir los vectores rectos, con micro-animaciones temáticas nativas.
            </p>
          </div>

          {/* Clave 4: Rayo de energía eléctrica con destellos */}
          <div className="welcome-manifest-card">
            <div className="welcome-manifest-icon" style={{ background: '#bbf7d0' }}>
              <svg viewBox="0 0 44 44" width="28" height="28" className="welcome-manifest-svg">
                <polygon
                  points="26,2 10,24 22,24 14,42 34,18 22,18"
                  fill="#4ade80"
                  stroke="#18181b"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  className="manifesto-anim-lightning"
                />
                <circle cx="34" cy="14" r="1.5" fill="#16a34a" />
                <circle cx="8" cy="28" r="1.5" fill="#16a34a" />
              </svg>
            </div>
            <h3 className="welcome-manifest-title">Dual Build (ESM + CJS) 52 kB</h3>
            <p className="welcome-manifest-text">
              Compatible con Next.js App Router, Vite y TypeScript. Sin librerías CSS externas ni dependencias ocultas.
            </p>
          </div>
        </div>
      </section>

      <SketchDivider variant="dashed" />

      {/* 5. PLANTILLAS DEL MUNDO REAL */}
      <section className="welcome-section" id="plantillas">
        <div className="welcome-section__header">
          <span className="welcome-section__tag">PLANTILLAS LISTAS</span>
          <h2 className="welcome-section__title">Lleva el boceto a plataformas completas</h2>
          <p className="welcome-section__desc">
            4 aplicaciones completas e interactivas construidas 100% con los componentes de BocetoUI:
          </p>
        </div>

        <div className="welcome-templates-preview">
          <div className="welcome-template-item" onClick={() => onNavigate?.('templates')}>
            <span className="welcome-template-icon">🎒</span>
            <h4>Aula Creativa (LMS / Educación)</h4>
            <p>Checklist interactivo de tareas con tachado a mano, notas del profesor en tinta roja y barra de progreso.</p>
          </div>

          <div className="welcome-template-item" onClick={() => onNavigate?.('templates')}>
            <span className="welcome-template-icon">📋</span>
            <h4>Taller Kanban (SaaS Ágil)</h4>
            <p>Tablero ágil de 3 columnas (*Por Bocetar*, *En Entintado*, *Listo & Firmado*) con tags y avatares de equipo.</p>
          </div>

          <div className="welcome-template-item" onClick={() => onNavigate?.('templates')}>
            <span className="welcome-template-icon">🛒</span>
            <h4>Boceto Market (E-Commerce)</h4>
            <p>Catálogo de artículos creativos con slider interactivo de precio, ratings y carrito de compras en vivo.</p>
          </div>

          <div className="welcome-template-item" onClick={() => onNavigate?.('templates')}>
            <span className="welcome-template-icon">📚</span>
            <h4>DevPad (Wiki Técnica & Docs)</h4>
            <p>Portal de documentación con migas de pan, alertas informativas y bloques de código artesanal listos para copiar.</p>
          </div>
        </div>
      </section>

      {/* 6. BANNER FINAL CTA */}
      <footer className="welcome-footer-banner">
        <h2 className="welcome-footer-title">¿Listo para transformar tu aplicación?</h2>
        <p className="welcome-footer-desc">
          Explora la guía paso a paso de instalación o sumérgete en el catálogo completo de más de 50 componentes artesanales.
        </p>
        <div className="welcome-footer-actions">
          <SketchButton
            size="lg"
            variant="marker"
            onClick={() => onNavigate?.('quickstart')}
          >
            Ir a la Guía de Instalación <ArrowRight size={16} />
          </SketchButton>

          <SketchButton
            size="lg"
            variant="wobbly"
            onClick={() => onNavigate?.('all')}
          >
            Explorar 50+ Componentes
          </SketchButton>
        </div>
      </footer>
    </div>
  );
}

export default WelcomeDoc;


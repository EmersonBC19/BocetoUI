import React, { useState } from 'react';
import './SignatureDoc.css';
import {
  SketchCard, SketchButton, SketchBadge, SketchDivider,
  SketchSpeechBubble, SketchStamp, SketchBurstBadge,
  SketchTape, SketchTornCard, SketchPaperclip, SketchWaxSeal,
  SketchCoffeeStain, SketchAvatar
} from '../../components/sketch';
import {
  Sparkles, MessageSquare, Stamp, Scissors, Bookmark, Zap,
  Paperclip, Coffee, ShieldCheck, Flame, RefreshCw, Copy, Check,
  Layers, Palette, Sliders
} from 'lucide-react';

export function SignatureDoc({ onTriggerToast }) {
  // Preset del Taller Scrapbook
  const [activePreset, setActivePreset] = useState('cafe');
  const [copiedCode, setCopiedCode] = useState(false);

  // Estados interactivos para demos individuales
  const [bubbleVariant, setBubbleVariant] = useState('whisper');
  const [bubbleTail, setBubbleTail] = useState('bottom-left');
  const [bubbleColor, setBubbleColor] = useState('yellow');
  const [sealColor, setSealColor] = useState('crimson');
  const [clipVariant, setClipVariant] = useState('classic');
  const [clipColor, setClipColor] = useState('silver');
  const [stainVariant, setStainVariant] = useState('ring');
  const [stainColor, setStainColor] = useState('espresso');
  const [stainSize, setStainSize] = useState('md');
  const [stainRotation, setStainRotation] = useState(15);
  const [notebookEdge, setNotebookEdge] = useState('right');
  const [stampCount, setStampCount] = useState(0);

  const handleStamp = (label) => {
    setStampCount((c) => c + 1);
    onTriggerToast?.(`¡Sello "${label}" estampado sobre el documento! 📜`);
  };

  const copyStudioCode = () => {
    const code = `<div style={{ position: 'relative', minHeight: 340, padding: 32 }}>
  {/* Mancha de café decorativa */}
  <SketchCoffeeStain variant="${stainVariant}" color="${stainColor}" style={{ position: 'absolute', top: 10, right: 30 }} />

  {/* Tarjeta rasgada con clip metálico y washi tape */}
  <SketchTornCard variant="ticket" title="Pase Creativo" couponCode="ARTISAN-2026" barcode={true}>
    <SketchPaperclip variant="${clipVariant}" color="${clipColor}" placement="top-left" />
    <SketchTape pattern="kraft" corner="top-right" interactive={true} />
    <p>Documento exclusivo autenticado con firma artesanal.</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
      <SketchWaxSeal monogram="B" color="${sealColor}" ribbon={true} interactive={true} />
      <SketchStamp variant="approved" shape="circle" date={true} />
    </div>
  </SketchTornCard>
</div>`;

    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    onTriggerToast?.('¡Código JSX del Taller copiado al portapapeles! 📋✨');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="signature-doc-page">
      {/* Cabecera Principal */}
      <div className="signature-doc-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <h1 className="section-title" style={{ margin: 0 }}>Colección Signature BocetoUI</h1>
          <SketchBadge variant="highlight" size="sm">
            <Sparkles size={13} /> 8 Componentes Exclusivos
          </SketchBadge>
          <SketchBadge variant="pill" size="sm">Papelería Viva & Cómic</SketchBadge>
        </div>
        <p className="section-desc">
          Elementos artesanales con física táctil y personalidad única diseñados para elevar cualquier interfaz:
          clips de oficina metálicos, sellos de cera en relieve, manchas capilares de café, sellos con fechador,
          globos con susurro, washi tape despegable, tickets con código de barras y onomatopeyas cómic.
        </p>
      </div>

      {/* ==========================================================================
          HERO INTERACTIVO: TALLER DEL ARTESANO (SCRAPBOOK STUDIO)
          ========================================================================== */}
      <div className="signature-studio-card">
        <div className="signature-studio-header">
          <div className="signature-studio-title-box">
            <Layers size={20} color="var(--sketch-ink)" />
            <h2 className="signature-studio-title">Mesa de Trabajo Creativa (Scrapbook Studio)</h2>
            <span className="signature-studio-badge">8 en 1 Composición Viva</span>
          </div>

          <div className="signature-studio-presets">
            <span className="signature-label" style={{ marginRight: 6 }}>Estilos Rápidos:</span>
            <button
              type="button"
              className={`signature-btn-pill ${activePreset === 'cafe' ? 'signature-btn-pill--active' : ''}`}
              onClick={() => {
                setActivePreset('cafe');
                setClipVariant('classic');
                setClipColor('silver');
                setStainVariant('double-ring');
                setStainColor('espresso');
                setSealColor('crimson');
                setBubbleVariant('whisper');
              }}
            >
              ☕ Café del Diseñador
            </button>
            <button
              type="button"
              className={`signature-btn-pill ${activePreset === 'royal' ? 'signature-btn-pill--active' : ''}`}
              onClick={() => {
                setActivePreset('royal');
                setClipVariant('binder');
                setClipColor('gold');
                setStainVariant('ring');
                setStainColor('latte');
                setSealColor('gold');
                setBubbleVariant('speech');
              }}
            >
              👑 Decreto Real
            </button>
            <button
              type="button"
              className={`signature-btn-pill ${activePreset === 'comic' ? 'signature-btn-pill--active' : ''}`}
              onClick={() => {
                setActivePreset('comic');
                setClipVariant('binder');
                setClipColor('red');
                setStainVariant('splatter');
                setStainColor('ink');
                setSealColor('navy');
                setBubbleVariant('shout');
              }}
            >
              💥 Impacto Cómic
            </button>
          </div>
        </div>

        {/* Lienzo del Taller */}
        <div className="signature-studio-canvas">
          {/* Mancha de café de fondo */}
          <div className="signature-studio-stain-slot">
            <SketchCoffeeStain
              variant={stainVariant}
              color={stainColor}
              size={170}
              rotation={18}
            />
          </div>

          {/* Tarjeta principal rasgada sujeta con paperclip y washi tape */}
          <div className="signature-studio-paper-assembly">
            <SketchTornCard
              variant="ticket"
              discount={activePreset === 'comic' ? '¡POW!' : '100%'}
              title={activePreset === 'comic' ? 'Pase Cómic Oficial' : activePreset === 'royal' ? 'Decreto de Ilustración' : 'Manuscrito de Notas'}
              couponCode="BOCETO-V2-SIGNATURE"
              barcode={true}
              style={{ maxWidth: 440, width: '100%' }}
              onTear={(action) => onTriggerToast?.(`¡Interacción de rasgado: ${action}!`)}
            >
              {/* Clip de sujeción automático en la esquina superior izquierda */}
              <SketchPaperclip
                variant={clipVariant}
                color={clipColor}
                placement="top-left"
              />

              {/* Washi tape diagonal en la esquina superior derecha */}
              <SketchTape
                pattern={activePreset === 'comic' ? 'dots' : activePreset === 'royal' ? 'striped' : 'kraft'}
                corner="top-right"
                interactive={true}
                onClick={() => onTriggerToast?.('¡Cinta washi tape despegada con física elástica!')}
              />

              <div style={{ padding: '6px 0', minHeight: 80 }}>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.94rem', lineHeight: 1.45 }}>
                  {activePreset === 'comic'
                    ? 'Edición limitada con ráfagas de acción, tintas vivas y trazos enérgicos.'
                    : activePreset === 'royal'
                    ? 'Certificado artesanal con lacre fundido, ribete de seda y doble relieve.'
                    : 'Anotaciones de diseño sobre papel bond. Cada detalle se siente dibujado a pluma.'}
                </p>

                {/* Sello de Lacre + Sello de Tinta redonda dentro de la tarjeta */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
                  <SketchWaxSeal
                    monogram={activePreset === 'royal' ? '👑' : 'B'}
                    color={sealColor}
                    ribbon={true}
                    interactive={true}
                    size="md"
                    onClick={() => onTriggerToast?.('¡Lacre real presionado con relieve 3D! 🕯️')}
                  />

                  <SketchStamp
                    status={activePreset === 'comic' ? 'urgent' : 'verified'}
                    shape="circle"
                    date={true}
                    porosity={true}
                    interactive={true}
                    onClick={() => handleStamp('CERTIFICADO')}
                  />
                </div>
              </div>
            </SketchTornCard>
          </div>

          {/* Elementos flotantes adyacentes: Globo de diálogo y Burst Badge */}
          <div className="signature-studio-side-elements">
            <SketchSpeechBubble
              variant={bubbleVariant}
              tail="bottom-left"
              color={activePreset === 'comic' ? 'pink' : 'yellow'}
              title={bubbleVariant === 'whisper' ? 'Susurro confidencial...' : 'Bocetín'}
              avatar={<SketchAvatar initials="B" size="sm" />}
            >
              {bubbleVariant === 'whisper'
                ? 'Psst... los clips y el washi tape reaccionan a tus clics.'
                : bubbleVariant === 'shout'
                ? '¡¡COLECCIÓN SIGNATURE 100% OPERATIVA!!'
                : '¡Mira cómo conviven todos los elementos en armonía!'}
            </SketchSpeechBubble>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <SketchBurstBadge
                variant={activePreset === 'comic' ? 'action' : 'halftone'}
                text={activePreset === 'comic' ? '¡CRASH!' : '¡ÉXITO!'}
                color={activePreset === 'comic' ? 'red' : 'purple'}
                onClick={() => onTriggerToast?.('¡Insignia cómic explotada con energía! 💥')}
              />
            </div>
          </div>
        </div>

        {/* Barra de exportación de código JSX */}
        <div className="signature-studio-footer">
          <div className="signature-studio-footer-info">
            <span style={{ fontFamily: 'var(--font-sketch-code)', fontSize: '0.84rem' }}>
              Código generado listo para tu aplicación React:
            </span>
          </div>
          <button
            type="button"
            className="signature-copy-btn"
            onClick={copyStudioCode}
          >
            {copiedCode ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
            <span>{copiedCode ? '¡Copiado!' : 'Copiar JSX de la Composición'}</span>
          </button>
        </div>
      </div>

      <SketchDivider variant="wavy" />

      {/* ==========================================================================
          1. SKETCH PAPERCLIP (CLIPS METÁLICOS & BINDER)
          ========================================================================== */}
      <SketchCard title="1. SketchPaperclip (Clips de Oficina & Pinzas Binder)" badge="Nuevo">
        <p className="signature-section-intro">
          Sujeta notas, formularios y tarjetas con clips metálicos de alambre o pinzas binder tridimensionales con brillos especulares.
        </p>

        <div className="signature-controls-bar">
          <div className="signature-control-row">
            <span className="signature-label">Tipo:</span>
            <button
              type="button"
              className={`signature-btn-pill ${clipVariant === 'classic' ? 'signature-btn-pill--active' : ''}`}
              onClick={() => setClipVariant('classic')}
            >
              Alambre Clásico
            </button>
            <button
              type="button"
              className={`signature-btn-pill ${clipVariant === 'binder' ? 'signature-btn-pill--active' : ''}`}
              onClick={() => setClipVariant('binder')}
            >
              Pinza Binder
            </button>
          </div>

          <div className="signature-control-row">
            <span className="signature-label">Color:</span>
            {['silver', 'gold', 'red', 'blue', 'green', 'black'].map((c) => (
              <button
                key={c}
                type="button"
                className={`signature-btn-pill ${clipColor === c ? 'signature-btn-pill--active' : ''}`}
                onClick={() => setClipColor(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="signature-paperclip-showcase">
          <div className="signature-paperclip-demo-box">
            <span className="signature-sublabel">Montado en Tarjeta:</span>
            <div className="signature-card-clip-container">
              <SketchPaperclip variant={clipVariant} color={clipColor} placement="top-left" />
              <div className="signature-card-clip-inner">
                <strong>Informe Confidencial</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem' }}>
                  El clip abraza el borde superior creando un efecto de profundidad física.
                </p>
              </div>
            </div>
          </div>

          <div className="signature-paperclip-demo-box">
            <span className="signature-sublabel">Pinza Binder con Anillas Abatibles:</span>
            <div className="signature-card-clip-container">
              <SketchPaperclip variant="binder" color="black" placement="top-center" />
              <div className="signature-card-clip-inner">
                <strong>Expediente Abrazado</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem' }}>
                  Pinza metálica gruesa con doble anilla de presión abatida.
                </p>
              </div>
            </div>
          </div>

          <div className="signature-paperclip-demo-box">
            <span className="signature-sublabel">Independiente (Standalone):</span>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '16px 0' }}>
              <SketchPaperclip variant="classic" color="gold" size="lg" rotation={15} />
              <SketchPaperclip variant="classic" color="red" size="md" rotation={-10} />
              <SketchPaperclip variant="binder" color="silver" size="lg" rotation={5} />
            </div>
          </div>
        </div>
      </SketchCard>

      <SketchDivider variant="dashed" />

      {/* ==========================================================================
          2. SKETCH WAX SEAL (SELLOS DE LACRE REAL)
          ========================================================================== */}
      <SketchCard title="2. SketchWaxSeal (Sellos de Lacre Fundido)" badge="Nuevo">
        <p className="signature-section-intro">
          Lacre auténtico con perímetro orgánico ondulante, relieve concéntrico, cintas de seda y animación táctil de sellado.
        </p>

        <div className="signature-controls-bar">
          <div className="signature-control-row">
            <span className="signature-label">Color de Cera:</span>
            {['crimson', 'gold', 'navy', 'emerald', 'black'].map((c) => (
              <button
                key={c}
                type="button"
                className={`signature-btn-pill ${sealColor === c ? 'signature-btn-pill--active' : ''}`}
                onClick={() => setSealColor(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="signature-seals-grid">
          <div className="signature-seal-item">
            <SketchWaxSeal
              monogram="B"
              color={sealColor}
              ribbon={true}
              interactive={true}
              size="lg"
              onClick={() => onTriggerToast?.('¡Sello de Lacre "B" presionado!')}
            />
            <span className="signature-seal-label">Monograma "B" con Cinta</span>
          </div>

          <div className="signature-seal-item">
            <SketchWaxSeal
              monogram="★"
              color="gold"
              ribbon={true}
              interactive={true}
              size="lg"
              onClick={() => onTriggerToast?.('¡Sello Real de Oro Estrella presionado!')}
            />
            <span className="signature-seal-label">Oro Real Estrella</span>
          </div>

          <div className="signature-seal-item">
            <SketchWaxSeal
              icon={<ShieldCheck size={26} color="#ffffff" />}
              color="navy"
              ribbon={false}
              interactive={true}
              size="md"
              onClick={() => onTriggerToast?.('¡Sello de Seguridad Oficial presionado!')}
            />
            <span className="signature-seal-label">Emblema de Seguridad</span>
          </div>

          <div className="signature-seal-item">
            <SketchWaxSeal
              monogram="VIP"
              color="emerald"
              ribbon={true}
              interactive={true}
              size="md"
              onClick={() => onTriggerToast?.('¡Sello Esmeralda VIP presionado!')}
            />
            <span className="signature-seal-label">Esmeralda VIP</span>
          </div>
        </div>
      </SketchCard>

      <SketchDivider variant="zigzag" />

      {/* ==========================================================================
          3. SKETCH COFFEE STAIN (MANCHAS DE CAFÉ & TINTA)
          ========================================================================== */}
      <SketchCard title="3. SketchCoffeeStain (Aros y Manchas de Taza de Café)" badge="Interactivo">
        <p className="signature-section-intro">
          Efecto orgánico de fondo que simula una taza de café apoyada sobre los planos o apuntes. Modifica los controles a continuación y observa cómo cambia en tiempo real en el lienzo de prueba interactivo:
        </p>

        <div className="signature-controls-bar">
          <div className="signature-control-row">
            <span className="signature-label">Forma:</span>
            {[
              { id: 'ring', label: 'Aro Simple' },
              { id: 'double-ring', label: 'Doble Aro' },
              { id: 'splatter', label: 'Salpicadura' }
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                className={`signature-btn-pill ${stainVariant === s.id ? 'signature-btn-pill--active' : ''}`}
                onClick={() => {
                  setStainVariant(s.id);
                  onTriggerToast?.(`Forma de mancha: ${s.label} ☕`);
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="signature-control-row">
            <span className="signature-label">Tono de Líquido:</span>
            {[
              { id: 'espresso', label: 'Espresso (Tostado)' },
              { id: 'latte', label: 'Latte (Claro)' },
              { id: 'ink', label: 'Tinta Azul' },
              { id: 'water', label: 'Agua / Suave' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                className={`signature-btn-pill ${stainColor === t.id ? 'signature-btn-pill--active' : ''}`}
                onClick={() => {
                  setStainColor(t.id);
                  onTriggerToast?.(`Tono de líquido: ${t.label} 💧`);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="signature-control-row">
            <span className="signature-label">Tamaño:</span>
            {['sm', 'md', 'lg'].map((sz) => (
              <button
                key={sz}
                type="button"
                className={`signature-btn-pill ${stainSize === sz ? 'signature-btn-pill--active' : ''}`}
                onClick={() => setStainSize(sz)}
              >
                {sz.toUpperCase()}
              </button>
            ))}
            <button
              type="button"
              className="signature-btn-pill"
              onClick={() => {
                setStainRotation((prev) => (prev + 35) % 360);
                onTriggerToast?.('¡Ángulo de la taza girado (+35°)!');
              }}
              title="Girar mancha"
            >
              🎲 Girar (+35°)
            </button>
          </div>
        </div>

        {/* LIENZO DE PRUEBA EN VIVO QUE RESPONDE DIRECTAMENTE A LOS CONTROLES */}
        <div className="signature-stain-live-box">
          <div className="signature-stain-live-paper">
            <SketchCoffeeStain
              key={`${stainVariant}-${stainColor}-${stainSize}-${stainRotation}`}
              variant={stainVariant}
              color={stainColor}
              size={stainSize}
              rotation={stainRotation}
              opacity={0.42}
              interactive={true}
            />
            <div className="signature-stain-live-caption">
              <strong>Vista Previa en Tiempo Real:</strong>
              <div>
                Forma: <code>{stainVariant}</code> · Tono: <code>{stainColor}</code> · Tamaño: <code>{stainSize}</code> · Ángulo: <code>{stainRotation}°</code>
              </div>
            </div>
          </div>
        </div>

        {/* Comparativa de las 3 Formas */}
        <div className="signature-stains-showcase">
          <div
            className={`signature-stain-card ${stainVariant === 'ring' ? 'signature-stain-card--selected' : ''}`}
            onClick={() => {
              setStainVariant('ring');
              setStainColor('espresso');
              onTriggerToast?.('Aro Simple Espresso seleccionado');
            }}
            style={{ cursor: 'pointer' }}
            title="Clic para probar en el lienzo en vivo"
          >
            <div className="signature-stain-wrapper">
              <SketchCoffeeStain variant="ring" color="espresso" size={120} />
              <div className="signature-stain-content">
                <strong>Aro Simple Espresso</strong>
                <p>Borde oscuro por capilaridad y gotas satélite.</p>
                <span className="signature-stain-tag">Clic para activar</span>
              </div>
            </div>
          </div>

          <div
            className={`signature-stain-card ${stainVariant === 'double-ring' ? 'signature-stain-card--selected' : ''}`}
            onClick={() => {
              setStainVariant('double-ring');
              setStainColor('latte');
              onTriggerToast?.('Doble Aro Latte seleccionado');
            }}
            style={{ cursor: 'pointer' }}
            title="Clic para probar en el lienzo en vivo"
          >
            <div className="signature-stain-wrapper">
              <SketchCoffeeStain variant="double-ring" color="latte" size={120} />
              <div className="signature-stain-content">
                <strong>Doble Aro Latte</strong>
                <p>Simula el apoyo repetido de la taza en dos posiciones.</p>
                <span className="signature-stain-tag">Clic para activar</span>
              </div>
            </div>
          </div>

          <div
            className={`signature-stain-card ${stainVariant === 'splatter' ? 'signature-stain-card--selected' : ''}`}
            onClick={() => {
              setStainVariant('splatter');
              setStainColor('ink');
              onTriggerToast?.('Salpicadura de Tinta seleccionada');
            }}
            style={{ cursor: 'pointer' }}
            title="Clic para probar en el lienzo en vivo"
          >
            <div className="signature-stain-wrapper">
              <SketchCoffeeStain variant="splatter" color="ink" size={120} />
              <div className="signature-stain-content">
                <strong>Salpicadura de Tinta</strong>
                <p>Ideal para cómics o bocetos de tinta china suelta.</p>
                <span className="signature-stain-tag">Clic para activar</span>
              </div>
            </div>
          </div>
        </div>
      </SketchCard>

      <SketchDivider variant="wavy" />

      {/* ==========================================================================
          4. SKETCH STAMP (SELLOS DE TINTA CON TEXTPATH & FECHADOR)
          ========================================================================== */}
      <SketchCard title="4. SketchStamp (Sellos Circulares, Ovalados & Fechador)" badge="Evolucionado">
        <p className="signature-section-intro">
          Ahora con soporte de sellos circulares con texto arqueado en SVG nativo, fechador dinámico automático y textura de porosidad de tinta.
        </p>

        <div className="signature-stamps-grid">
          {/* Sellos circulares */}
          <SketchStamp
            status="approved"
            shape="circle"
            date={true}
            onClick={() => handleStamp('APROBADO REDONDO')}
          />
          <SketchStamp
            status="verified"
            shape="circle"
            date={true}
            onClick={() => handleStamp('VERIFICADO REDONDO')}
          />
          <SketchStamp
            status="confidential"
            shape="oval"
            date={true}
            onClick={() => handleStamp('CONFIDENCIAL OVALADO')}
          />

          {/* Sellos rectangulares clásicos */}
          <SketchStamp status="approved" shape="rectangle" onClick={() => handleStamp('APROBADO')} />
          <SketchStamp status="draft" shape="rectangle" onClick={() => handleStamp('BORRADOR')} />
          <SketchStamp status="urgent" shape="rectangle" onClick={() => handleStamp('¡URGENTE!')} />
        </div>

        {stampCount > 0 && (
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-sketch-code)', fontSize: '0.85rem', color: '#16a34a' }}>
              ✓ Has estampado {stampCount} sellos en esta sesión
            </span>
          </div>
        )}
      </SketchCard>

      <SketchDivider variant="dashed" />

      {/* ==========================================================================
          5. SKETCH SPEECH BUBBLE (GLOBOS CÓMIC & SUSURRO)
          ========================================================================== */}
      <SketchCard title="5. SketchSpeechBubble (Globos con Susurro y Avatar)" badge="Evolucionado">
        <div className="signature-bubble-demo">
          <div className="signature-bubble-controls">
            <div className="signature-control-row">
              <span className="signature-label">Estilo:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['speech', 'whisper', 'thought', 'shout'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`signature-btn-pill ${bubbleVariant === v ? 'signature-btn-pill--active' : ''}`}
                    onClick={() => setBubbleVariant(v)}
                  >
                    {v === 'speech' ? 'Diálogo' : v === 'whisper' ? 'Susurro' : v === 'thought' ? 'Pensamiento' : 'Grito / Shout'}
                  </button>
                ))}
              </div>
            </div>

            <div className="signature-control-row">
              <span className="signature-label">Cola:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['bottom-left', 'bottom-right', 'top-left', 'top-right'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`signature-btn-pill ${bubbleTail === t ? 'signature-btn-pill--active' : ''}`}
                    onClick={() => setBubbleTail(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="signature-control-row">
              <span className="signature-label">Color:</span>
              {['yellow', 'blue', 'pink', 'white'].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`signature-btn-pill ${bubbleColor === c ? 'signature-btn-pill--active' : ''}`}
                  onClick={() => setBubbleColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="signature-bubble-stage">
            <SketchSpeechBubble
              variant={bubbleVariant}
              tail={bubbleTail}
              color={bubbleColor}
              avatar={<SketchAvatar initials="AI" size="md" status={true} />}
              title={bubbleVariant === 'whisper' ? 'Secreto Compartido...' : bubbleVariant === 'shout' ? '¡¡EXTRA EXTRA!!' : 'Asistente Boceto'}
            >
              {bubbleVariant === 'whisper'
                ? 'Este bocadillo tiene trazo discontinuo y sutileza para notas secretas.'
                : bubbleVariant === 'thought'
                ? '¿Cómo logramos que cada componente despierte una sonrisa al usuario?'
                : bubbleVariant === 'shout'
                ? '¡¡LANZAMIENTO OFICIAL DE LA COLECCIÓN SIGNATURE COMPLETA!!'
                : '¡Hola! Este globo de diálogo ahora integra su avatar de forma nativa.'}
            </SketchSpeechBubble>
          </div>
        </div>
      </SketchCard>

      <SketchDivider variant="zigzag" />

      {/* ==========================================================================
          6. SKETCH TAPE (WASHI TAPE & DESPEGADO INTERACTIVO)
          ========================================================================== */}
      <SketchCard title="6. SketchTape (Washi Tape, Esquinas & Despegado)" badge="Evolucionado">
        <p className="signature-section-intro">
          Haz clic en cualquier cinta para probar la nueva física de despegado (Peel Effect) y esquinas automáticas:
        </p>

        <div className="signature-tape-showcase">
          <div className="signature-tape-item">
            <SketchTape pattern="masking" width={130} interactive={true} />
            <span className="signature-tape-item-label">Masking Tape Clásica</span>
          </div>

          <div className="signature-tape-item">
            <SketchTape pattern="kraft" width={130} interactive={true} />
            <span className="signature-tape-item-label">Kraft Empaque Texturizado</span>
          </div>

          <div className="signature-tape-item">
            <SketchTape pattern="dots" width={130} interactive={true} />
            <span className="signature-tape-item-label">Washi Tape Lunares (Dots)</span>
          </div>

          <div className="signature-tape-item">
            <SketchTape pattern="striped" width={130} interactive={true} />
            <span className="signature-tape-item-label">Rayas Diagonales</span>
          </div>

          <div className="signature-tape-item">
            <SketchTape pattern="grid" width={130} interactive={true} />
            <span className="signature-tape-item-label">Cuadrícula Pastel</span>
          </div>
        </div>
      </SketchCard>

      <SketchDivider variant="wavy" />

      {/* ==========================================================================
          7. SKETCH TORN CARD (CORTE REAL DE CUPÓN PERFORADO & NOTAS RASGADAS)
          ========================================================================== */}
      <SketchCard title="7. SketchTornCard (Corte Físico de Cupón Perforado & Papel Rasgado)" badge="Corte Real 3D">
        <p className="signature-section-intro">
          Experimenta el verdadero desprendimiento de un cupón de papel: haz clic en <strong>"✂ CORTAR CUPÓN"</strong> para ver la tijera deslizarse por la línea punteada, cortar las fibras y separar físicamente el talón en dos piezas con micro-dientes perforados en SVG y sello de canje automático.
        </p>

        <div className="signature-coupon-demo-container">
          <div className="signature-coupon-demo-card">
            <span className="signature-sublabel" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Scissors size={16} /> Demostración de Cupón Desprendible (Haz clic para cortar):
            </span>

            <SketchTornCard
              variant="ticket"
              discount="70% OFF"
              title="Vale Promocional Exclusivo"
              couponCode="BOCETO-SUPER-70"
              barcode="9 845201 382914"
              onTear={(action) =>
                onTriggerToast?.(
                  action === 'restored'
                    ? '¡Cupón reconstruido y unido de nuevo! 🎟️'
                    : `¡ZAS! ✂️ Cupón "${action}" cortado físicamente y copiado al portapapeles.`
                )
              }
            >
              <div style={{ padding: '6px 0' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.94rem', lineHeight: 1.45 }}>
                  Este boleto simula papel moneda artesanal troquelado. Al cortarlo, el talón superior se separa físicamente en el espacio con su propia sombra proyectada y muestra los dientes dentados de papel roto.
                </p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <SketchBadge variant="wobbly" size="sm">✓ Válido en Tienda</SketchBadge>
                  <SketchBadge variant="highlight" size="sm">Sin Fecha de Caducidad</SketchBadge>
                </div>
              </div>
            </SketchTornCard>
          </div>

          <div className="signature-coupon-demo-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              <span className="signature-sublabel" style={{ display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
                📄 Manuscrito de Cuaderno Rasgable:
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {[
                  { id: 'right', label: 'Lateral Derecho' },
                  { id: 'bottom', label: 'Inferior' },
                  { id: 'left', label: 'Lateral Izquierdo' }
                ].map((ed) => (
                  <button
                    key={ed.id}
                    type="button"
                    className={`signature-btn-pill ${notebookEdge === ed.id ? 'signature-btn-pill--active' : ''}`}
                    onClick={() => {
                      setNotebookEdge(ed.id);
                      onTriggerToast?.(`Borde de rasgado: ${ed.label}`);
                    }}
                  >
                    {ed.label}
                  </button>
                ))}
              </div>
            </div>

            <SketchTornCard
              key={notebookEdge}
              variant="torn"
              tornEdge={notebookEdge}
              title="Ficha Técnica de Diseño"
              badge={`Borde ${notebookEdge}`}
              barcode={false}
              onTear={(action) =>
                onTriggerToast?.(
                  action === 'restored'
                    ? '¡Hoja restaurada en el archivador! 🩹'
                    : '¡Crack! Papel rasgado con desprendimiento físico de fibras 📄💥'
                )
              }
            >
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.5, fontFamily: 'var(--font-sketch-cursive, serif)' }}>
                Borde rasgado orgánico auténtico: sin líneas rectas superpuestas. La frontera del papel se funde de forma natural con los dientes vectoriales en SVG. Pulsa <strong>"✂️ Rasgar Hoja"</strong> para ver la tira física desprenderse y caer.
              </p>
            </SketchTornCard>
          </div>
        </div>
      </SketchCard>

      <SketchDivider variant="dashed" />

      {/* ==========================================================================
          8. SKETCH BURST BADGE (ONOMACOPEYAS ACTION & HALFTONE)
          ========================================================================== */}
      <SketchCard title="8. SketchBurstBadge (Onomatopeyas Manga Action & Halftone)" badge="Evolucionado">
        <p className="signature-section-intro">
          Haz clic en cada insignia para experimentar la animación pop cómic:
        </p>

        <div className="signature-bursts-row">
          <SketchBurstBadge
            variant="action"
            text="¡POW!"
            color="red"
            onClick={() => onTriggerToast?.('¡POW! Impacto con ráfagas manga')}
          />
          <SketchBurstBadge
            variant="halftone"
            text="¡BOING!"
            color="yellow"
            onClick={() => onTriggerToast?.('¡BOING! Textura Ben-Day dots retro')}
          />
          <SketchBurstBadge
            variant="action"
            text="¡ZAP!"
            color="blue"
            onClick={() => onTriggerToast?.('¡ZAP! Rayos de acción')}
          />
          <SketchBurstBadge
            variant="halftone"
            text="¡OFERTA!"
            color="green"
            onClick={() => onTriggerToast?.('¡OFERTA especial con textura!')}
          />
          <SketchBurstBadge
            variant="default"
            text="¡WOW!"
            color="purple"
            onClick={() => onTriggerToast?.('¡WOW clásico!')}
          />
        </div>
      </SketchCard>
    </div>
  );
}

export default SignatureDoc;

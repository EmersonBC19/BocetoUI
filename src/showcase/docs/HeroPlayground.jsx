import React, { useState } from 'react';
import './HeroPlayground.css';
import { BocetinCharacter } from './BocetinCharacter';
import {
  SketchCard, SketchButton, SketchBadge, SketchSlider,
  SketchSwitch, SketchDropdown
} from '../../components/sketch';
import { Sparkles, Zap, Lightbulb, MousePointerClick, Heart, Share2, Copy } from 'lucide-react';

const COMIC_WORDS = ['¡POW!', '¡BOING!', '¡ZAP!', '¡CLIC!', '¡WOOSH!', '¡SPLASH!'];

export function HeroPlayground({ onTriggerToast, onCopyCode }) {
  const [energy, setEnergy] = useState(70);
  const [lightOn, setLightOn] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [recentWord, setRecentWord] = useState('¡POW!');
  const [isBouncing, setIsBouncing] = useState(false);

  const handleBungeeClick = () => {
    const nextCount = clickCount + 1;
    const nextWord = COMIC_WORDS[nextCount % COMIC_WORDS.length];
    setClickCount(nextCount);
    setRecentWord(nextWord);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 420);
    onTriggerToast?.(`${nextWord} Bocetín saltó con impacto elástico #${nextCount}`);
  };

  const dropdownItems = [
    {
      id: '1',
      label: 'Copiar comando npm',
      icon: <Copy size={14} />,
      onClick: () => {
        navigator.clipboard?.writeText('npm install boceto-ui lucide-react');
        onTriggerToast?.('¡Comando npm copiado!');
      }
    },
    {
      id: '2',
      label: 'Dar Amor al Proyecto',
      icon: <Heart size={14} color="#e11d48" />,
      onClick: () => onTriggerToast?.('¡Bocetín te manda un abrazo de tinta! ❤️')
    },
    {
      id: '3',
      label: 'Compartir BocetoUI',
      icon: <Share2 size={14} color="#0284c7" />,
      onClick: () => onTriggerToast?.('¡Enlace listo para compartir!')
    }
  ];

  // Expresión y descripción de Bocetín según el slider
  const getMood = () => {
    if (energy < 35) {
      return {
        label: 'Modo Zen',
        color: '#64748b',
        tip: 'Bocetín medita plácidamente entre zetas de sueño.'
      };
    }
    if (energy < 75) {
      return {
        label: 'Modo Inspirado',
        color: '#0284c7',
        tip: 'Bocetín viste su boina de artista y tiene la bombilla encendida.'
      };
    }
    return {
      label: '¡Súper Cómic!',
      color: '#ea580c',
      tip: '¡Máxima energía! Gafas de sol retro, ráfagas de acción y chispas.'
    };
  };

  const mood = getMood();

  return (
    <div className="hero-playground">
      <SketchCard
        title="Taller Vivo en Directo"
        badge="¡Pruébame Ahora!"
        className="hero-playground__card"
      >
        {/* Cabecera del Taller: Personaje Bocetín */}
        <div className="hero-playground__doodle-stage">
          <BocetinCharacter
            energy={energy}
            lightOn={lightOn}
            isBouncing={isBouncing}
            onClick={handleBungeeClick}
          />

          <div className="hero-playground__doodle-info">
            <div className="hero-playground__doodle-badge-row">
              <span className="hero-playground__doodle-name">Bocetín el Ilustrador</span>
              <SketchBadge variant="highlight" size="sm">
                {mood.label} ({energy}%)
              </SketchBadge>
            </div>
            <p className="hero-playground__doodle-tip">
              {mood.tip} Mueve el slider o pulsa su pancita para hacerlo saltar.
            </p>
          </div>
        </div>

        {/* Control 1: Slider de Energía Creativa */}
        <div className="hero-playground__control-block">
          <SketchSlider
            label="Nivel de Energía Creativa"
            min={0}
            max={100}
            value={energy}
            onChange={setEnergy}
            step={1}
          />
        </div>

        {/* Control 2: Botón Bungee y Switch */}
        <div className="hero-playground__row">
          <div className="hero-playground__bungee-box">
            <div className="hero-playground__btn-wrapper">
              <SketchButton
                variant="marker"
                size="md"
                onClick={handleBungeeClick}
                className="hero-playground__action-btn"
              >
                <Zap size={16} /> ¡Presióname!
              </SketchButton>
              {clickCount > 0 && (
                <span className="hero-playground__comic-tag" key={clickCount}>
                  {recentWord}
                </span>
              )}
            </div>
            <span className="hero-playground__counter-text">
              {clickCount === 0 ? 'Física Bungee al clic' : `💥 ${clickCount} impactos elásticos`}
            </span>
          </div>

          <div className="hero-playground__switch-box">
            <SketchSwitch
              label="Foco Creativo"
              checked={lightOn}
              onChange={setLightOn}
            />
            <span className="hero-playground__light-indicator">
              <Lightbulb size={14} color={lightOn ? '#ca8a04' : '#a1a1aa'} />
              {lightOn ? 'Lienzo iluminado' : 'Modo nocturno'}
            </span>
          </div>
        </div>

        {/* Control 3: Menú Desplegable & Zona de Chispas del Cursor */}
        <div className="hero-playground__footer-row">
          <SketchDropdown
            placement="top-start"
            trigger={
              <SketchButton size="sm" variant="wobbly">
                Menú Artesanal <Sparkles size={14} />
              </SketchButton>
            }
            items={dropdownItems}
          />

          <div
            className="hero-playground__spark-zone"
            onClick={() => onTriggerToast?.('¡Ráfaga de cómic activada en el lienzo!')}
            title="Haz clic aquí o en cualquier parte para ver las ráfagas del puntero cómic"
          >
            <MousePointerClick size={15} />
            <span>Zona de clic: ¡Pruébame aquí!</span>
          </div>
        </div>
      </SketchCard>
    </div>
  );
}

export default HeroPlayground;

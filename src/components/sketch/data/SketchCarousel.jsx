import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SketchCarousel.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * SketchCarousel - Carrusel de diapositivas y contenido artesanal
 */
export function SketchCarousel({
  items = [],
  children,
  autoplay = false,
  interval = 4000,
  showArrows = true,
  showDots = true,
  className = '',
  ...props
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const slides = items.length > 0 ? items : React.Children.toArray(children);
  const total = slides.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (autoplay && !isHovered && total > 1) {
      timerRef.current = setInterval(nextSlide, interval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, isHovered, interval, nextSlide, total]);

  if (total === 0) return null;

  return (
    <div
      className={`sketch-carousel ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="sketch-carousel__viewport">
        <div
          className="sketch-carousel__track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="sketch-carousel__slide">
              {typeof slide === 'function' ? slide() : slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            className="sketch-carousel__btn sketch-carousel__btn--prev"
            onClick={prevSlide}
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="sketch-carousel__btn sketch-carousel__btn--next"
            onClick={nextSlide}
            aria-label="Diapositiva siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {showDots && total > 1 && (
        <div className="sketch-carousel__indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`sketch-carousel__dot ${idx === currentIndex ? 'sketch-carousel__dot--active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Ir a la diapositiva ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SketchCarousel;

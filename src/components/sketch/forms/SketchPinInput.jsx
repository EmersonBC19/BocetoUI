import React, { useRef, useState, useEffect } from 'react';
import './SketchPinInput.css';
import { AlertCircle } from 'lucide-react';

/**
 * SketchPinInput - Casillas para código PIN u OTP con trazo a mano
 */
export function SketchPinInput({
  length = 4,
  value = '',
  onChange,
  onComplete,
  mask = false,
  disabled = false,
  error,
  label,
  className = '',
  autoFocus = false,
  ...props
}) {
  const [digits, setDigits] = useState(() => {
    const arr = Array(length).fill('');
    if (value) {
      for (let i = 0; i < Math.min(value.length, length); i++) {
        arr[i] = value[i];
      }
    }
    return arr;
  });

  const inputsRef = useRef([]);

  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    const arr = Array(length).fill('');
    if (value) {
      for (let i = 0; i < Math.min(value.length, length); i++) {
        arr[i] = value[i];
      }
    }
    setDigits(arr);
  }

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index, e) => {
    const val = e.target.value;
    const char = val.slice(-1); // último caracter ingresado
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    const fullVal = newDigits.join('');
    onChange?.(fullVal);

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newDigits.every((d) => d !== '') && fullVal.length === length) {
      onComplete?.(fullVal);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
        onChange?.(newDigits.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (!pastedData) return;

    const newDigits = [...digits];
    for (let i = 0; i < pastedData.length; i++) {
      newDigits[i] = pastedData[i];
    }
    setDigits(newDigits);

    const fullVal = newDigits.join('');
    onChange?.(fullVal);

    const nextIndex = Math.min(pastedData.length, length - 1);
    inputsRef.current[nextIndex]?.focus();

    if (newDigits.every((d) => d !== '') && fullVal.length === length) {
      onComplete?.(fullVal);
    }
  };

  return (
    <div
      className={`sketch-pin-container ${error ? 'sketch-pin-container--error' : ''} ${className}`}
      {...props}
    >
      {label && <label className="sketch-label">{label}</label>}

      <div className={`sketch-pin-inputs ${error ? 'sketch-shake' : ''}`} onPaste={handlePaste}>
        {Array.from({ length }).map((_, index) => {
          const digitValue = digits[index] || '';
          return (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type={mask ? 'password' : 'text'}
              inputMode="numeric"
              maxLength={1}
              value={digitValue}
              disabled={disabled}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`sketch-pin-box ${digitValue ? 'sketch-pin-box--filled' : ''}`}
              aria-label={`Dígito ${index + 1}`}
            />
          );
        })}
      </div>

      {error && (
        <span className="sketch-pin-error-text">
          <span className="sketch-error-arrow" aria-hidden="true">↳</span>
          <AlertCircle size={14} /> {error}
        </span>
      )}
    </div>
  );
}

export default SketchPinInput;

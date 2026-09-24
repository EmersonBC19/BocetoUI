import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchPinInput, SketchButton } from '../../components/sketch';

export function PinInputDoc({ onTriggerToast }) {
  const [pinValue, setPinValue] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const propsList = [
    { name: 'length', type: 'number', default: '4', description: 'Número de casillas para dígitos' },
    { name: 'value', type: 'string', default: "''", description: 'Valor del código' },
    { name: 'onChange', type: '(val: string) => void', default: 'undefined', description: 'Callback en cada dígito ingresado' },
    { name: 'onComplete', type: '(val: string) => void', default: 'undefined', description: 'Callback al rellenar todas las casillas' },
    { name: 'mask', type: 'boolean', default: 'false', description: 'Oculta los caracteres en modo contraseña' },
    { name: 'error', type: 'string', default: 'undefined', description: 'Mensaje de error con animación de temblor' }
  ];

  const codeSnippet = `import { SketchPinInput } from 'boceto-ui';

<SketchPinInput
  length={4}
  label="Código de Seguridad"
  onComplete={(code) => console.log('PIN completado:', code)}
/>`;

  return (
    <ComponentDocLayout
      title="SketchPinInput"
      category="Formularios & Entradas"
      description="Casillas de verificación de 4 o 6 dígitos (PIN / OTP) con bordes asimétricos a mano, navegación automática de foco y soporte para pegar texto."
      importCode="import { SketchPinInput } from 'boceto-ui';"
      propsList={propsList}
      codeSnippet={codeSnippet}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <span className="comp-doc-card__label">1. PIN de 4 Dígitos</span>
          <SketchPinInput
            length={4}
            label="Código de Acceso"
            value={pinValue}
            onChange={setPinValue}
            onComplete={(val) => onTriggerToast?.(`PIN 4 dígitos ingresado: ${val}`)}
          />
        </div>

        <div className="comp-doc-card">
          <span className="comp-doc-card__label">2. OTP de 6 Dígitos Enmascarado con Validación</span>
          <SketchPinInput
            length={6}
            mask={true}
            label="Código SMS (Enmascarado)"
            value={otpValue}
            onChange={(val) => {
              setOtpValue(val);
              if (hasError) setHasError(false);
            }}
            error={hasError ? 'Código de verificación incorrecto' : undefined}
            onComplete={(val) => {
              if (val === '123456') {
                onTriggerToast?.('¡Código verificado con éxito!');
              } else {
                setHasError(true);
                onTriggerToast?.('Código erróneo. Prueba con 123456');
              }
            }}
          />
          <div style={{ marginTop: '10px' }}>
            <SketchButton size="sm" onClick={() => setHasError(!hasError)}>
              Alternar Error
            </SketchButton>
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default PinInputDoc;

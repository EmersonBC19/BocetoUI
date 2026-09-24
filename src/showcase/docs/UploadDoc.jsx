import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchUpload } from '../../components/sketch';

export function UploadDoc({ onTriggerToast }) {
  return (
    <ComponentDocLayout
      title="SketchUpload"
      description="Zona de arrastre y carga de archivos (Dropzone) con marco discontinuo artesanal, animaciones de drag-over y lista de ficheros cargados."
      badge="Formularios"
      importCode="import { SketchUpload } from 'boceto-ui';"
      propsList={[
        { name: 'onFileSelect', type: '(files) => void', default: 'undefined', description: 'Callback ejecutado al seleccionar o soltar archivos' },
        { name: 'multiple', type: 'boolean', default: 'false', description: 'Permite seleccionar más de un archivo simultáneamente' },
        { name: 'accept', type: 'string', default: 'undefined', description: 'Tipos MIME o extensiones permitidas (ej. "image/*, .pdf")' },
        { name: 'maxSizeMB', type: 'number', default: '10', description: 'Límite de peso por archivo en Megabytes' },
        { name: 'hint', type: 'string', default: "'Haz clic o arrastra tus archivos aquí'", description: 'Instrucción principal' }
      ]}
      dosAndDonts={{
        dos: [
          'Indica claramente los formatos permitidos en el texto de ayuda o mediante la prop accept.',
          'Muestra el tamaño máximo permitido para evitar frustraciones al usuario.'
        ],
        donts: [
          'No omitas la retroalimentación de éxito cuando el archivo se termine de procesar.'
        ]
      }}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Carga de Imágenes Individual</div>
          <SketchUpload
            accept="image/*"
            hint="Arrastra tu foto de perfil o boceto aquí"
            maxSizeMB={5}
            onFileSelect={(file) => {
              if (file) onTriggerToast?.(`Archivo seleccionado: ${file.name}`);
            }}
          />
        </div>

        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Carga Múltiple de Documentos</div>
          <SketchUpload
            multiple={true}
            accept=".pdf, .docx, .png, .jpg"
            hint="Sube uno o varios documentos de soporte"
            maxSizeMB={15}
            onFileSelect={(files) => {
              if (Array.isArray(files)) {
                onTriggerToast?.(`${files.length} archivos en cola de carga`);
              }
            }}
          />
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default UploadDoc;

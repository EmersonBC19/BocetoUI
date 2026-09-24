import React, { useState, useRef } from 'react';
import './SketchUpload.css';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { SketchCloseButton } from '../actions/SketchCloseButton';

/**
 * SketchUpload - Zona de carga y arrastre de archivos artesanal
 * @param {function} onFileSelect - Callback al seleccionar archivos
 * @param {boolean} [multiple=false] - Permitir múltiples archivos
 * @param {string} [accept] - Tipos MIME aceptados
 * @param {string} [hint] - Texto descriptivo o instrucciones
 * @param {number} [maxSizeMB=10] - Tamaño máximo en Megabytes
 */
export function SketchUpload({
  onFileSelect,
  multiple = false,
  accept,
  hint = 'Haz clic o arrastra tus archivos aquí',
  maxSizeMB = 10,
  className = '',
  ...props
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileList, setFileList] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (incomingFiles) => {
    const validFiles = Array.from(incomingFiles).filter((f) => {
      const sizeMB = f.size / (1024 * 1024);
      return sizeMB <= maxSizeMB;
    });

    const newFilesWithMeta = validFiles.map((f) => ({
      file: f,
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB',
      id: Math.random().toString(36).substring(7)
    }));

    const updated = multiple ? [...fileList, ...newFilesWithMeta] : newFilesWithMeta;
    setFileList(updated);
    onFileSelect?.(multiple ? updated.map((item) => item.file) : validFiles[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id) => {
    const filtered = fileList.filter((f) => f.id !== id);
    setFileList(filtered);
    onFileSelect?.(filtered.map((item) => item.file));
  };

  return (
    <div className={`sketch-upload-wrapper ${className}`} {...props}>
      <div
        className={`sketch-dropzone ${isDragOver ? 'sketch-dropzone--drag-over' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
        />

        <div className="sketch-dropzone__icon">
          <UploadCloud size={38} strokeWidth={2.2} />
        </div>

        <p className="sketch-dropzone__hint">{hint}</p>
        <span className="sketch-dropzone__subhint">
          {accept ? `Formatos: ${accept}` : 'Archivos compatibles'} (hasta {maxSizeMB}MB)
        </span>
      </div>

      {/* Lista de archivos cargados */}
      {fileList.length > 0 && (
        <div className="sketch-upload-filelist">
          {fileList.map((item) => (
            <div key={item.id} className="sketch-upload-file-item">
              <FileText size={18} className="sketch-upload-file-icon" />
              <div className="sketch-upload-file-info">
                <span className="sketch-upload-file-name">{item.name}</span>
                <span className="sketch-upload-file-size">{item.size}</span>
              </div>
              <CheckCircle2 size={16} color="#16a34a" />
              <SketchCloseButton
                size="xs"
                variant="ghost"
                className="sketch-upload-file-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(item.id);
                }}
                ariaLabel="Quitar archivo"
                title="Quitar archivo"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SketchUpload;

import React from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchTimeline } from '../../components/sketch';
import { Package, Truck, Home, AlertCircle, CheckCircle2, GitCommit } from 'lucide-react';

export function TimelineDoc() {
  const deliveryEvents = [
    {
      id: '1',
      title: 'Boceto Recibido & Aprobado',
      time: 'Hoy, 09:30 AM',
      description: 'El equipo de diseño ha validado la composición y el entintado artesanal.',
      status: 'completed',
      tag: 'Taller'
    },
    {
      id: '2',
      title: 'Impresión en Papel Texturizado',
      time: 'Hoy, 11:45 AM',
      description: 'Secado al natural con tinta pigmentada negra sobre papel de 300g.',
      status: 'completed',
      tag: 'Producción'
    },
    {
      id: '3',
      title: 'En Ruta con Mensajero Artesanal',
      time: 'Hoy, 02:15 PM',
      description: 'El paquete va protegido con cartón rígido y sello de cera.',
      status: 'active',
      tag: 'En Tránsito'
    },
    {
      id: '4',
      title: 'Entrega en Destino',
      time: 'Estimado 05:00 PM',
      description: 'Firma requerida en la entrega.',
      status: 'pending'
    }
  ];

  const auditEvents = [
    {
      id: 'a1',
      title: 'Commit: v1.0.0 Release',
      time: 'Hace 10 min',
      description: 'Empaquetado oficial para distribución en npm.',
      icon: <GitCommit size={15} />,
      status: 'completed'
    },
    {
      id: 'a2',
      title: 'Alerta de Dependencias',
      time: 'Hace 1 hora',
      description: 'Revisión preventiva de licencias compatibles completada.',
      icon: <AlertCircle size={15} />,
      status: 'danger'
    }
  ];

  return (
    <ComponentDocLayout
      title="SketchTimeline"
      description="Línea de tiempo vertical y seguimiento de eventos conectada por un trazo a mano con nodos artesanales y estados de color."
      badge="Datos"
      importCode="import { SketchTimeline } from 'boceto-ui';"
      propsList={[
        { name: 'items', type: 'Array<{id, title, time, description, icon, status, tag}>', default: '[]', description: 'Lista de eventos cronológicos' }
      ]}
      dosAndDonts={{
        dos: [
          'Ordena los eventos cronológicamente (más antiguo arriba o más reciente arriba de forma consistente).',
          'Usa status="active" para destacar el hito en progreso actual.',
          'Añade un timestamp legible ("Hace 5 min", "10:30 AM") para dar contexto temporal.'
        ],
        donts: [
          'No omitas la descripción en eventos que requieran explicación de causas o siguientes pasos.'
        ]
      }}
    >
      <div className="comp-doc-grid">
        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Seguimiento de Entrega / Despacho</div>
          <div style={{ padding: '16px 0' }}>
            <SketchTimeline items={deliveryEvents} />
          </div>
        </div>

        <div className="comp-doc-card">
          <div className="comp-doc-card__label">Auditoría de Actividad del Sistema</div>
          <div style={{ padding: '16px 0' }}>
            <SketchTimeline items={auditEvents} />
          </div>
        </div>
      </div>
    </ComponentDocLayout>
  );
}

export default TimelineDoc;

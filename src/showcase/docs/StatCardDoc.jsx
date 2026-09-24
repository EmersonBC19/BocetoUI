import React, { useState } from 'react';
import { ComponentDocLayout } from './ComponentDocLayout';
import { SketchStatCard, SketchButton } from '../../components/sketch';
import { DollarSign, Users, Activity, ShoppingCart } from 'lucide-react';

export function StatCardDoc({ onTriggerToast }) {
  const [metricMode, setMetricMode] = useState('monthly');

  const dataSets = {
    monthly: {
      revenue: { val: '$54,320', change: '+18.4%', trend: 'up', data: [12, 18, 24, 22, 34, 42, 54] },
      users: { val: '14,890', change: '+8.2%', trend: 'up', data: [8, 11, 10, 14, 13, 16, 18] },
      churn: { val: '1.8%', change: '-0.6%', trend: 'down', data: [4.2, 3.8, 3.1, 2.7, 2.4, 2.0, 1.8] }
    },
    weekly: {
      revenue: { val: '$12,450', change: '+4.1%', trend: 'up', data: [8, 9, 11, 10, 13, 12, 14] },
      users: { val: '3,210', change: '-1.4%', trend: 'down', data: [15, 14, 13, 14, 12, 11, 10] },
      churn: { val: '2.1%', change: '+0.2%', trend: 'neutral', data: [2.0, 2.1, 2.0, 2.1, 2.2, 2.1, 2.1] }
    }
  };

  const currentData = dataSets[metricMode];

  const codeSnippet = `import { SketchStatCard } from 'bocetoui';
import { DollarSign } from 'lucide-react';

export default function MiMetrica() {
  return (
    <SketchStatCard
      title="Ingresos Totales"
      value="$54,320"
      change="+18.4%"
      trend="up" // 'up' | 'down' | 'neutral'
      subtitle="vs. mes anterior"
      icon={<DollarSign size={18} />}
      sparklineData={[12, 18, 24, 22, 34, 42, 54]}
    />
  );
}`;

  const propsList = [
    { name: 'title', type: 'string', default: "''", description: 'Etiqueta o nombre del indicador' },
    { name: 'value', type: 'string | number', default: "''", description: 'Cifra cuantitativa destacada' },
    { name: 'change', type: 'string', default: "undefined", description: 'Texto del porcentaje de variación (ej. "+14.8%")' },
    { name: 'trend', type: "'up' | 'down' | 'neutral'", default: "'up'", description: 'Dirección de la tendencia (determina color e icono)' },
    { name: 'subtitle', type: 'string', default: "undefined", description: 'Texto al pie de la tarjeta' },
    { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Icono en la esquina superior derecha' },
    { name: 'sparklineData', type: 'Array<number>', default: '[...]', description: 'Puntos numéricos para dibujar el gráfico de tendencia' },
    { name: 'className', type: 'string', default: "''", description: 'Clases CSS adicionales' }
  ];

  const dosAndDonts = {
    dos: [
      'Utiliza valores numéricos claros y formateados (ej. "$54,320" en lugar de "54320").',
      'Incluye un gráfico sparkline de mínimo 5 puntos para proporcionar contexto visual inmediato sobre la trayectoria del KPI.',
      'Acompaña las variaciones porcentuales de un badge de tendencia con icono informativo.'
    ],
    donts: [
      'No sobrecargues el sparkline con ejes o leyendas complejas; es una gráfica de tendencia rápida, no un informe exhaustivo.',
      'Evita usar rojo para aumentos que sean positivos en el negocio, o verde para caídas deseadas (respeta el significado semántico).',
      'No apiles más de 4 tarjetas de KPI en una sola fila en pantallas de resolución estándar.'
    ]
  };

  return (
    <ComponentDocLayout
      title="SketchStatCard"
      category="DATOS & MÉTRICAS"
      description="Tarjeta de KPI y métrica de negocio para dashboards, con gráfico Sparkline artesanal en SVG y badges de tendencia."
      importCode="import { SketchStatCard } from './components/sketch';"
      propsList={propsList}
      codeSnippet={codeSnippet}
      dosAndDonts={dosAndDonts}
    >
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-sketch-title)', fontWeight: 700 }}>Filtro de Período:</span>
        <button
          type="button"
          className={`cursor-btn ${metricMode === 'monthly' ? 'cursor-btn--active' : ''}`}
          onClick={() => {
            setMetricMode('monthly');
            onTriggerToast?.('Cargando métricas mensuales');
          }}
        >
          Mensual (30d)
        </button>
        <button
          type="button"
          className={`cursor-btn ${metricMode === 'weekly' ? 'cursor-btn--active' : ''}`}
          onClick={() => {
            setMetricMode('weekly');
            onTriggerToast?.('Cargando métricas semanales');
          }}
        >
          Semanal (7d)
        </button>
      </div>

      <div className="comp-doc-grid">
        <SketchStatCard
          title="Ingresos Totales"
          value={currentData.revenue.val}
          change={currentData.revenue.change}
          trend={currentData.revenue.trend}
          subtitle="Facturación neta acumulada"
          icon={<DollarSign size={18} />}
          sparklineData={currentData.revenue.data}
        />

        <SketchStatCard
          title="Usuarios Activos"
          value={currentData.users.val}
          change={currentData.users.change}
          trend={currentData.users.trend}
          subtitle="Cuentas con sesión activa"
          icon={<Users size={18} />}
          sparklineData={currentData.users.data}
        />

        <SketchStatCard
          title="Tasa de Cancelación"
          value={currentData.churn.val}
          change={currentData.churn.change}
          trend={currentData.churn.trend}
          subtitle="Bajas sobre suscriptores totales"
          icon={<Activity size={18} />}
          sparklineData={currentData.churn.data}
        />
      </div>
    </ComponentDocLayout>
  );
}

export default StatCardDoc;

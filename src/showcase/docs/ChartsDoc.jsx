import React, { useState } from 'react';
import './ChartsDoc.css';
import {
  SketchCard, SketchButton, SketchBadge, SketchDivider,
  SketchBarChart, SketchLineChart, SketchDonutChart
} from '../../components/sketch';
import { BarChart3, LineChart, PieChart, RefreshCw, Sparkles, Layers } from 'lucide-react';

const DATA_7D = {
  bars: [
    { label: 'Lun', value: 420 },
    { label: 'Mar', value: 680 },
    { label: 'Mié', value: 550 },
    { label: 'Jue', value: 890 },
    { label: 'Vie', value: 1040 },
    { label: 'Sáb', value: 720 },
    { label: 'Dom', value: 490 }
  ],
  line: [
    { label: 'Lun', actual: 320, meta: 300 },
    { label: 'Mar', actual: 480, meta: 350 },
    { label: 'Mié', actual: 410, meta: 400 },
    { label: 'Jue', actual: 690, meta: 450 },
    { label: 'Vie', actual: 820, meta: 500 },
    { label: 'Sáb', actual: 580, meta: 450 },
    { label: 'Dom', actual: 390, meta: 350 }
  ],
  donut: [
    { label: 'Directo', value: 48, color: '#fef08a' },
    { label: 'Google Search', value: 28, color: '#bfdbfe' },
    { label: 'Referidos', value: 16, color: '#bbf7d0' },
    { label: 'Redes Sociales', value: 8, color: '#fbcfe8' }
  ]
};

const DATA_30D = {
  bars: [
    { label: 'Sem 1', value: 3400 },
    { label: 'Sem 2', value: 4850 },
    { label: 'Sem 3', value: 5200 },
    { label: 'Sem 4', value: 6950 }
  ],
  line: [
    { label: 'Sem 1', actual: 2800, meta: 2500 },
    { label: 'Sem 2', actual: 3900, meta: 3200 },
    { label: 'Sem 3', actual: 4700, meta: 4000 },
    { label: 'Sem 4', actual: 6100, meta: 5000 }
  ],
  donut: [
    { label: 'Directo', value: 42, color: '#fef08a' },
    { label: 'Google Search', value: 34, color: '#bfdbfe' },
    { label: 'Referidos', value: 14, color: '#bbf7d0' },
    { label: 'Redes Sociales', value: 10, color: '#fbcfe8' }
  ]
};

export function ChartsDoc({ onTriggerToast }) {
  const [range, setRange] = useState('7d');
  const [hatchMode, setHatchMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const activeData = range === '7d' ? DATA_7D : DATA_30D;

  const handleRandomize = () => {
    setRefreshKey((k) => k + 1);
    onTriggerToast?.('¡Datos de gráfica actualizados con física viva! 📈');
  };

  return (
    <div className="charts-doc-page">
      {/* Cabecera de la Sección */}
      <div className="charts-doc-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="section-title">Visualización de Datos Artesanal</span>
          <SketchBadge variant="highlight" size="sm">
            <Sparkles size={13} /> 100% SVG Nativo
          </SketchBadge>
          <SketchBadge variant="pill" size="sm">Zero Libs</SketchBadge>
        </div>
        <p className="section-desc">
          Gráficas para React con estética de boceto manual: bordes irregulares calculados matemáticamente,
          tramado de tinta (<em>ink hatching</em>), tooltips flotantes y física Bungee elástica al pasar el cursor.
        </p>
      </div>

      {/* Barra de Control en Vivo */}
      <div className="charts-control-bar">
        <div className="charts-control-group">
          <span className="charts-control-label">Rango Temporal:</span>
          <div className="charts-btn-toggle">
            <button
              type="button"
              className={`charts-toggle-btn ${range === '7d' ? 'charts-toggle-btn--active' : ''}`}
              onClick={() => {
                setRange('7d');
                onTriggerToast?.('Mostrando datos: Últimos 7 Días');
              }}
            >
              7 Días
            </button>
            <button
              type="button"
              className={`charts-toggle-btn ${range === '30d' ? 'charts-toggle-btn--active' : ''}`}
              onClick={() => {
                setRange('30d');
                onTriggerToast?.('Mostrando datos: Últimos 30 Días');
              }}
            >
              30 Días (Mensual)
            </button>
          </div>
        </div>

        <div className="charts-control-group">
          <span className="charts-control-label">Estilo de Relleno:</span>
          <SketchButton
            size="sm"
            variant={hatchMode ? 'marker' : 'wobbly'}
            onClick={() => setHatchMode(!hatchMode)}
          >
            <Layers size={14} /> {hatchMode ? 'Tramado a Mano (Hatch)' : 'Color Sólido'}
          </SketchButton>
        </div>

        <SketchButton size="sm" variant="default" onClick={handleRandomize}>
          <RefreshCw size={14} /> Recargar Datos
        </SketchButton>
      </div>

      {/* Grid de Gráficas en Vivo */}
      <div className="charts-grid-layout" key={refreshKey}>
        {/* 1. SketchBarChart */}
        <SketchCard title="SketchBarChart (Barras)" badge="Interactivo">
          <SketchBarChart
            data={activeData.bars}
            title="Ingresos por Período"
            subtitle="Pasa el ratón sobre cada barra para ver la cifra"
            variant={hatchMode ? 'hatch' : 'solid'}
            unit="€"
            height={250}
            onBarClick={(item) => onTriggerToast?.(`Barra seleccionada: ${item.label} (${item.value} €)`)}
          />
        </SketchCard>

        {/* 2. SketchLineChart */}
        <SketchCard title="SketchLineChart (Línea & Área)" badge="Bézier Spline">
          <SketchLineChart
            data={activeData.line}
            series={[
              { key: 'actual', name: 'Real', color: '#0284c7' },
              { key: 'meta', name: 'Objetivo', color: '#16a34a' }
            ]}
            title="Tráfico vs. Meta Proyectada"
            subtitle="Regla vertical y puntos interactivos que siguen el cursor"
            unit="visitas"
            height={250}
            onPointClick={(d, s) => onTriggerToast?.(`${s.name}: ${d[s.key]} en ${d.label}`)}
          />
        </SketchCard>
      </div>

      <div style={{ marginTop: '24px' }}>
        {/* 3. SketchDonutChart */}
        <SketchCard title="SketchDonutChart (Dona Artesanal)" badge="Explode Bungee">
          <div className="charts-donut-layout">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <SketchDonutChart
                data={activeData.donut}
                title="Canales de Conversión"
                subtitle="Pasa el cursor sobre cada sector para separarlo hacia afuera"
                unit="%"
                size={190}
                onSliceClick={(slice) => onTriggerToast?.(`Canal: ${slice.label} (${slice.value}%)`)}
              />
            </div>

            <div className="charts-donut-info-box">
              <h4 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-sketch-title)' }}>
                Física Radial Explode
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--sketch-ink-muted)', lineHeight: 1.45 }}>
                A diferencia de las gráficas comunes rígidas, cada sector circular calcula su vector normal y se separa 8px hacia afuera con amortiguación elástica cuando el usuario interactúa.
              </p>
              <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                <SketchBadge variant="highlight" size="sm">Cálculo Trigonométrico Puro</SketchBadge>
                <SketchBadge variant="pill" size="sm">Tooltip Central Dinámico</SketchBadge>
              </div>
            </div>
          </div>
        </SketchCard>
      </div>

      <SketchDivider variant="dashed" />

      {/* Ejemplo de Código */}
      <div className="charts-code-guide">
        <h3 className="section-title" style={{ fontSize: '1.4rem' }}>Cómo usar en cualquier proyecto React</h3>
        <pre className="charts-code-block">
{`import { SketchBarChart, SketchLineChart, SketchDonutChart } from 'boceto-ui';

// 1. Gráfica de Barras con tramado
<SketchBarChart
  data={[
    { label: 'Lun', value: 420 },
    { label: 'Mar', value: 680 },
    { label: 'Mié', value: 910 }
  ]}
  variant="hatch"
  unit="€"
/>

// 2. Gráfica de Líneas y Área
<SketchLineChart
  data={metricas}
  series={[{ key: 'visitas', name: 'Tráfico', color: '#0284c7' }]}
  unit="visitas"
/>

// 3. Gráfica de Dona interactiva
<SketchDonutChart
  data={canales}
  unit="%"
  size={190}
/>`}
        </pre>
      </div>
    </div>
  );
}

export default ChartsDoc;

# ✏️ BocetoUI

> **BocetoUI** es una biblioteca de componentes para React con estética artesanal, trazos a mano alzada, bordes orgánicos (*wobbly radii*), texturas de papel y un sistema exclusivo de punteros cómic con respuesta visual a los clics.

---

## 🚀 Instalación

### Opción 1: Directo desde GitHub
Puedes instalar la librería directamente desde este repositorio en cualquier proyecto:

```bash
npm install github:EmersonBC19/BocetoUI lucide-react
```

o con pnpm / yarn / bun:

```bash
pnpm add github:EmersonBC19/BocetoUI lucide-react
# o
yarn add https://github.com/EmersonBC19/BocetoUI.git lucide-react
# o
bun add github:EmersonBC19/BocetoUI lucide-react
```

### Opción 2: Desde registro npm (si está publicado)

```bash
npm install boceto-ui lucide-react
```

---

## ⚡ Inicio Rápido (Quick Start)

Importa la hoja de estilos en tu punto de entrada (`main.jsx`, `index.js` o `App.jsx`) y utiliza cualquier componente:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BocetoProvider, SketchCard, SketchButton, SketchInput } from 'boceto-ui';
import 'boceto-ui/styles.css';

function App() {
  return (
    <BocetoProvider cursor="comic" canvas="paper-grid">
      <div style={{ maxWidth: '480px', margin: '40px auto', padding: '16px' }}>
        <SketchCard title="¡Bienvenido a BocetoUI!">
          <p style={{ margin: '0 0 16px 0', color: '#555' }}>
            Componentes artesanales listos para producción con personalidad única.
          </p>
          <SketchInput label="Tu Correo" placeholder="ejemplo@boceto.dev" />
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <SketchButton variant="marker">Comenzar Ahora</SketchButton>
            <SketchButton variant="wobbly">Explorar</SketchButton>
          </div>
        </SketchCard>
      </div>
    </BocetoProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

---

## 🎨 Proveedor Visual: `<BocetoProvider />`

Envuelve tu aplicación con `<BocetoProvider>` para activar texturas de lienzo y el sistema de punteros:

| Prop | Tipo | Default | Descripción |
| :--- | :--- | :--- | :--- |
| `cursor` | `'comic' \| 'native'` | `'comic'` | Activa los punteros de cómic artesanales con ráfagas al hacer clic. |
| `canvas` | `'paper-grid' \| 'paper-dots' \| 'paper-lined' \| 'paper-chalk' \| 'none'` | `'none'` | Textura de fondo (cuadrícula, puntos, rayas o pizarra). |
| `theme` | `'light' \| 'chalkboard'` | `'light'` | Modo de contraste claro o modo pizarra de tiza. |
| `applyToRoot` | `boolean` | `false` | Inyecta las variables directamente en la etiqueta `<html>`. |

---

## 📦 Catálogo de Componentes

### 1. Acciones y Botones
- `SketchButton` (variantes: `default`, `marker`, `wobbly`, `danger`, `ghost`)
- `SketchSwitch` (interruptor elástico con sonido visual)

### 2. Contenedores y Superficies
- `SketchCard` (tarjetas con pin, cinta adhesiva o pliegue)
- `SketchModal` (diálogo flotante accesible con animación pop)
- `SketchDrawer` (panel deslizante lateral)
- `SketchStickyNote` (post-it con chincheta y rotación orgánica)
- `SketchDivider` (separador dibujado a mano)
- `SketchTabs` (pestañas tipo cuaderno)
- `SketchAccordion` (paneles colapsables)

### 3. Navegación y Flujos
- `SketchBreadcrumb` (migas de pan con separador de barra o chevron)
- `SketchSteps` (asistente de pasos / stepper horizontal y vertical)

### 4. Entradas y Formularios
- `SketchInput` y `SketchTextarea` (campos con rotación y foco reactivo)
- `SketchCheckbox` y `SketchRadio` (casillas marcadas a mano)
- `SketchSelect` (selector desplegable)
- `SketchSlider` (barra deslizable con aguja artesanal)

### 5. Datos y Visualización
- `SketchTable` (tabla con cabecera dibujada y filas rayadas)
- `SketchStatCard` (tarjeta de métrica con sparklines trazadas a pluma)
- `SketchRating` (calificación por estrellas con garabatos)
- `SketchBadge` (insignia wobbly)
- `SketchTag` (etiquetas con opción de cierre)
- `SketchAvatar` (avatar con borde irregular)
- `SketchPagination` (paginación con botones numéricos estilo boceto)

### 6. Estados y Retroalimentación
- `SketchAlert` (notificaciones informativas, éxito, alerta y peligro)
- `SketchEmptyState` (estado vacío con ilustración dibujada)
- `SketchSkeleton` (esqueleto de carga vibrante)
- `SketchLoader` (cargador animado con lápiz en bucle)
- `SketchProgress` (barra de progreso rellena con marcador)
- `SketchTooltip` (globo de cómic con flecha flotante)
- `SketchToast` (mensajes emergentes temporales)

### 7. Gráficos Artesanales (Charts)
- `SketchBarChart` (gráfico de barras con textura de marcador y líneas punteadas)
- `SketchLineChart` (gráfico de líneas continuo o por áreas con sparklines)
- `SketchDonutChart` (gráfico circular/donut trazado a mano)

### 8. Colección Signature Exclusiva (Papelería & Scrapbook)
- `SketchPaperclip` (clips metálicos plateados, dorados, binder clips con sujeción real)
- `SketchWaxSeal` (sello de cera lacrada en 3D con cinta y animación de estampado)
- `SketchCoffeeStain` (manchas de café, espresso, tinta o agua con textura porosa)
- `SketchTornCard` (cupones troquelados con tijera deslizante o cuaderno arrancado)
- `SketchTape` (cinta adhesiva washi, masking, kraft o de puntos con desprendimiento)
- `SketchStamp` (sellos vintage circulares u ovalados con fechador y texto curvo)
- `SketchSpeechBubble` (burbujas de diálogo, pensamiento, grito o susurro de cómic)
- `SketchBurstBadge` (insignias explosivas "POW!", "¡OFERTA!", etc.)

---

## 💻 Uso en Otros Proyectos

### Opción A: Instalación desde Registro npm (una vez publicado)
```bash
npm install boceto-ui lucide-react
```

### Opción B: Instalación Directa desde GitHub (sin publicar en npm)
```bash
npm install git+https://github.com/TU_USUARIO/TU_REPO.git
```

### Opción C: Probar Localmente en otro Proyecto (Enlace Simbólico)
En la carpeta de `boceto-ui`:
```bash
npm run build
npm link
```
En tu otro proyecto (por ejemplo `mi-app-react`):
```bash
npm link boceto-ui
```
¡Y listo! Ya puedes importar `boceto-ui` y `boceto-ui/styles.css` exactamente igual que si estuviera publicado en npm.

---

## 🌐 Despliegue en GitHub Pages

Este proyecto incluye un flujo de trabajo preconfigurado de GitHub Actions en `.github/workflows/deploy.yml`.

1. Sube tu código a GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: BocetoUI v1.0.0"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
2. En tu repositorio en GitHub:
   - Ve a **Settings** → **Pages**.
   - En **Build and deployment > Source**, selecciona **GitHub Actions**.
3. El sitio web de documentación interactiva se compilará y desplegará automáticamente en:
   `https://TU_USUARIO.github.io/TU_REPO/`

---

## 🖱️ Sistema de Cursores Cómic

BocetoUI incluye cursores vectoriales de alta precisión que responden al clic:
- **Reposo:** Flecha cómic con rayado interior de boceto.
- **Hover:** Guante clásico de caricatura señalando con el dedo índice y 3 costuras en el dorso.
- **Clic (`:active`):** Ráfagas de esparcido e impacto radiando desde la punta.

Si prefieres los cursores estándar del sistema operativo:
```jsx
<BocetoProvider cursor="native">
  ...
</BocetoProvider>
```

---

## 📄 Licencia

MIT © BocetoUI

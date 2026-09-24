/* ==========================================================================
   BOCETO-UI — Definitive Component Library Export Barrel
   ========================================================================== */

import './styles.css';

// 0. Proveedor de Entorno (Context & Provider)
export { BocetoProvider } from './BocetoProvider';

// 1. Acciones (Actions)
export { SketchButton } from './SketchButton';
export { SketchCloseButton } from './actions/SketchCloseButton';
export { SketchSwitch } from './actions/SketchSwitch';
export { SketchDropdown } from './actions/SketchDropdown';

// 2. Superficies y Disposición (Layout)
export { SketchCard } from './SketchCard';
export { SketchModal } from './SketchModal';
export { SketchDrawer } from './layout/SketchDrawer';
export { SketchSidebar } from './layout/SketchSidebar';
export { SketchPopover } from './layout/SketchPopover';
export { SketchDivider } from './SketchDivider';
export { SketchStickyNote } from './SketchStickyNote';
export { SketchTabs } from './layout/SketchTabs';
export { SketchAccordion } from './layout/SketchAccordion';
export { SketchScrollArea } from './layout/SketchScrollArea';

// 3. Navegación (Navigation)
export { SketchNavbar } from './navigation/SketchNavbar';
export { SketchBreadcrumb } from './navigation/SketchBreadcrumb';
export { SketchSteps } from './navigation/SketchSteps';
export { SketchCommandPalette } from './navigation/SketchCommandPalette';

// 4. Formularios (Forms)
export { SketchInput, SketchTextarea } from './SketchInput';
export { SketchCheckbox, SketchRadio } from './SketchCheckbox';
export { SketchSelect } from './SketchSelect';
export { SketchSlider } from './SketchSlider';
export { SketchUpload } from './forms/SketchUpload';
export { SketchDatePicker, SketchCalendar } from './forms/SketchDatePicker';
export { SketchColorPicker } from './forms/SketchColorPicker';
export { SketchPinInput } from './forms/SketchPinInput';
export { SketchAutocomplete } from './forms/SketchAutocomplete';

// 5. Datos y Métricas (Data & Metrics)
export { SketchTable } from './SketchTable';
export { SketchTimeline } from './data/SketchTimeline';
export { SketchStatCard } from './data/SketchStatCard';
export { SketchRating } from './data/SketchRating';
export { SketchBadge } from './SketchBadge';
export { SketchAvatar } from './data/SketchAvatar';
export { SketchTag } from './data/SketchTag';
export { SketchPagination } from './data/SketchPagination';
export { SketchTreeView } from './data/SketchTreeView';
export { SketchCodeBlock } from './data/SketchCodeBlock';
export { SketchCarousel } from './data/SketchCarousel';
export { SketchBarChart } from './charts/SketchBarChart';
export { SketchLineChart } from './charts/SketchLineChart';
export { SketchDonutChart } from './charts/SketchDonutChart';

// 6. Feedback, Estados y Carga (Feedback & Loaders)
export { SketchEmptyState } from './feedback/SketchEmptyState';
export { SketchSkeleton } from './SketchSkeleton';
export { SketchLoader } from './SketchLoader';
export { SketchProgress } from './SketchProgress';
export { SketchAlert } from './feedback/SketchAlert';
export { SketchTooltip } from './feedback/SketchTooltip';
export { SketchToast } from './feedback/SketchToast';

// 7. Iconos de Boceto (Hand-Drawn Vector Icons)
export {
  SketchGridIcon,
  SketchNotebookIcon,
  SketchPaperIcon,
  SketchChalkboardIcon,
  SketchPinIcon,
  SketchCheckIcon,
  SketchCloseIcon,
  SketchAlertIcon,
  SketchLightbulbIcon,
  SketchSparkleIcon,
  SketchPencilIcon
} from './SketchIcons';

// Sistema Unificado de Iconos Artesanales
export { SketchIcon, SKETCH_GLYPHS, SKETCH_ICON_CATEGORIES } from './icons/SketchIcon';


// 8. Marca & Identidad (Brand & Identity)
export { SketchIsotype } from './brand/SketchIsotype';
export { SketchLogo } from './brand/SketchLogo';

// 9. Colección Signature Exclusiva (Papelería, Cómic & Sellos)
export { SketchSpeechBubble } from './comic/SketchSpeechBubble';
export { SketchStamp } from './comic/SketchStamp';
export { SketchBurstBadge } from './comic/SketchBurstBadge';
export { SketchTape } from './paper/SketchTape';
export { SketchTornCard } from './paper/SketchTornCard';
export { SketchPaperclip } from './paper/SketchPaperclip';
export { SketchWaxSeal } from './comic/SketchWaxSeal';
export { SketchCoffeeStain } from './paper/SketchCoffeeStain';

// 10. Interacción & Pizarra Libre (Doodle & Canvas)
export { SketchDoodleCanvas } from './doodle/SketchDoodleCanvas';


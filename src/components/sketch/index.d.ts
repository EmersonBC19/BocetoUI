import React from 'react';

export interface BocetoProviderProps {
  children?: React.ReactNode;
  cursor?: 'comic' | 'native';
  canvas?: 'paper-grid' | 'paper-lined' | 'paper-plain' | 'paper-chalk';
  theme?: 'light' | 'chalkboard' | 'auto';
  className?: string;
}
export declare const BocetoProvider: React.FC<BocetoProviderProps>;

export interface SketchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'marker' | 'sketch' | 'wobbly' | 'dashed' | 'comic';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}
export declare const SketchButton: React.FC<SketchButtonProps>;

export interface SketchCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'danger';
  title?: string;
  ariaLabel?: string;
  iconSize?: number;
  strokeWidth?: number;
}
export declare const SketchCloseButton: React.FC<SketchCloseButtonProps>;

export interface SketchSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
export declare const SketchSwitch: React.FC<SketchSwitchProps>;

export interface SketchDropdownItem {
  id?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
}
export interface SketchDropdownProps {
  trigger: React.ReactNode;
  items: SketchDropdownItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
}
export declare const SketchDropdown: React.FC<SketchDropdownProps>;

export interface SketchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  badge?: string;
  variant?: 'default' | 'wobbly' | 'dashed' | 'marker' | 'clipboard' | 'folder';
  footer?: React.ReactNode;
}
export declare const SketchCard: React.FC<SketchCardProps>;

export interface SketchModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}
export declare const SketchModal: React.FC<SketchModalProps>;

export interface SketchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  children?: React.ReactNode;
}
export declare const SketchDrawer: React.FC<SketchDrawerProps>;

export interface SketchPopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}
export declare const SketchPopover: React.FC<SketchPopoverProps>;

export interface SketchDividerProps {
  variant?: 'straight' | 'wavy' | 'zigzag' | 'dashed' | 'double';
  label?: string;
}
export declare const SketchDivider: React.FC<SketchDividerProps>;

export interface SketchStickyNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'yellow' | 'pink' | 'cyan' | 'blue' | 'green' | 'orange';
  title?: string;
  hasPin?: boolean;
  pin?: boolean;
  tilt?: number;
  rotation?: number;
  children?: React.ReactNode;
}
export declare const SketchStickyNote: React.FC<SketchStickyNoteProps>;

export interface SketchTabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab?: string;
  onChange?: (id: string) => void;
}
export declare const SketchTabs: React.FC<SketchTabsProps>;

export interface SketchAccordionProps {
  items: { id: string; title: string; content: React.ReactNode }[];
  allowMultiple?: boolean;
}
export declare const SketchAccordion: React.FC<SketchAccordionProps>;

export interface SketchScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string | number;
  maxHeight?: string | number;
  width?: string | number;
  maxWidth?: string | number;
  orientation?: 'vertical' | 'horizontal' | 'both';
  variant?: 'graphite' | 'wasi' | 'ruler' | 'pencil';
  showIndicators?: boolean;
  showProgress?: boolean;
}
export declare const SketchScrollArea: React.FC<SketchScrollAreaProps>;

export interface SketchBreadcrumbItem {
  id?: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
}
export interface SketchBreadcrumbProps {
  items: SketchBreadcrumbItem[];
  onItemClick?: (item: SketchBreadcrumbItem) => void;
}
export declare const SketchBreadcrumb: React.FC<SketchBreadcrumbProps>;

export interface SketchStepItem {
  id?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}
export interface SketchStepsProps {
  steps: SketchStepItem[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  onChange?: (step: number) => void;
}
export declare const SketchSteps: React.FC<SketchStepsProps>;

export interface SketchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}
export declare const SketchInput: React.FC<SketchInputProps>;

export interface SketchTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export declare const SketchTextarea: React.FC<SketchTextareaProps>;

export interface SketchCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export declare const SketchCheckbox: React.FC<SketchCheckboxProps>;

export interface SketchRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export declare const SketchRadio: React.FC<SketchRadioProps>;

export interface SketchSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}
export declare const SketchSelect: React.FC<SketchSelectProps>;

export interface SketchSliderProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}
export declare const SketchSlider: React.FC<SketchSliderProps>;

export interface SketchUploadProps {
  onFilesSelected?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
}
export declare const SketchUpload: React.FC<SketchUploadProps>;

export interface SketchTableColumn {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}
export interface SketchTableProps {
  columns: SketchTableColumn[];
  data: any[];
  title?: string;
}
export declare const SketchTable: React.FC<SketchTableProps>;

export interface SketchTimelineItem {
  id?: string;
  title: string;
  description?: React.ReactNode;
  time?: string;
  status?: 'completed' | 'in-progress' | 'pending';
  icon?: React.ReactNode;
}
export interface SketchTimelineProps {
  items: SketchTimelineItem[];
}
export declare const SketchTimeline: React.FC<SketchTimelineProps>;

export interface SketchStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare const SketchStatCard: React.FC<SketchStatCardProps>;

export interface SketchRatingProps {
  value: number;
  max?: number;
  onChange?: (val: number) => void;
  readOnly?: boolean;
}
export declare const SketchRating: React.FC<SketchRatingProps>;

export interface SketchBadgeProps {
  variant?: 'default' | 'pill' | 'highlight' | 'status';
  size?: 'sm' | 'md';
  children?: React.ReactNode;
}
export declare const SketchBadge: React.FC<SketchBadgeProps>;

export interface SketchAvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}
export declare const SketchAvatar: React.FC<SketchAvatarProps>;

export interface SketchTagProps {
  variant?: 'default' | 'marker' | 'wobbly';
  onRemove?: () => void;
  children?: React.ReactNode;
}
export declare const SketchTag: React.FC<SketchTagProps>;

export interface SketchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export declare const SketchPagination: React.FC<SketchPaginationProps>;

export interface SketchEmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}
export declare const SketchEmptyState: React.FC<SketchEmptyStateProps>;

export interface SketchSkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'rect' | 'circle' | 'text';
}
export declare const SketchSkeleton: React.FC<SketchSkeletonProps>;

export interface SketchLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}
export declare const SketchLoader: React.FC<SketchLoaderProps>;

export interface SketchProgressProps {
  value: number;
  max?: number;
  label?: string;
}
export declare const SketchProgress: React.FC<SketchProgressProps>;

export interface SketchAlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}
export declare const SketchAlert: React.FC<SketchAlertProps>;

export interface SketchTooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}
export declare const SketchTooltip: React.FC<SketchTooltipProps>;

export interface SketchToastProps {
  isOpen: boolean;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  pauseOnHover?: boolean;
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
}
export declare const SketchToast: React.FC<SketchToastProps>;

export declare const SketchGridIcon: React.FC<{ size?: number }>;
export declare const SketchNotebookIcon: React.FC<{ size?: number }>;
export declare const SketchPaperIcon: React.FC<{ size?: number }>;
export declare const SketchChalkboardIcon: React.FC<{ size?: number }>;
export declare const SketchSparkleIcon: React.FC<{ size?: number }>;

export interface SketchIconProps {
  name: string;
  size?: number;
  color?: string;
  animate?: 'none' | 'wiggle' | 'draw' | 'boil' | 'pulse';
  strokeWidth?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchIcon: React.FC<SketchIconProps>;


export interface SketchIsotypeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  stroke?: string;
  sparkle?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchIsotype: React.FC<SketchIsotypeProps>;

export interface SketchLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'stacked' | 'icon';
  showBadge?: boolean;
  showTagline?: boolean;
  tagline?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
export declare const SketchLogo: React.FC<SketchLogoProps>;

export interface SketchBarItem {
  label: string;
  value: number;
  color?: string;
}
export interface SketchBarChartProps {
  data: SketchBarItem[];
  title?: string;
  subtitle?: string;
  height?: number;
  variant?: 'solid' | 'hatch';
  unit?: string;
  showGrid?: boolean;
  className?: string;
  onBarClick?: (item: SketchBarItem, index: number) => void;
}
export declare const SketchBarChart: React.FC<SketchBarChartProps>;

export interface SketchLineSeries {
  key: string;
  name: string;
  color: string;
}
export interface SketchLineChartProps {
  data: any[];
  series?: SketchLineSeries[];
  title?: string;
  subtitle?: string;
  height?: number;
  showArea?: boolean;
  showDots?: boolean;
  showGrid?: boolean;
  unit?: string;
  className?: string;
  onPointClick?: (point: any, series: SketchLineSeries) => void;
}
export declare const SketchLineChart: React.FC<SketchLineChartProps>;

export interface SketchDonutItem {
  label: string;
  value: number;
  color?: string;
}
export interface SketchDonutChartProps {
  data: SketchDonutItem[];
  title?: string;
  subtitle?: string;
  size?: number;
  innerRadiusRatio?: number;
  unit?: string;
  centerLabel?: string;
  centerValue?: string | number;
  showLegend?: boolean;
  className?: string;
  onSliceClick?: (slice: SketchDonutItem, index: number) => void;
}
export declare const SketchDonutChart: React.FC<SketchDonutChartProps>;

export interface SketchSpeechBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'speech' | 'thought' | 'shout';
  tailPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'left' | 'right';
  color?: 'default' | 'primary' | 'accent' | 'warning' | 'chalk';
  speaker?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchSpeechBubble: React.FC<SketchSpeechBubbleProps>;

export interface SketchStampProps {
  variant?: 'approved' | 'draft' | 'artisan' | 'urgent' | 'verified' | 'confidential' | 'custom';
  label?: string;
  sublabel?: string;
  icon?: React.ReactNode;
  color?: 'red' | 'green' | 'amber' | 'blue' | 'purple' | 'black';
  border?: 'double' | 'dashed' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
  slam?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
export declare const SketchStamp: React.FC<SketchStampProps>;

export interface SketchBurstBadgeProps {
  text?: string;
  variant?: 'pow' | 'boing' | 'zap' | 'wow' | 'sale' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  color?: 'amber' | 'primary' | 'accent' | 'coral' | 'lime';
  bounce?: boolean;
  rotation?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
export declare const SketchBurstBadge: React.FC<SketchBurstBadgeProps>;

export interface SketchTapeProps {
  variant?: 'washi' | 'masking' | 'striped' | 'grid';
  color?: 'amber' | 'coral' | 'teal' | 'paper' | 'lavender';
  position?: 'top' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
  width?: string | number;
  rotation?: number;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchTape: React.FC<SketchTapeProps>;

export interface SketchTornCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'note' | 'ticket' | 'memo';
  edgePosition?: 'bottom' | 'top' | 'both';
  header?: React.ReactNode;
  ticketNumber?: string | number;
  couponText?: string;
  isTorn?: boolean;
  onTear?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchTornCard: React.FC<SketchTornCardProps>;

export interface SketchPaperclipProps {
  variant?: 'wire' | 'binder';
  color?: 'silver' | 'gold' | 'rose-gold' | 'black' | 'red' | 'blue' | 'yellow' | 'green';
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'left' | 'right' | 'relative';
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchPaperclip: React.FC<SketchPaperclipProps>;

export interface SketchWaxSealProps {
  initial?: string;
  symbol?: 'crown' | 'star' | 'feather' | 'heart' | 'boceto';
  icon?: React.ReactNode;
  color?: 'crimson' | 'gold' | 'burgundy' | 'navy' | 'emerald' | 'charcoal';
  hasRibbon?: boolean;
  ribbonColor?: string;
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
  stampEffect?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
export declare const SketchWaxSeal: React.FC<SketchWaxSealProps>;

export interface SketchCoffeeStainProps {
  variant?: 'ring' | 'splatter' | 'mug-drip' | 'half-ring';
  type?: 'ring' | 'splatter' | 'mug-drip' | 'half-ring';
  color?: 'espresso' | 'latte' | 'ink' | 'water';
  size?: number | string;
  opacity?: number;
  rotation?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchCoffeeStain: React.FC<SketchCoffeeStainProps>;

// Formularios Nuevos
export interface SketchCalendarProps {
  value?: string;
  onChange?: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  className?: string;
}
export declare const SketchCalendar: React.FC<SketchCalendarProps>;

export interface SketchDatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  label?: string;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  error?: string;
  required?: boolean;
  className?: string;
}
export declare const SketchDatePicker: React.FC<SketchDatePickerProps>;

export interface SketchColorPickerProps {
  value?: string;
  onChange?: (colorHex: string) => void;
  presets?: Array<{ label: string; hex: string } | string>;
  label?: string;
  className?: string;
}
export declare const SketchColorPicker: React.FC<SketchColorPickerProps>;

export interface SketchPinInputProps {
  length?: number;
  value?: string;
  onChange?: (val: string) => void;
  onComplete?: (val: string) => void;
  mask?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  autoFocus?: boolean;
  className?: string;
}
export declare const SketchPinInput: React.FC<SketchPinInputProps>;

export interface SketchAutocompleteOption {
  label: string;
  value: string | number;
  hint?: string;
  group?: string;
}
export interface SketchAutocompleteProps {
  options: Array<SketchAutocompleteOption | string>;
  value?: string;
  onChange?: (query: string) => void;
  onSelect?: (option: SketchAutocompleteOption) => void;
  placeholder?: string;
  label?: string;
  emptyText?: string;
  className?: string;
}
export declare const SketchAutocomplete: React.FC<SketchAutocompleteProps>;

// Navegación & Estructura
export interface SketchNavbarLink {
  id?: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}
export interface SketchNavbarProps {
  brand?: React.ReactNode;
  links?: SketchNavbarLink[];
  actions?: React.ReactNode;
  sticky?: boolean;
  activeId?: string;
  onNavigate?: (item: SketchNavbarLink) => void;
  className?: string;
  children?: React.ReactNode;
}
export declare const SketchNavbar: React.FC<SketchNavbarProps>;

export interface SketchSidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
}
export interface SketchSidebarGroup {
  title?: string;
  items: SketchSidebarItem[];
}
export interface SketchSidebarProps {
  header?: React.ReactNode;
  groups?: SketchSidebarGroup[];
  footer?: React.ReactNode;
  activeId?: string;
  onSelect?: (item: SketchSidebarItem) => void;
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  className?: string;
}
export declare const SketchSidebar: React.FC<SketchSidebarProps>;

export interface SketchCommandItem {
  id?: string;
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  group?: string;
  keywords?: string[];
  onSelect?: () => void;
}
export interface SketchCommandGroup {
  group: string;
  items: SketchCommandItem[];
}
export interface SketchCommandPaletteProps {
  isOpen: boolean;
  onClose?: (openState?: boolean) => void;
  items?: Array<SketchCommandGroup | SketchCommandItem>;
  placeholder?: string;
  hotkey?: string;
  className?: string;
}
export declare const SketchCommandPalette: React.FC<SketchCommandPaletteProps>;

// Datos & Visualización
export interface SketchTreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
  children?: SketchTreeNode[];
}
export interface SketchTreeViewProps {
  data: SketchTreeNode[];
  selectedId?: string;
  onSelect?: (node: SketchTreeNode) => void;
  defaultExpandedIds?: string[];
  className?: string;
}
export declare const SketchTreeView: React.FC<SketchTreeViewProps>;

export interface SketchCodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}
export declare const SketchCodeBlock: React.FC<SketchCodeBlockProps>;

export interface SketchCarouselProps {
  items?: React.ReactNode[];
  children?: React.ReactNode;
  autoplay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}
export declare const SketchCarousel: React.FC<SketchCarouselProps>;

export interface SketchDoodleCanvasProps {
  isOpen?: boolean;
  onClose?: () => void;
  canvasType?: 'paper-grid' | 'paper-lined' | 'paper-plain' | 'paper-chalk';
  onTriggerToast?: (msg: string) => void;
}
export declare const SketchDoodleCanvas: React.FC<SketchDoodleCanvasProps>;

// ==========================================================================
// Colección Signature Exclusiva (Papelería, Cómic & Sellos)
// ==========================================================================

export interface SketchSpeechBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: 'speech' | 'thought' | 'shout' | 'whisper';
  tail?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  color?: 'yellow' | 'blue' | 'pink' | 'white';
  title?: string;
  avatar?: React.ReactNode;
  avatarPosition?: 'left' | 'right';
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchSpeechBubble: React.FC<SketchSpeechBubbleProps>;

export interface SketchStampProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  text?: string;
  variant?: 'approved' | 'rejected' | 'confidential' | 'urgent' | 'draft' | 'verified' | 'custom';
  shape?: 'rectangle' | 'circle' | 'oval';
  date?: boolean | string;
  color?: 'red' | 'green' | 'blue' | 'amber' | 'chalk';
  rotation?: number;
  porosity?: boolean;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export declare const SketchStamp: React.FC<SketchStampProps>;

export interface SketchBurstBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  text?: string;
  variant?: 'default' | 'action' | 'halftone';
  color?: 'red' | 'yellow' | 'blue' | 'green' | 'purple' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export declare const SketchBurstBadge: React.FC<SketchBurstBadgeProps>;

export interface SketchTapeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  pattern?: 'masking' | 'striped' | 'grid' | 'pink' | 'mint' | 'dots' | 'kraft';
  color?: string;
  rotation?: number;
  width?: number | string;
  height?: number | string;
  placement?: 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export declare const SketchTape: React.FC<SketchTapeProps>;

export interface SketchTornCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: 'torn' | 'ticket';
  tornEdge?: 'bottom' | 'top' | 'left' | 'right' | 'both' | 'both-horizontal';
  title?: string;
  badge?: string;
  couponCode?: string;
  discount?: string;
  barcode?: boolean | string;
  onTear?: (codeOrStatus: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchTornCard: React.FC<SketchTornCardProps>;

export interface SketchPaperclipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'classic' | 'binder';
  color?: 'silver' | 'gold' | 'red' | 'blue' | 'black' | 'green' | 'chalk';
  placement?: 'top-left' | 'top-center' | 'top-right' | 'standalone';
  rotation?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchPaperclip: React.FC<SketchPaperclipProps>;

export interface SketchWaxSealProps extends React.HTMLAttributes<HTMLDivElement> {
  monogram?: string;
  icon?: React.ReactNode;
  color?: 'crimson' | 'gold' | 'navy' | 'black' | 'emerald' | 'chalk';
  ribbon?: boolean;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export declare const SketchWaxSeal: React.FC<SketchWaxSealProps>;

export interface SketchCoffeeStainProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'ring' | 'double-ring' | 'splatter';
  color?: 'espresso' | 'latte' | 'ink' | 'water';
  size?: number | 'sm' | 'md' | 'lg';
  opacity?: number;
  rotation?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare const SketchCoffeeStain: React.FC<SketchCoffeeStainProps>;

export interface SketchDoodleCanvasProps {
  isOpen?: boolean;
  onClose?: () => void;
  canvasType?: 'paper-grid' | 'paper-lined' | 'paper-plain' | 'paper-chalk';
  defaultLineStyle?: 'solid' | 'dashed';
  onTriggerToast?: (message: string) => void;
}
export declare const SketchDoodleCanvas: React.FC<SketchDoodleCanvasProps>;




import React, { useState, useRef, useEffect } from 'react';
import './SidebarNav.css';
import { SketchBadge, SketchLogo, SketchCloseButton } from '../components/sketch';
import {
  PenTool,
  Search,
  Sparkles,
  Layout,
  MousePointerClick,
  FileText,
  TableProperties,
  Gamepad2,
  FolderTree,
  Sliders,
  Layers,
  HelpCircle,
  Activity,
  Tag,
  User,
  SlidersHorizontal,
  Bell,
  MessageSquare,
  Bookmark,
  CheckSquare,
  Minus,
  Compass,
  Footprints,
  BarChart3,
  Star,
  Inbox,
  Sidebar as SidebarIcon,
  Palette,
  LayoutTemplate,
  Package,
  MoreHorizontal,
  UploadCloud,
  GitCommit,
  Calendar,
  Pipette,
  KeyRound,
  Terminal,
  Code,
  GalleryHorizontal,
  Menu,
  ChevronDown,
  ChevronRight,
  Dices,
  X,
  Filter,
  Check,
  Monitor,
  Smartphone
} from 'lucide-react';

export const NAV_GROUPS = [
  {
    title: 'EXPLORACIÓN & GUIAS',
    categoryKey: 'guides',
    items: [
      { id: 'welcome', label: 'Presentación', icon: <Sparkles size={16} /> },
      { id: 'quickstart', label: 'Guía de Instalación npm', icon: <Package size={16} />, count: 1 },
      { id: 'signature', label: 'Colección Signature', icon: <Sparkles size={16} />, count: 8, badge: 'NUEVO' },
      { id: 'all', label: 'Todos los Componentes', icon: <Layout size={16} />, count: 54 },
      { id: 'templates', label: 'Plantillas del Mundo Real', icon: <LayoutTemplate size={16} />, count: 3 },
      { id: 'design-system', label: 'Principios & Tokens UX', icon: <Palette size={16} />, count: 4 },
      { id: 'playground', label: 'Tablero CQRS en Vivo', icon: <Gamepad2 size={16} />, count: 1 }
    ]
  },
  {
    title: 'NAVEGACIÓN & JERARQUÍA',
    categoryKey: 'nav',
    items: [
      { id: 'navbar', label: 'SketchNavbar', icon: <Menu size={16} />, count: 1 },
      { id: 'breadcrumb', label: 'SketchBreadcrumb', icon: <Compass size={16} />, count: 4 },
      { id: 'steps', label: 'SketchSteps', icon: <Footprints size={16} />, count: 2 },
      { id: 'commandpalette', label: 'SketchCommandPalette (⌘K)', icon: <Terminal size={16} />, count: 1 }
    ]
  },
  {
    title: 'ACCIONES & BOTONES',
    categoryKey: 'actions',
    items: [
      { id: 'button', label: 'SketchButton', icon: <MousePointerClick size={16} />, count: 6 },
      { id: 'closebutton', label: 'SketchCloseButton (X)', icon: <X size={16} />, count: 4 },
      { id: 'switch', label: 'SketchSwitch', icon: <Sliders size={16} />, count: 2 },
      { id: 'dropdown', label: 'SketchDropdown (Menú)', icon: <MoreHorizontal size={16} />, count: 2 }
    ]
  },
  {
    title: 'ESTRUCTURA & SUPERFICIES',
    categoryKey: 'structure',
    items: [
      { id: 'card', label: 'SketchCard', icon: <Layout size={16} />, count: 6 },
      { id: 'scrollarea', label: 'SketchScrollArea', icon: <SlidersHorizontal size={16} />, count: 4 },
      { id: 'sidebar', label: 'SketchSidebar', icon: <SidebarIcon size={16} />, count: 2 },
      { id: 'drawer', label: 'SketchDrawer', icon: <SidebarIcon size={16} />, count: 2 },
      { id: 'popover', label: 'SketchPopover', icon: <MessageSquare size={16} />, count: 2 },
      { id: 'tabs', label: 'SketchTabs', icon: <FolderTree size={16} />, count: 2 },
      { id: 'accordion', label: 'SketchAccordion', icon: <HelpCircle size={16} />, count: 3 },
      { id: 'stickynote', label: 'SketchStickyNote', icon: <Bookmark size={16} />, count: 4 },
      { id: 'modal', label: 'SketchModal', icon: <Layers size={16} />, count: 1 },
      { id: 'divider', label: 'SketchDivider', icon: <Minus size={16} />, count: 5 }
    ]
  },
  {
    title: 'FORMULARIOS & ENTRADAS',
    categoryKey: 'forms',
    items: [
      { id: 'input', label: 'SketchInput & Textarea', icon: <FileText size={16} />, count: 3 },
      { id: 'datepicker', label: 'SketchDatePicker & Calendar', icon: <Calendar size={16} />, count: 2 },
      { id: 'colorpicker', label: 'SketchColorPicker', icon: <Pipette size={16} />, count: 2 },
      { id: 'pininput', label: 'SketchPinInput (OTP)', icon: <KeyRound size={16} />, count: 2 },
      { id: 'autocomplete', label: 'SketchAutocomplete', icon: <Search size={16} />, count: 2 },
      { id: 'upload', label: 'SketchUpload (Dropzone)', icon: <UploadCloud size={16} />, count: 2 },
      { id: 'checkbox', label: 'SketchCheckbox & Radio', icon: <CheckSquare size={16} />, count: 2 },
      { id: 'select', label: 'SketchSelect', icon: <FolderTree size={16} />, count: 2 },
      { id: 'slider', label: 'SketchSlider', icon: <SlidersHorizontal size={16} />, count: 2 }
    ]
  },
  {
    title: 'VISUALIZACIÓN DE DATOS & MÉTRICAS',
    categoryKey: 'data',
    items: [
      { id: 'charts', label: 'Gráficas Artesanales (3)', icon: <BarChart3 size={16} />, count: 3 },
      { id: 'timeline', label: 'SketchTimeline', icon: <GitCommit size={16} />, count: 2 },
      { id: 'statcard', label: 'SketchStatCard (Sparkline)', icon: <BarChart3 size={16} />, count: 3 },
      { id: 'treeview', label: 'SketchTreeView', icon: <FolderTree size={16} />, count: 1 },
      { id: 'codeblock', label: 'SketchCodeBlock', icon: <Code size={16} />, count: 1 },
      { id: 'carousel', label: 'SketchCarousel', icon: <GalleryHorizontal size={16} />, count: 1 },
      { id: 'rating', label: 'SketchRating', icon: <Star size={16} />, count: 2 },
      { id: 'table', label: 'SketchTable', icon: <TableProperties size={16} />, count: 1 },
      { id: 'pagination', label: 'SketchPagination', icon: <SlidersHorizontal size={16} />, count: 1 },
      { id: 'badge', label: 'SketchBadge', icon: <Sparkles size={16} />, count: 4 },
      { id: 'tag', label: 'SketchTag', icon: <Tag size={16} />, count: 3 },
      { id: 'avatar', label: 'SketchAvatar', icon: <User size={16} />, count: 3 },
      { id: 'icon', label: 'SketchIcon (40+ Glifos)', icon: <PenTool size={16} />, count: 40 }
    ]
  },
  {
    title: 'FEEDBACK & ESTADOS',
    categoryKey: 'feedback',
    items: [
      { id: 'emptystate', label: 'SketchEmptyState', icon: <Inbox size={16} />, count: 3 },
      { id: 'progress', label: 'SketchProgress (120 FPS)', icon: <Activity size={16} />, count: 3 },
      { id: 'skeleton', label: 'SketchSkeleton', icon: <Activity size={16} />, count: 4 },
      { id: 'loader', label: 'SketchLoader', icon: <Sparkles size={16} />, count: 3 },
      { id: 'alert', label: 'SketchAlert', icon: <Bell size={16} />, count: 4 },
      { id: 'tooltip', label: 'SketchTooltip', icon: <MessageSquare size={16} />, count: 4 },
      { id: 'toast', label: 'SketchToast', icon: <Bell size={16} />, count: 4 },
      { id: 'doodle', label: 'SketchDoodleCanvas', icon: <PenTool size={16} />, count: 1 }
    ]
  }
];

const QUICK_FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'signature', label: '✨ Signature', group: 'guides' },
  { id: 'actions', label: '⚡ Acciones', group: 'actions' },
  { id: 'forms', label: '📝 Formularios', group: 'forms' },
  { id: 'data', label: '📊 Datos', group: 'data' },
  { id: 'structure', label: '📐 Estructura', group: 'structure' },
  { id: 'feedback', label: '🔔 Feedback', group: 'feedback' }
];

const BOCETIN_TIPS = [
  "💡 Tip: ¡Usa el modo Garabato para rayar en vivo a 120 FPS!",
  "✂️ Tip: ¡Haz clic en los cupones para rasgar el troquelado real!",
  "☕ Tip: ¡Prueba las manchas de café espresso en la Colección Signature!",
  "🏷️ Tip: ¡Presiona ⌘K o / para buscar cualquier componente al instante!",
  "🖍️ Tip: ¡Cambia a modo Pizarra de Tiza en la barra superior!",
  "📌 Tip: ¡Los SketchStickyNotes se pueden inclinar orgánicamente!",
  "🎨 Tip: ¡BocetoUI incluye cursores cómic con ráfagas al clic!"
];

export function SidebarNav({
  activeCategory = 'all',
  onSelectCategory,
  searchTerm = '',
  onSearchChange,
  onTriggerToast,
  totalComponents = 54,
  isForceDesktop = false,
  onToggleForceDesktop = null,
  isOpenOnMobile = false,
  onCloseMobile = null
}) {
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRollingDice, setIsRollingDice] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [isBocetinBouncing, setIsBocetinBouncing] = useState(false);
  const searchInputRef = useRef(null);

  // Atajos de teclado para búsqueda (⌘K o /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      const isSlash = e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

      if (isCmdK || isSlash) {
        e.preventDefault();
        searchInputRef.current?.focus();
        onTriggerToast?.('🔍 Buscador de componentes enfocado');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTriggerToast]);

  // Alternar colapsado de un grupo individual
  const toggleGroup = (groupTitle) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };

  // Alternar colapsar o expandir todos los grupos a la vez
  const toggleAllGroups = () => {
    const allCollapsed = NAV_GROUPS.every((g) => collapsedGroups[g.title]);
    const newState = {};
    if (!allCollapsed) {
      NAV_GROUPS.forEach((g) => { newState[g.title] = true; });
    }
    setCollapsedGroups(newState);
  };

  // Lista plana de todos los componentes navegables para el dado sorpresa
  const allNavItems = NAV_GROUPS.flatMap((g) => g.items).filter(
    (item) => item.id !== 'welcome'
  );

  // ¡Efecto WOW! Botón Dado "Sorpréndeme"
  const handleSurpriseMe = () => {
    if (isRollingDice) return;
    setIsRollingDice(true);

    const candidates = allNavItems.filter((i) => i.id !== activeCategory);
    const randomItem = candidates[Math.floor(Math.random() * candidates.length)];

    setTimeout(() => {
      setIsRollingDice(false);
      onSelectCategory(randomItem.id);
      onCloseMobile?.();
      onTriggerToast?.(`🎲 ¡Sorpresa! Te tocó explorar: ${randomItem.label}`);

      // Asegurar que el grupo padre esté abierto
      const parentGroup = NAV_GROUPS.find((g) =>
        g.items.some((i) => i.id === randomItem.id)
      );
      if (parentGroup) {
        setCollapsedGroups((prev) => ({ ...prev, [parentGroup.title]: false }));
      }
    }, 450);
  };

  // Interacción con la mascota Bocetín en el footer
  const handleBocetinClick = () => {
    setIsBocetinBouncing(true);
    setTipIndex((prev) => (prev + 1) % BOCETIN_TIPS.length);
    setTimeout(() => setIsBocetinBouncing(false), 500);
  };

  // Filtrado de grupos según chip activo y término de búsqueda
  const filteredGroups = NAV_GROUPS.map((group) => {
    // 1. Filtrar por Chip Rápido
    if (activeFilter !== 'all') {
      if (activeFilter === 'signature') {
        const signatureItems = group.items.filter((i) => i.id === 'signature');
        if (signatureItems.length === 0) return null;
        return { ...group, items: signatureItems };
      }
      const matchedFilter = QUICK_FILTERS.find((f) => f.id === activeFilter);
      if (matchedFilter && group.categoryKey !== matchedFilter.group) {
        return null;
      }
    }

    // 2. Filtrar por término de búsqueda en texto
    if (!searchTerm.trim()) return group;
    const q = searchTerm.toLowerCase();
    const matchingItems = group.items.filter(
      (item) => item.label.toLowerCase().includes(q) || item.id.toLowerCase().includes(q)
    );
    return { ...group, items: matchingItems };
  }).filter((group) => group !== null && group.items.length > 0);

  return (
    <>
      {/* Backdrop overlay para pantallas móviles */}
      <div
        className={`sidebar-nav__backdrop ${isOpenOnMobile ? 'sidebar-nav__backdrop--open' : ''}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={`sidebar-nav ${isOpenOnMobile ? 'sidebar-nav--mobile-open' : ''}`}
        aria-label="Navegación de componentes"
      >
        {/* 1. Anillas de Cuaderno Espiral Artesanal (Spine decorativo a la derecha) */}
        <div className="sidebar-nav__spiral" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="sidebar-nav__spiral-ring">
              <div className="sidebar-nav__spiral-hole" />
              <div className="sidebar-nav__spiral-wire" />
            </div>
          ))}
        </div>

        {/* 2. Cabecera con Marca, Botón WOW y Botón de Cierre Móvil */}
        <div className="sidebar-nav__brand">
          <div className="sidebar-nav__brand-left">
            <SketchLogo size="sm" />
          </div>
          <div className="sidebar-nav__brand-actions">
            <button
              type="button"
              className={`sidebar-nav__dice-btn ${isRollingDice ? 'sidebar-nav__dice-btn--rolling' : ''}`}
              onClick={handleSurpriseMe}
              title="Elige un componente al azar y sorpréndete"
            >
              <Dices size={16} className="sidebar-nav__dice-icon" />
              <span className="sidebar-nav__dice-text">¡Sorpréndeme!</span>
            </button>
            {onCloseMobile && (
              <SketchCloseButton
                size="sm"
                variant="badge"
                className="sidebar-nav__mobile-close-btn"
                onClick={onCloseMobile}
                title="Cerrar índice"
                ariaLabel="Cerrar índice de navegación"
              />
            )}
          </div>
        </div>

      {/* 3. Buscador Artesanal con Atajo ⌘K y Limpieza Rápida */}
      <div className="sidebar-nav__search-box">
        <div className="sidebar-nav__search-wrap">
          <Search size={15} className="sidebar-nav__search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="sidebar-nav__search-input"
            placeholder="Buscar... (⌘K o /)"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Filtrar componentes del menú"
          />
          {searchTerm ? (
            <SketchCloseButton
              size="xs"
              variant="ghost"
              className="sidebar-nav__search-clear"
              onClick={() => onSearchChange('')}
              title="Borrar búsqueda"
              ariaLabel="Borrar búsqueda"
            />
          ) : (
            <kbd className="sidebar-nav__search-kbd">⌘K</kbd>
          )}
        </div>

        {/* 4. Chips de Filtro Rápido con Textura de Cinta Washi */}
        <div className="sidebar-nav__chips-strip" role="tablist" aria-label="Filtros rápidos">
          {QUICK_FILTERS.map((chip) => {
            const isChipActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                className={`sidebar-nav__chip ${
                  isChipActive ? 'sidebar-nav__chip--active' : ''
                }`}
                onClick={() => {
                  setActiveFilter(chip.id);
                  if (chip.id !== 'all') onSearchChange('');
                }}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Barra de Control de Acordeones */}
      <div className="sidebar-nav__subhead">
        <span className="sidebar-nav__subhead-count">
          {filteredGroups.reduce((acc, g) => acc + g.items.length, 0)} elementos visibles
        </span>
        <button
          type="button"
          className="sidebar-nav__toggle-all-btn"
          onClick={toggleAllGroups}
          title="Expandir o colapsar todas las secciones"
        >
          {NAV_GROUPS.every((g) => collapsedGroups[g.title]) ? '▾ Expandir todo' : '▴ Colapsar'}
        </button>
      </div>

      {/* 6. Menú Principal de Grupos con Acordeones y Lápiz Activo */}
      <nav className="sidebar-nav__menu">
        {filteredGroups.map((group) => {
          const isCollapsed = Boolean(collapsedGroups[group.title]);
          const hasActiveItem = group.items.some((i) => i.id === activeCategory);

          return (
            <div
              key={group.title}
              className={`sidebar-nav__group ${hasActiveItem ? 'sidebar-nav__group--contains-active' : ''}`}
            >
              <button
                type="button"
                className="sidebar-nav__group-header"
                onClick={() => toggleGroup(group.title)}
                aria-expanded={!isCollapsed}
              >
                <span className="sidebar-nav__group-arrow">
                  {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                </span>
                <span className="sidebar-nav__group-title">{group.title}</span>
                <span className="sidebar-nav__group-pill">{group.items.length}</span>
              </button>

              {!isCollapsed && (
                <ul className="sidebar-nav__list">
                  {group.items.map((item) => {
                    const isActive = activeCategory === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`sidebar-nav__item-btn ${
                            isActive ? 'sidebar-nav__item-btn--active' : ''
                          }`}
                          onClick={() => {
                            onSelectCategory(item.id);
                            onCloseMobile?.();
                          }}
                        >
                          {/* Lápiz indicador en tiempo real para el elemento activo */}
                          {isActive && (
                            <span className="sidebar-nav__active-pencil" aria-hidden="true">
                              ✏️
                            </span>
                          )}
                          <span className="sidebar-nav__item-icon">{item.icon}</span>
                          <span className="sidebar-nav__item-label">{item.label}</span>
                          
                          {/* Badges especiales (ej: NUEVO o conteo numérico) */}
                          {item.badge ? (
                            <span className="sidebar-nav__item-badge">{item.badge}</span>
                          ) : item.count ? (
                            <span className="sidebar-nav__item-count">{item.count}</span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {filteredGroups.length === 0 && (
          <div className="sidebar-nav__no-results">
            <p>No se encontraron componentes con "{searchTerm}"</p>
            <button
              type="button"
              className="sidebar-nav__reset-search-btn"
              onClick={() => { onSearchChange(''); setActiveFilter('all'); }}
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </nav>

      {/* 7. Footer con Mascota Bocetín y Consejos Creativos Interactivos */}
      <div className="sidebar-nav__footer">
        <div
          className={`sidebar-nav__bocetin-box ${isBocetinBouncing ? 'sidebar-nav__bocetin-box--bouncing' : ''}`}
          onClick={handleBocetinClick}
          title="Haz clic en Bocetín para otro consejo creativo"
        >
          {/* Mini Bocetín Lápiz Ilustrador */}
          <div className="sidebar-nav__bocetin-avatar">
            <svg viewBox="0 0 100 120" width="32" height="38">
              {/* Boina */}
              <path d="M 28 22 C 24 8 72 4 84 15 C 88 22 76 25 28 22 Z" fill="#1e3a8a" stroke="#18181b" strokeWidth="2.2" />
              {/* Goma rosa */}
              <path d="M 34 26 C 34 16 76 16 76 26 Z" fill="#fb7185" stroke="#18181b" strokeWidth="2.2" />
              {/* Casquillo dorado */}
              <rect x="32" y="26" width="46" height="10" rx="1.5" fill="#facc15" stroke="#18181b" strokeWidth="2.2" />
              {/* Cuerpo amarillo */}
              <rect x="34" y="36" width="42" height="48" fill="#fde047" stroke="#18181b" strokeWidth="2.2" />
              {/* Ojos y carita */}
              <circle cx="48" cy="54" r="3" fill="#18181b" />
              <circle cx="62" cy="54" r="3" fill="#18181b" />
              <path d="M 50 64 Q 55 69 60 64" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Punta de madera y grafito */}
              <path d="M 34 84 L 55 106 L 76 84 Z" fill="#fde68a" stroke="#18181b" strokeWidth="2.2" />
              <path d="M 48 99 L 55 106 L 62 99 Z" fill="#18181b" />
            </svg>
          </div>

          <div className="sidebar-nav__bocetin-bubble">
            <span className="sidebar-nav__bocetin-tip-text">
              {BOCETIN_TIPS[tipIndex]}
            </span>
          </div>
        </div>

        <div className="sidebar-nav__footer-info">
          <span className="sidebar-nav__footer-tag">
            {totalComponents} Componentes Listos
          </span>
          {onToggleForceDesktop && (
            <button
              type="button"
              className={`sidebar-nav__view-toggle-btn ${isForceDesktop ? 'sidebar-nav__view-toggle-btn--active' : ''}`}
              onClick={onToggleForceDesktop}
              title={isForceDesktop ? "Volver a vista móvil adaptada" : "Forzar versión de escritorio completa"}
            >
              {isForceDesktop ? <Smartphone size={12} /> : <Monitor size={12} />}
              <span>{isForceDesktop ? 'Móvil' : 'Escritorio'}</span>
            </button>
          )}
          <span className="sidebar-nav__footer-gpu">120 FPS GPU</span>
        </div>
      </div>
    </aside>
    </>
  );
}

export default SidebarNav;

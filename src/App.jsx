import React, { useState, useEffect } from 'react';
import './App.css';
import {
  SketchBadge, SketchDivider, SketchToast, SketchLogo, SketchDoodleCanvas,
  SketchGridIcon, SketchNotebookIcon, SketchPaperIcon, SketchChalkboardIcon
} from './components/sketch';

import { SidebarNav } from './showcase/SidebarNav';

import {
  ButtonDoc, SwitchDoc, CardDoc, DrawerDoc, TabsDoc, AccordionDoc,
  StickyNoteDoc, ModalDoc, DividerDoc, BreadcrumbDoc, StepsDoc,
  InputDoc, CheckboxDoc, SelectDoc, SliderDoc, TableDoc,
  StatCardDoc, RatingDoc, PaginationDoc, BadgeDoc, TagDoc,
  AvatarDoc, EmptyStateDoc, ProgressDoc, SkeletonDoc, LoaderDoc,
  AlertDoc, TooltipDoc, ToastDoc, DesignSystemDoc, TemplatesDoc, PlaygroundDoc,
  WelcomeDoc, QuickStartDoc, DropdownDoc, PopoverDoc, UploadDoc, TimelineDoc, ChartsDoc,
  SignatureDoc, DatePickerDoc, ColorPickerDoc, PinInputDoc, AutocompleteDoc,
  NavbarDoc, SidebarDoc, CommandPaletteDoc, TreeViewDoc, CodeBlockDoc, CarouselDoc,
  DoodleDoc, IconDoc, CloseButtonDoc, ScrollAreaDoc
} from './showcase/docs';

import { PenTool, Palette, MousePointer, Monitor, Smartphone, Menu } from 'lucide-react';

const CANVAS_OPTIONS = [
  { id: 'paper-grid', label: 'Cuadrícula', Icon: SketchGridIcon },
  { id: 'paper-lined', label: 'Cuaderno Rayado', Icon: SketchNotebookIcon },
  { id: 'paper-plain', label: 'Papel Blanco', Icon: SketchPaperIcon },
  { id: 'paper-chalk', label: 'Pizarra de Tiza', Icon: SketchChalkboardIcon },
];

const CURSOR_OPTIONS = [
  { id: 'comic', label: 'Puntero Cómic', Icon: MousePointer, desc: 'Flecha negra rayada y guante clásico con arrastre, corte y clics', toast: 'Puntero Cómic BocetoUI activado' },
  { id: 'native', label: 'Nativo', Icon: MousePointer, desc: 'Puntero predeterminado del navegador', toast: 'Puntero: Nativo del Sistema' },
];

export function App() {
  const [canvasType, setCanvasType] = useState('paper-grid');
  const [cursorMode, setCursorMode] = useState(() => {
    return localStorage.getItem('boceto_cursor_mode') || 'comic';
  });
  const [activeCategory, setActiveCategory] = useState('welcome');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success', key: 0 });
  const [isDoodleOpen, setIsDoodleOpen] = useState(false);
  const [isForceDesktop, setIsForceDesktop] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleForceDesktop = () => {
    setIsForceDesktop((prev) => {
      const next = !prev;
      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        if (next) {
          meta.setAttribute('content', 'width=1080, initial-scale=0.35, minimum-scale=0.2, maximum-scale=5.0, user-scalable=yes');
        } else {
          meta.setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=0.25, maximum-scale=5.0');
        }
      }
      showToast(next ? '🖥️ Modo escritorio forzado activado' : '📱 Modo móvil adaptado reactivado');
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-cursor', cursorMode);
    localStorage.setItem('boceto_cursor_mode', cursorMode);
  }, [cursorMode]);

  const showToast = (message, type = 'success') => {
    setToast({ isOpen: true, message, type, key: Date.now() });
  };

  const copyCode = (codeText) => {
    navigator.clipboard?.writeText(codeText);
    showToast('¡Código copiado al portapapeles!');
  };

  const isDarkChalk = canvasType === 'paper-chalk';

  // Renderiza el componente seleccionado o la vista continua
  const renderContent = () => {
    switch (activeCategory) {
      case 'quickstart': return <QuickStartDoc onTriggerToast={showToast} />;
      case 'signature': return <SignatureDoc onTriggerToast={showToast} />;
      case 'templates': return <TemplatesDoc onTriggerToast={showToast} />;
      case 'design-system': return <DesignSystemDoc />;
      case 'navbar': return <NavbarDoc onTriggerToast={showToast} />;
      case 'commandpalette': return <CommandPaletteDoc onTriggerToast={showToast} />;
      case 'breadcrumb': return <BreadcrumbDoc onTriggerToast={showToast} />;
      case 'steps': return <StepsDoc onTriggerToast={showToast} />;
      case 'button': return <ButtonDoc onTriggerToast={showToast} />;
      case 'switch': return <SwitchDoc onTriggerToast={showToast} />;
      case 'dropdown': return <DropdownDoc onTriggerToast={showToast} />;
      case 'closebutton': return <CloseButtonDoc onTriggerToast={showToast} />;
      case 'card': return <CardDoc onTriggerToast={showToast} onCopyCode={copyCode} />;
      case 'sidebar': return <SidebarDoc onTriggerToast={showToast} />;
      case 'drawer': return <DrawerDoc onTriggerToast={showToast} />;
      case 'popover': return <PopoverDoc onTriggerToast={showToast} />;
      case 'tabs': return <TabsDoc onTriggerToast={showToast} />;
      case 'accordion': return <AccordionDoc onTriggerToast={showToast} />;
      case 'scrollarea': return <ScrollAreaDoc onTriggerToast={showToast} />;
      case 'stickynote': return <StickyNoteDoc />;
      case 'modal': return <ModalDoc onTriggerToast={showToast} />;
      case 'divider': return <DividerDoc />;
      case 'input': return <InputDoc />;
      case 'datepicker': return <DatePickerDoc onTriggerToast={showToast} />;
      case 'colorpicker': return <ColorPickerDoc onTriggerToast={showToast} />;
      case 'pininput': return <PinInputDoc onTriggerToast={showToast} />;
      case 'autocomplete': return <AutocompleteDoc onTriggerToast={showToast} />;
      case 'upload': return <UploadDoc onTriggerToast={showToast} />;
      case 'checkbox': return <CheckboxDoc />;
      case 'select': return <SelectDoc onTriggerToast={showToast} />;
      case 'slider': return <SliderDoc />;
      case 'charts': return <ChartsDoc onTriggerToast={showToast} />;
      case 'timeline': return <TimelineDoc />;
      case 'statcard': return <StatCardDoc onTriggerToast={showToast} />;
      case 'treeview': return <TreeViewDoc onTriggerToast={showToast} />;
      case 'codeblock': return <CodeBlockDoc />;
      case 'carousel': return <CarouselDoc onTriggerToast={showToast} />;
      case 'rating': return <RatingDoc onTriggerToast={showToast} />;
      case 'table': return <TableDoc onTriggerToast={showToast} />;
      case 'pagination': return <PaginationDoc onTriggerToast={showToast} />;
      case 'badge': return <BadgeDoc />;
      case 'tag': return <TagDoc onTriggerToast={showToast} />;
      case 'avatar': return <AvatarDoc />;
      case 'emptystate': return <EmptyStateDoc onTriggerToast={showToast} />;
      case 'progress': return <ProgressDoc onTriggerToast={showToast} />;
      case 'skeleton': return <SkeletonDoc />;
      case 'loader': return <LoaderDoc />;
      case 'alert': return <AlertDoc onTriggerToast={showToast} />;
      case 'tooltip': return <TooltipDoc />;
      case 'toast': return <ToastDoc />;
      case 'doodle': return <DoodleDoc onTriggerToast={showToast} onToggleDoodle={setIsDoodleOpen} />;
      case 'icon': return <IconDoc onTriggerToast={showToast} />;
      case 'playground': return <PlaygroundDoc onTriggerToast={showToast} onCopyCode={copyCode} />;
      case 'all':
      default: {
        const ALL_DOCS = [
          <SignatureDoc key="sig" onTriggerToast={showToast} />,
          <NavbarDoc key="nav" onTriggerToast={showToast} />,
          <BreadcrumbDoc key="bread" onTriggerToast={showToast} />,
          <StepsDoc key="steps" onTriggerToast={showToast} />,
          <CommandPaletteDoc key="cmd" onTriggerToast={showToast} />,
          <ButtonDoc key="btn" onTriggerToast={showToast} />,
          <SwitchDoc key="sw" onTriggerToast={showToast} />,
          <DropdownDoc key="drop" onTriggerToast={showToast} />,
          <CloseButtonDoc key="closebtn" onTriggerToast={showToast} />,
          <CardDoc key="card" onTriggerToast={showToast} onCopyCode={copyCode} />,
          <SidebarDoc key="side" onTriggerToast={showToast} />,
          <DrawerDoc key="draw" onTriggerToast={showToast} />,
          <PopoverDoc key="pop" onTriggerToast={showToast} />,
          <TabsDoc key="tabs" onTriggerToast={showToast} />,
          <AccordionDoc key="acc" onTriggerToast={showToast} />,
          <ScrollAreaDoc key="scroll" onTriggerToast={showToast} />,
          <StickyNoteDoc key="sticky" />,
          <InputDoc key="inp" />,
          <DatePickerDoc key="dp" onTriggerToast={showToast} />,
          <ColorPickerDoc key="cp" onTriggerToast={showToast} />,
          <PinInputDoc key="pin" onTriggerToast={showToast} />,
          <AutocompleteDoc key="auto" onTriggerToast={showToast} />,
          <UploadDoc key="up" onTriggerToast={showToast} />,
          <CheckboxDoc key="chk" />,
          <SelectDoc key="sel" onTriggerToast={showToast} />,
          <SliderDoc key="sld" />,
          <ChartsDoc key="chrt" onTriggerToast={showToast} />,
          <TimelineDoc key="time" />,
          <StatCardDoc key="stat" onTriggerToast={showToast} />,
          <TreeViewDoc key="tree" onTriggerToast={showToast} />,
          <CodeBlockDoc key="code" />,
          <CarouselDoc key="car" onTriggerToast={showToast} />,
          <TableDoc key="tbl" onTriggerToast={showToast} />,
          <RatingDoc key="rat" onTriggerToast={showToast} />,
          <PaginationDoc key="pag" onTriggerToast={showToast} />,
          <BadgeDoc key="bdg" />,
          <TagDoc key="tag" onTriggerToast={showToast} />,
          <AvatarDoc key="avt" />,
          <EmptyStateDoc key="emp" onTriggerToast={showToast} />,
          <ProgressDoc key="prg" onTriggerToast={showToast} />,
          <SkeletonDoc key="skel" />,
          <LoaderDoc key="load" />,
          <AlertDoc key="alt" onTriggerToast={showToast} />,
          <TooltipDoc key="tip" />,
          <ToastDoc key="tst" />,
          <DoodleDoc key="doodle" onTriggerToast={showToast} onToggleDoodle={setIsDoodleOpen} />,
          <IconDoc key="icon" onTriggerToast={showToast} />
        ];
        return (
          <>
            {ALL_DOCS.map((doc, idx) => (
              <React.Fragment key={idx}>
                {doc}
                <SketchDivider variant={idx % 2 === 0 ? 'wavy' : 'zigzag'} />
              </React.Fragment>
            ))}
          </>
        );
      }
    }
  };

  // Si estamos en la pantalla de presentación, renderizamos la experiencia completa e inmersiva
  if (activeCategory === 'welcome') {
    return (
      <div
        className={`paper-canvas ${canvasType} ${isForceDesktop ? 'force-desktop' : ''}`}
        data-theme={isDarkChalk ? 'chalkboard' : 'light'}
      >
        <WelcomeDoc
          onNavigate={(target) => {
            setActiveCategory(target);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onTriggerToast={showToast}
          canvasType={canvasType}
          onSetCanvasType={setCanvasType}
          cursorMode={cursorMode}
          onSetCursorMode={setCursorMode}
          isDoodleOpen={isDoodleOpen}
          onToggleDoodle={setIsDoodleOpen}
          isForceDesktop={isForceDesktop}
          onToggleForceDesktop={toggleForceDesktop}
          onOpenMobileNav={() => {
            setActiveCategory('all');
            setIsMobileNavOpen(true);
          }}
        />

        <SketchToast
          key={toast.key}
          isOpen={toast.isOpen}
          message={toast.message}
          type={toast.type}
          duration={4500}
          onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
        />

        <SketchDoodleCanvas
          isOpen={isDoodleOpen}
          onClose={() => setIsDoodleOpen(false)}
          canvasType={canvasType}
          onTriggerToast={showToast}
        />
      </div>
    );
  }

  return (
    <div
      className={`paper-canvas ${canvasType} ${isForceDesktop ? 'force-desktop' : ''}`}
      data-theme={isDarkChalk ? 'chalkboard' : 'light'}
    >
      <div className="showcase-layout-fixed">
        
        {/* Menú Lateral Fijo en Escritorio y Cajón Deslizante en Móviles */}
        <SidebarNav
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
            setSearchTerm('');
            setIsMobileNavOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onTriggerToast={showToast}
          totalComponents={54}
          isForceDesktop={isForceDesktop}
          onToggleForceDesktop={toggleForceDesktop}
          isOpenOnMobile={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />

        {/* Contenido Principal de Documentación */}
        <main className="showcase-main-expanded">
          
          {/* BARRA SUPERIOR COMPACTA DE DOCUMENTACIÓN */}
          <header className="docs-topbar">
            <div className="docs-topbar__left">
              {/* Botón para abrir el Menú en pantallas móviles */}
              <button
                type="button"
                className="docs-menu-trigger-btn"
                onClick={() => setIsMobileNavOpen(true)}
                title="Abrir índice de componentes"
                aria-label="Abrir menú de componentes"
              >
                <Menu size={16} />
                <span className="docs-menu-trigger-text">Índice (54)</span>
              </button>

              <button
                type="button"
                className="docs-back-btn"
                onClick={() => {
                  setActiveCategory('welcome');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ← <span className="docs-back-text">Presentación</span>
              </button>
              <span className="docs-topbar__divider">/</span>
              <div className="docs-topbar__badge">
                <SketchLogo size="xs" />
              </div>
            </div>

            {/* Controles de Lienzo y Puntero Compactos */}
            <div className="docs-topbar__tools">
              <div className="canvas-selector-bar canvas-selector-bar--compact">
                {CANVAS_OPTIONS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className={`canvas-btn ${canvasType === id ? 'canvas-btn--active' : ''}`}
                    onClick={() => setCanvasType(id)}
                    title={label}
                  >
                    <Icon size={14} /> <span className="docs-tool-label">{label}</span>
                  </button>
                ))}
              </div>

              <div className="cursor-selector-bar cursor-selector-bar--compact">
                {CURSOR_OPTIONS.map(({ id, label, Icon, desc, toast: toastMsg }) => (
                  <button
                    key={id}
                    type="button"
                    className={`cursor-btn ${cursorMode === id ? 'cursor-btn--active' : ''}`}
                    onClick={() => {
                      setCursorMode(id);
                      showToast(toastMsg);
                    }}
                    title={desc}
                  >
                    <Icon size={14} /> <span className="docs-tool-label">{label}</span>
                  </button>
                ))}

                {/* Botón rápido de activación de Modo Garabato */}
                <button
                  type="button"
                  className={`cursor-btn ${isDoodleOpen ? 'cursor-btn--active' : ''}`}
                  onClick={() => {
                    const next = !isDoodleOpen;
                    setIsDoodleOpen(next);
                    if (next) showToast('✏️ Estuche abierto: ¡Ya puedes garabatear sobre la pantalla!');
                  }}
                  title="Activar estuche de garabatos y dibujo a mano alzada"
                >
                  <PenTool size={14} /> <span className="docs-tool-label">Garabato</span>
                </button>

                {/* Alternar Vista Escritorio / Móvil */}
                <button
                  type="button"
                  className={`cursor-btn ${isForceDesktop ? 'cursor-btn--active' : ''}`}
                  onClick={toggleForceDesktop}
                  title={isForceDesktop ? "Volver a vista móvil adaptada" : "Forzar versión de escritorio completa"}
                >
                  {isForceDesktop ? <Smartphone size={14} /> : <Monitor size={14} />}
                  <span className="docs-tool-label">{isForceDesktop ? 'Móvil' : 'Escritorio'}</span>
                </button>
              </div>
            </div>
          </header>

          <SketchDivider variant="wavy" />

          {/* Renderizado de Documentación de Componentes */}
          {renderContent()}

        </main>
      </div>

      {/* Toast Flotante Global */}
      <SketchToast
        key={toast.key}
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        duration={4500}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Capa de Garabatos & Estuche Flotante de Dibujo */}
      <SketchDoodleCanvas
        isOpen={isDoodleOpen}
        onClose={() => setIsDoodleOpen(false)}
        canvasType={canvasType}
        onTriggerToast={showToast}
      />
    </div>
  );
}

export default App;

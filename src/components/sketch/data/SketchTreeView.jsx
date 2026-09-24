import React, { useState } from 'react';
import './SketchTreeView.css';
import { ChevronRight, Folder, FolderOpen, FileText } from 'lucide-react';

function TreeNode({
  node,
  selectedId,
  onSelect,
  defaultExpandedIds = []
}) {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const [isExpanded, setIsExpanded] = useState(() =>
    defaultExpandedIds.includes(node.id) || Boolean(node.defaultExpanded)
  );

  const isSelected = selectedId === node.id;

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const handleClick = () => {
    onSelect?.(node);
  };

  const getIcon = () => {
    if (node.icon) return node.icon;
    if (hasChildren) {
      return isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />;
    }
    return <FileText size={16} />;
  };

  return (
    <li className="sketch-tree__node">
      <div
        className={`sketch-tree__item ${isSelected ? 'sketch-tree__item--selected' : ''}`}
        onClick={handleClick}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        {hasChildren ? (
          <button
            type="button"
            className={`sketch-tree__toggle-btn ${isExpanded ? 'sketch-tree__toggle-btn--expanded' : ''}`}
            onClick={handleToggle}
            aria-label={isExpanded ? 'Colapsar rama' : 'Expandir rama'}
          >
            <ChevronRight size={15} />
          </button>
        ) : (
          <span style={{ width: 18 }} />
        )}

        <span className="sketch-tree__icon">{getIcon()}</span>
        <span className="sketch-tree__label">{node.label}</span>
      </div>

      {hasChildren && isExpanded && (
        <ul className="sketch-tree__nested" role="group">
          {node.children.map((child) => (
            <TreeNode
              key={child.id || child.label}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              defaultExpandedIds={defaultExpandedIds}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * SketchTreeView - Árbol jerárquico de carpetas y nodos con conectores a mano
 */
export function SketchTreeView({
  data = [],
  selectedId,
  onSelect,
  defaultExpandedIds = [],
  className = '',
  ...props
}) {
  return (
    <div className={`sketch-tree ${className}`} {...props}>
      <ul className="sketch-tree__list" role="tree">
        {data.map((node) => (
          <TreeNode
            key={node.id || node.label}
            node={node}
            selectedId={selectedId}
            onSelect={onSelect}
            defaultExpandedIds={defaultExpandedIds}
          />
        ))}
      </ul>
    </div>
  );
}

export default SketchTreeView;

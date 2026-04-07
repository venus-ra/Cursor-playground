import React, { useState } from 'react'
import { OutlineItem } from './OutlineItem'

export interface OutlineNode {
  id: string
  label: string
  type?: 'shell' | 'section'
  children?: OutlineNode[]
}

export interface OutlinePanelProps {
  title?: string
  nodes?: OutlineNode[]
  activeId?: string
  onSelect?: (id: string) => void
}

const defaultNodes: OutlineNode[] = [
  {
    id: '1',
    label: 'Introduction',
    type: 'shell',
    children: [
      { id: '1.1', label: 'Overview', type: 'section' },
      { id: '1.2', label: 'Getting Started', type: 'section' },
    ],
  },
  {
    id: '2',
    label: 'Methods',
    type: 'shell',
    children: [
      { id: '2.1', label: 'Data Collection', type: 'section' },
      { id: '2.2', label: 'Analysis', type: 'section' },
    ],
  },
  {
    id: '3',
    label: 'Results',
    type: 'shell',
  },
  {
    id: '4',
    label: 'Discussion',
    type: 'shell',
  },
]

function OutlineNodeItem({
  node,
  activeId,
  expandedIds,
  onSelect,
  onToggle,
  depth = 0,
}: {
  node: OutlineNode
  activeId?: string
  expandedIds: Set<string>
  onSelect: (id: string) => void
  onToggle: (id: string) => void
  depth?: number
}) {
  const isActive = node.id === activeId
  const isExpanded = expandedIds.has(node.id)
  const hasChildren = (node.children?.length ?? 0) > 0

  return (
    <>
      <OutlineItem
        label={node.label}
        type={node.type}
        state={isActive ? 'default-active' : 'default-inactive'}
        depth={depth}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        onToggle={() => onToggle(node.id)}
        onClick={() => onSelect(node.id)}
      />
      {hasChildren && isExpanded && node.children?.map((child) => (
        <OutlineNodeItem
          key={child.id}
          node={child}
          activeId={activeId}
          expandedIds={expandedIds}
          onSelect={onSelect}
          onToggle={onToggle}
          depth={depth + 1}
        />
      ))}
    </>
  )
}

export function OutlinePanel({
  title = 'Outline',
  nodes = defaultNodes,
  activeId,
  onSelect,
}: OutlinePanelProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(nodes.filter((n) => n.children?.length).map((n) => n.id))
  )
  const [selectedId, setSelectedId] = useState<string | undefined>(activeId)

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSelect = (id: string) => {
    setSelectedId(id)
    onSelect?.(id)
  }

  return (
    <div className="w-[236px] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-3 py-2.5 border-b border-gray-100">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="py-1 max-h-96 overflow-y-auto">
        {nodes.map((node) => (
          <OutlineNodeItem
            key={node.id}
            node={node}
            activeId={selectedId}
            expandedIds={expandedIds}
            onSelect={handleSelect}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  )
}

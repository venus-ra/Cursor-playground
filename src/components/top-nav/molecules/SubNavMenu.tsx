import React from 'react'
import { ChevronRight } from 'lucide-react'

export interface SubNavMenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: string | number
  children?: SubNavMenuItem[]
  href?: string
}

export interface SubNavMenuProps {
  items: SubNavMenuItem[]
  title?: string
  onSelect?: (id: string) => void
  activeId?: string
}

function MenuItem({
  item,
  activeId,
  onSelect,
  depth = 0,
}: {
  item: SubNavMenuItem
  activeId?: string
  onSelect?: (id: string) => void
  depth?: number
}) {
  const isActive = item.id === activeId
  const hasChildren = (item.children?.length ?? 0) > 0

  return (
    <div>
      <button
        onClick={() => onSelect?.(item.id)}
        className={`
          w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md
          transition-all duration-150 outline-none text-left
          ${isActive
            ? 'bg-blue-50 text-blue-700 font-medium'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }
        `}
        style={{ paddingLeft: depth > 0 ? `${12 + depth * 16}px` : undefined }}
      >
        {item.icon && (
          <span className="flex-shrink-0 text-gray-400">{item.icon}</span>
        )}
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge !== undefined && (
          <span className="flex-shrink-0 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronRight size={14} className="flex-shrink-0 text-gray-400" />
        )}
      </button>
      {hasChildren && item.children?.map((child) => (
        <MenuItem key={child.id} item={child} activeId={activeId} onSelect={onSelect} depth={depth + 1} />
      ))}
    </div>
  )
}

export function SubNavMenu({ items, title, onSelect, activeId }: SubNavMenuProps) {
  return (
    <div className="w-[236px] bg-white border border-gray-200 rounded-lg shadow-md py-1">
      {title && (
        <div className="px-3 py-2 border-b border-gray-100 mb-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</span>
        </div>
      )}
      {items.map((item) => (
        <MenuItem key={item.id} item={item} activeId={activeId} onSelect={onSelect} />
      ))}
    </div>
  )
}

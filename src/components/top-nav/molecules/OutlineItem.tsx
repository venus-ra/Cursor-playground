import React from 'react'
import { ChevronRight } from 'lucide-react'

export type OutlineItemType = 'shell' | 'section'
export type OutlineItemState = 'default-active' | 'default-inactive' | 'hover' | 'focus' | 'collapsed'

export interface OutlineItemProps {
  label: string
  type?: OutlineItemType
  state?: OutlineItemState
  depth?: number
  hasChildren?: boolean
  isExpanded?: boolean
  onToggle?: () => void
  onClick?: () => void
}

const stateStyles: Record<OutlineItemState, string> = {
  'default-active': 'bg-blue-50 text-blue-700 font-medium',
  'default-inactive': 'text-gray-600 hover:bg-gray-50',
  'hover': 'bg-gray-50 text-gray-700',
  'focus': 'ring-2 ring-inset ring-blue-500 text-gray-700',
  'collapsed': 'text-gray-500',
}

export function OutlineItem({
  label,
  type = 'shell',
  state = 'default-inactive',
  depth = 0,
  hasChildren = false,
  isExpanded = true,
  onToggle,
  onClick,
}: OutlineItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className={`
        flex items-center gap-1.5 px-2 py-1.5 rounded-md cursor-pointer
        text-sm transition-all duration-150 outline-none select-none
        ${stateStyles[state]}
        ${depth > 0 ? `pl-${(depth + 1) * 4}` : 'pl-2'}
      `}
      style={{ paddingLeft: depth > 0 ? `${(depth + 1) * 12}px` : undefined }}
    >
      {hasChildren && (
        <button
          onClick={(e) => { e.stopPropagation(); onToggle?.() }}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <ChevronRight
            size={14}
            className={`transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
          />
        </button>
      )}
      {!hasChildren && <span className="w-3.5 flex-shrink-0" />}
      <span className="truncate">
        {type === 'section' && (
          <span className="mr-1 text-xs text-gray-400 font-mono">#</span>
        )}
        {label}
      </span>
    </div>
  )
}

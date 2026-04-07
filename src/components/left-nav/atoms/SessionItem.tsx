import React from 'react'
import { MessageSquare } from 'lucide-react'

export type SessionItemState = 'default' | 'hover' | 'focus'

export interface SessionItemProps {
  title: string
  subtitle?: string
  timestamp?: string
  isActive?: boolean
  state?: SessionItemState
  onClick?: () => void
}

const stateStyles: Record<SessionItemState, string> = {
  default: 'hover:bg-[#2a3347]',
  hover: 'bg-[#2a3347]',
  focus: 'ring-1 ring-inset ring-blue-400',
}

export function SessionItem({
  title,
  subtitle,
  timestamp,
  isActive = false,
  state = 'default',
  onClick,
}: SessionItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-start gap-2.5 px-3 py-2.5 rounded-md
        transition-all duration-150 outline-none text-left
        ${stateStyles[state]}
        ${isActive ? 'bg-[#2a3347]' : ''}
      `}
    >
      <MessageSquare size={14} className="flex-shrink-0 mt-0.5 text-gray-500" />
      <div className="flex-1 min-w-0">
        <div className={`text-xs font-medium truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-500 truncate mt-0.5">{subtitle}</div>
        )}
      </div>
      {timestamp && (
        <span className="flex-shrink-0 text-xs text-gray-600">{timestamp}</span>
      )}
    </button>
  )
}

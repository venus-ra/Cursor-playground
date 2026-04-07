import React from 'react'
import { Plus } from 'lucide-react'

export type NewSessionState = 'default' | 'hover' | 'focus'
export type NewSessionPlatform = 'mac' | 'windows'

export interface NewSessionButtonProps {
  state?: NewSessionState
  platform?: NewSessionPlatform
  isExpanded?: boolean
  onClick?: () => void
}

const stateStyles: Record<NewSessionState, string> = {
  default: 'bg-blue-600 hover:bg-blue-700 text-white',
  hover: 'bg-blue-700 text-white',
  focus: 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-1 ring-offset-[#1e2432]',
}

const shortcutMap: Record<NewSessionPlatform, string> = {
  mac: '⌘N',
  windows: 'Ctrl+N',
}

export function NewSessionButton({
  state = 'default',
  platform = 'mac',
  isExpanded = true,
  onClick,
}: NewSessionButtonProps) {
  if (!isExpanded) {
    return (
      <button
        onClick={onClick}
        aria-label="New session"
        className={`
          w-10 h-10 flex items-center justify-center rounded-md
          transition-all duration-150 outline-none
          ${stateStyles[state]}
        `}
      >
        <Plus size={18} />
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      aria-label="New session"
      className={`
        w-full flex items-center justify-between gap-2 px-3 h-9 rounded-md
        text-sm font-medium transition-all duration-150 outline-none
        ${stateStyles[state]}
      `}
    >
      <span className="flex items-center gap-2">
        <Plus size={16} />
        New Session
      </span>
      <span className="text-xs font-normal text-blue-200 opacity-75">
        {shortcutMap[platform]}
      </span>
    </button>
  )
}

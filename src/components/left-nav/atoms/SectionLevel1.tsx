import React from 'react'
import { ChevronLeft } from 'lucide-react'

export type SectionState = 'default' | 'hover' | 'pressed' | 'active' | 'disabled' | 'focused'

export interface SectionLevel1Props {
  label: string
  icon: React.ReactNode
  state?: SectionState
  isExpanded?: boolean
  onToggleExpand?: () => void
  onClick?: () => void
}

const stateStyles: Record<SectionState, string> = {
  default: 'text-gray-300 hover:bg-[#2a3347] hover:text-white',
  hover: 'bg-[#2a3347] text-white',
  pressed: 'bg-[#1a2335] text-white',
  active: 'bg-blue-600 text-white',
  disabled: 'text-gray-600 cursor-not-allowed',
  focused: 'ring-2 ring-blue-400 ring-inset text-white',
}

export function SectionLevel1({
  label,
  icon,
  state = 'default',
  isExpanded = true,
  onToggleExpand,
  onClick,
}: SectionLevel1Props) {
  if (!isExpanded) {
    return (
      <button
        onClick={state !== 'disabled' ? onClick : undefined}
        disabled={state === 'disabled'}
        title={label}
        aria-label={label}
        className={`
          w-10 h-10 flex items-center justify-center rounded-md
          transition-all duration-150 outline-none
          ${stateStyles[state]}
        `}
      >
        <span className="w-5 h-5">{icon}</span>
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 w-full group">
      <button
        onClick={state !== 'disabled' ? onClick : undefined}
        disabled={state === 'disabled'}
        className={`
          flex-1 flex items-center gap-3 px-3 h-10 rounded-md
          transition-all duration-150 outline-none text-left
          ${stateStyles[state]}
        `}
      >
        <span className="w-5 h-5 flex-shrink-0">{icon}</span>
        <span className="text-sm font-medium truncate">{label}</span>
      </button>
      {onToggleExpand && (
        <button
          onClick={onToggleExpand}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-300 rounded transition-colors"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft size={14} />
        </button>
      )}
    </div>
  )
}

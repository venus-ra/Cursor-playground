import React from 'react'

export type SectionLevel2State = 'default' | 'hover' | 'pressed' | 'disabled' | 'focused'
export type SectionLevel2Type = 'simple-text' | 'text-icon'

export interface SectionLevel2Props {
  label: string
  icon?: React.ReactNode
  type?: SectionLevel2Type
  state?: SectionLevel2State
  isSelected?: boolean
  onClick?: () => void
}

const stateStyles: Record<SectionLevel2State, string> = {
  default: 'text-gray-400 hover:bg-[#2a3347] hover:text-gray-200',
  hover: 'bg-[#2a3347] text-gray-200',
  pressed: 'bg-[#1a2335] text-gray-200',
  disabled: 'text-gray-600 cursor-not-allowed',
  focused: 'ring-1 ring-blue-400 ring-inset text-gray-200',
}

export function SectionLevel2({
  label,
  icon,
  type = 'simple-text',
  state = 'default',
  isSelected = false,
  onClick,
}: SectionLevel2Props) {
  return (
    <button
      onClick={state !== 'disabled' ? onClick : undefined}
      disabled={state === 'disabled'}
      className={`
        w-full flex items-center gap-2 px-3 py-1.5 rounded-md
        text-xs transition-all duration-150 outline-none text-left
        ${stateStyles[state]}
        ${isSelected ? 'text-blue-400 font-medium' : ''}
      `}
    >
      {type === 'text-icon' && icon && (
        <span className="w-4 h-4 flex-shrink-0 text-gray-500">{icon}</span>
      )}
      <span className="truncate">{label}</span>
    </button>
  )
}

import React from 'react'

export type ButtonState = 'default' | 'hover' | 'pressed' | 'active' | 'focused' | 'disabled'

export interface IconButtonProps {
  icon: React.ReactNode
  state?: ButtonState
  label?: string
  onClick?: () => void
  className?: string
  'aria-label'?: string
}

const stateStyles: Record<ButtonState, string> = {
  default: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
  hover: 'bg-gray-100 text-gray-700',
  pressed: 'bg-gray-200 text-gray-800',
  active: 'bg-blue-50 text-blue-600',
  focused: 'ring-2 ring-blue-500 ring-offset-1 text-gray-700',
  disabled: 'text-gray-300 cursor-not-allowed',
}

export function IconButton({
  icon,
  state = 'default',
  label,
  onClick,
  className = '',
  'aria-label': ariaLabel,
}: IconButtonProps) {
  return (
    <button
      onClick={state !== 'disabled' ? onClick : undefined}
      disabled={state === 'disabled'}
      aria-label={ariaLabel || label}
      className={`
        relative inline-flex items-center justify-center w-8 h-8 rounded-md
        transition-all duration-150 outline-none cursor-pointer
        ${stateStyles[state]}
        ${state === 'focused' ? 'w-10 h-10' : ''}
        ${className}
      `}
    >
      <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
    </button>
  )
}

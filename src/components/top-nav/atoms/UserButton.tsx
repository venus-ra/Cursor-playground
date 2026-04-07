import React from 'react'
import { User } from 'lucide-react'
import { ButtonState } from './IconButton'

export interface UserButtonProps {
  state?: ButtonState
  displayMode?: 'icon-only' | 'full'
  userName?: string
  userRole?: string
  onClick?: () => void
}

const stateStyles: Record<ButtonState, string> = {
  default: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
  hover: 'bg-gray-100 text-gray-700',
  pressed: 'bg-gray-200 text-gray-800',
  active: 'bg-blue-50 text-blue-600',
  focused: 'ring-2 ring-blue-500 ring-offset-1 text-gray-700',
  disabled: 'text-gray-300 cursor-not-allowed',
}

export function UserButton({
  state = 'default',
  displayMode = 'icon-only',
  userName = 'John Doe',
  userRole = 'Admin',
  onClick,
}: UserButtonProps) {
  if (displayMode === 'full') {
    return (
      <button
        onClick={state !== 'disabled' ? onClick : undefined}
        disabled={state === 'disabled'}
        aria-label="User profile"
        className={`
          inline-flex items-center gap-2 px-3 h-8 rounded-md
          transition-all duration-150 outline-none cursor-pointer
          ${stateStyles[state]}
          ${state === 'focused' ? 'h-10 ring-2 ring-blue-500 ring-offset-1' : ''}
        `}
      >
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-semibold">
            {userName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-xs font-medium text-gray-800 truncate max-w-[100px]">{userName}</span>
          <span className="text-xs text-gray-500 truncate max-w-[100px]">{userRole}</span>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={state !== 'disabled' ? onClick : undefined}
      disabled={state === 'disabled'}
      aria-label="User profile"
      className={`
        inline-flex items-center justify-center w-8 h-8 rounded-md
        transition-all duration-150 outline-none cursor-pointer
        ${stateStyles[state]}
        ${state === 'focused' ? 'w-10 h-10 ring-2 ring-blue-500 ring-offset-1' : ''}
      `}
    >
      <User size={16} />
    </button>
  )
}

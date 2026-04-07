import React from 'react'
import { X } from 'lucide-react'
import { IconButton, ButtonState } from './IconButton'

export interface ClearButtonProps {
  state?: ButtonState
  onClick?: () => void
}

export function ClearButton({ state = 'default', onClick }: ClearButtonProps) {
  return (
    <IconButton
      icon={<X size={16} />}
      state={state}
      label="Clear"
      aria-label="Clear"
      onClick={onClick}
    />
  )
}

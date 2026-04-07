import React from 'react'
import { HelpCircle } from 'lucide-react'
import { IconButton, ButtonState } from './IconButton'

export interface HelpButtonProps {
  state?: ButtonState
  onClick?: () => void
}

export function HelpButton({ state = 'default', onClick }: HelpButtonProps) {
  return (
    <IconButton
      icon={<HelpCircle size={16} />}
      state={state}
      label="Help"
      aria-label="Help"
      onClick={onClick}
    />
  )
}

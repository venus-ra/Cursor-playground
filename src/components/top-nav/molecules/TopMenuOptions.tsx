import React from 'react'
import { ClearButton } from '../atoms/ClearButton'
import { HelpButton } from '../atoms/HelpButton'
import { UserButton } from '../atoms/UserButton'
import type { ButtonState } from '../atoms/IconButton'

export interface TopMenuOptionsProps {
  clearState?: ButtonState
  helpState?: ButtonState
  userState?: ButtonState
  userDisplayMode?: 'icon-only' | 'full'
  userName?: string
  userRole?: string
  onClear?: () => void
  onHelp?: () => void
  onUser?: () => void
}

export function TopMenuOptions({
  clearState = 'default',
  helpState = 'default',
  userState = 'default',
  userDisplayMode = 'icon-only',
  userName = 'John Doe',
  userRole = 'Admin',
  onClear,
  onHelp,
  onUser,
}: TopMenuOptionsProps) {
  return (
    <div className="inline-flex items-center gap-1">
      <ClearButton state={clearState} onClick={onClear} />
      <HelpButton state={helpState} onClick={onHelp} />
      <UserButton
        state={userState}
        displayMode={userDisplayMode}
        userName={userName}
        userRole={userRole}
        onClick={onUser}
      />
    </div>
  )
}

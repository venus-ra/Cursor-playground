import React from 'react'

export interface ShortcutIconProps {
  icon: React.ReactNode
  label: string
  shortcut?: string
  onClick?: () => void
}

export function ShortcutIcon({ icon, label, shortcut, onClick }: ShortcutIconProps) {
  return (
    <button
      onClick={onClick}
      title={shortcut ? `${label} (${shortcut})` : label}
      aria-label={label}
      className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-300 transition-colors duration-150 outline-none"
    >
      <span className="w-4 h-4">{icon}</span>
      {shortcut && (
        <span className="text-[10px] font-medium text-gray-500">{shortcut}</span>
      )}
    </button>
  )
}

export interface ShortcutIconGroupProps {
  shortcuts: Array<{
    id: string
    icon: React.ReactNode
    label: string
    shortcut?: string
    onClick?: () => void
  }>
}

export function ShortcutIconGroup({ shortcuts }: ShortcutIconGroupProps) {
  return (
    <div className="inline-flex items-center gap-2">
      {shortcuts.map((s) => (
        <ShortcutIcon
          key={s.id}
          icon={s.icon}
          label={s.label}
          shortcut={s.shortcut}
          onClick={s.onClick}
        />
      ))}
    </div>
  )
}

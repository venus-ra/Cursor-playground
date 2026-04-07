import React, { useState } from 'react'
import { SectionLevel1 } from '../atoms/SectionLevel1'
import { SectionLevel2 } from '../atoms/SectionLevel2'
import type { SectionState } from '../atoms/SectionLevel1'

export interface SideNavSubItem {
  id: string
  label: string
  icon?: React.ReactNode
  type?: 'simple-text' | 'text-icon'
}

export interface SideNavSectionProps {
  id: string
  label: string
  icon: React.ReactNode
  state?: SectionState
  isExpanded?: boolean
  subItems?: SideNavSubItem[]
  activeSubId?: string
  onSectionClick?: (id: string) => void
  onSubItemClick?: (id: string) => void
  sidebarExpanded?: boolean
}

export function SideNavSection({
  id,
  label,
  icon,
  state = 'default',
  isExpanded: initialExpanded = false,
  subItems = [],
  activeSubId,
  onSectionClick,
  onSubItemClick,
  sidebarExpanded = true,
}: SideNavSectionProps) {
  const [isOpen, setIsOpen] = useState(initialExpanded)

  return (
    <div className="w-full">
      <SectionLevel1
        label={label}
        icon={icon}
        state={state}
        isExpanded={sidebarExpanded}
        onClick={() => {
          if (subItems.length > 0 && sidebarExpanded) setIsOpen((v) => !v)
          onSectionClick?.(id)
        }}
      />
      {sidebarExpanded && isOpen && subItems.length > 0 && (
        <div className="mt-0.5 ml-3 pl-3 border-l border-gray-700 space-y-0.5">
          {subItems.map((item) => (
            <SectionLevel2
              key={item.id}
              label={item.label}
              icon={item.icon}
              type={item.type ?? (item.icon ? 'text-icon' : 'simple-text')}
              isSelected={item.id === activeSubId}
              onClick={() => onSubItemClick?.(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

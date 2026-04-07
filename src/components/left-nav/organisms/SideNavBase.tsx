import React from 'react'
import { ChevronRight } from 'lucide-react'
import { NewSessionButton } from '../atoms/NewSessionButton'
import { SessionItem } from '../atoms/SessionItem'
import { SideNavSection } from '../molecules/SideNavSection'
import type { SideNavSectionProps } from '../molecules/SideNavSection'
import type { NewSessionPlatform } from '../atoms/NewSessionButton'

export interface SidebarSession {
  id: string
  title: string
  subtitle?: string
  timestamp?: string
  isActive?: boolean
}

export interface SideNavBaseProps {
  isExpanded?: boolean
  onToggleExpand?: () => void
  sections?: SideNavSectionProps[]
  sessions?: SidebarSession[]
  activeSectionId?: string
  activeSubItemId?: string
  platform?: NewSessionPlatform
  onNewSession?: () => void
  onSessionClick?: (id: string) => void
  onSectionClick?: (id: string) => void
  onSubItemClick?: (id: string) => void
  showSessions?: boolean
  headerLabel?: string
  className?: string
}

export function SideNavBase({
  isExpanded = true,
  onToggleExpand,
  sections = [],
  sessions = [],
  activeSectionId,
  activeSubItemId,
  platform = 'mac',
  onNewSession,
  onSessionClick,
  onSectionClick,
  onSubItemClick,
  showSessions = true,
  headerLabel,
  className = '',
}: SideNavBaseProps) {
  return (
    <aside
      className={`
        flex flex-col bg-[#1e2432] h-full overflow-hidden
        transition-all duration-200
        ${isExpanded ? 'w-[220px]' : 'w-14'}
        ${className}
      `}
      aria-label="Side navigation"
    >
      {/* Toggle button */}
      <div className={`flex items-center ${isExpanded ? 'justify-between px-3' : 'justify-center'} pt-3 pb-2`}>
        {isExpanded && headerLabel && (
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {headerLabel}
          </span>
        )}
        {onToggleExpand && (
          <button
            onClick={onToggleExpand}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-300 rounded transition-colors"
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronRight
              size={14}
              className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      {/* New Session */}
      {showSessions && (
        <div className={`${isExpanded ? 'px-3' : 'px-2'} pb-2`}>
          <NewSessionButton
            isExpanded={isExpanded}
            platform={platform}
            onClick={onNewSession}
          />
        </div>
      )}

      {/* Sections */}
      <nav className={`flex-shrink-0 ${isExpanded ? 'px-2' : 'px-2'} space-y-0.5`}>
        {sections.map((section) => (
          <SideNavSection
            key={section.id}
            {...section}
            state={section.id === activeSectionId ? 'active' : section.state ?? 'default'}
            activeSubId={activeSubItemId}
            sidebarExpanded={isExpanded}
            onSectionClick={onSectionClick}
            onSubItemClick={onSubItemClick}
          />
        ))}
      </nav>

      {/* Sessions List */}
      {showSessions && sessions.length > 0 && isExpanded && (
        <div className="flex-1 overflow-y-auto mt-3 px-2">
          <div className="px-1 pb-1">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Recent
            </span>
          </div>
          <div className="space-y-0.5">
            {sessions.map((session) => (
              <SessionItem
                key={session.id}
                title={session.title}
                subtitle={session.subtitle}
                timestamp={session.timestamp}
                isActive={session.isActive}
                onClick={() => onSessionClick?.(session.id)}
              />
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}

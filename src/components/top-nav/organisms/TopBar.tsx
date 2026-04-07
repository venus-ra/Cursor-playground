import React, { useState } from 'react'
import { Menu, ChevronDown } from 'lucide-react'
import { TopMenuOptions } from '../molecules/TopMenuOptions'
import { SubNavMenu } from '../molecules/SubNavMenu'
import type { SubNavMenuItem } from '../molecules/SubNavMenu'

export type TopBarBreakpoint = '3xl' | '2xl' | 'xl' | 'lg' | 'md'

export interface TopBarNavItem {
  id: string
  label: string
  isActive?: boolean
  hasDropdown?: boolean
  dropdownItems?: SubNavMenuItem[]
}

export interface TopBarProps {
  logo?: React.ReactNode
  logoText?: string
  navItems?: TopBarNavItem[]
  userName?: string
  userRole?: string
  onMenuToggle?: () => void
  onNavItemClick?: (id: string) => void
  className?: string
}

const defaultNavItems: TopBarNavItem[] = [
  { id: 'home', label: 'Home' },
  {
    id: 'libraries',
    label: 'Libraries',
    hasDropdown: true,
    dropdownItems: [
      { id: 'my-library', label: 'My Library' },
      { id: 'shared', label: 'Shared Libraries' },
      { id: 'datasets', label: 'Datasets' },
    ],
  },
  {
    id: 'capture',
    label: 'Capture',
    isActive: true,
    hasDropdown: true,
    dropdownItems: [
      { id: 'new-session', label: 'New Session' },
      { id: 'sessions', label: 'All Sessions' },
    ],
  },
  { id: 'projects', label: 'Projects' },
  { id: 'settings', label: 'Settings' },
]

export function TopBar({
  logo,
  logoText = 'Platform',
  navItems = defaultNavItems,
  userName = 'John Doe',
  userRole = 'Researcher',
  onMenuToggle,
  onNavItemClick,
  className = '',
}: TopBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id))
  }

  return (
    <header
      className={`relative h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-4 ${className}`}
      role="banner"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {logo || (
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
        )}
        <span className="text-sm font-semibold text-gray-900 hidden sm:block">{logoText}</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1 flex-1" role="navigation">
        {navItems.map((item) => (
          <div key={item.id} className="relative">
            <button
              onClick={() => {
                if (item.hasDropdown) toggleDropdown(item.id)
                else onNavItemClick?.(item.id)
              }}
              className={`
                inline-flex items-center gap-1 px-3 h-8 rounded-md text-sm font-medium
                transition-all duration-150 outline-none
                ${item.isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-150 ${openDropdown === item.id ? 'rotate-180' : ''}`}
                />
              )}
            </button>
            {item.hasDropdown && openDropdown === item.id && item.dropdownItems && (
              <div className="absolute top-full left-0 mt-1 z-50">
                <SubNavMenu
                  items={item.dropdownItems}
                  onSelect={(id) => {
                    onNavItemClick?.(id)
                    setOpenDropdown(null)
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />

      {/* Right Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <div className="hidden sm:block">
          <TopMenuOptions
            userName={userName}
            userRole={userRole}
            userDisplayMode="full"
          />
        </div>
        <div className="sm:hidden">
          <TopMenuOptions userName={userName} userRole={userRole} />
        </div>
        {/* Mobile menu toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100"
          onClick={() => { setMobileMenuOpen((v) => !v); onMenuToggle?.() }}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-md md:hidden z-50">
          <nav className="py-2 px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavItemClick?.(item.id); setMobileMenuOpen(false) }}
                className={`
                  w-full text-left px-3 py-2 rounded-md text-sm font-medium
                  ${item.isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Backdrop to close dropdowns */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </header>
  )
}

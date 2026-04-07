import React from 'react'
import { LayoutDashboard, List, Search, Bell, Settings } from 'lucide-react'
import { SideNavBase } from './SideNavBase'
import type { SideNavBaseProps } from './SideNavBase'

const genericSections = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  {
    id: 'items',
    label: 'Items',
    icon: <List size={18} />,
    subItems: [
      { id: 'all-items', label: 'All Items' },
      { id: 'my-items', label: 'My Items' },
      { id: 'shared-items', label: 'Shared' },
    ],
  },
  { id: 'search', label: 'Search', icon: <Search size={18} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
]

export type GenericSideNavProps = Omit<SideNavBaseProps, 'sections' | 'headerLabel'>

export function GenericSideNav(props: GenericSideNavProps) {
  return (
    <SideNavBase
      {...props}
      sections={genericSections}
      headerLabel="Menu"
      showSessions={false}
    />
  )
}

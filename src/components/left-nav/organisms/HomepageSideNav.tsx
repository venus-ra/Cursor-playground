import React from 'react'
import { Home, BookOpen, Camera, FolderOpen, Settings } from 'lucide-react'
import { SideNavBase } from './SideNavBase'
import type { SideNavBaseProps } from './SideNavBase'

const homepageSections = [
  { id: 'home', label: 'Home', icon: <Home size={18} /> },
  {
    id: 'libraries',
    label: 'Libraries',
    icon: <BookOpen size={18} />,
    subItems: [
      { id: 'my-library', label: 'My Library' },
      { id: 'shared', label: 'Shared' },
      { id: 'datasets', label: 'Datasets' },
    ],
  },
  {
    id: 'capture',
    label: 'Capture',
    icon: <Camera size={18} />,
    subItems: [
      { id: 'sessions', label: 'Sessions' },
      { id: 'recordings', label: 'Recordings' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <FolderOpen size={18} />,
    subItems: [
      { id: 'active', label: 'Active' },
      { id: 'archived', label: 'Archived' },
    ],
  },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
]

export type HomepageSideNavProps = Omit<SideNavBaseProps, 'sections' | 'headerLabel'>

export function HomepageSideNav(props: HomepageSideNavProps) {
  return (
    <SideNavBase
      {...props}
      sections={homepageSections}
      headerLabel="Navigation"
      showSessions={true}
    />
  )
}

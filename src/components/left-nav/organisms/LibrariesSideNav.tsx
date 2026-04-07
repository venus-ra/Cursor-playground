import React from 'react'
import { BookOpen, Database, Star, Share2, Archive } from 'lucide-react'
import { SideNavBase } from './SideNavBase'
import type { SideNavBaseProps } from './SideNavBase'

const librarySections = [
  {
    id: 'my-library',
    label: 'My Library',
    icon: <Star size={18} />,
    subItems: [
      { id: 'articles', label: 'Articles' },
      { id: 'papers', label: 'Papers' },
      { id: 'notes', label: 'Notes' },
    ],
  },
  {
    id: 'shared',
    label: 'Shared Libraries',
    icon: <Share2 size={18} />,
    subItems: [
      { id: 'team-lib', label: 'Team Library' },
      { id: 'org-lib', label: 'Organisation' },
    ],
  },
  {
    id: 'datasets',
    label: 'Datasets',
    icon: <Database size={18} />,
    subItems: [
      { id: 'raw', label: 'Raw Data' },
      { id: 'processed', label: 'Processed' },
      { id: 'exported', label: 'Exported' },
    ],
  },
  {
    id: 'all-refs',
    label: 'All References',
    icon: <BookOpen size={18} />,
  },
  {
    id: 'archive',
    label: 'Archive',
    icon: <Archive size={18} />,
  },
]

export type LibrariesSideNavProps = Omit<SideNavBaseProps, 'sections' | 'headerLabel'>

export function LibrariesSideNav(props: LibrariesSideNavProps) {
  return (
    <SideNavBase
      {...props}
      sections={librarySections}
      headerLabel="Libraries & Datasets"
      showSessions={false}
    />
  )
}

import React from 'react'
import { FolderOpen, FileQuestion, ClipboardList, Users, BarChart2 } from 'lucide-react'
import { SideNavBase } from './SideNavBase'
import type { SideNavBaseProps } from './SideNavBase'

export type ProjectRegion = 'uk' | 'usa'
export type ProjectFlow = 'question' | 'proposal'

export interface ProjectsSideNavProps extends Omit<SideNavBaseProps, 'sections' | 'headerLabel'> {
  region?: ProjectRegion
  flow?: ProjectFlow
}

function getSections(region: ProjectRegion, flow: ProjectFlow) {
  const baseSections = [
    {
      id: 'projects',
      label: 'Projects',
      icon: <FolderOpen size={18} />,
      subItems: [
        { id: 'active-projects', label: 'Active' },
        { id: 'draft-projects', label: 'Drafts' },
        { id: 'archived-projects', label: 'Archived' },
      ],
    },
    {
      id: 'team',
      label: 'Team',
      icon: <Users size={18} />,
      subItems: [
        { id: 'members', label: 'Members' },
        { id: 'roles', label: 'Roles & Permissions' },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <BarChart2 size={18} />,
    },
  ]

  if (flow === 'question') {
    return [
      {
        id: 'questions',
        label: 'Questions',
        icon: <FileQuestion size={18} />,
        subItems: [
          { id: 'open', label: region === 'uk' ? 'Open Questions' : 'Active Questions' },
          { id: 'closed', label: region === 'uk' ? 'Closed' : 'Resolved' },
          { id: 'pending', label: 'Pending Review' },
        ],
      },
      ...baseSections,
    ]
  }

  return [
    {
      id: 'proposals',
      label: 'Proposals',
      icon: <ClipboardList size={18} />,
      subItems: [
        { id: 'submitted', label: region === 'uk' ? 'Submitted' : 'Filed' },
        { id: 'under-review', label: 'Under Review' },
        { id: 'approved', label: 'Approved' },
        { id: 'rejected', label: region === 'uk' ? 'Rejected' : 'Declined' },
      ],
    },
    ...baseSections,
  ]
}

export function ProjectsSideNav({
  region = 'uk',
  flow = 'question',
  ...props
}: ProjectsSideNavProps) {
  const sections = getSections(region, flow)

  return (
    <SideNavBase
      {...props}
      sections={sections}
      headerLabel={`Projects · ${region.toUpperCase()}`}
      showSessions={false}
    />
  )
}

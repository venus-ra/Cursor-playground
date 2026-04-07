import React from 'react'
import { Camera, Mic, Video, FileText, Clock } from 'lucide-react'
import { SideNavBase } from './SideNavBase'
import type { SideNavBaseProps } from './SideNavBase'

const captureSections = [
  {
    id: 'sessions',
    label: 'Sessions',
    icon: <Camera size={18} />,
    subItems: [
      { id: 'active-sessions', label: 'Active' },
      { id: 'completed', label: 'Completed' },
      { id: 'draft', label: 'Drafts' },
    ],
  },
  {
    id: 'recordings',
    label: 'Recordings',
    icon: <Video size={18} />,
    subItems: [
      { id: 'video', label: 'Video' },
      { id: 'audio', label: 'Audio' },
    ],
  },
  { id: 'transcripts', label: 'Transcripts', icon: <FileText size={18} /> },
  { id: 'recent', label: 'Recent', icon: <Clock size={18} /> },
]

export type CaptureSideNavProps = Omit<SideNavBaseProps, 'sections' | 'headerLabel'>

export function CaptureSideNav(props: CaptureSideNavProps) {
  return (
    <SideNavBase
      {...props}
      sections={captureSections}
      headerLabel="Capture"
      showSessions={true}
    />
  )
}

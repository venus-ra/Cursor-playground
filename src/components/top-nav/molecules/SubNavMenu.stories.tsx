import type { Meta, StoryObj } from '@storybook/react'
import { BookOpen, Database, Camera, FolderOpen } from 'lucide-react'
import { SubNavMenu } from './SubNavMenu'

const meta: Meta<typeof SubNavMenu> = {
  title: 'Top Nav / Molecules / SubNavMenu',
  component: SubNavMenu,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'white' } },
}

export default meta
type Story = StoryObj<typeof SubNavMenu>

export const Default: Story = {
  args: {
    items: [
      { id: 'my-library', label: 'My Library' },
      { id: 'shared', label: 'Shared Libraries' },
      { id: 'datasets', label: 'Datasets', badge: 3 },
      { id: 'archive', label: 'Archive' },
    ],
  },
}

export const WithTitle: Story = {
  args: {
    title: 'Libraries',
    items: [
      { id: 'my-library', label: 'My Library' },
      { id: 'shared', label: 'Shared Libraries' },
      { id: 'datasets', label: 'Datasets', badge: 3 },
    ],
    activeId: 'my-library',
  },
}

export const WithIcons: Story = {
  args: {
    title: 'Navigation',
    items: [
      { id: 'libraries', label: 'Libraries', icon: <BookOpen size={14} /> },
      { id: 'datasets', label: 'Datasets', icon: <Database size={14} /> },
      { id: 'capture', label: 'Capture', icon: <Camera size={14} /> },
      { id: 'projects', label: 'Projects', icon: <FolderOpen size={14} /> },
    ],
    activeId: 'capture',
  },
}

export const WithBadges: Story = {
  args: {
    title: 'Capture',
    items: [
      { id: 'new', label: 'New Session' },
      { id: 'all', label: 'All Sessions', badge: 12 },
      { id: 'recordings', label: 'Recordings', badge: 5 },
      { id: 'transcripts', label: 'Transcripts', badge: 0 },
    ],
  },
}

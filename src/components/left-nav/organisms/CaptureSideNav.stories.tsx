import type { Meta, StoryObj } from '@storybook/react'
import { CaptureSideNav } from './CaptureSideNav'

const sessions = [
  { id: 's1', title: 'Interview with participant 3', subtitle: 'Capture session', timestamp: '2h', isActive: true },
  { id: 's2', title: 'Focus group recording', timestamp: '1d' },
  { id: 's3', title: 'Usability test', timestamp: '3d' },
]

const meta: Meta<typeof CaptureSideNav> = {
  title: 'Left Nav / Organisms / CaptureSideNav',
  component: CaptureSideNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark-sidebar' } },
  decorators: [(Story) => <div style={{ height: '500px', display: 'flex' }}><Story /></div>],
  args: { sessions, activeSectionId: 'sessions' },
}

export default meta
type Story = StoryObj<typeof CaptureSideNav>

export const Expanded: Story = { args: { isExpanded: true } }
export const Collapsed: Story = { args: { isExpanded: false } }

export const MacShortcut: Story = {
  args: { isExpanded: true, platform: 'mac' },
}

export const WindowsShortcut: Story = {
  args: { isExpanded: true, platform: 'windows' },
}

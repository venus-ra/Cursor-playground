import type { Meta, StoryObj } from '@storybook/react'
import { HomepageSideNav } from './HomepageSideNav'

const sessions = [
  { id: 's1', title: 'Interview with participant 3', subtitle: 'Capture session', timestamp: '2h', isActive: true },
  { id: 's2', title: 'Focus group recording', subtitle: 'Group session', timestamp: '1d' },
  { id: 's3', title: 'Usability test — v2 prototype', timestamp: '3d' },
]

const meta: Meta<typeof HomepageSideNav> = {
  title: 'Left Nav / Organisms / HomepageSideNav',
  component: HomepageSideNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark-sidebar' } },
  decorators: [(Story) => <div style={{ height: '500px', display: 'flex' }}><Story /></div>],
  args: { sessions, activeSectionId: 'home' },
}

export default meta
type Story = StoryObj<typeof HomepageSideNav>

export const Expanded: Story = {
  args: { isExpanded: true },
}

export const Collapsed: Story = {
  args: { isExpanded: false },
}

export const WithActiveSection: Story = {
  args: { isExpanded: true, activeSectionId: 'libraries', activeSubItemId: 'my-library' },
}

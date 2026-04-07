import type { Meta, StoryObj } from '@storybook/react'
import { TopBar } from './TopBar'

const meta: Meta<typeof TopBar> = {
  title: 'Top Nav / Organisms / TopBar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
  },
  args: {
    logoText: 'Platform',
    userName: 'Jane Smith',
    userRole: 'Researcher',
  },
}

export default meta
type Story = StoryObj<typeof TopBar>

export const Default: Story = {}

export const WithActiveItem: Story = {
  args: {
    navItems: [
      { id: 'home', label: 'Home' },
      { id: 'libraries', label: 'Libraries', hasDropdown: true, dropdownItems: [
        { id: 'my-lib', label: 'My Library' },
        { id: 'shared', label: 'Shared Libraries' },
        { id: 'datasets', label: 'Datasets' },
      ]},
      { id: 'capture', label: 'Capture', isActive: true, hasDropdown: true, dropdownItems: [
        { id: 'new-session', label: 'New Session' },
        { id: 'all-sessions', label: 'All Sessions' },
      ]},
      { id: 'projects', label: 'Projects' },
      { id: 'settings', label: 'Settings' },
    ],
  },
}

export const LMSLayout: Story = {
  name: 'LMS Layout',
  args: {
    logoText: 'LMS Research',
    navItems: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'courses', label: 'Courses', hasDropdown: true, dropdownItems: [
        { id: 'my-courses', label: 'My Courses' },
        { id: 'browse', label: 'Browse All' },
      ]},
      { id: 'participants', label: 'Participants', isActive: true },
      { id: 'reports', label: 'Reports', hasDropdown: true, dropdownItems: [
        { id: 'summary', label: 'Summary' },
        { id: 'detailed', label: 'Detailed' },
        { id: 'export', label: 'Export' },
      ]},
    ],
    userName: 'Dr. John Brown',
    userRole: 'Course Lead',
  },
}

export const MinimalNav: Story = {
  args: {
    navItems: [
      { id: 'home', label: 'Home', isActive: true },
      { id: 'settings', label: 'Settings' },
    ],
  },
}

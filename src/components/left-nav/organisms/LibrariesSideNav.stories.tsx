import type { Meta, StoryObj } from '@storybook/react'
import { LibrariesSideNav } from './LibrariesSideNav'

const meta: Meta<typeof LibrariesSideNav> = {
  title: 'Left Nav / Organisms / LibrariesSideNav',
  component: LibrariesSideNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark-sidebar' } },
  decorators: [(Story) => <div style={{ height: '500px', display: 'flex' }}><Story /></div>],
  args: { activeSectionId: 'my-library' },
}

export default meta
type Story = StoryObj<typeof LibrariesSideNav>

export const Expanded: Story = { args: { isExpanded: true } }
export const Collapsed: Story = { args: { isExpanded: false } }

export const WithActiveSubItem: Story = {
  args: { isExpanded: true, activeSectionId: 'datasets', activeSubItemId: 'raw' },
}

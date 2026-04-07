import type { Meta, StoryObj } from '@storybook/react'
import { GenericSideNav } from './GenericSideNav'

const meta: Meta<typeof GenericSideNav> = {
  title: 'Left Nav / Organisms / GenericSideNav',
  component: GenericSideNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark-sidebar' } },
  decorators: [(Story) => <div style={{ height: '500px', display: 'flex' }}><Story /></div>],
  args: { activeSectionId: 'dashboard' },
}

export default meta
type Story = StoryObj<typeof GenericSideNav>

export const Expanded: Story = { args: { isExpanded: true } }
export const Collapsed: Story = { args: { isExpanded: false } }

export const WithActiveSubItem: Story = {
  args: { isExpanded: true, activeSectionId: 'items', activeSubItemId: 'my-items' },
}

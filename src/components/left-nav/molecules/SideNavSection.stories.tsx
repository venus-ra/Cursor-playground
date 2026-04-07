import type { Meta, StoryObj } from '@storybook/react'
import { BookOpen, Camera, FolderOpen } from 'lucide-react'
import { SideNavSection } from './SideNavSection'

const meta: Meta<typeof SideNavSection> = {
  title: 'Left Nav / Molecules / SideNavSection',
  component: SideNavSection,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark-sidebar' } },
  args: {
    id: 'libraries',
    label: 'Libraries',
    icon: <BookOpen size={18} />,
    sidebarExpanded: true,
    subItems: [
      { id: 'my-library', label: 'My Library' },
      { id: 'shared', label: 'Shared Libraries' },
      { id: 'datasets', label: 'Datasets' },
    ],
  },
  argTypes: {
    state: { control: 'select', options: ['default', 'hover', 'pressed', 'active', 'disabled', 'focused'] },
    isExpanded: { control: 'boolean' },
    sidebarExpanded: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SideNavSection>

export const Default: Story = { args: { state: 'default' } }

export const OpenWithSubItems: Story = {
  args: { state: 'default', isExpanded: true },
}

export const ActiveWithSubItem: Story = {
  args: { state: 'active', isExpanded: true, activeSubId: 'my-library' },
}

export const NoSubItems: Story = {
  args: {
    id: 'settings',
    label: 'Settings',
    icon: <Camera size={18} />,
    subItems: [],
    state: 'default',
  },
}

export const Collapsed: Story = {
  args: { sidebarExpanded: false, state: 'default' },
}

export const CollapsedActive: Story = {
  args: { sidebarExpanded: false, state: 'active' },
}

export const Multiplesections: Story = {
  render: () => (
    <div className="w-56 space-y-0.5 p-2">
      <SideNavSection id="libraries" label="Libraries" icon={<BookOpen size={18} />} state="active" isExpanded sidebarExpanded
        subItems={[
          { id: 'my-library', label: 'My Library' },
          { id: 'shared', label: 'Shared Libraries' },
          { id: 'datasets', label: 'Datasets' },
        ]}
        activeSubId="my-library"
      />
      <SideNavSection id="capture" label="Capture" icon={<Camera size={18} />} state="default" sidebarExpanded
        subItems={[{ id: 'sessions', label: 'Sessions' }, { id: 'recordings', label: 'Recordings' }]}
      />
      <SideNavSection id="projects" label="Projects" icon={<FolderOpen size={18} />} state="default" sidebarExpanded />
    </div>
  ),
}

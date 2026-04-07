import type { Meta, StoryObj } from '@storybook/react'
import { Home, BookOpen } from 'lucide-react'
import { SectionLevel1 } from './SectionLevel1'

const meta: Meta<typeof SectionLevel1> = {
  title: 'Left Nav / Atoms / SectionLevel1',
  component: SectionLevel1,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark-sidebar' } },
  args: { label: 'Libraries', icon: <BookOpen size={18} /> },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'active', 'disabled', 'focused'],
    },
    isExpanded: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SectionLevel1>

export const Default: Story = { args: { state: 'default', isExpanded: true } }
export const Active: Story = { args: { state: 'active', isExpanded: true } }
export const Hover: Story = { args: { state: 'hover', isExpanded: true } }
export const Disabled: Story = { args: { state: 'disabled', isExpanded: true } }
export const Focused: Story = { args: { state: 'focused', isExpanded: true } }

export const Collapsed: Story = {
  args: { state: 'default', isExpanded: false },
}

export const CollapsedActive: Story = {
  args: { state: 'active', isExpanded: false },
}

export const AllStatesExpanded: Story = {
  name: 'All States — Expanded',
  render: () => (
    <div className="space-y-1 w-56">
      {(['default', 'hover', 'pressed', 'active', 'disabled', 'focused'] as const).map((state) => (
        <div key={state}>
          <SectionLevel1 label={`Section (${state})`} icon={<Home size={18} />} state={state} isExpanded />
        </div>
      ))}
    </div>
  ),
}

export const AllStatesCollapsed: Story = {
  name: 'All States — Collapsed',
  render: () => (
    <div className="flex items-center gap-2">
      {(['default', 'hover', 'pressed', 'active', 'disabled', 'focused'] as const).map((state) => (
        <SectionLevel1 key={state} label="Libraries" icon={<BookOpen size={18} />} state={state} isExpanded={false} />
      ))}
    </div>
  ),
}

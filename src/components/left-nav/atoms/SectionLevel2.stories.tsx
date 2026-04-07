import type { Meta, StoryObj } from '@storybook/react'
import { FileText } from 'lucide-react'
import { SectionLevel2 } from './SectionLevel2'

const meta: Meta<typeof SectionLevel2> = {
  title: 'Left Nav / Atoms / SectionLevel2',
  component: SectionLevel2,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark-sidebar' } },
  args: { label: 'My Library' },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'disabled', 'focused'],
    },
    type: { control: 'radio', options: ['simple-text', 'text-icon'] },
    isSelected: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SectionLevel2>

export const SimpleText: Story = { args: { type: 'simple-text', state: 'default' } }
export const SimpleTextSelected: Story = { args: { type: 'simple-text', state: 'default', isSelected: true } }
export const WithIcon: Story = { args: { type: 'text-icon', icon: <FileText size={14} />, state: 'default' } }
export const WithIconSelected: Story = { args: { type: 'text-icon', icon: <FileText size={14} />, state: 'default', isSelected: true } }
export const Disabled: Story = { args: { state: 'disabled' } }
export const Focused: Story = { args: { state: 'focused', isSelected: true } }

export const AllStates: Story = {
  render: () => (
    <div className="space-y-1 w-48">
      {(['default', 'hover', 'pressed', 'disabled', 'focused'] as const).map((state) => (
        <SectionLevel2 key={state} label={`Item (${state})`} state={state} />
      ))}
      <div className="border-t border-gray-700 pt-1">
        <SectionLevel2 label="Selected item" state="default" isSelected />
      </div>
    </div>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'
import { Star } from 'lucide-react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Top Nav / Atoms / IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: <Star size={16} />, label: 'Favourite' },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'active', 'focused', 'disabled'],
    },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = { args: { state: 'default' } }
export const Hover: Story = { args: { state: 'hover' } }
export const Pressed: Story = { args: { state: 'pressed' } }
export const Active: Story = { args: { state: 'active' } }
export const Focused: Story = { args: { state: 'focused' } }
export const Disabled: Story = { args: { state: 'disabled' } }

export const AllStates: Story = {
  render: (args) => (
    <div className="flex items-center gap-4 flex-wrap">
      {(['default', 'hover', 'pressed', 'active', 'focused', 'disabled'] as const).map((state) => (
        <div key={state} className="flex flex-col items-center gap-2">
          <IconButton {...args} state={state} />
          <span className="text-xs text-gray-500 capitalize">{state}</span>
        </div>
      ))}
    </div>
  ),
}

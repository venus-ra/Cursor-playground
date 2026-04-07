import type { Meta, StoryObj } from '@storybook/react'
import { HelpButton } from './HelpButton'

const meta: Meta<typeof HelpButton> = {
  title: 'Top Nav / Atoms / HelpButton',
  component: HelpButton,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'active', 'focused', 'disabled'],
    },
  },
}

export default meta
type Story = StoryObj<typeof HelpButton>

export const Default: Story = { args: { state: 'default' } }
export const Hover: Story = { args: { state: 'hover' } }
export const Pressed: Story = { args: { state: 'pressed' } }
export const Active: Story = { args: { state: 'active' } }
export const Focused: Story = { args: { state: 'focused' } }
export const Disabled: Story = { args: { state: 'disabled' } }

export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      {(['default', 'hover', 'pressed', 'active', 'focused', 'disabled'] as const).map((state) => (
        <div key={state} className="flex flex-col items-center gap-2">
          <HelpButton state={state} />
          <span className="text-xs text-gray-500 capitalize">{state}</span>
        </div>
      ))}
    </div>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'
import { UserButton } from './UserButton'

const meta: Meta<typeof UserButton> = {
  title: 'Top Nav / Atoms / UserButton',
  component: UserButton,
  tags: ['autodocs'],
  args: { userName: 'Jane Smith', userRole: 'Researcher' },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'active', 'focused', 'disabled'],
    },
    displayMode: { control: 'radio', options: ['icon-only', 'full'] },
  },
}

export default meta
type Story = StoryObj<typeof UserButton>

export const IconOnly: Story = { args: { displayMode: 'icon-only', state: 'default' } }
export const FullDisplay: Story = { args: { displayMode: 'full', state: 'default' } }
export const Active: Story = { args: { displayMode: 'full', state: 'active' } }
export const Focused: Story = { args: { displayMode: 'full', state: 'focused' } }
export const Disabled: Story = { args: { displayMode: 'full', state: 'disabled' } }

export const AllStatesIconOnly: Story = {
  name: 'All States — Icon Only',
  render: (args) => (
    <div className="flex items-center gap-4 flex-wrap">
      {(['default', 'hover', 'pressed', 'active', 'focused', 'disabled'] as const).map((state) => (
        <div key={state} className="flex flex-col items-center gap-2">
          <UserButton {...args} state={state} displayMode="icon-only" />
          <span className="text-xs text-gray-500 capitalize">{state}</span>
        </div>
      ))}
    </div>
  ),
}

export const AllStatesFullDisplay: Story = {
  name: 'All States — Full Display',
  render: (args) => (
    <div className="flex items-center gap-4 flex-wrap">
      {(['default', 'hover', 'pressed', 'active', 'focused', 'disabled'] as const).map((state) => (
        <div key={state} className="flex flex-col items-center gap-2">
          <UserButton {...args} state={state} displayMode="full" />
          <span className="text-xs text-gray-500 capitalize">{state}</span>
        </div>
      ))}
    </div>
  ),
}

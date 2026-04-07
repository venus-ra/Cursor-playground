import type { Meta, StoryObj } from '@storybook/react'
import { SessionItem } from './SessionItem'

const meta: Meta<typeof SessionItem> = {
  title: 'Left Nav / Atoms / SessionItem',
  component: SessionItem,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark-sidebar' } },
  args: {
    title: 'Interview with participant 3',
    subtitle: 'Capture session',
    timestamp: '2h',
  },
  argTypes: {
    state: { control: 'select', options: ['default', 'hover', 'focus'] },
    isActive: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SessionItem>

export const Default: Story = { args: { state: 'default' } }
export const Active: Story = { args: { isActive: true, state: 'default' } }
export const Hover: Story = { args: { state: 'hover' } }
export const Focus: Story = { args: { state: 'focus', isActive: true } }
export const NoSubtitle: Story = { args: { subtitle: undefined } }

export const SessionList: Story = {
  render: () => (
    <div className="w-52 space-y-0.5">
      <SessionItem title="Interview with participant 3" subtitle="Capture session" timestamp="2h" isActive />
      <SessionItem title="Focus group recording" subtitle="Group session" timestamp="1d" />
      <SessionItem title="Usability test — v2 prototype" timestamp="3d" />
      <SessionItem title="Stakeholder interview" subtitle="Remote session" timestamp="1w" />
      <SessionItem title="Background research notes" timestamp="2w" />
    </div>
  ),
}

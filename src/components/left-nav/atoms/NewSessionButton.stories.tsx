import type { Meta, StoryObj } from '@storybook/react'
import { NewSessionButton } from './NewSessionButton'

const meta: Meta<typeof NewSessionButton> = {
  title: 'Left Nav / Atoms / NewSessionButton',
  component: NewSessionButton,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark-sidebar' } },
  argTypes: {
    state: { control: 'select', options: ['default', 'hover', 'focus'] },
    platform: { control: 'radio', options: ['mac', 'windows'] },
    isExpanded: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof NewSessionButton>

export const ExpandedMac: Story = {
  name: 'Expanded — Mac',
  args: { isExpanded: true, platform: 'mac', state: 'default' },
}

export const ExpandedWindows: Story = {
  name: 'Expanded — Windows',
  args: { isExpanded: true, platform: 'windows', state: 'default' },
}

export const Collapsed: Story = {
  args: { isExpanded: false },
}

export const Hover: Story = {
  args: { isExpanded: true, state: 'hover' },
}

export const Focus: Story = {
  args: { isExpanded: true, state: 'focus' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3 w-56">
      <NewSessionButton isExpanded platform="mac" state="default" />
      <NewSessionButton isExpanded platform="mac" state="hover" />
      <NewSessionButton isExpanded platform="mac" state="focus" />
      <NewSessionButton isExpanded platform="windows" state="default" />
      <div className="flex items-center gap-2">
        <NewSessionButton isExpanded={false} state="default" />
        <NewSessionButton isExpanded={false} state="hover" />
        <NewSessionButton isExpanded={false} state="focus" />
      </div>
    </div>
  ),
}

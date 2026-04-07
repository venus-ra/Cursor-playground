import type { Meta, StoryObj } from '@storybook/react'
import { TopMenuOptions } from './TopMenuOptions'

const meta: Meta<typeof TopMenuOptions> = {
  title: 'Top Nav / Molecules / TopMenuOptions',
  component: TopMenuOptions,
  tags: ['autodocs'],
  args: { userName: 'Jane Smith', userRole: 'Researcher' },
  argTypes: {
    clearState: { control: 'select', options: ['default', 'hover', 'pressed', 'active', 'focused', 'disabled'] },
    helpState:  { control: 'select', options: ['default', 'hover', 'pressed', 'active', 'focused', 'disabled'] },
    userState:  { control: 'select', options: ['default', 'hover', 'pressed', 'active', 'focused', 'disabled'] },
    userDisplayMode: { control: 'radio', options: ['icon-only', 'full'] },
  },
}

export default meta
type Story = StoryObj<typeof TopMenuOptions>

export const IconOnly: Story = {
  args: { userDisplayMode: 'icon-only' },
}

export const WithUserDisplay: Story = {
  args: { userDisplayMode: 'full' },
}

export const ActiveUser: Story = {
  args: { userDisplayMode: 'full', userState: 'active' },
}

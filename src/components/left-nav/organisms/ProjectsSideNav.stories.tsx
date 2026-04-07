import type { Meta, StoryObj } from '@storybook/react'
import { ProjectsSideNav } from './ProjectsSideNav'

const meta: Meta<typeof ProjectsSideNav> = {
  title: 'Left Nav / Organisms / ProjectsSideNav',
  component: ProjectsSideNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark-sidebar' } },
  decorators: [(Story) => <div style={{ height: '500px', display: 'flex' }}><Story /></div>],
  argTypes: {
    region: { control: 'radio', options: ['uk', 'usa'] },
    flow:   { control: 'radio', options: ['question', 'proposal'] },
  },
  args: { isExpanded: true },
}

export default meta
type Story = StoryObj<typeof ProjectsSideNav>

export const UKQuestions: Story = {
  name: 'UK — Questions',
  args: { region: 'uk', flow: 'question', activeSectionId: 'questions' },
}

export const UKProposals: Story = {
  name: 'UK — Proposals',
  args: { region: 'uk', flow: 'proposal', activeSectionId: 'proposals' },
}

export const USAQuestions: Story = {
  name: 'USA — Questions',
  args: { region: 'usa', flow: 'question', activeSectionId: 'questions' },
}

export const USAProposals: Story = {
  name: 'USA — Proposals',
  args: { region: 'usa', flow: 'proposal', activeSectionId: 'proposals' },
}

export const Collapsed: Story = {
  args: { isExpanded: false, region: 'uk', flow: 'question' },
}

import type { Meta, StoryObj } from '@storybook/react'
import { OutlinePanel } from './OutlinePanel'

const meta: Meta<typeof OutlinePanel> = {
  title: 'Top Nav / Molecules / OutlinePanel',
  component: OutlinePanel,
  tags: ['autodocs'],
  args: { title: 'Outline' },
}

export default meta
type Story = StoryObj<typeof OutlinePanel>

export const Default: Story = {}

export const WithActiveItem: Story = {
  args: { activeId: '1' },
}

export const CustomNodes: Story = {
  args: {
    title: 'Responses',
    nodes: [
      { id: 'intro', label: 'Introduction', type: 'shell', children: [
        { id: 'intro-1', label: 'Background', type: 'section' },
        { id: 'intro-2', label: 'Objectives', type: 'section' },
      ]},
      { id: 'findings', label: 'Key Findings', type: 'shell', children: [
        { id: 'f1', label: 'Theme 1', type: 'section' },
        { id: 'f2', label: 'Theme 2', type: 'section' },
        { id: 'f3', label: 'Theme 3', type: 'section' },
      ]},
      { id: 'conclusion', label: 'Conclusion', type: 'shell' },
    ],
  },
}

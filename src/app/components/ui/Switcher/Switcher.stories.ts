import type { Meta, StoryObj } from '@storybook/react';
import Switcher from './Switcher';

const meta = {
  title: 'UI/Switcher',
  component: Switcher,
  tags: ['autodocs'],
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    options: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
    ],
    onSwitch: (newValue) => console.log(newValue),
  },
};

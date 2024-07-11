import type { Meta, StoryObj } from '@storybook/react';
import DigitalClock from '.';

const meta = {
  title: 'Widget/DigitalClock',
  component: DigitalClock,
  tags: ['autodocs'],
} satisfies Meta<typeof DigitalClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColor: Story = {
  args: {
    textColor: 'text-blue-500',
    backgroundColor: 'bg-slate-100',
  },
};

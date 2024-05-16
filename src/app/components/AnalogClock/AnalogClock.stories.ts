import type { Meta, StoryObj } from '@storybook/react';
import AnalogClock from './AnalogClock';

const meta = {
  title: 'UI/AnalogClock',
  component: AnalogClock,
  tags: ['autodocs'],
} satisfies Meta<typeof AnalogClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ClockWithoutIndicators: Story = {
  args: {
    enableIndicators: false,
  },
};

export const ColoredClock: Story = {
  args: {
    backgroundColor: 'lightpink',
  },
};

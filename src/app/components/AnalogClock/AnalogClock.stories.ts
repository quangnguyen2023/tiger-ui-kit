import type { Meta, StoryObj } from '@storybook/react';
import AnalogClock from './AnalogClock';

const meta = {
  title: 'UI/AnalogClock',
  component: AnalogClock,
  tags: ['autodocs'],
} satisfies Meta<typeof AnalogClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { diameter: 300 } };

export const ClockWithIndicators: Story = {
  args: {
    diameter: 300,
    enableIndicators: true,
  },
};

export const ColoredClock: Story = {
  args: {
    diameter: 300,
    enableIndicators: true,
    backgroundColor: 'lightpink',
  },
};

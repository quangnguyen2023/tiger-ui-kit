import type { Meta, StoryObj } from '@storybook/react';
import AnalogClock from './AnalogClock';

const meta = {
  title: 'Widget/AnalogClock',
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
    backgroundColor: '#343436',
    textColor: 'white',
  },
};

export const ClockWithTitle: Story = {
  args: {
    title: 'HCM',
  },
};

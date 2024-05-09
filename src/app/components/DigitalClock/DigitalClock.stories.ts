import type { Meta, StoryObj } from '@storybook/react';
import DigitalClock from '.';

const meta = {
  title: 'UI/DigitalClock',
  component: DigitalClock,
  tags: ['autodocs'],
} satisfies Meta<typeof DigitalClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

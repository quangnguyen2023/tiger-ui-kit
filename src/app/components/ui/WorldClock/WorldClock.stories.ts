import { Meta, StoryObj } from '@storybook/react';
import WorldClock from './WorldClock';

const meta = {
  title: 'UI/WorldClock',
  component: WorldClock,
  tags: ['autodocs'],
} satisfies Meta<typeof WorldClock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

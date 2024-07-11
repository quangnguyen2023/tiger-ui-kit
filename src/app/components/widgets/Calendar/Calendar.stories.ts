import { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';

const meta = {
  title: 'Widget/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import { Meta, StoryObj } from '@storybook/react';
import WeatherForecast from './WeatherForecast';

const meta = {
  title: 'UI/WeatherForecast',
  component: WeatherForecast,
  tags: ['autodocs'],
} satisfies Meta<typeof WeatherForecast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

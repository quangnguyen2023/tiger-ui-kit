import DigitalClock from '@/app/components/ui/DigitalClock';
import { act, render, screen } from '@testing-library/react';
import { format } from 'date-fns';

vi.mock('next/font/google', () => ({
  Poppins: () => ({
    style: {
      fontFamily: 'mocked',
    },
  }),
}));

describe('DigitalClock', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the current time', () => {
    render(<DigitalClock />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const currentTime = format(new Date(), 'hh:mm a cccc');
    const currentHour = currentTime.slice(0, 2);
    const currentMinute = currentTime.slice(3, 5);
    const currentPeriod = currentTime.slice(6, 8);
    const currentDayOfWeek = currentTime.slice(9);

    expect(screen.getByText(currentHour)).toBeInTheDocument();
    expect(screen.getByText(currentMinute)).toBeInTheDocument();
    expect(screen.getByText(currentPeriod)).toBeInTheDocument();
    expect(screen.getByText(currentDayOfWeek)).toBeInTheDocument();
  });

  it('should apply the colorClass prop correctly', () => {
    const colorClass = 'text-black-400';
    render(<DigitalClock colorClass={colorClass} />);

    const hour = screen.getAllByText('00')[0];
    const minute = screen.getAllByText('00')[1];
    const period = screen.getByText('AM');
    const dayOfWeek = screen.getByText('Monday');

    expect(hour).toHaveClass(colorClass);
    expect(minute).toHaveClass(colorClass);
    expect(period).toHaveClass(colorClass);
    expect(dayOfWeek).toHaveClass(colorClass);
  });

  it('should apply the backgroundColorClass prop correctly', () => {
    const backgroundColorClass = 'bg-[#FEF3C7]';
    render(<DigitalClock backgroundColorClass={backgroundColorClass} />);

    const timeElements = screen.getAllByTestId('time-element');
    timeElements.forEach((element) => {
      expect(element).toHaveClass(backgroundColorClass);
    });
  });
});

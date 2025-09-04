import { cn } from '@/lib/utils';
import clsx, { type ClassValue } from 'clsx';

interface StaticCardProps {
  position: 'upperCard' | 'lowerCard';
  digit: string;
}
const StaticCard = ({ position, digit }: StaticCardProps) => {
  return (
    <div
      className={clsx(
        'relative flex h-1/2 w-full justify-center overflow-hidden border border-gray-200',
        position === 'upperCard'
          ? 'items-end rounded-t-md border-b border-gray-300'
          : 'items-start rounded-b-md border-t border-gray-300',
      )}
    >
      <span
        className={clsx(
          'font-mono text-[5rem] font-semibold text-gray-700',
          position === 'upperCard' ? 'translate-y-1/2' : '-translate-y-1/2',
        )}
      >
        {digit}
      </span>
      {/* <span
        className={clsx('absolute bottom-2 left-2 text-sm font-black', {
          hidden: position === 'upperCard',
        })}
      >
        PM
      </span> */}
      {/* <span
        className={clsx('absolute right-2 bottom-2 text-xs font-black', {
          hidden: position === 'upperCard',
        })}
      >
        WEDNESDAY
      </span> */}
    </div>
  );
};

interface AnimatedCardProps {
  animation: 'fold' | 'unfold';
  digit: string;
  unit: 'hours' | 'minutes' | 'seconds';
  showPeriod?: boolean;
  period?: string;
  weekday?: string;
}
const AnimatedCard = ({
  animation,
  digit,
  unit,
  showPeriod,
  period,
  weekday,
}: AnimatedCardProps) => {
  return (
    <div
      className={clsx(
        'absolute left-0 flex h-1/2 w-full justify-center overflow-hidden border border-gray-200 backface-hidden',
        animation === 'unfold'
          ? 'top-1/2 origin-top rotate-x-180 items-start rounded-b-md border-t border-gray-300 bg-white'
          : 'top-0 origin-bottom items-end rounded-t-md border-b border-gray-300 bg-white',
        animation,
      )}
    >
      <span
        className={clsx(
          'font-mono text-[5rem] font-semibold text-gray-700',
          animation === 'unfold' ? '-translate-y-1/2' : 'translate-y-1/2',
        )}
      >
        {digit}
      </span>

      {unit === 'minutes' && animation === 'unfold' && weekday && (
        <span className="absolute right-2 bottom-2 text-xs font-black">
          {weekday}
        </span>
      )}

      {showPeriod && animation === 'unfold' && (
        <span className="absolute bottom-2 left-2 text-xs font-black">
          {period}
        </span>
      )}
    </div>
  );
};

interface FlipUnitProps {
  digit: number;
  shuffle: boolean;
  unit: 'hours' | 'minutes' | 'seconds';
  classNames?: ClassValue;
  weekday?: string;
}
export const FlipUnit = ({
  digit,
  shuffle,
  unit,
  classNames,
  weekday,
}: FlipUnitProps) => {
  let currentDigit = digit;
  let previousDigit = digit - 1;

  if (unit !== 'hours') {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  if (currentDigit < 10) currentDigit = Number(`0${currentDigit}`);
  if (previousDigit < 10) previousDigit = Number(`0${previousDigit}`);

  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;

  const animation1 = shuffle ? 'fold' : 'unfold';
  const animation2 = !shuffle ? 'fold' : 'unfold';

  return (
    <div
      className={cn(
        'relative block aspect-[8/9] w-full rounded-md bg-white shadow-md perspective-[500px]',
        classNames,
      )}
    >
      <StaticCard
        position="upperCard"
        digit={String(currentDigit).padStart(2, '0')}
      />
      <StaticCard
        position="lowerCard"
        digit={String(previousDigit).padStart(2, '0')}
      />
      <AnimatedCard
        digit={String(digit1).padStart(2, '0')}
        animation={animation1}
        unit={unit}
        showPeriod={unit === 'hours'}
        period={digit >= 12 ? 'PM' : 'AM'}
        weekday={weekday}
      />
      <AnimatedCard
        digit={String(digit2).padStart(2, '0')}
        animation={animation2}
        unit={unit}
        showPeriod={unit === 'hours'}
        period={digit >= 12 ? 'PM' : 'AM'}
        weekday={weekday}
      />
    </div>
  );
};

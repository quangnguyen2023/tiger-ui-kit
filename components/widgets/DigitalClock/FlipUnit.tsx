import clsx from 'clsx';

interface StaticCardProps {
  position: 'upperCard' | 'lowerCard';
  digit: string;
}
const StaticCard = ({ position, digit }: StaticCardProps) => {
  return (
    <div
      className={clsx(
        'flex h-1/2 w-full justify-center overflow-hidden border border-gray-200',
        position === 'upperCard'
          ? 'items-end rounded-t-md border-b border-gray-300'
          : 'items-start rounded-b-md border-t border-gray-300',
      )}
    >
      <span
        className={clsx(
          'font-mono text-[5em] font-light text-gray-700',
          position === 'upperCard' ? 'translate-y-1/2' : '-translate-y-1/2',
        )}
      >
        {digit}
      </span>
    </div>
  );
};

interface AnimatedCardProps {
  animation: 'fold' | 'unfold';
  digit: string;
}
const AnimatedCard = ({ animation, digit }: AnimatedCardProps) => {
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
          'font-mono text-[5em] font-light text-gray-700',
          animation === 'unfold' ? '-translate-y-1/2' : 'translate-y-1/2',
        )}
      >
        {digit}
      </span>
    </div>
  );
};

interface FlipUnitProps {
  digit: number;
  shuffle: boolean;
  unit: 'hours' | 'minutes' | 'seconds';
}
export const FlipUnit = ({ digit, shuffle, unit }: FlipUnitProps) => {
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
    <div className="relative block h-[120px] w-[140px] rounded-md bg-white shadow-md perspective-[300px]">
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
      />
      <AnimatedCard
        digit={String(digit2).padStart(2, '0')}
        animation={animation2}
      />
    </div>
  );
};

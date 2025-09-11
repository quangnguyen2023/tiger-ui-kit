import AnalogClock from '../AnalogClock';

interface LocationClockProps {
  isLightMode?: boolean;
  location?: string;
  detailedLocation?: boolean;
}

export default function LocationClock({
  isLightMode = true,
  location = 'London',
  detailedLocation,
}: LocationClockProps) {
  const locationCompact = location.slice(0, 3).toUpperCase(); // LON, TOK,...

  const Clock = isLightMode ? (
    <AnalogClock title={!detailedLocation ? locationCompact : ''} />
  ) : (
    <AnalogClock
      textColor="white"
      backgroundColor="#343436"
      title={!detailedLocation ? locationCompact : ''}
    />
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {Clock}
      <div
        className={`flex flex-col items-center gap-1 ${
          !detailedLocation && 'hidden'
        }`}
      >
        <div className="text-sm font-semibold text-white"> {location} </div>
        <div className="text-xs font-semibold text-[#99999b]"> Today </div>
        <div className="text-xs font-semibold text-[#99999b]"> +7HRS </div>
      </div>
    </div>
  );
}

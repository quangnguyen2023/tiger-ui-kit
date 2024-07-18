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
    <AnalogClock size="small" title={!detailedLocation ? locationCompact : ''} />
  ) : (
    <AnalogClock
      size="small"
      textColor="white"
      backgroundColor="#343436"
      title={!detailedLocation ? locationCompact : ''}
    />
  );

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {Clock}
      <div className={`flex flex-col gap-1 items-center ${!detailedLocation && 'hidden'}`}>
        <div className="text-white text-sm font-semibold"> {location} </div>
        <div className="text-[#99999b] text-xs font-semibold"> Today </div>
        <div className="text-[#99999b] text-xs font-semibold"> +7HRS </div>
      </div>
    </div>
  );
}

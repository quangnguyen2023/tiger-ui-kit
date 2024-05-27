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
    <div className="flex flex-col justify-center items-center gap-3">
      {Clock}
      <div className={`flex flex-col items-center ${!detailedLocation && 'hidden'}`}>
        <div className="text-white text-sm font-bold"> {location} </div>
        <div className="text-[#99999b] text-sm font-bold"> Today </div>
        <div className="text-[#99999b] text-sm font-bold"> +7HRS </div>
      </div>
    </div>
  );
}

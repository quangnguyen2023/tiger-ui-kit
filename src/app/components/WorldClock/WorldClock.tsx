import AnalogClock from '../AnalogClock';

type LocationClockProps = {
  isLightMode?: boolean;
  location?: string;
};

export default function WorldClock() {
  const LocationClock = ({ isLightMode = true, location }: LocationClockProps) => {
    const Clock = isLightMode ? (
      <AnalogClock size="small" />
    ) : (
      <AnalogClock size="small" textColor="white" backgroundColor="#343436" />
    );

    return (
      <div className="flex flex-col justify-center items-center gap-3">
        {Clock}
        <div className="flex flex-col items-center">
          <div className="text-white text-sm font-bold"> {location ? location : 'London'} </div>
          <div className="text-[#99999b] text-sm font-bold"> Today </div>
          <div className="text-[#99999b] text-sm font-bold"> +7HRS </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-fit p-6 bg-[#1c1c1e] rounded-xl flex justify-center items-center gap-10">
      <LocationClock isLightMode={false} />
      <LocationClock />
      <LocationClock />
      <LocationClock />
    </div>
  );
}

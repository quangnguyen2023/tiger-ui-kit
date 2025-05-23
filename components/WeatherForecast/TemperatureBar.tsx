type TemperatureBarProps = {
  upperLimit: number;
  lowerLimit: number;
  maxTemp: number;
  minTemp: number;
  classNames?: string;
};

export default function TemperatureBar({
  upperLimit,
  lowerLimit,
  maxTemp,
  minTemp,
  classNames,
}: TemperatureBarProps) {
  const tempBarLengthPercent = `${((maxTemp - minTemp) / (upperLimit - lowerLimit)) * 100}%`;
  const distanceToLowerLimit = `${((minTemp - lowerLimit) / (upperLimit - lowerLimit)) * 100}%`;

  return (
    <div className={`${classNames} flex items-center gap-4`}>
      <div className="opacity-70">{minTemp}°</div>
      <div className="relative w-full">
        <div className="absolute -translate-y-1/2 w-full h-[5px] bg-black opacity-[0.09] rounded-full" />
        <div
          className="absolute -translate-y-1/2 h-[5px] bg-gradient-to-r from-orange-300 to-red-500 rounded-full"
          style={{
            width: `${tempBarLengthPercent}`,
            left: `${distanceToLowerLimit}`,
          }}
        />
      </div>
      <div>{maxTemp}°</div>
    </div>
  );
}

type TemperatureBarProps = {
  maxTemp: number;
  minTemp: number;
  temp: number;
  classNames?: string;
};

export default function TemperatureBar({
  temp,
  maxTemp,
  minTemp,
  classNames,
}: TemperatureBarProps) {
  const tempBarLengthPercent = `${((temp - minTemp) / (maxTemp - minTemp)) * 100}%`;

  return (
    <div className={`${classNames} flex items-center gap-3`}>
      <div className="opacity-70">{minTemp}°</div>
      <div className="relative w-full h-1 bg-gray-200 rounded-full">
        <div
          className="absolute h-1 bg-red-500 rounded-full"
          style={{ width: `${tempBarLengthPercent}` }}
        />
      </div>
      <div>{maxTemp}°</div>
    </div>
  );
}

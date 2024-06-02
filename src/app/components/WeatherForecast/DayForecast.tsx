import TemperatureBar from './TemperatureBar';
import Image from 'next/image';

type DayForecastProps = {
  dayOfWeek: string;
  iconUrl: string;
  temperature: {
    upperLimit: number;
    lowerLimit: number;
    max: number;
    min: number;
  };
};

export default function DayForecast({ dayOfWeek, iconUrl, temperature }: DayForecastProps) {
  return (
    <div className="grid grid-cols-6 gap-8">
      <div className="col-span-1">{dayOfWeek}</div>
      <Image
        className="col-span-1 scale-[1.15] -mb-3 -mt-2"
        src={iconUrl}
        alt=""
        width={40}
        height={40}
      />
      <TemperatureBar
        classNames="col-span-4"
        maxTemp={temperature.max}
        minTemp={temperature.min}
        upperLimit={temperature.upperLimit}
        lowerLimit={temperature.lowerLimit}
      />
    </div>
  );
}

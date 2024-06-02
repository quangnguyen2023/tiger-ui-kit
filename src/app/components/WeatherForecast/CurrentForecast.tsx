import Image from 'next/image';
import { SizeType } from './WeatherForecast';

type CurrentForecastProps = {
  location: string;
  temperature: number;
  iconUrl: string;
  description: string;
  selectedSize: SizeType;
  sizeConfig: { widthClass: string };
};

export default function CurrentForecast({
  location,
  temperature,
  iconUrl,
  description,
  selectedSize,
  sizeConfig,
}: CurrentForecastProps) {
  return (
    <div
      className={`${sizeConfig.widthClass} flex ${selectedSize === 'small' ? 'flex-col' : 'flex-row'} gap-4`}
    >
      <div>
        <div className="flex items-center gap-2">
          <div className="w-fit overflow-hidden text-ellipsis whitespace-nowrap">{location}</div>
          <Image
            className="rotate-45"
            src={'/direction_arrow.svg'}
            alt="wind icon"
            width={12}
            height={12}
          />
        </div>
        <div className="text-5xl font-normal">{temperature}°</div>
      </div>

      <div className={`flex-1 flex flex-col ${selectedSize !== 'small' && 'items-end'} text-sm`}>
        <Image
          className="scale-90 -mb-2 -ml-2"
          src={'https://openweathermap.org/img/wn/10d@2x.png'}
          alt=""
          width={40}
          height={40}
        />
        <div>{description}</div>
        <div>H:36° L:28°</div>
      </div>
    </div>
  );
}

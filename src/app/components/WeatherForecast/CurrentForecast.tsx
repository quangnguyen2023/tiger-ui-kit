import Image from 'next/image';
import { SizeType } from './WeatherForecast';
import { getWeatherIcon } from './Weather';
import { iconMappingToWeatherStatus } from '@/services/iconMapper';

type CurrentForecastProps = {
  data: {
    location: string;
    description: string;
    temperature: number;
    icon: string;
  };
  selectedSize: SizeType;
};

export default function CurrentForecast({ data, selectedSize }: CurrentForecastProps) {
  return (
    <div className={`flex ${selectedSize === 'small' ? 'flex-col' : 'flex-row'} gap-7`}>
      <div>
        <div className="flex items-center gap-2">
          <div className="w-fit overflow-hidden text-ellipsis whitespace-nowrap">
            {data.location}
          </div>
          <Image
            className="rotate-45"
            src={'/direction_arrow.svg'}
            alt="wind icon"
            width={12}
            height={12}
          />
        </div>
        <div className="text-5xl font-normal">{data.temperature}°</div>
      </div>

      <div className={`flex-1 flex flex-col ${selectedSize !== 'small' && 'items-end'} text-sm`}>
        {getWeatherIcon(iconMappingToWeatherStatus(data.icon), 25, 25)}
        <div className="mt-2">{data.description}</div>
        <div>H:36° L:28°</div>
      </div>
    </div>
  );
}

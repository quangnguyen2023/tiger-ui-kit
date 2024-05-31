import Image from 'next/image';
import { useMemo, useState } from 'react';
import HourlyForecast from './HourlyForecast';
import { hourlyForecast } from '@/assets/mockdata';

const SIZE_CONFIG = {
  small: { widthClass: 'w-36' },
  medium: { widthClass: 'w-96' },
  large: { widthClass: 'w-96' },
};

type WeatherForecastProps = {
  location?: string;
  temperature?: number;
  iconUrl?: string;
  description?: string;
};

export default function WeatherForecast({
  location = 'Ho Chi Minh City',
  temperature = 36,
  iconUrl = './weather-icon.png',
  description = 'Mostly Cloudy',
}: WeatherForecastProps) {
  const [selectedSize, setSelectedSize] = useState<keyof typeof SIZE_CONFIG>('small');

  const sizeConfig = useMemo(() => SIZE_CONFIG[selectedSize], [selectedSize]);

  return (
    <div className="flex justify-center items-center flex-col gap-5 p-5 bg-slate-200 rounded-xl">
      <div className="flex flex-col gap-5 text-white bg-gradient-to-b from-sky-800 to-sky-500 shadow-xl font-semibold rounded-2xl py-3 px-4">
        {/* current weather */}
        <div
          className={`${sizeConfig.widthClass} flex ${selectedSize === 'small' ? 'flex-col' : 'flex-row'} gap-4`}
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="w-fit overflow-hidden text-ellipsis whitespace-nowrap">
                {location}
              </div>
              <Image
                className="rotate-45"
                src={'/direction_arrow.svg'}
                alt="wind icon"
                width={12}
                height={12}
              />
            </div>
            <div className="text-5xl">{temperature}°</div>
          </div>

          <div
            className={`flex-1 flex flex-col ${selectedSize !== 'small' && 'items-end'} text-sm`}
          >
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

        {/* Hourly Forecast */}
        {selectedSize !== 'small' && (
          <div className="flex justify-between">
            {hourlyForecast.map((data) => (
              <HourlyForecast
                key={data.hour}
                hour={data.hour}
                iconUrl={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                temperature={data.temperature}
              />
            ))}
          </div>
        )}
      </div>

      {/* Size Selector */}
      <div className="flex justify-center items-center gap-5 text-slate-400 font-semibold *:cursor-pointer">
        {['small', 'medium', 'large'].map((size) => (
          <div
            className={`
              w-9 h-9 rounded-full border-2 flex justify-center items-center border-slate-400 
              ${selectedSize === size && 'bg-white border-white text-yellow-800'}
            `}
            onClick={() => setSelectedSize(size as any)}
          >
            {size.slice(0, 1).toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}

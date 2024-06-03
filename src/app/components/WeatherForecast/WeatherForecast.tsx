import { useMemo, useState } from 'react';
import HourlyForecast from './HourlyForecast';
import { dailyForecast, hourlyForecast } from '@/assets/mockdata';
import DayForecast from './DayForecast';
import CurrentForecast from './CurrentForecast';

const SIZE_CONFIG = {
  small: { widthClass: 'w-36' },
  medium: { widthClass: 'w-96' },
  large: { widthClass: 'w-96' },
};

export type SizeType = keyof typeof SIZE_CONFIG;

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
  const [selectedSize, setSelectedSize] = useState<SizeType>('small');

  const sizeConfig = useMemo(() => SIZE_CONFIG[selectedSize], [selectedSize]);

  return (
    <div className="flex justify-center items-center flex-col gap-5 p-5 bg-slate-200 rounded-xl">
      <div
        className={`
          flex flex-col text-white bg-gradient-to-b from-sky-800 to-sky-500 shadow-xl 
          font-semibold rounded-2xl py-3 px-4
        `}
      >
        {/* current weather */}
        <CurrentForecast
          location={location}
          description={description}
          iconUrl={iconUrl}
          selectedSize={selectedSize}
          temperature={temperature}
          sizeConfig={sizeConfig}
        />

        {selectedSize === 'large' && (
          <div className="w-full h-[0.5px] bg-white opacity-50 mt-5 mx-auto" />
        )}

        {/* Hourly Forecast */}
        {selectedSize !== 'small' && (
          <div className="flex justify-between mt-4">
            {hourlyForecast.map((data) => (
              <HourlyForecast
                key={data.hour}
                hour={data.hour}
                weatherStatus="Rainy"
                temperature={data.temperature}
              />
            ))}
          </div>
        )}

        {selectedSize === 'large' && (
          <div className="w-full h-[0.5px] bg-white opacity-50 mt-5 mb-4 mx-auto" />
        )}

        {/* Daily Forecast */}
        {selectedSize === 'large' && (
          <div className="flex flex-col gap-4">
            {dailyForecast.map((data) => (
              <DayForecast
                dayOfWeek={data.dayOfWeek}
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
            key={size}
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

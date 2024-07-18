import { useMemo } from 'react';
import HourlyForecast from './HourlyForecast';
import { currentForecast, dailyForecast, hourlyForecast } from '@/assets/mockdata';
import DayForecast from './DayForecast';
import CurrentForecast from './CurrentForecast';
import { iconMappingToWeatherStatus } from '@/services/iconMapper';

const SIZE_CONFIG = {
  small: { widthClass: 'w-48' },
  medium: { widthClass: 'w-[25rem]' },
  large: { widthClass: 'w-[25rem]' },
};

export type SizeType = keyof typeof SIZE_CONFIG;

type WeatherForecastProps = {
  selectedSize: SizeType;
};

export default function WeatherForecast({ selectedSize = 'small' }: WeatherForecastProps) {
  const sizeConfig = useMemo(() => SIZE_CONFIG[selectedSize], [selectedSize]);

  return (
    <div
      className={`
          ${sizeConfig.widthClass} flex flex-col text-white bg-gradient-to-b from-sky-800 to-sky-500 
          shadow-xl font-semibold rounded-2xl py-4 px-5
        `}
    >
      {/* current weather */}
      <CurrentForecast
        location={currentForecast.location}
        description={currentForecast.description}
        temperature={currentForecast.temperature}
        weatherStatus={iconMappingToWeatherStatus(currentForecast.icon)}
        selectedSize={selectedSize}
      />

      {selectedSize === 'large' && (
        <div className="w-full h-[1px] bg-white opacity-30 mt-5 mx-auto" />
      )}

      {/* Hourly Forecast */}
      {selectedSize !== 'small' && (
        <div className="flex justify-between mt-4">
          {hourlyForecast.map((data) => (
            <HourlyForecast
              key={data.hour}
              hour={data.hour}
              weatherStatus={iconMappingToWeatherStatus(data.icon)}
              temperature={data.temperature}
            />
          ))}
        </div>
      )}

      {selectedSize === 'large' && (
        <div className="w-full h-[1px] bg-white opacity-30 mt-3 mb-4 mx-auto" />
      )}

      {/* Daily Forecast */}
      {selectedSize === 'large' && (
        <div className="flex flex-col gap-3">
          {dailyForecast.map((data) => (
            <DayForecast
              dayOfWeek={data.dayOfWeek}
              weatherStatus={iconMappingToWeatherStatus(data.icon)}
              temperature={data.temperature}
            />
          ))}
        </div>
      )}
    </div>
  );
}

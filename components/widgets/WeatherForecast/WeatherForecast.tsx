import { useMemo, useState } from 'react'
import HourlyForecast from './HourlyForecast'
import {
  currentForecast,
  dailyForecast,
  hourlyForecast,
} from '@/assets/mockdata'
import DayForecast from './DayForecast'
import CurrentForecast from './CurrentForecast'
import { iconMappingToWeatherStatus } from '@/services/iconMapper'

const SIZE_CONFIG = {
  small: { widthClass: 'w-48' },
  medium: { widthClass: 'w-[25rem]' },
  large: { widthClass: 'w-[25rem]' },
}

export type SizeType = keyof typeof SIZE_CONFIG

export default function WeatherForecast() {
  const [selectedSize, setSelectedSize] = useState<SizeType>('small')

  const sizeConfig = useMemo(() => SIZE_CONFIG[selectedSize], [selectedSize])

  return (
    <div className="flex justify-center items-center flex-col gap-5 p-6 bg-slate-200 rounded-xl">
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
                key={data.dayOfWeek}
                dayOfWeek={data.dayOfWeek}
                weatherStatus={iconMappingToWeatherStatus(data.icon)}
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
              ${
                selectedSize === size && 'bg-white border-white text-yellow-800'
              }
            `}
            onClick={() => setSelectedSize(size as any)}
          >
            {size.slice(0, 1).toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  )
}

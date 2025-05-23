'use client'

import AnalogClock from '../components/AnalogClock'
import DigitalClock from '../components/DigitalClock'
import WeatherForecast from '../components/WeatherForecast'

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full mt-5">
      <WeatherForecast />
    </div>
  )
}

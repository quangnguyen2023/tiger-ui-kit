import TemperatureBar from './TemperatureBar';
import { WeatherStatus, getWeatherIcon } from './Weather';

type DayForecastProps = {
  dayOfWeek: string;
  weatherStatus: WeatherStatus;
  temperature: {
    upperLimit: number;
    lowerLimit: number;
    max: number;
    min: number;
  };
};

export default function DayForecast({ dayOfWeek, weatherStatus, temperature }: DayForecastProps) {
  return (
    <div className="grid grid-cols-6 gap-8">
      <div className="col-span-1">{dayOfWeek}</div>
      {getWeatherIcon(weatherStatus)}
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

import { WeatherStatus, getWeatherIcon } from './Weather';

type HourlyForecastProps = {
  hour: number;
  weatherStatus: WeatherStatus;
  temperature: number;
};

export default function HourlyForecast({ hour, weatherStatus, temperature }: HourlyForecastProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm opacity-80">{hour}</div>
      {getWeatherIcon(weatherStatus, 27, 27)}
      <div className="font-bold">{temperature}°</div>
    </div>
  );
}

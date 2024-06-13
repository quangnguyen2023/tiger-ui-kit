import { WeatherStatus } from '@/app/ui/WeatherForecast/Weather';

// Icon mapping for icon code from OpenWeatherMap
export const iconMappingToWeatherStatus: (icon: string) => WeatherStatus = (iconCode: string) => {
  switch (iconCode) {
    case '01d':
      return 'Sunny';
    case '01n':
      return 'Clear_Sky_Night';
    case '02d':
      return 'Partly_Cloudy_Day';
    case '02n':
      return 'Partly_Cloudy_Night';
    case '03d':
      return 'Cloudy_Day';
    case '03n':
      return 'Cloudy_Night';
    case '04d':
    case '04n':
      return 'Overcast';
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return 'Rainy';
    case '11d':
    case '11n':
      return 'Thunderstorm';
    case '13d':
    case '13n':
      return 'Snow';
    case '50d':
    case '50n':
      return 'Mist';
    default:
      return 'Sunny';
  }
};

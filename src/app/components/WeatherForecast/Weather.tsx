import ClearSkyNightIcon from '../Icons/ClearSkyNightIcon';
import CloudyDayIcon from '../Icons/CloudyDayIcon';
import CloudyNightIcon from '../Icons/CloudyNightIcon';
import MistIcon from '../Icons/MistIcon';
import OvercastIcon from '../Icons/OvercastIcon';
import PartlyCloudyDayIcon from '../Icons/PartlyCloudyDayIcon';
import PartlyCloudyNightIcon from '../Icons/PartlyCloudyNightIcon';
import RainyIcon from '../Icons/RainyIcon';
import SnowIcon from '../Icons/SnowIcon';
import SunnyIcon from '../Icons/SunnyIcon';
import ThunderStormIcon from '../Icons/ThunderStormIcon';

export type WeatherStatus =
  | 'Sunny'
  | 'Clear_Sky_Night'
  | 'Partly_Cloudy_Day'
  | 'Partly_Cloudy_Night'
  | 'Cloudy_Day'
  | 'Cloudy_Night'
  | 'Overcast'
  | 'Rainy'
  | 'Thunderstorm'
  | 'Snow'
  | 'Mist';

export const getWeatherIcon = (
  weatherStatus: WeatherStatus,
  width?: number | string,
  height?: number | string
) => {
  let icon = null;

  switch (weatherStatus) {
    case 'Sunny':
      icon = <SunnyIcon width={width} height={height} />;
      break;
    case 'Clear_Sky_Night':
      icon = <ClearSkyNightIcon width={width} height={height} />;
      break;
    case 'Partly_Cloudy_Day':
      icon = <PartlyCloudyDayIcon width={width} height={height} />;
      break;
    case 'Partly_Cloudy_Night':
      icon = <PartlyCloudyNightIcon width={width} height={height} />;
      break;
    case 'Cloudy_Day':
      icon = <CloudyDayIcon width={width} height={height} />;
      break;
    case 'Cloudy_Night':
      icon = <CloudyNightIcon width={width} height={height} />;
      break;
    case 'Overcast':
      icon = <OvercastIcon width={width} height={height} />;
      break;
    case 'Rainy':
      icon = <RainyIcon width={width} height={height} />;
      break;
    case 'Thunderstorm':
      icon = <ThunderStormIcon width={width} height={height} />;
      break;
    case 'Snow':
      icon = <SnowIcon width={width} height={height} />;
      break;
    case 'Mist':
      icon = <MistIcon width={width} height={height} />;
      break;
    default:
      icon = null;
  }

  return <div className="-my-0.5">{icon}</div>;
};

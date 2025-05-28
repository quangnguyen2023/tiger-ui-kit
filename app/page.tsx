import AnalogClock from '../components/widgets/AnalogClock';
import DigitalClock from '../components/widgets/DigitalClock';
import WeatherForecast from '../components/widgets/WeatherForecast';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full mt-5">
      <WeatherForecast />
    </div>
  );
}

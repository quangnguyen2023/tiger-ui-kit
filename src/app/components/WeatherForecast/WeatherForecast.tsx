import Image from 'next/image';

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
  return (
    <div className="w-[168px] flex flex-col gap-3.5 text-white bg-gradient-to-b from-sky-800 to-sky-500 shadow-xl font-semibold rounded-2xl p-3">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-fit overflow-hidden text-ellipsis whitespace-nowrap">{location}</div>
          <Image
            className="rotate-45"
            src={'/direction_arrow.svg'}
            alt="wind icon"
            width={12}
            height={12}
          />
        </div>
        <div className="text-4xl">{temperature}°</div>
      </div>

      <div className="text-sm">
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
  );
}

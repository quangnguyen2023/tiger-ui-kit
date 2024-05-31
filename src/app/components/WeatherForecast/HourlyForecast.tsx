import Image from 'next/image';

type HourlyForecastProps = {
  hour: number;
  iconUrl: string;
  temperature: number;
};

export default function HourlyForecast({ hour, iconUrl, temperature }: HourlyForecastProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm opacity-80">{hour}</div>
      <Image className="scale-[1.15] -mb-3 -mt-2" src={iconUrl} alt="" width={40} height={40} />
      <div className="font-bold">{temperature}°</div>
    </div>
  );
}

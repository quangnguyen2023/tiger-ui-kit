import { IconType } from '@/app/types';

export default function RainDayIcon({ height = 50, width = 50 }: IconType) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 64 64"
    >
      <g filter="url(#blur)" id="cloudy">
        <g transform="translate(20,10)">
          <g className="am-weather-cloud-1">
            <path
              d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#91C0F8"
              stroke="white"
              stroke-linejoin="round"
              stroke-width="1.2"
              transform="translate(-10,-8), scale(0.6)"
            />
          </g>
          <g className="am-weather-cloud-2">
            <path
              d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#57A0EE"
              stroke="#FFFFFF"
              stroke-linejoin="round"
              stroke-width="1.2"
              transform="translate(-20,-11)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

import { IconType } from '@/app/types';

export default function OvercastIcon({ width = 30, height = 30 }: IconType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width={width}
      height={height}
      viewBox="0 0 256 256"
      xmlSpace="preserve"
    >
      <defs></defs>
      <g
        style={{
          stroke: 'none',
          strokeWidth: 0,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: 'none',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 9.476 43.858 c -0.034 -0.513 -0.058 -1.029 -0.058 -1.55 c 0 -12.714 10.307 -23.021 23.021 -23.021 c 9.198 0 17.133 5.396 20.82 13.193 c 2.777 -1.972 6.162 -3.142 9.827 -3.142 c 8.48 0 15.49 6.212 16.778 14.329 C 85.703 45.264 90 50.593 90 56.939 c 0 7.607 -6.167 13.774 -13.774 13.774 H 13.774 C 6.167 70.713 0 64.546 0 56.939 C 0 50.834 3.976 45.665 9.476 43.858 z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'rgb(98,195,247)',
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/embed/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors https://www.notion.so',
          },
          {
            key: 'X-Frame-Options',
            value: '', // Gỡ bỏ nếu đang bị thêm
          },
        ],
      },
    ];
  },
};

export default nextConfig;

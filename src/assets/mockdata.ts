export const hourlyForecast = [
  { hour: 12, icon: '09d', temperature: 36 },
  { hour: 13, icon: '10d', temperature: 35 },
  { hour: 14, icon: '13d', temperature: 34 },
  { hour: 15, icon: '02d', temperature: 32 },
  { hour: 16, icon: '04d', temperature: 38 },
  { hour: 17, icon: '11d', temperature: 38 },
];

// prettier-ignore
export const dailyForecast = [
  { dayOfWeek: 'Mon', icon: '01d', temperature: { max: 36, min: 27, lowerLimit: 24, upperLimit: 37 } },
  { dayOfWeek: 'Tue', icon: '02d', temperature: { max: 33, min: 25, lowerLimit: 24, upperLimit: 37 } },
  { dayOfWeek: 'Wed', icon: '03d', temperature: { max: 36, min: 27, lowerLimit: 24, upperLimit: 37 } },
  { dayOfWeek: 'Thu', icon: '04d', temperature: { max: 34, min: 25, lowerLimit: 24, upperLimit: 37 } },
  { dayOfWeek: 'Fri', icon: '09d', temperature: { max: 32, min: 24, lowerLimit: 24, upperLimit: 37 } },
];

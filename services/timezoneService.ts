// Optimized timezone service for better performance
let cachedTimezones: string[] | null = null;

export const getAvailableTimezones = (): string[] => {
  if (cachedTimezones) {
    return cachedTimezones;
  }

  try {
    cachedTimezones = Intl.supportedValuesOf('timeZone');
    return cachedTimezones;
  } catch (error) {
    // Fallback with popular timezones only (65 items instead of 400+)
    cachedTimezones = [
      'UTC',
      'America/New_York',
      'America/Los_Angeles',
      'America/Chicago',
      'America/Denver',
      'America/Toronto',
      'America/Vancouver',
      'America/Mexico_City',
      'America/Sao_Paulo',
      'America/Buenos_Aires',
      'Europe/London',
      'Europe/Paris',
      'Europe/Berlin',
      'Europe/Rome',
      'Europe/Madrid',
      'Europe/Amsterdam',
      'Europe/Brussels',
      'Europe/Vienna',
      'Europe/Zurich',
      'Europe/Stockholm',
      'Europe/Helsinki',
      'Europe/Oslo',
      'Europe/Copenhagen',
      'Europe/Warsaw',
      'Europe/Prague',
      'Europe/Budapest',
      'Europe/Athens',
      'Europe/Istanbul',
      'Europe/Moscow',
      'Asia/Tokyo',
      'Asia/Seoul',
      'Asia/Shanghai',
      'Asia/Hong_Kong',
      'Asia/Singapore',
      'Asia/Bangkok',
      'Asia/Jakarta',
      'Asia/Manila',
      'Asia/Taipei',
      'Asia/Kuala_Lumpur',
      'Asia/Ho_Chi_Minh',
      'Asia/Dhaka',
      'Asia/Kolkata',
      'Asia/Karachi',
      'Asia/Dubai',
      'Asia/Qatar',
      'Asia/Kuwait',
      'Asia/Riyadh',
      'Asia/Tehran',
      'Asia/Baghdad',
      'Asia/Jerusalem',
      'Africa/Cairo',
      'Africa/Lagos',
      'Africa/Johannesburg',
      'Africa/Casablanca',
      'Africa/Nairobi',
      'Australia/Sydney',
      'Australia/Melbourne',
      'Australia/Brisbane',
      'Australia/Perth',
      'Australia/Adelaide',
      'Pacific/Auckland',
      'Pacific/Fiji',
      'Pacific/Honolulu',
    ];

    return cachedTimezones;
  }
};

const formatCache = new Map<string, string>();

export const formatTimezoneForDisplay = (timezone: string): string => {
  if (formatCache.has(timezone)) {
    return formatCache.get(timezone)!;
  }

  const formatted = timezone.replace(/_/g, ' ');
  formatCache.set(timezone, formatted);
  return formatted;
};

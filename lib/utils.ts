import { WidgetType } from '@/types/widget';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createWidgetUrl = (type: WidgetType, id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const path = `/embed/${type}/${id}`;
  return `${baseUrl}${path}`;
};

/**
 * Given a hex color string, determines if the color is light or dark.
 * A light color is one with a luminance > 0.5.
 */
export const isLightColor = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '');
  let r: number, g: number, b: number;

  if (hex.length === 3) {
    // For 3-character hex, duplicate each character (e.g., #RGB -> #RRGGBB)
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

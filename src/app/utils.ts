import { RGBColor } from 'react-color';

export function convertRGBToHex(rgbColor: RGBColor) {
  const { r, g, b } = rgbColor;
  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  );
}

export function convertHexToRGB(hexColor: string) {
  if (hexColor.startsWith('#')) {
    hexColor = hexColor.slice(1);
  }

  if (hexColor.length !== 3 && hexColor.length !== 6) {
    throw new Error('Invalid hex color');
  }

  if (hexColor.length === 3) {
    hexColor = hexColor
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);
  const a = 1;
  return { r, g, b, a };
}

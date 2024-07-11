import { RGBColor } from 'react-color';

export default function convertRGBToHex(rgbColor: RGBColor) {
  const { r, g, b, a } = rgbColor;
  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0') +
    (a?.toString(16)?.padStart(2, '0') || '')
  );
}

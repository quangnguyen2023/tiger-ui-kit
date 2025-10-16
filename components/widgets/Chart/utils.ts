export const hexToRGBA = (hex: string, alpha: number) => {
  if (!hex) return `rgba(99, 102, 241, ${alpha})`;
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized.length === 3 ? sanitized.repeat(2) : sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

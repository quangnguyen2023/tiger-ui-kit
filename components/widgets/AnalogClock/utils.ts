interface Position {
  top: number;
  left: number;
}

export const calculateNumberPositions = (
  centerX: number,
  centerY: number,
  radius: number,
): Position[] => {
  const positions: Position[] = [];
  const angleStep = Math.PI / 6; // 30 degrees between each number

  for (let i = 0; i < 12; i++) {
    const angle = (i - 2) * angleStep;
    positions.push({
      top: centerY + radius * Math.sin(angle),
      left: centerX + radius * Math.cos(angle),
    });

    // const x = centerX + radius * Math.cos(angle);
    // const y = centerY + radius * Math.sin(angle);

    // positions.push({
    //   top: Math.floor(y) + 'px',
    //   left: Math.floor(x) + 'px',
    // });
  }
  return positions;
};

export const calculateHandPosition = (
  value: number,
  totalValues: number,
  radius: number,
  centerX: number,
  centerY: number,
): Position => {
  const angle = (value / totalValues) * 2 * Math.PI - Math.PI / 2;
  return {
    top: centerY + radius * Math.sin(angle),
    left: centerX + radius * Math.cos(angle),
  };
};

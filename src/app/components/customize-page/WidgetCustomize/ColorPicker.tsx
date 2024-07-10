import { useMemo, useState } from 'react';
import { ColorResult, RGBColor, TwitterPicker } from 'react-color';
import PopoverWrapper from '../../base/PopoverWrapper';

type ColorPickerProps = {
  horizontal?: 'left' | 'right';
}

export default function ColorPicker({ horizontal = 'left' }: ColorPickerProps) {
  const [color, setColor] = useState<RGBColor>({ r: 0, g: 0, b: 0, a: 1 });

  const handleChange = (newColor: ColorResult) => {
    setColor(newColor.rgb);
  };

  const triggerButton = useMemo(() => {
    return (
      <button
        className="w-10 h-10 rounded-full  shadow"
        style={{ background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}
      />
    );
  }, [color]);

  return (
    <PopoverWrapper
      triggerComponent={triggerButton}
      anchorHorizontal={horizontal}
      transformHorizontal={horizontal}
    >
      <TwitterPicker color={color} onChange={handleChange} triangle="hide" />
    </PopoverWrapper>
  );
}

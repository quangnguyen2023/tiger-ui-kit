import { useMemo, useState } from 'react';
import { ColorResult, RGBColor, TwitterPicker } from 'react-color';
import PopoverWrapper from '../../base/PopoverWrapper';

type ColorPickerProps = {
  horizontal?: 'left' | 'right';
};

export default function ColorPicker({ horizontal = 'left' }: ColorPickerProps) {
  const [color, setColor] = useState<RGBColor>({ r: 0, g: 0, b: 0, a: 1 });

  const handleChange = (newColor: ColorResult) => {
    setColor(newColor.rgb);
  };

  const triggerButton = useMemo(() => {
    const { r, g, b, a } = color;
    const bgColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    const hexColor = `
      #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}
    `;

    return (
      <div className="flex items-center gap-2 bg-[#fdfdfd] w-fit px-3 py-1.5 rounded-md shadow cursor-pointer">
        <span className="w-8 h-8 rounded-md shadow" style={{ background: bgColor }} />
        <span className="font-semibold text-sm tracking-wider text-[#555] uppercase">
          {hexColor}
        </span>
      </div>
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

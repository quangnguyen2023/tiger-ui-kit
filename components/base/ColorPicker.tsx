import { useState, FC } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Pipette } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { isLightColor } from '@/lib/utils';

//
// ======== Types ===============================================================
//
interface ColorPickerProps {
  label: string;
  initialColor?: string;
  onChange?: (color: string) => void;
}

interface ColorPreviewProps {
  color: string;
  onColorChange: (color: string) => void;
}

interface PredefinedColorsProps {
  onColorSelect: (color: string) => void;
}

//
// ==== Constants ==============================================================
//
const PREDEFINED_COLORS = [
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF',
  '#C0392B',
  '#34495E',
];

//
// ==== Sub Components =========================================================
//
const ColorPreview: FC<ColorPreviewProps> = ({ color, onColorChange }) => (
  <div className="flex items-center gap-3">
    <PopoverTrigger asChild>
      <button
        className="group relative aspect-square h-10 w-10 cursor-pointer rounded-full border transition-all duration-300 hover:ring-1 hover:ring-gray-400 hover:ring-offset-2"
        style={{ background: color }}
      >
        <Pipette
          className={`absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 ${isLightColor(color) ? 'text-gray-800' : 'text-white'} `}
        />
      </button>
    </PopoverTrigger>
    <Input
      className="flex-1 font-medium uppercase"
      value={color}
      onChange={(e) => onColorChange(e.target.value)}
    />
  </div>
);

const PredefinedColors: FC<PredefinedColorsProps> = ({ onColorSelect }) => (
  <div className="mt-5 flex flex-wrap gap-2">
    {PREDEFINED_COLORS.map((presetColor) => (
      <button
        key={presetColor}
        className="h-8 w-8 cursor-pointer rounded-md transition-all duration-300 hover:ring-1 hover:ring-gray-300 hover:ring-offset-2"
        onClick={() => onColorSelect(presetColor)}
        style={{ background: presetColor }}
      />
    ))}
  </div>
);

//
// ==== Main Component =========================================================
//
const ColorPicker: FC<ColorPickerProps> = ({
  label,
  initialColor = '#000000',
  onChange,
}) => {
  const [color, setColor] = useState(initialColor);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onChange?.(newColor);
  };

  return (
    <div>
      <Label className="text-md mb-3 font-semibold">{label}</Label>

      <Popover>
        <ColorPreview color={color} onColorChange={handleColorChange} />
        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={color} onChange={handleColorChange} />
        </PopoverContent>
      </Popover>

      <PredefinedColors onColorSelect={handleColorChange} />
    </div>
  );
};

export default ColorPicker;

import ColorPicker from '@/app/components/ui/ColorPicker';
import Switcher from '@/app/components/ui/Switcher';
import Input from '../../ui/Input';
import { CustomizeItemType, CustomizeProps } from '@/app/types';

export type CustomizeItem = {
  fieldName: string;
  title: string;
  type: CustomizeItemType;
  options?: {
    label: string;
    value: any;
    [key: string]: any;
  }[];
};

type WidgetCustomizeProps = {
  customizeItems: CustomizeItem[];
  onChange: (newProps: CustomizeProps) => void;
};

export default function WidgetCustomize({ customizeItems, onChange }: WidgetCustomizeProps) {
  const getCustomizeItem = (item: CustomizeItem) => {
    switch (item.type) {
      case CustomizeItemType.COLOR:
        return (
          <ColorPicker
            onChangeColor={(color) => {
              onChange({ [item.fieldName]: color });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="text-xl font-semibold mb-6"> Customize </div>
      <div className="flex flex-col gap-6">
        {customizeItems.map((item, index) => (
          <div className="flex flex-col gap-3" key={index}>
            <label className="text-sm font-semibold"> {item.title} </label>
            {getCustomizeItem(item)}
          </div>
        ))}
      </div>
    </>
  );
}

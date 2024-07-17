import ColorPicker from '@/app/components/ui/ColorPicker';
import Switcher from '@/app/components/ui/Switcher';
import Input from '../../ui/Input';
import { CustomizeItemType, CustomizeProps } from '@/app/types';

export type CustomizeItem = {
  fieldName: string;
  title: string;
  type: CustomizeItemType;
  defaultValue?: string | number | boolean;
  options?: {
    label: string;
    value: any;
    [key: string]: any;
  }[];
};

type WidgetCustomizeProps = {
  customizeItems: CustomizeItem[];
  handleChange: (newProps: CustomizeProps) => void;
};

export default function WidgetCustomize({ customizeItems, handleChange }: WidgetCustomizeProps) {
  const getCustomizeItem = (item: CustomizeItem) => {
    switch (item.type) {
      case CustomizeItemType.COLOR:
        return (
          <ColorPicker
            customValue={item.defaultValue as string}
            onChangeColor={(color) => {
              handleChange({ [item.fieldName]: color });
            }}
          />
        );
      case CustomizeItemType.SWITCHER:
        return (
          <Switcher
            options={item?.options || []}
            onSwitch={(value) => handleChange({ [item.fieldName]: value })}
          />
        );
      case CustomizeItemType.INPUT:
        return (
          <Input
            onChange={(value) => {
              handleChange({ [item.fieldName]: value });
            }}
          />
        );
      case CustomizeItemType.NUMBER:
        return (
          <Input
            type="number"
            onChange={(value) => {
              handleChange({ [item.fieldName]: value });
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

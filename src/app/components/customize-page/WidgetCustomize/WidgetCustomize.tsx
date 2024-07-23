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
  handleSave: () => void;
};

const getCustomizeItem = (
  item: CustomizeItem,
  handleChange: (newProps: CustomizeProps) => void
) => {
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
          value={item.defaultValue}
          options={item?.options || []}
          onSwitch={(value) => handleChange({ [item.fieldName]: value })}
        />
      );
    case CustomizeItemType.INPUT:
      return (
        <Input
          value={item.defaultValue}
          onChange={(value) => {
            handleChange({ [item.fieldName]: value });
          }}
        />
      );
    case CustomizeItemType.NUMBER:
      return (
        <Input
          type="number"
          value={item.defaultValue}
          onChange={(value) => {
            handleChange({ [item.fieldName]: value });
          }}
        />
      );
    default:
      return null;
  }
};

export default function WidgetCustomize({
  customizeItems,
  handleChange,
  handleSave,
}: WidgetCustomizeProps) {
  return (
    <>
      <div className="text-xl font-semibold mb-6"> Customize </div>
      <div className="flex flex-col gap-6">
        {customizeItems.map((item, index) => (
          <div className="flex flex-col gap-3" key={index}>
            <label className="text-sm font-semibold"> {item.title} </label>
            {getCustomizeItem(item, handleChange)}
          </div>
        ))}
      </div>

      <div className="flex justify-end my-5">
        <button
          className="
            px-4 py-2 text-sm font-medium bg-blue-400 text-white rounded-md transition hover:bg-blue-500 
            active:bg-blue-600"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}

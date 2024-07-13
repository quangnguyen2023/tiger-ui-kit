import ColorPicker from '@/app/components/ui/ColorPicker';
import Switcher from '@/app/components/ui/Switcher';
import Input from '../../ui/Input';

export enum CustomizeItemType {
  'COLOR',
  'SWITCHER',
  'INPUT',
  'NUMBER',
}

export type CustomizeItem = {
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
};

export default function WidgetCustomize({ customizeItems }: WidgetCustomizeProps) {
  const getCustomizeItem = (item: CustomizeItem) => {
    switch (item.type) {
      case CustomizeItemType.COLOR:
        return <ColorPicker />;
      case CustomizeItemType.SWITCHER:
        return (
          <Switcher
            value={1}
            options={item?.options || []}
            onSwitch={(value) => console.log(value)}
          />
        );
      case CustomizeItemType.INPUT:
        return <Input />;
      case CustomizeItemType.NUMBER:
        return <Input type="number" />;
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

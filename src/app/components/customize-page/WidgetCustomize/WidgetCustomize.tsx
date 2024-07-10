import ColorPicker from './ColorPicker';

export enum CustomizeItemType {
  'COLOR',
}

export type CustomizeItem = {
  title: string;
  type: CustomizeItemType;
};

type WidgetCustomizeProps = {
  customizeItems: CustomizeItem[];
};

export default function WidgetCustomize({ customizeItems }: WidgetCustomizeProps) {
  const getCustomizeItem = (type: CustomizeItemType) => {
    switch (type) {
      case CustomizeItemType.COLOR:
        return <ColorPicker />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="text-xl font-semibold mb-6"> Customize </div>
      <div className="flex flex-col gap-2">
        {customizeItems.map((item) => (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold"> {item.title} </label>
            {getCustomizeItem(item.type)}
          </div>
        ))}
      </div>
    </>
  );
}

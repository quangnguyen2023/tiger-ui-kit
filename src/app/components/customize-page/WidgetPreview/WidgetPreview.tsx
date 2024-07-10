import { ReactNode } from 'react';

type WidgetPreviewProps = {
  widgetName: string;
  widgetComponent: ReactNode;
};

export default function WidgetPreview({ widgetName, widgetComponent }: WidgetPreviewProps) {
  return (
    <>
      <div className="text-xl font-semibold"> {widgetName} </div>
      <div className="flex h-5/6 items-center justify-center"> {widgetComponent} </div>
    </>
  );
}

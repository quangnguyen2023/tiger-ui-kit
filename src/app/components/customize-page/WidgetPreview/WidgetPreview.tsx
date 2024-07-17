import { CustomizeProps, WidgetType } from '@/app/types';
import { useEffect, useMemo, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import DigitalClock from '../../widgets/DigitalClock';
import AnalogClock from '../../widgets/AnalogClock';

type WidgetPreviewProps = {
  widgetName: string;
  widgetType: WidgetType | null;
  customizeProps: CustomizeProps;
};

function getWidgetComponentByType(
  widgetType: WidgetType | null,
  scaleValue: number,
  customizeProps: CustomizeProps
) {
  switch (widgetType) {
    case WidgetType.Digital_Clock:
      return (
        <DigitalClock
          textColor={customizeProps?.textColor}
          backgroundColor={customizeProps?.bgColor}
          scaleValue={scaleValue}
        />
      );
    case WidgetType.Analog_Clock:
      return (
        <AnalogClock
          textColor={customizeProps?.textColor}
          backgroundColor={customizeProps?.bgColor}
          enableIndicators={customizeProps?.enableIndicators}
          size={customizeProps?.size}
          title={customizeProps?.title}
          updateDuration={customizeProps?.updateDuration}
        />
      );
    default:
      return <></>;
  }
}

export default function WidgetPreview({
  widgetName,
  widgetType,
  customizeProps,
}: WidgetPreviewProps) {
  const initialSize = { w: 600, h: 300 };
  const [size, setSize] = useState(initialSize);
  const [widget, setWidget] = useState(<></>);

  const scaleX = useMemo(() => size.w / initialSize.w, [size.w, initialSize.w]);
  const scaleY = useMemo(() => size.h / initialSize.h, [size.h, initialSize.h]);
  const scaleValue = useMemo(() => Math.min(scaleX, scaleY), [scaleX, scaleY]);

  function handleResize({ width, height }: { width: number; height: number }) {
    setSize({ w: width, h: height });
  }

  useEffect(() => {
    setWidget(getWidgetComponentByType(widgetType, scaleValue, customizeProps));
  }, [widgetType, scaleValue, customizeProps]);

  return (
    <>
      <div className="text-xl font-semibold"> {widgetName} </div>
      <div className="flex h-5/6 items-center justify-center">
        {/* <ResizableBox
          width={initialSize.w}
          height={initialSize.h}
          minConstraints={[200, 200]}
          maxConstraints={[800, 450]}
          onResize={(e, { node, size }) => handleResize(size)}
        >
          <div className="w-full h-full rounded-md flex justify-center items-center border-2 border-dotted"> */}
            {widget}
          {/* </div>
        </ResizableBox> */}
      </div>
    </>
  );
}

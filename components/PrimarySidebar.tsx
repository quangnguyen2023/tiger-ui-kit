'use client';

import { SIDEBAR_ITEMS } from '@/constants';
import { useWidgetContext } from '@/contexts/WidgetContext';
import { Button } from '@/components/ui/button';

const PrimarySidebar = () => {
  const { selectedWidget, setSelectedWidget } = useWidgetContext();

  const handleWidgetSelect = (widget: string) => {
    setSelectedWidget(widget);
  };

  return (
    <div className="w-fit min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 p-2">
        {SIDEBAR_ITEMS.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => handleWidgetSelect(item.label)}
            className={`w-full flex justify-start gap-3 py-5 text-sm font-sans transition-colors cursor-pointer mb-1 ${
              item.label === selectedWidget
                ? 'bg-gray-100'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-4 h-4 text-blue-600" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default PrimarySidebar;

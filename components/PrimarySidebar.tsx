'use client';

import { SIDEBAR_MODULES } from '@/constants';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { useSidebarContext } from '@/contexts/SidebarContext';

type SidebarItem = (typeof SIDEBAR_MODULES)[number]['items'][number];

const PrimarySidebar = () => {
  const { push } = useRouter();

  const { activeView, updateActiveView } = useSidebarContext();

  const handleItemClick = (item: SidebarItem) => {
    updateActiveView(item.viewKey);
    push(item.path);
  };

  return (
    <div className="w-fit min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 p-2">
        {SIDEBAR_MODULES.map((module, index) => (
          <Fragment key={index}>
            {module.items.map((item, itemIdx) => (
              <Button
                key={itemIdx}
                variant="ghost"
                onClick={() => handleItemClick(item)}
                className={`w-full flex justify-start gap-3 py-5 text-sm font-sans transition-colors mb-1 ${
                  item.viewKey === activeView
                    ? 'bg-gray-100'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4 text-blue-600" />
                {item.label}
              </Button>
            ))}

            {/* Add a divider between modules */}
            {index < SIDEBAR_MODULES.length - 1 && <div className="my-4" />}
          </Fragment>
        ))}
      </nav>
    </div>
  );
};

export default PrimarySidebar;

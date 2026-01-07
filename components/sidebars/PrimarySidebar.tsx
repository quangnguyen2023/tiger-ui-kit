'use client';

import { SIDEBAR_MODULES } from '@/constants';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { useSidebarContext } from '@/contexts/SidebarContext';
import Image from 'next/image';

type SidebarItem = (typeof SIDEBAR_MODULES)[number]['items'][number];

const PrimarySidebar = () => {
  const { push } = useRouter();

  const { activeView, updateActiveView } = useSidebarContext();

  const handleItemClick = (item: SidebarItem) => {
    updateActiveView(item.viewKey);
    push(item.path);
  };

  return (
    <div className="fixed top-16 left-0 z-50 flex h-[calc(100vh-4rem)] w-52 flex-col justify-between border-r border-gray-200 bg-white pb-8">
      <nav className="p-2">
        {SIDEBAR_MODULES.map((module, index) => (
          <Fragment key={index}>
            {module.items.map((item, itemIdx) => (
              <Button
                key={itemIdx}
                variant="ghost"
                onClick={() => handleItemClick(item)}
                className={`mb-1 flex w-full justify-start gap-3 py-5 font-sans text-sm transition-colors ${
                  item.viewKey === activeView
                    ? 'bg-gray-100'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4 text-blue-600" />
                {item.label}
              </Button>
            ))}

            {/* Add a divider between modules */}
            {index < SIDEBAR_MODULES.length - 1 && <div className="my-4" />}
          </Fragment>
        ))}
      </nav>

      <div className="flex justify-center">
        <Image
          src="/logo_1.3.png"
          alt="Widget Kit Logo"
          width={100}
          height={23}
          className="-ml-5 scale-[1.5]"
        />
      </div>
    </div>
  );
};

export default PrimarySidebar;

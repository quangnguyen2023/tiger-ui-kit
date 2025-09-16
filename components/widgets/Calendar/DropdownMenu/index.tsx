import { useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import QuickViewByDate from './QuickViewByDate';

export type MenuOption = {
  id: string;
  label: string;
};

const CalendarDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-60 hover:opacity-100">
          <EllipsisVerticalIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="">
        <div className="p-2">
          <QuickViewByDate />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CalendarDropdownMenu;

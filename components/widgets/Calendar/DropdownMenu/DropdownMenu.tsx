'use client';

import { useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import QuickViewByDate from './QuickViewByDate';

export type MenuOption = {
  id: string;
  label: string;
};

const CalendarDropdownMenu = () => {
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-60 hover:opacity-100"
        >
          <EllipsisVerticalIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {showQuickView ? (
          <div className="p-2">
            <QuickViewByDate />
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 w-full"
              onClick={() => setShowQuickView(false)}
            >
              Back
            </Button>
          </div>
        ) : (
          <>
            <DropdownMenuItem onClick={() => setShowQuickView(true)}>
              Go to date
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CalendarDropdownMenu;

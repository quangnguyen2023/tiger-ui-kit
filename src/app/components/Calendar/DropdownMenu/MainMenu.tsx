import { Typography } from '@mui/material';
import { MenuOption } from './DropdownMenu';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { useContext } from 'react';
import { PopoverWrapperContext } from '../../PopoverWrapper/PopoverWrapper';

type MainMenuProps = {
  menuOptions: MenuOption[];
  onClick: (option: MenuOption) => void;
};

export default function MainMenu({ menuOptions, onClick }: MainMenuProps) {
  const { onClosePopover } = useContext(PopoverWrapperContext);

  const handleClick = (option: MenuOption) => {
    onClick(option);
  };

  return (
    <div className="min-w-52 p-1 pb-2">
      <div className="flex justify-between items-center p-3 pt-2">
        <div className="text-sm font-semibold"> Calendar options </div>
        <XMarkIcon
          width={18}
          height={18}
          color="#777"
          className="cursor-pointer -mr-1 bg-[#EFEFEE] hover:bg-gray-300 dark:bg-zinc-400 dark:hover:bg-zinc-300 transition-colors rounded-full"
          onClick={onClosePopover}
        />
      </div>

      {menuOptions.map((option, index) => (
        <div
          key={index}
          className="flex items-center py-2 px-3 transition-colors hover:bg-slate-100 dark:hover:bg-zinc-600 rounded-[4px] cursor-pointer"
          onClick={() => handleClick(option)}
        >
          <div className="mr-3">
            <CalendarDaysIcon width={20} height={20} />
          </div>
          <Typography sx={{ fontSize: '0.875rem' }}> {option.label} </Typography>
        </div>
      ))}
    </div>
  );
}

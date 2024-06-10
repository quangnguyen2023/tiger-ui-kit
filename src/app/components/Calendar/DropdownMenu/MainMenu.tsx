import { Typography } from '@mui/material';
import { MenuOption } from './DropdownMenu';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

type MainMenuProps = {
  menuOptions: MenuOption[];
  onClick: (option: MenuOption) => void;
};

export default function MainMenu({ menuOptions, onClick }: MainMenuProps) {
  const handleClick = (option: MenuOption) => {
    onClick(option);
  };

  return (
    <div className="min-w-52">
      <div className="text-sm font-semibold p-2 px-3"> Calendar options </div>

      {menuOptions.map((option, index) => (
        <div
          key={index}
          className="flex items-center py-2 px-3 transition-colors hover:bg-slate-100 rounded-[4px] cursor-pointer"
          onClick={() => handleClick(option)}
        >
          <div className="mr-2">
            <CalendarDaysIcon width={20} height={20} />
          </div>
          <Typography sx={{ fontSize: '0.875rem' }}> {option.label} </Typography>
        </div>
      ))}
    </div>
  );
}

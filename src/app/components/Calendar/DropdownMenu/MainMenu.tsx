import { ListItemIcon, MenuItem, Typography } from '@mui/material';
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
    <>
      {menuOptions.map((option, index) => (
        <MenuItem key={index} onClick={() => handleClick(option)}>
          <ListItemIcon>
            <CalendarDaysIcon width={20} height={20} />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.875rem' }}> {option.label} </Typography>
        </MenuItem>
      ))}
    </>
  );
}

import { CalendarDaysIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import PopoverWrapper from '../../PopoverWrapper';
import { ListItemIcon, MenuItem, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import QuickViewByDate from './QuickViewByDate';

type MenuOption = {
  label: string;
  component: () => JSX.Element;
};

type MainMenuProps = {
  menuOptions: MenuOption[];
  onClick: (option: MenuOption) => void;
};

const menuOptions: MenuOption[] = [{ label: 'Xem nhanh theo ngày', component: QuickViewByDate }];

const MoreActionButton = () => (
  <div
    className={`flex justify-center p-1 opacity-60 transition-opacity hover:opacity-100 hover:bg-[#555] rounded-full cursor-pointer`}
  >
    <EllipsisVerticalIcon width={20} height={20} />
  </div>
);

const MainMenu = ({ menuOptions, onClick }: MainMenuProps) => {
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
          <Typography variant="caption"> {option.label} </Typography>
        </MenuItem>
      ))}
    </>
  );
};

export default function DropdownMenu() {
  const [selectedOption, setSelectedOption] = useState<MenuOption | null>(null);

  return (
    <PopoverWrapper triggerComponent={<MoreActionButton />} onClose={() => setSelectedOption(null)}>
      {
        // prettier-ignore
        selectedOption 
        ? <div className='p-2'>
            <Stack direction='row' alignItems='center' spacing={1.5} sx={{ mb: 3 }}>
              <ArrowLeftIcon width={16} height={16} color='#aaa' className='font-semibold cursor-pointer' />
              <div className='text-sm font-semibold'> {selectedOption?.label} </div>
            </Stack>
            {selectedOption?.component()}
          </div>
        : <MainMenu menuOptions={menuOptions} onClick={(option) => setSelectedOption(option)} />
      }
    </PopoverWrapper>
  );
}

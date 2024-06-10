import { useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import PopoverWrapper from '../../PopoverWrapper';
import MainMenu from './MainMenu';
import SelectedOptionContent from './SelectedOptionContent';

export type MenuOption = {
  id: string;
  label: string;
};

const menuOptions: MenuOption[] = [{ id: 'quick_view', label: 'Go to date' }];

const MoreActionButton = () => (
  <div className="flex justify-center p-1 opacity-60 transition-opacity hover:opacity-100 hover:bg-[#555] rounded-full cursor-pointer">
    <EllipsisVerticalIcon width={20} height={20} />
  </div>
);

const DropdownMenu = () => {
  const [selectedOption, setSelectedOption] = useState<MenuOption | null>(null);

  return (
    <PopoverWrapper triggerComponent={<MoreActionButton />} onClose={() => setSelectedOption(null)}>
      {
        // prettier-ignore
        selectedOption 
          ? <SelectedOptionContent 
              selectedOption={selectedOption} 
              onBack={() => setSelectedOption(null)} 
            />
          : <MainMenu 
              menuOptions={menuOptions} 
              onClick={(option) => setSelectedOption(option)} 
            />
      }
    </PopoverWrapper>
  );
};

export default DropdownMenu;

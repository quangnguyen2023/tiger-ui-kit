import { Stack } from '@mui/material';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import QuickViewByDate from './QuickViewByDate';
import { MenuOption } from './DropdownMenu';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { useContext } from 'react';
import { PopoverWrapperContext } from '../../../base/PopoverWrapper/PopoverWrapper';

type SelectedOptionContentProps = {
  selectedOption: MenuOption;
  onBack: () => void;
};

const getComponentByOptionId = (optionId: string) => {
  switch (optionId) {
    case 'quick_view':
      return <QuickViewByDate />;
    default:
      return null;
  }
};

const SelectedOptionContent = ({ selectedOption, onBack }: SelectedOptionContentProps) => {
  const { onClosePopover } = useContext(PopoverWrapperContext);

  return (
    <div className="p-3">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <ArrowLeftIcon
            width={20}
            height={20}
            color="#aaa"
            className="font-semibold cursor-pointer hover:bg-slate-100 rounded-[4px] p-0.5 transition-colors"
            onClick={onBack}
          />
          <div className="text-sm font-semibold"> {selectedOption.label} </div>
        </Stack>
        <XMarkIcon
          width={18}
          height={18}
          color="#777"
          className="cursor-pointer bg-[#EFEFEE] hover:bg-gray-30 dark:bg-zinc-400 dark:hover:bg-zinc-300 transition-colors rounded-full"
          onClick={onClosePopover}
        />
      </Stack>

      {getComponentByOptionId(selectedOption.id)}
    </div>
  );
};

export default SelectedOptionContent;

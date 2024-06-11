import { Stack } from '@mui/material';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import QuickViewByDate from './QuickViewByDate';
import { MenuOption } from './DropdownMenu';

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
  return (
    <div className="px-2 py-1">
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
        <ArrowLeftIcon
          width={20}
          height={20}
          color="#aaa"
          className="font-semibold cursor-pointer hover:bg-slate-100 rounded-[4px] p-0.5 transition-colors"
          onClick={onBack}
        />
        <div className="text-sm font-semibold"> {selectedOption.label} </div>
      </Stack>

      {getComponentByOptionId(selectedOption.id)}
    </div>
  );
};

export default SelectedOptionContent;

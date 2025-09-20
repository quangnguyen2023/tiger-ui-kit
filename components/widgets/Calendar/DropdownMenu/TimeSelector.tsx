import Combobox from '@/components/base/Combobox';
import { SelectedTime } from '@/components/widgets/Calendar/types';
import { getDaysInMonth } from 'date-fns';

type TimeSelectorType = {
  selectedTime: SelectedTime;
  isLunarDate?: boolean;
  onChange: (newTime: SelectedTime) => void;
};

const minYear = 1900;
const maxYear = 2199;

const TimeSelector = ({ selectedTime, isLunarDate, onChange }: TimeSelectorType) => {
  const years = Array(maxYear - minYear + 1)
    .fill('')
    .map((_, i) => minYear + i);

  const months = Array(12)
    .fill('')
    .map((_, i) => i + 1);

  let days = [];

  if (isLunarDate) {
    days = Array(30)
      .fill('')
      .map((_, i) => i + 1);
  } else {
    const daysInMonth = getDaysInMonth(new Date(selectedTime.year, selectedTime.month));
    days = Array(daysInMonth)
      .fill('')
      .map((_, i) => i + 1);
  }

  return (
    <div className="flex gap-1">
      <Combobox
        options={days}
        value={selectedTime.day || 1}
        onChangeVal={(newValue) => onChange({ ...selectedTime, day: newValue })}
      />
      <Combobox
        options={months}
        value={selectedTime.month}
        onChangeVal={(newValue) => onChange({ ...selectedTime, month: newValue })}
      />
      <Combobox
        options={years}
        value={selectedTime.year}
        onChangeVal={(newValue) => onChange({ ...selectedTime, year: newValue })}
      />
    </div>
  );
};

export default TimeSelector;

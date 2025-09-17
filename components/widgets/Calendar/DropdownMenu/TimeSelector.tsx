import Combobox from '@/components/base/Combobox';
import { SelectedTime } from '@/components/widgets/Calendar/types';
import { getDaysInMonth } from 'date-fns';
import React from 'react';

type TimeSelectorType = {
  selectedTime: SelectedTime;
  onChange: (newTime: SelectedTime) => void;
};

const TimeSelector = ({ selectedTime, onChange }: TimeSelectorType) => {
  const minYear = 1900;
  const maxYear = 2199;

  const years = Array(maxYear - minYear + 1)
    .fill('')
    .map((_, i) => minYear + i);

  const months = Array(12)
    .fill('')
    .map((_, i) => i + 1);

  const daysInMonth = getDaysInMonth(new Date(selectedTime.year, selectedTime.month));
  const dates = Array(daysInMonth)
    .fill('')
    .map((_, i) => i + 1);

  return (
    <div className="flex gap-1">
      <Combobox
        options={dates}
        value={selectedTime.day || 1}
        onChangeVal={(newValue) => onChange({ ...selectedTime, day: newValue })}
      />
      <Combobox
        options={months}
        value={selectedTime.month + 1}
        onChangeVal={(newValue) => onChange({ ...selectedTime, month: newValue - 1 })}
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

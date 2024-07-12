import { Key, useState } from 'react';

type SwitcherOption = {
  label: string;
  value: boolean | string | number;
};

type SwitcherProps = {
  value: boolean | string | number;
  options: SwitcherOption[];
  onSwitch: (newValue: any) => void;
};

export default function Switcher({ value, options = [], onSwitch }: SwitcherProps) {
  const [selectedOptionVal, setSelectedOptionVal] = useState(value || options[0].value);

  const handleSwitch = (newOption: SwitcherOption) => {
    setSelectedOptionVal(newOption.value);
    onSwitch(newOption.value);
  };

  return (
    <div className="flex items-center justify-between p-1 w-fit rounded-full shadow bg-[#fdfdfd]">
      {options.map((opt) => (
        <button
          key={opt.value as Key}
          onClick={() => handleSwitch(opt)}
          className="px-4 py-2 text-sm font-medium rounded-full transition"
          style={{
            color: selectedOptionVal === opt.value ? '#fff' : '#555',
            background: selectedOptionVal === opt.value ? '#555' : 'transparent',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

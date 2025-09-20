import { CalendarContext } from '@/components/widgets/Calendar';
import { SelectedTime } from '@/components/widgets/Calendar/types';
import { LunarDate, SolarDate } from '@nghiavuive/lunar_date_vi';
import { useContext, useState } from 'react';

const useTime = () => {
  const { selectedTime, changeTime } = useContext(CalendarContext);

  const [solarTime, setSolarTime] = useState({
    ...selectedTime,
    month: selectedTime.month + 1,
  });

  const [lunarTime, setLunarTime] = useState<SelectedTime>(() => {
    const lunar = new SolarDate({
      day: solarTime?.day ?? 1,
      month: solarTime.month,
      year: solarTime.year,
    })
      .toLunarDate()
      .get();
    return { day: lunar.day, month: lunar.month, year: lunar.year };
  });

  const handleSolarChange = (newSolar: SelectedTime) => {
    setSolarTime(newSolar);

    const lunar = new SolarDate({
      day: newSolar?.day ?? 1,
      month: newSolar.month,
      year: newSolar.year,
    })
      .toLunarDate()
      .get();

    setLunarTime({ day: lunar.day, month: lunar.month, year: lunar.year });
  };

  const handleLunarChange = (newLunar: SelectedTime) => {
    setLunarTime(newLunar);

    const lunar = new LunarDate({
      day: newLunar?.day ?? 1,
      month: newLunar.month,
      year: newLunar.year,
    });
    lunar.init();
    const solar = lunar.toSolarDate().get();

    setSolarTime({ day: solar.day, month: solar.month, year: solar.year });
  };

  const onGoToDate = () => {
    // Ensure 'day' exists in solarTime, default to 1 if not
    const day = solarTime?.day ?? 1;
    const month = solarTime.month - 1;
    changeTime({ ...solarTime, day, month });
  };

  return {
    solarTime,
    lunarTime,
    handleSolarChange,
    handleLunarChange,
    onGoToDate,
  };
};

export default useTime;

import React, { createContext, useState, useEffect } from 'react';
import { DayStatus } from '../types';

type CalendarContextType = {
  days: DayStatus[];
  setDayStatus: (index: number, status: DayStatus) => void;
  currentMonth: number;
  setCurrentMonth: (value: number) => void;
};

export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  
  const initialMonthData = { monthNumber: 1, days: Array(31).fill('none') };

  const [monthsData, setMonthsData] = useState(() => {
    const savedData = localStorage.getItem('monthsData');
    return savedData ? JSON.parse(savedData) : [{ ...initialMonthData }];
  });

  useEffect(() => {
    localStorage.setItem('monthsData', JSON.stringify(monthsData));
  }, [monthsData]);
  
  const [currentMonth, setCurrentMonth] = useState(1);

  const setDayStatus = (index: number, status: DayStatus) => {
    const currentMonthData = monthsData[currentMonth - 1];
    const updatedDays = [...currentMonthData.days];
    updatedDays[index] = status;

    const updatedMonthsData = [...monthsData];
    updatedMonthsData[currentMonth - 1] = {
      ...currentMonthData,
      days: updatedDays,
    };

    setMonthsData(updatedMonthsData);
  };

  const handleSetCurrentMonth = (newMonth: number) => {
    if (!monthsData[newMonth - 1]) {
      const daysInMonth = getDaysInMonth(newMonth);
      setMonthsData((prev: { monthNumber: number; days: string[] }[]) => [
        ...prev,
        { monthNumber: newMonth, days: Array(daysInMonth).fill('none') },
      ]);
    }
    setCurrentMonth(newMonth);
  };

  const getDaysInMonth = (month: number) => {
    switch (month) {
      case 2: return 28;
      case 4: case 6: case 9: case 11: return 30;
      default: return 31;
    }
  };

  return (
    <CalendarContext.Provider value={{ days: monthsData[currentMonth - 1].days, setDayStatus, currentMonth, setCurrentMonth: handleSetCurrentMonth }}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
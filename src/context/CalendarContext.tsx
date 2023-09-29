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
  
  const initialMonthData = { monthNumber: 1, days: Array(30).fill('none') };
  
  // Initialize monthsData from localStorage or use default values
  const [monthsData, setMonthsData] = useState(() => {
    const savedData = localStorage.getItem('monthsData');
    return savedData ? JSON.parse(savedData) : [{ ...initialMonthData }];
  });
  
  // Save to localStorage whenever monthsData changes
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
      setMonthsData((prev: Array<{ monthNumber: number, days: DayStatus[] }>) => [...prev, { monthNumber: newMonth, days: Array(30).fill('none') }]);
    }
    setCurrentMonth(newMonth);
  };

  return (
    <CalendarContext.Provider value={{ days: monthsData[currentMonth - 1].days, setDayStatus, currentMonth, setCurrentMonth: handleSetCurrentMonth }}>
      {children}
    </CalendarContext.Provider>
  );
};

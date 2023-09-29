import React, { createContext, useState } from 'react';
import { DayStatus } from '../types';


type CalendarContextType = {
  days: DayStatus[];
  setDayStatus: (index: number, status: DayStatus) => void;
  currentMonth: number;
  setCurrentMonth: (value: number) => void;
};


export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);


export const CalendarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // eslint-disable-next-line no-empty-pattern
  const [] = useState<DayStatus[]>(Array(30).fill('none'));

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
      setMonthsData(prev => [...prev, { monthNumber: newMonth, days: Array(30).fill('none') }]);
    }
    setCurrentMonth(newMonth);
  };
  
  

  const [currentMonth, setCurrentMonth] = useState(1);
  const initialMonthData = { monthNumber: 1, days: Array(30).fill('none') };
  const [monthsData, setMonthsData] = useState([{ ...initialMonthData }]);


  return (
    <CalendarContext.Provider value={{ days: monthsData[currentMonth - 1].days, setDayStatus, currentMonth, setCurrentMonth: handleSetCurrentMonth }}>
      {children}
    </CalendarContext.Provider>
  );
  
  
};


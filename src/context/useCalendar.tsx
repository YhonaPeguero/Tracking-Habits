// src/context/useCalendar.tsx
import { useContext } from 'react';
import { CalendarContext } from './CalendarContext';

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};


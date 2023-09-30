import { useCalendar } from '../context/useCalendar';

function Calendar() {
  const { days, setDayStatus } = useCalendar();

  return (
    <div className="grid grid-cols-7 gap-4 mb-6">
      {days.map((status, index) => (
        <div
          key={index}
          className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
            status === 'success' ? 'bg-green-500 border-green-600' : 
            status === 'missed' ? 'bg-red-500 border-red-600' : 'bg-gray-700 border-gray-800'
          }`}
          onClick={() => {
            if(status === 'none') setDayStatus(index, 'success');
            else if(status === 'success') setDayStatus(index, 'missed');
            else setDayStatus(index, 'none');
          }}
        ></div>
      ))}
    </div>
  );
}

export default Calendar;

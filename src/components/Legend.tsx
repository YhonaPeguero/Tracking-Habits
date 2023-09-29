import { useCalendar } from '../context/useCalendar';


const Legend = () => {
  const { days } = useCalendar();
  const completed = days.filter(day => day !== 'none').length;

  return (
    <div className="flex justify-between items-center mb-6 w-full">
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          <span className="text-white">Success</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <span className="text-white">Failure</span>
        </div>
      </div>
      <span className="text-gray-400">Completed: {completed}/30</span>
    </div>
  );
};

export default Legend;

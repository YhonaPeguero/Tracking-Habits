import { useCalendar } from "../context/useCalendar";

const Footer = () => {
    const { currentMonth, setCurrentMonth } = useCalendar();
  
    const canGoPrev = currentMonth > 1;
    
    return (
      <div className="flex justify-between items-center mt-8">
        <button 
          className={`text-white text-3xl ${!canGoPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!canGoPrev}
          onClick={() => setCurrentMonth(currentMonth - 1)}
        >←</button>
        
        <span className="text-gray-400 text-xl mx-6">{currentMonth}</span>
  
        <button 
          className={`text-white text-3xl`}
          onClick={() => setCurrentMonth(currentMonth + 1)}
        >→</button>
      </div>
    );
  };
  
  export default Footer;
  
import Calendar from './components/Calendar';
import Header from './components/Header';
import Legend from './components/Legend';
import Footer from './components/Footer';
import { CalendarProvider } from './context/CalendarContext';

function App() {
  return (
    <CalendarProvider>
      <div className="flex flex-col justify-center items-center h-screen bg-black p-8">
        <Header />
        <Legend />
        <Calendar />
        <Footer />
      </div>
    </CalendarProvider>
  );
}

export default App;

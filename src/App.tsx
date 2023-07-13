import { useEffect, useState } from "react";
import Calendar from "./components/Calendar/Calendar"
import { CalendarModel } from "./models/CalendarModel";

function App() {
  const [currentMonth, setCurrentMonth] = useState( new Date().getMonth())
  const [calendar, setCalendar] = useState(new CalendarModel(currentMonth));

  useEffect(() => { 
    const calendar = new CalendarModel(currentMonth);
    calendar.initialize();
    setCalendar(calendar);
  }, []);

  return <Calendar calendar={calendar} />;
}

export default App
import { useEffect, useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import Header from "./components/Header/Header";
import { CalendarModel } from "./models/CalendarModel";
import { useMonthStore } from "./store/useMonthStore";

function App() {
  const currentMonth = useMonthStore(state => state.month);
  const [calendar, setCalendar] = useState(new CalendarModel(currentMonth));

  useEffect(() => {
    const calendar = new CalendarModel(currentMonth);
    calendar.initialize();
    setCalendar(calendar);
  }, [currentMonth]);

  return (
    <>
      <Header />
      <Calendar calendar={calendar} />
    </>
  );
}

export default App
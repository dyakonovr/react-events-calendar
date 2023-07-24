import { useEffect, useReducer } from 'react';
import Cell from "../Cell/Cell";
import { CalendarModel } from "../../models/CalendarModel";
import { useCalendarStore } from "../../store/useCalendarStore";
import { useMonthStore } from "../../store/useDateStore";
import { useEventsStore } from "../../store/useEventsStore";
import classes from './Calendar.module.scss';
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase";
import { IEvent } from "../../interfaces/IEvent";
import { useUserStore } from "../../store/useUserStore";

function Calendar() {
  const calendar = useCalendarStore(state => state.calendar);
  const updateCalendar = useCalendarStore(state => state.updateCalendar);

  const currentMonth = useMonthStore(state => state.month);
  const currentYear = useMonthStore(state => state.year);

  useEffect(() => {
    const calendar = new CalendarModel(currentMonth, currentYear);
    calendar.initialize();
    updateCalendar(calendar);
  }, [currentMonth, new Date().getDate()]);

  //////////////////////////////////////////////////////////////
  
  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  const events = useEventsStore(state => state.events);

  console.log('events: ', events);

  useEffect(() => {
    forceUpdate();
  }, [events]);

  //////////////////////////////////////////////////////////////

  const eventsOfUserCollectionRef = collection(database, "events");
  const addEventFromDatabase = useEventsStore(state => state.addEventsFromDatabase);
  const userId = useUserStore(state => state.id);

  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(eventsOfUserCollectionRef);
      const eventsArray: IEvent[] = [];
      data.docs.map((doc) => {
        if (doc.data().userId !== userId) return;
        console.log(doc.id);
        const { day, month, year, time, message } = doc.data();
        const eventId: string = doc.id;
        eventsArray.push({day, month, year, time, message, id: doc.id});
      });

      addEventFromDatabase(eventsArray);
    }

    getEvents();
  }, [userId]);

  // Функции
  function createHeaders() {
    return calendar?.headers.map((header) => {
      return <div className={classes.header_item} key={Math.random()}>{header}</div>
    });
  }
  
  function createCells() {
    return calendar?.cells.map((cell) => {
      return <Cell object={cell} key={Math.random()} />
    });
  }
  // Функции END
  
  const gridTemplateRowsStyle = { gridTemplateRows: `20px repeat(${((calendar?.cells && calendar.cells.length / 7) || 5)}, 1fr` };

  return (
    <div className={classes.calendar} style={gridTemplateRowsStyle}>
      {createHeaders()}
      {createCells()}
    </div>
  );
};

export default Calendar;
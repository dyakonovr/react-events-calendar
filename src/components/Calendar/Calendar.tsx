import { collection, getDocs, query, where } from "firebase/firestore";
import { memo, useEffect, useState } from 'react';
import { database } from "../../firebase";
import { IEvent } from "../../interfaces/IEvent";
import { CalendarModel } from "../../models/CalendarModel";
import { useCalendarStore } from "../../store/useCalendarStore";
import { useEventsStore } from "../../store/useEventsStore";
import { useMonthStore } from "../../store/useMonthStore";
import { useUserStore } from "../../store/useUserStore";
import { createEventNotification } from "../../utils/createEventNotification";
import Cell from "../UI/Cell/Cell";
import classes from './Calendar.module.scss';

function Calendar() {
  const calendar = useCalendarStore(state => state.calendar);
  const updateCalendar = useCalendarStore(state => state.updateCalendar);

  const currentMonth = useMonthStore(state => state.month);
  const currentYear = useMonthStore(state => state.year);

  const [currentDate, setCurrentDate] = useState(new Date().getDate());

  useEffect(() => {
    createNewCalendar();
  }, [currentDate, currentMonth]); // currentDate для смены отметки сегодняшней клетки 

  //////////////////////////////////////////////////////////////

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date().getDate());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //////////////////////////////////////////////////////////////
  
  const setCurrentMonth = useMonthStore(state => state.setCurrentMonth);
  const userId = useUserStore(state => state.id);

  useEffect(() => { 
    setCurrentMonth();
  }, [userId]);

  //////////////////////////////////////////////////////////////


  const addEventFromDatabase = useEventsStore(state => state.addEventsFromDatabase);

  useEffect(() => {
    const eventsOfUserCollectionRef = collection(database, "events");

    const getEvents = async () => {
      const customQuery = query(eventsOfUserCollectionRef, where("userId", "==", userId));
      const data = await getDocs(customQuery);
      const eventsArray: IEvent[] = [];

      data.docs.map((doc) => {
        const { day, month, year, hours, minutes, message } = doc.data();
        const eventObject = { day, month, year, hours, minutes, message, id: doc.id };

        const timeoutId = createEventNotification(eventObject);
        eventsArray.push({ ...eventObject, timeoutId });
      });

      addEventFromDatabase(eventsArray);
    }

    getEvents();
  }, [userId]);

  // Функции
  function createNewCalendar() {
    const calendar = new CalendarModel(currentMonth, currentYear);
    calendar.initialize();
    updateCalendar(calendar);
  }
  
  function createHeaders() {
    return calendar?.headers.map((header) => {
      return <div className={classes.header_item} key={Math.random()}>{header}</div>
    });
  }
  
  function createCells() {
    const date = new Date();
    const [currentDate, currentMonth, currentYear] = [date.getDate(), date.getMonth(), date.getFullYear()];

    return calendar?.cells.map((cell) => {
      return <Cell object={cell} isCurrentDate={currentDate === cell.day && currentMonth === cell.month && currentYear === cell.year} key={Math.random()} />
    });
  }
  // Функции END
  
  const gridTemplateRowsClass = calendar?.cells.length ? classes[`rows_${calendar.cells.length / 7}`] : classes["rows_5"];

  return (
    <div className={[classes.calendar, gridTemplateRowsClass].join(' ')}>
      {createHeaders()}
      {createCells()}
    </div>
  );
};

export default memo(Calendar);
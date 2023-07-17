import { useEffect, useReducer } from 'react';
import { CalendarModel } from "../../models/CalendarModel";
import { useCalendarStore } from "../../store/useCalendarStore";
import { useMonthStore } from "../../store/useDateStore";
import Cell from "../Cell/Cell";
import classes from './Calendar.module.scss';

function Calendar() {
  const currentMonth = useMonthStore(state => state.month);
  const currentYear = useMonthStore(state => state.year);

  const calendar = useCalendarStore(state => state.calendar);
  const updateCalendar = useCalendarStore(state => state.updateCalendar);

  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  const events = useCalendarStore(state => state.events);

  useEffect(() => {
    const calendar = new CalendarModel(currentMonth, currentYear);
    calendar.initialize();
    updateCalendar(calendar);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    forceUpdate()
  }, [events]);

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
  
  return (
    <div className={classes.calendar}>
      {createHeaders()}
      {createCells()}
    </div>
  );
};

export default Calendar;
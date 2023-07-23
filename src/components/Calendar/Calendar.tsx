import { useEffect, useReducer } from 'react';
import { CalendarModel } from "../../models/CalendarModel";
import { useCalendarStore } from "../../store/useCalendarStore";
import { useMonthStore } from "../../store/useDateStore";
import { useEventsStore } from "../../store/useEventsStore";
import Cell from "../Cell/Cell";
import classes from './Calendar.module.scss';

function Calendar() {
  const calendar = useCalendarStore(state => state.calendar);
  const updateCalendar = useCalendarStore(state => state.updateCalendar);

  const currentMonth = useMonthStore(state => state.month);
  const currentYear = useMonthStore(state => state.year);

  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  const events = useEventsStore(state => state.events);

  useEffect(() => {
    const calendar = new CalendarModel(currentMonth, currentYear);
    calendar.initialize();
    updateCalendar(calendar);
  }, [currentMonth, new Date().getDate()]);

  useEffect(() => {
    forceUpdate();
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
  
  const gridTemplateRowsStyle = { gridTemplateRows: `20px repeat(${((calendar?.cells && calendar.cells.length / 7) || 5)}, 1fr` };

  return (
    <div className={classes.calendar} style={gridTemplateRowsStyle}>
      {createHeaders()}
      {createCells()}
    </div>
  );
};

export default Calendar;
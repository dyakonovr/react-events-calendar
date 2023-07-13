import { CalendarModel } from "../../models/CalendarModel";
import Cell from "../Cell/Cell";
import classes from './Calendar.module.scss';

function Calendar({ calendar }: { calendar: CalendarModel}) {
  // Функции
  function createHeaders() {
    return calendar.headers.map((header) => {
      return <div className={classes.header_item} key={Math.random()}>{header}</div>
    });
  }
  
  function createCells() {
    return calendar.cells.map((cell) => {
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
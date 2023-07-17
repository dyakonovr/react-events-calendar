import { IDateEvent } from "../../models/CalendarModel";
import { CellModel } from "../../models/CellModel";
import { useCalendarStore } from "../../store/useCalendarStore";
import { useModalStore } from "../../store/useModalStore";
import classes from './Cell.module.scss';

function Cell({ object }: { object: CellModel }) {
  const addEvent = useCalendarStore(state => state.addEvent);
  const toggleModalVisibility = useModalStore(state => state.toggleVisibility);

  const isInactiveCellClass = object.isInactiveDate ? classes.date_inactive : "";
  const isCurrentDateClass = object.isCurrentDate ? classes.date_current : "";

  // Функции
  function handleClick(cell: CellModel) {
    toggleModalVisibility();
    
    // const { day, month, year } = cell;
    // const eventObject: IDateEvent = {
    //   date: `${day}.${month}.${year}`,
    //   message: "Message",
    //   time: "12:00",
    // };
    
    // addEvent(eventObject);
  }
  // Функции END

  return (
    <div
      className={classes.cell}
      onClick={() => {handleClick(object)}}
    >
      <span className={`${classes.date} ${isInactiveCellClass} ${isCurrentDateClass}`}>
        {object.day}
      </span>
       <div className={classes.event}>Event!</div>
      <div className={classes.event}>Event!</div>
      {/*<div className={classes.event}>Event!</div> */}
    </div>
  );
};

export default Cell;
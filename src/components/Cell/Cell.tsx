import { CellModel } from "../../models/CellModel";
import { useCalendarStore } from "../../store/useCalendarStore";
import { useModalStore } from "../../store/useModalStore";
import classes from './Cell.module.scss';

function Cell({ object }: { object: CellModel }) {
  const { day, month, year } = object;

  const openModal = useModalStore(state => state.openModal);
  const events = useCalendarStore(state => state.events);
  
  const isInactiveCellClass = object.isInactiveDate ? classes.date_inactive : "";
  const isCurrentDateClass = object.isCurrentDate ? classes.date_current : "";

  // Функции
  function handleClick() {
    const date = {day, month, year};
    openModal(date);
  }

  function getEvents() {
    const result = events.filter((event) => event.day === day && event.month === month && event.year === year);
    return result?.map((event) => <div className={classes.event}>{event.time} {event.message}</div>)
  }
  // Функции END

  return (
    <div className={classes.cell}>
      <span
        className={`${classes.date} ${isInactiveCellClass} ${isCurrentDateClass}`}
        onClick={() => {handleClick()}}
      >
        {object.day}
      </span>
      {getEvents()}
    </div>
  );
};

export default Cell;
import { IDateObject } from "../../interfaces/IDateObject";
import { CellModel } from "../../models/CellModel";
import { useEventsStore } from "../../store/useEventsStore";
import { useModalStore } from "../../store/useModalStore";
import Event from "../Event/Event";
import classes from './Cell.module.scss';

interface ICellProps {
  object: CellModel
}

function Cell({ object }: ICellProps) {
  const { day, month, year } = object;
  const dateObject: IDateObject = { day, month, year };

  const openModal = useModalStore(state => state.openModal);
  const events = useEventsStore(state => state.events);
  
  const isInactiveCellClass = object.isInactiveDate ? classes.date_inactive : "";
  const isCurrentDateClass = object.isCurrentDate ? classes.date_current : "";

  // Функции
  function getEvents() {
    const result = events.filter((event) => event.day === day && event.month === month && event.year === year);
    
    result.sort((objectA, objectB) => {
      if (objectA.time > objectB.time) return 1;
      if (objectA.time < objectB.time) return -1;
      return 0;
    });

    return result?.map((event) => <Event object={event} dateObject={dateObject} key={Math.random()} />);
  }
  // Функции END

  return (
    <div className={classes.cell}>
      <span
        className={`${classes.date} ${isInactiveCellClass} ${isCurrentDateClass}`}
        onClick={() => openModal(dateObject)}
      >
        {object.day}
      </span>
      {getEvents()}
    </div>
  );
};

export default Cell;
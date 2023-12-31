import { IDateObject } from "../../../interfaces/IDateObject";
import { IEvent } from "../../../interfaces/IEvent";
import { useEventsStore } from "../../../store/useEventsStore";
import { useModalStore } from "../../../store/useModalStore";
import { getNormalTime } from "../../../utils/getNormalTime";
import classes from './Event.module.scss';

interface IEventProps {
  object: IEvent,
  dateObject: IDateObject
}

function Event({ object, dateObject }: IEventProps) {
  const openModal = useModalStore(state => state.openModal);
  const setIsModalForEdit = useEventsStore(state => state.setIsModalForEdit);

  const time = getNormalTime(object.hours, object.minutes);

  // Функции
  function handleClick() {
    setIsModalForEdit(object.id);
    openModal(dateObject);
  }
  // Функции END

  return (
    <div
      className={classes.event}
      title={`${time} ${object.message}`}
      onClick={handleClick}
    >
      {time} {object.message}
    </div>
  );
};

export default Event;
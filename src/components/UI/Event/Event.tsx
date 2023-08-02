import { IDateObject } from "../../../interfaces/IDateObject";
import { IEvent } from "../../../interfaces/IEvent";
import { useEventsStore } from "../../../store/useEventsStore";
import { useModalStore } from "../../../store/useModalStore";
import classes from './Event.module.scss';

interface IEventProps {
  object: IEvent,
  dateObject: IDateObject
}

function Event({ object, dateObject }: IEventProps) {
  const openModal = useModalStore(state => state.openModal);
  const setIsModalForEdit = useEventsStore(state => state.setIsModalForEdit);

  const hours = object.hours >= 10 ? object.hours : `0${object.hours}`;
  const minutes = object.minutes >= 10 ? object.minutes : `0${object.minutes}`;

  // Функции
  function handleClick() {
    setIsModalForEdit(object.id);
    openModal(dateObject);
  }
  // Функции END

  return (
    <div
      className={classes.event}
      title={`${hours}:${minutes} ${object.message}`}
      onClick={handleClick}
    >
      {hours}:{minutes} {object.message}
    </div>
  );
};

export default Event;
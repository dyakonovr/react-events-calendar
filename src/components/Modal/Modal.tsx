import { useRef } from "react";
import TimeField from 'react-simple-timefield';
import { IDateEvent } from "../../models/CalendarModel";
import { useCalendarStore } from "../../store/useCalendarStore";
import { useModalStore } from "../../store/useModalStore";
import { getDayName } from "../../utils/getDayName";
import { getDeclensionedMonth } from "../../utils/getDeclensionedMonth";
import CustomInput from "../UI/CustomInput/CustomInput";
import TimePickerInput from "../UI/TimePickerInput/TimePickerInput";
import classes from './Modal.module.scss';

function Modal() {
  const addEvent = useCalendarStore(state => state.addEvent);
  const closeModal = useModalStore(state => state.closeModal);
  const currentDate = useModalStore(state => state.currentDate);
  const { day, month, year } = currentDate;

  const eventInputRef = useRef<HTMLInputElement>(null);
  const timePickerInputRef = useRef<TimeField>(null);

  // Функции
  function getFullDate() {
    const dayName = getDayName(day, month, year);
    const monthName = getDeclensionedMonth(month);
    return `${dayName}, ${day} ${monthName}`;
  }

  function handleClick() {
    const eventInput = eventInputRef.current as HTMLInputElement;
    const timePickerInput = timePickerInputRef.current;

    const eventInputValue = eventInput.value;
    const timePickerInputValue = timePickerInput?.state.value;

    if (!eventInputValue || !timePickerInputValue) return;

    const eventObject: IDateEvent = {
      day, month, year,
      message: eventInputValue,
      time: timePickerInputValue
    };

    addEvent(eventObject);
    closeModal();
  }
  // Функции END

  return (
    <div className={classes.modal} onClick={closeModal}>
      <div className={classes.modal_wrapper} onClick={(e) => e.stopPropagation()}>
        <button
          className={classes.delete_button}
          onClick={closeModal}
          type="button"
        >
        </button>

        <CustomInput placeholder="Введите событие" myRef={eventInputRef} />
        <p className={classes.text}>{getFullDate()}</p>
        <p className={classes.text}>Время - <TimePickerInput myRef={timePickerInputRef} /></p>
        
        <button
          className={classes.button}
          type="button"
          onClick={handleClick}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Modal;
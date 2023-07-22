import { useRef } from "react";
import TimeField from 'react-simple-timefield';
import { IEvent } from "../../interfaces/IEvent";
import { useEventsStore } from "../../store/useEventsStore";
import { useModalStore } from "../../store/useModalStore";
import { getEventFromStoreById } from "../../utils/getEventFromStoreById";
import { getFullDate } from "../../utils/getFullDate";
import CustomInput from "../UI/CustomInput/CustomInput";
import TimePickerInput from "../UI/TimePickerInput/TimePickerInput";
import classes from './Modal.module.scss';

function Modal() {
  const { currentDate, closeModal } = useModalStore();
  const { currentEventId, eventForEditId, isModalForEdit, addEvent, deleteEvent } = useEventsStore();

  const eventInputRef = useRef<HTMLInputElement>(null);
  const timePickerInputRef = useRef<TimeField>(null);

  const isDeleteButtonIsShowed = isModalForEdit && eventForEditId !== null;
  const eventForEditObject = eventForEditId === null ? null : getEventFromStoreById(eventForEditId);

  // Функции
  function handleSaveButtonClick() {
    const eventInputValue = (eventInputRef.current as HTMLInputElement).value;
    const timePickerInputValue = (timePickerInputRef.current)?.state.value;

    if (!eventInputValue || !timePickerInputValue) return;

    const eventObject: IEvent = {
      ...currentDate,
      message: eventInputValue,
      time: timePickerInputValue,
      id: currentEventId
    };

    addEvent(eventObject);
    closeModal();
  }

  function handleDeleteButtonClick(eventForEditId: number) {
    deleteEvent(eventForEditId);
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

        <CustomInput placeholder="Введите событие" myRef={eventInputRef} initialValue={eventForEditObject?.message || ""} />
        <p className={classes.text}>{getFullDate(currentDate)}</p>
        <p className={classes.text}>Время - <TimePickerInput myRef={timePickerInputRef} initialTime={eventForEditObject?.time || ""} /></p>
        
        <div className={classes.buttons_wrapper}>
            <button
            className={classes.button}
            type="button"
            onClick={handleSaveButtonClick}
          >
            Сохранить
          </button>

          {isDeleteButtonIsShowed && <button
              className={classes.button}
              type="button"
              onClick={() => handleDeleteButtonClick(eventForEditId)}
            >
            Удалить
          </button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
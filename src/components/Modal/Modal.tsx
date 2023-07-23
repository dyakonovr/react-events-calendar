import { useEffect, useRef } from "react";
import TimeField from 'react-simple-timefield';
import { IEvent } from "../../interfaces/IEvent";
import { useEventsStore } from "../../store/useEventsStore";
import { useModalStore } from "../../store/useModalStore";
import { useThemeStore } from "../../store/useThemeStore";
import { createToast } from "../../utils/createToast";
import { getEventFromStoreById } from "../../utils/getEventFromStoreById";
import { getFullDate } from "../../utils/getFullDate";
import CustomInput from "../UI/CustomInput/CustomInput";
import TimePickerInput from "../UI/TimePickerInput/TimePickerInput";
import classes from './Modal.module.scss';

function Modal() {
  const { currentDate, closeModal } = useModalStore();
  const { currentEventId, eventForEditId, isModalForEdit,
    addEvent, deleteEvent, resetIsModalForEdit } = useEventsStore();

  const eventInputRef = useRef<HTMLInputElement>(null);
  const timePickerInputRef = useRef<TimeField>(null);

  const isDeleteButtonIsShowed = isModalForEdit && eventForEditId !== null;
  const eventForEditObject = eventForEditId === null
    ? null : getEventFromStoreById(eventForEditId);
  
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    function handleKeyboardClick({key}: {key: string}) {
      if (key === "Escape") closeModalFunc();
      if (key === 'Enter') handleSaveButtonClick();
      return;
    };

    document.addEventListener('keydown', handleKeyboardClick);
    return () => {
      document.removeEventListener('keydown', handleKeyboardClick);
    };
  }, []);

  // Функции
  function closeModalFunc() {
    closeModal();
    resetIsModalForEdit();
  }

  function handleSaveButtonClick() {
    const eventInputValue = (eventInputRef.current as HTMLInputElement).value;
    const timePickerInputValue = (timePickerInputRef.current)?.state.value;

    if (!eventInputValue || !timePickerInputValue) {
      createToast("Введите название события", theme);
      return;
    }

    const eventObject: IEvent = {
      ...currentDate,
      message: eventInputValue,
      time: timePickerInputValue,
      id: currentEventId
    };
     
    createToast(isModalForEdit ? "Событие изменено" : "Событие создано", theme);
    addEvent(eventObject);
    closeModalFunc();
  }

  function handleDeleteButtonClick(eventForEditId: number) {
    createToast("Событие удалено", theme);
    deleteEvent(eventForEditId);
    closeModalFunc();
  }
  // Функции END

  return (
    <div className={classes.modal} onClick={closeModalFunc}> {/* closeModalFunc для outside-клика */}
      <div className={classes.modal_wrapper} onClick={(e) => e.stopPropagation()}>
        <button
          className={classes.delete_button}
          onClick={closeModal}
          type='button'
        >
        </button>

        <CustomInput placeholder="Введите событие" myRef={eventInputRef} initialValue={eventForEditObject?.message || ""} />
        <p className={classes.text}>{getFullDate(currentDate)}</p>
        <p className={classes.text}>Время -
          <TimePickerInput myRef={timePickerInputRef} initialTime={eventForEditObject?.time || ""} /></p>
        
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
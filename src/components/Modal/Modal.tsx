import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef } from "react";
import TimeField from 'react-simple-timefield';
import { database } from "../../firebase";
import { IEvent } from "../../interfaces/IEvent";
import { useEventsStore } from "../../store/useEventsStore";
import { useModalStore } from "../../store/useModalStore";
import { useUserStore } from "../../store/useUserStore";
import { createToast } from "../../utils/createToast";
import { getEventFromStoreById } from "../../utils/getEventFromStoreById";
import { getFullDate } from "../../utils/getFullDate";
import TimePickerInput from "../UI/TimePickerInput/TimePickerInput";
import classes from './Modal.module.scss';

function Modal() {
  const { currentDate, closeModal } = useModalStore();
  const { eventForEditId, isModalForEdit,
    addEvent, deleteEvent, resetIsModalForEdit } = useEventsStore();

  const eventInputRef = useRef<HTMLInputElement>(null);
  const timePickerInputRef = useRef<TimeField>(null);

  const isDeleteButtonIsShowed = isModalForEdit && eventForEditId !== null;
  const eventForEditObject = eventForEditId === null
    ? null : getEventFromStoreById(eventForEditId);
  
  const eventsOfUserCollectionRef = collection(database, "events");
  const userId = useUserStore(state => state.id);

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

  async function handleSaveButtonClick() {
    const eventInputValue = (eventInputRef.current as HTMLInputElement).value;
    const timePickerInputValue = (timePickerInputRef.current)?.state.value;

    if (!eventInputValue || !timePickerInputValue) {
      createToast("Введите название события");
      return;
    }

    const eventObjectWithoutId = {
      ...currentDate,
      message: eventInputValue,
      time: timePickerInputValue,
      userId
    };

    if (isModalForEdit && eventForEditId) {
      const eventDoc = doc(database, "events", eventForEditId);
      await updateDoc(eventDoc, eventObjectWithoutId)
        .then(() => {
          const eventObject: IEvent = {
            ...currentDate,
            message: eventInputValue,
            time: timePickerInputValue,
            id: eventForEditId
          };

          createToast("Событие изменено");
          addEvent(eventObject);
          closeModalFunc();
        })
        .catch((error) => { createToast(`Произошла ошибка: ${error}`); })
    } else {
      await addDoc(eventsOfUserCollectionRef, eventObjectWithoutId).then(data => {
        const eventObject: IEvent = {
          ...currentDate,
          message: eventInputValue,
          time: timePickerInputValue,
          id: data.id
        };
        
        createToast("Событие создано");
        addEvent(eventObject);
        closeModalFunc();
      })
      .catch((error) => { createToast(`Произошла ошибка: ${error}`); });
    }
  }

  function handleDeleteButtonClick(eventForEditId: string) {
    const eventDoc = doc(database, "events", eventForEditId);
    
    deleteDoc(eventDoc).then(() => {
      createToast("Событие удалено");
      deleteEvent(eventForEditId);
      closeModalFunc();
    })
    .catch(error => { createToast(`Произошла ошибка: ${error}`); });
  }
  // Функции END

  return (
    <div className={classes.modal} onClick={closeModalFunc}> {/* closeModalFunc для outside-клика */}
      <div className={classes.modal_wrapper} onClick={(e) => e.stopPropagation()}>
        <button className={classes.delete_button} onClick={closeModal} type='button'></button>
        <input className="input" placeholder="Введите событие" ref={eventInputRef} defaultValue={eventForEditObject?.message || ""} />
        <p className={classes.text}>{getFullDate(currentDate)}</p>
        <p className={classes.text}>Время -
          <TimePickerInput myRef={timePickerInputRef} initialTime={eventForEditObject?.time || ""} /></p>
        
        <div className={classes.buttons_wrapper}>
          <button
            className={[classes.button, "button"].join(' ')}
            type="button"
            onClick={handleSaveButtonClick}
          >
            Сохранить
          </button>
          {isDeleteButtonIsShowed && <button
              className={[classes.button, "button"].join(' ')}
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
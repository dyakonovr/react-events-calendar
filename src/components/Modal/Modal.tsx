import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef } from "react";
import TimeField from 'react-simple-timefield';
import { ToastMessages } from "../../enums/ToastMessages";
import { database } from "../../firebase";
import { IEvent } from "../../interfaces/IEvent";
import { useEventsStore } from "../../store/useEventsStore";
import { useModalStore } from "../../store/useModalStore";
import { useUserStore } from "../../store/useUserStore";
import { createEventNotification } from "../../utils/createEventNotification";
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
  const eventForEditObject = eventForEditId === null ? null : getEventFromStoreById(eventForEditId);
  const initialTime = eventForEditObject ? `${eventForEditObject.hours}:${eventForEditObject.minutes}` : "";
  
  const eventsOfUserCollectionRef = collection(database, "events");
  const userId = useUserStore(state => state.id);

  useEffect(() => {
    function handleKeyboardClick({key}: {key: string}) {
      if (key === "Escape") closeModalFunc();
      if (key === 'Enter') handleSaveButtonClick();
      else return;
    };

    document.addEventListener('keydown', handleKeyboardClick);
    return () => { document.removeEventListener('keydown', handleKeyboardClick); };
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

    const [hours, minutes] = timePickerInputValue.split(":");
    const eventObjectWithoutId = { ...currentDate, message: eventInputValue, hours: +hours, minutes: +minutes };

    if (isModalForEdit && eventForEditId) {
      const eventDoc = doc(database, "events", eventForEditId);
      await updateDoc(eventDoc, {...eventObjectWithoutId, userId})
        .then(() => {
          const eventObject: IEvent = {...eventObjectWithoutId, id: eventForEditId};
          createNewEvent(ToastMessages.EVENT_UPDATES, eventObject);
        })
        .catch((error) => { createToast(`${ToastMessages.ERROR}: ${error}`); })
    } else {
      await addDoc(eventsOfUserCollectionRef, {...eventObjectWithoutId, userId}).then(data => {
        const eventObject: IEvent = {...eventObjectWithoutId, id: data.id};
        createNewEvent(ToastMessages.EVENT_CREATED, eventObject);
      })
      .catch((error) => { createToast(`${ToastMessages.ERROR}: ${error}`); });
    }
  }

  function createNewEvent(toastMessage: string, eventObject: IEvent) {
    const timeoutId = createEventNotification(eventObject);

    createToast(toastMessage);
    addEvent({...eventObject, timeoutId});
    closeModalFunc();
  }

  function handleDeleteButtonClick(eventForEditId: string) {
    const eventDoc = doc(database, "events", eventForEditId);
    
    deleteDoc(eventDoc).then(() => {
      clearTimeout(eventForEditObject?.timeoutId);

      createToast(ToastMessages.EVENT_DELETED);
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
        <p className={classes.text}>Время - <TimePickerInput myRef={timePickerInputRef} initialTime={initialTime} /></p>
        
        <div className={classes.buttons_wrapper}>
          <button className={[classes.button, "button"].join(' ')} type="button" onClick={handleSaveButtonClick}>Сохранить</button>
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
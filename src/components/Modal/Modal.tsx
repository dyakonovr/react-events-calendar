import { useModalStore } from "../../store/useModalStore";
import CustomInput from "../UI/CustomInput/CustomInput";
import classes from './Modal.module.scss';

function Modal() {
  const toggleVisibility = useModalStore(state => state.toggleVisibility);

  return (
    <div className={classes.modal} onClick={toggleVisibility}>
      <div className={classes.modal_wrapper} onClick={(e) => e.stopPropagation()}>
        <button
          className={classes.delete_button}
          onClick={toggleVisibility}
          type="button"
        >
        </button>

        <CustomInput placeholder="Введите событие" />
        <p className={classes.text}>Среда, 5 сентября</p>
        <p className={classes.text}>Время - 12:00</p>
        
        <button type="button" className={classes.button}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Modal;
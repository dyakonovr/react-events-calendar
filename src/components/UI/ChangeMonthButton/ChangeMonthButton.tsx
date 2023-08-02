import ChangeMonthButtonIcon from "../../../assets/sprites/ChangeMonthButtonIcon";
import classes from './ChangeMonthButton.module.scss';

interface IChangeMonthButtonProps {
  isLeftButton: boolean,
  handleFunc: () => void
}

function ChangeMonthButton({isLeftButton, handleFunc}: IChangeMonthButtonProps) {
  const extraClass = isLeftButton ? classes.left_button : classes.right_button;

  return (
    <button
      className={[classes.change_month_button, extraClass].join(' ')}
      onClick={handleFunc}
      type="button"
    >
      <ChangeMonthButtonIcon size="20px" />
    </button>
  );
};

export default ChangeMonthButton;
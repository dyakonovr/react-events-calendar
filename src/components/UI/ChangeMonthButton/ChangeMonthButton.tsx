import classes from './ChangeMonthButton.module.scss';

interface IChangeMonthButtonProps {
  isLeftButton: boolean,
  handleFunc: () => void
}

function ChangeMonthButton({isLeftButton, handleFunc}: IChangeMonthButtonProps) {
  return (
    <>
      {isLeftButton && <button className={classes.change_month_button} onClick={handleFunc} type="button">&lt;</button>}
      {!isLeftButton && <button className={classes.change_month_button} onClick={handleFunc} type="button">&gt;</button>}
    </>
  );
};

export default ChangeMonthButton;
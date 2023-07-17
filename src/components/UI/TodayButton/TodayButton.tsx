import { useMonthStore } from "../../../store/useDateStore";
import classes from './TodayButton.module.scss';

function TodayButton() {
  const setCurrentMonth = useMonthStore(state => state.setCurrentMonth);

  return (
    <button
      className={classes.today_button}
      onClick={setCurrentMonth}
      type="button"
    >
      Сегодня      
    </button>
  );
};

export default TodayButton;
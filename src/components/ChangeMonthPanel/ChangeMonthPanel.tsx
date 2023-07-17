import { MonthsArray } from "../../enums/Months";
import { useMonthStore } from "../../store/useDateStore";
import ChangeMonthButton from "../UI/ChangeMonthButton/ChangeMonthButton";
import classes from './ChangeMonthPanel.module.scss';

function ChangeMonthPanel() {
  const month = useMonthStore(state => state.month);
  const year = useMonthStore(state => state.year);

  const setNextMonth = useMonthStore(state => state.setNextMonth);
  const setPrevMonth = useMonthStore(state => state.setPrevMonth);

  return (
    <div className={classes.change_month_panel}>
      <ChangeMonthButton isLeftButton={true} handleFunc={setPrevMonth} />
      <div className={classes.date}>{MonthsArray[month]} {year}</div>
      <ChangeMonthButton isLeftButton={false} handleFunc={setNextMonth} />
    </div>
  );
};

export default ChangeMonthPanel;
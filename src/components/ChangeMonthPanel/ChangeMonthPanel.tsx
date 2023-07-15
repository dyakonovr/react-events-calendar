import { MonthsArray } from "../../enums/Months";
import { useMonthStore } from "../../store/useMonthStore";
import ChangeMonthButton from "../UI/ChangeMonthButton/ChangeMonthButton";
import classes from './ChangeMonthPanel.module.scss';

function ChangeMonthPanel() {
  const month = useMonthStore(state => state.month);
  const setNextMonth = useMonthStore(state => state.setNextMonth);
  const setPrevMonth = useMonthStore(state => state.setPrevMonth);

  return (
    <div className={classes.change_month_panel}>
      <ChangeMonthButton isLeftButton={true} handleFunc={setPrevMonth} />
      <div>{MonthsArray[month]}</div>
      <ChangeMonthButton isLeftButton={false} handleFunc={setNextMonth} />
    </div>
  );
};

export default ChangeMonthPanel;
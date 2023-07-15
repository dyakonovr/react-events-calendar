import classes from './Header.module.scss';
import ChangeMonthPanel from "../ChangeMonthPanel/ChangeMonthPanel";
import TodayButton from "../UI/TodayButton/TodayButton";

function Header() {
  return (
    <div className={classes.header}>
      <TodayButton />
      <ChangeMonthPanel />
    </div>
  );
};

export default Header;
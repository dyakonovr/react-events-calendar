import ChangeMonthPanel from "../ChangeMonthPanel/ChangeMonthPanel";
import ChangeThemeButton from "../UI/ChangeThemeButton/ChangeThemeButton";
import TodayButton from "../UI/TodayButton/TodayButton";
import classes from './Header.module.scss';

function Header() {
  return (
    <div className={classes.header}>
      <TodayButton />
      <ChangeMonthPanel />
      <ChangeThemeButton />
    </div>
  );
};

export default Header;
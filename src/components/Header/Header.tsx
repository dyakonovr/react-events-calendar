import ChangeMonthPanel from "../UI/ChangeMonthPanel/ChangeMonthPanel";
import ChangeThemeButton from "../UI/ChangeThemeButton/ChangeThemeButton";
import LogoutButton from "../UI/LogoutButton/LogoutButton";
import TodayButton from "../UI/TodayButton/TodayButton";
import classes from './Header.module.scss';

function Header() {
  return (
    <div className={classes.header}>
      <TodayButton />
      <ChangeMonthPanel />
      <LogoutButton />
      <ChangeThemeButton />
    </div>
  );
};

export default Header;
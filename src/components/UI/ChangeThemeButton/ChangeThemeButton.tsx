import { Theme } from "../../../enums/Theme";
import { useThemeStore } from "../../../store/useThemeStore";
import ChangeThemeButtonIcon from "../ChangeThemeButtonIcon/ChangeThemeButtonIcon";
import classes from './ChangeThemeButton.module.scss';

function ChangeThemeButton() {
  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);

  // Функции
  function toggleTheme() {
    setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  }
  // Функции END

  return (
    <button
      className={classes.change_theme_button}
      onClick={toggleTheme}
    >
      <ChangeThemeButtonIcon color="#fff" size="30px" />
    </button> 
  );
};

export default ChangeThemeButton;
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Paths } from "./enums/Paths";
import { Theme } from "./enums/Theme";
import "./firebase";
import Pages from "./pages/Pages";
import { useThemeStore } from "./store/useThemeStore";
import { auth } from "./firebase";
import { useUserStore } from "./store/useUserStore";

function App() {
  const setUser = useUserStore(state => state.setUser);
  const setTheme = useThemeStore(state => state.setTheme);
  const navigate = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || Theme.DEFAULT;
    setTheme(theme);

    auth.onAuthStateChanged(user => {
      if (user) setUser(user.refreshToken, user.uid, user.email || "");
      else navigate(Paths.SIGN_UP);
    });
  }, []);

  return <Pages />;
}

export default App
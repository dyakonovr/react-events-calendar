import { useEffect } from 'react';
import Calendar from "./components/Calendar/Calendar";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import { Theme } from "./enums/Theme";
import { useModalStore } from "./store/useModalStore";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const modalIsOpen = useModalStore(state => state.isOpen);
  const setTheme = useThemeStore(state => state.setTheme);

  useEffect(() => { 
    const theme = localStorage.getItem("theme") || Theme.DEFAULT;
    setTheme(theme);
  }, []);

  return (
    <>
      <Header />
      <Calendar />
      {modalIsOpen && <Modal />}
    </>
  );
}

export default App
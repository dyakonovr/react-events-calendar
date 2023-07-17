import Calendar from "./components/Calendar/Calendar";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import { useModalStore } from "./store/useModalStore";

function App() {
  const modalIsOpen = useModalStore(state => state.isOpen);

  return (
    <>
      <Header />
      <Calendar />
      {modalIsOpen && <Modal />}
    </>
  );
}

export default App
import { signOut } from "firebase/auth";
import { Paths } from "../../../enums/Paths";
import { useUserStore } from "../../../store/useUserStore";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../firebase";
import { createToast } from "../../../utils/createToast";
import { ToastMessages } from "../../../enums/ToastMessages";

function LogoutButton() {
  const email = useUserStore(state => state.email);
  const resetUser = useUserStore(state => state.resetUser);
  const navigate = useNavigate();

  // Функции
  async function handleClick() {
    await signOut(auth).then(() => {
      resetUser();
      createToast(ToastMessages.LOGOUT);
      navigate(Paths.SIGN_UP);
    }).catch((error) => { createToast(`Ошибка: ${error}`); })
  }
  // Функции END

  return (
    <button
      className="button"
      title={`Выйти из аккаунта ${email}`}
      onClick={handleClick}
      type="button"
      style={{margin: "0 0 0 auto"}}
    >
      Выйти из аккаунта
    </button>
  );
};

export default LogoutButton;
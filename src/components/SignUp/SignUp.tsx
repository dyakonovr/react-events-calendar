import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUserStore } from "../../store/useUserStore";
import Form from "../../components/Form/Form";
import { createToast } from "../../utils/createToast";
import { useNavigate } from 'react-router-dom';
import { Paths } from "../../enums/Paths";
import { auth } from "../../firebase";
import { ToastMessages } from "../../enums/ToastMessages";

function SignUp() {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);

  // Функции
  function handleSignUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user.refreshToken, user.uid, user.email || "");
        createToast(ToastMessages.SIGN_UP);
        navigate(Paths.HOME);
      })
      .catch((error) => { createToast(`Ошибка: ${error.message}`); });
  }
  // Функции END

  return (
    <Form
      title="Регистрация"
      buttonText="Зарегестрироваться"
      altText="Нажмите для авторизации"
      altLink={Paths.LOGIN}
      handleClick={handleSignUp}
    />
  );
};

export default SignUp;
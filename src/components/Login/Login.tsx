import { signInWithEmailAndPassword } from "firebase/auth";
import Form from "../../components/Form/Form";
import { useUserStore } from "../../store/useUserStore";
import { createToast } from "../../utils/createToast";
import { useNavigate } from 'react-router-dom';
import { Paths } from "../../enums/Paths";
import { auth } from "../../firebase";

function Login() {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);

  // Функции
  function handleLogin(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user.refreshToken, user.uid, user.email || "");
        createToast(`Вы успешно вошли в аккаунт ${user.email}`);
        navigate(Paths.HOME);
      })
      .catch((error) => { createToast(`Ошибка: ${error.message}`); });
  }
  // Функции END

  return (
    <Form
      title="Авторизация"
      buttonText="Авторизироваться"
      altText="Нажмите для регистрации"
      altLink={Paths.SIGN_UP}
      handleClick={handleLogin}
    />
  );
};

export default Login;
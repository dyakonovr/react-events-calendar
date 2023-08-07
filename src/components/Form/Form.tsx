import { ChangeEvent, useState } from 'react';
import { Link } from "react-router-dom";
import PasswordIsHiddenIcon from "../../assets/sprites/PasswordIsHiddenIcon";
import PasswordIsVisibleIcon from "../../assets/sprites/PasswordIsVisibleIcon";
import classes from "./Form.module.scss";

interface IFormProps {
  title: string,
  buttonText: string,
  altText: string,
  altLink: string,
  handleClick: (email: string, password: string) => void,
}

function Form({ title, buttonText, altText, altLink, handleClick }: IFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <div className={classes.form}>
      <h1 className={classes.form_title}>{title}</h1>
      <input 
        className={["input", classes.form_input].join(' ')} 
        value={email} 
        onChange={(e: ChangeEvent) => setEmail((e.target as HTMLInputElement).value)} 
        placeholder="Почта"
        type="text"
      />
      <div className={classes.form_password_wrapper}>
        <input 
          className={["input", classes.form_input, classes.form_input_password].join(' ')} 
          value={password} 
          onChange={(e: ChangeEvent) => setPassword((e.target as HTMLInputElement).value)} 
          placeholder="Пароль"
          type={passwordIsVisible ? "text" : "password"}
        />
        <button
          className={classes.form_show}
          onClick={() => setPasswordIsVisible(!passwordIsVisible)}
        >
          {passwordIsVisible ? <PasswordIsHiddenIcon size="20px" /> : <PasswordIsVisibleIcon size="20px" /> }
        </button>
      </div>
      <button className={["button", classes.form_button].join(' ')} onClick={() => handleClick(email, password)}>{buttonText}</button>
      <Link className={classes.form_link} to={altLink}>{altText}</Link>
    </div>
  );
};

export default Form;
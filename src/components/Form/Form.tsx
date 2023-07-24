import { ChangeEvent, useState } from 'react';
import classes from "./Form.module.scss";
import { Link } from "react-router-dom";

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

  return (
    <div className={classes.form}>
      <h1 className={classes.form_title}>{title}</h1>
      <input 
        className={["input", classes.form_input].join(' ')} 
        value={email} 
        onChange={(e: ChangeEvent) => setEmail((e.target as HTMLInputElement).value)} 
        placeholder="Email"
      />
      <input 
        className={["input", classes.form_input].join(' ')} 
        value={password} 
        onChange={(e: ChangeEvent) => setPassword((e.target as HTMLInputElement).value)} 
        placeholder="Password"
      />
      <button className={["button", classes.form_button].join(' ')} onClick={() => handleClick(email, password)}>{buttonText}</button>
      <Link className={classes.form_link} to={altLink}>{altText}</Link>
    </div>
  );
};

export default Form;
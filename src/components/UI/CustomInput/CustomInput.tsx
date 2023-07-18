import { RefObject } from "react";
import classes from './CustomInput.module.scss';

interface ICustomInputProps {
  placeholder: string,
  myRef: RefObject<HTMLInputElement>,
  type?: string
}

function CustomInput({placeholder, myRef, type = "text"}: ICustomInputProps) {
  return (
    <input className={classes.input}
      placeholder={placeholder}
      ref={myRef}
      type={type}
    />
  );
};

export default CustomInput;
import { RefObject } from "react";
import classes from './CustomInput.module.scss';

interface ICustomInputProps {
  placeholder: string,
  myRef: RefObject<HTMLInputElement>,
  initialValue: string,
  type?: string
}

function CustomInput({placeholder, myRef, initialValue, type = "text"}: ICustomInputProps) {
  return (
    <input className={classes.input}
      placeholder={placeholder}
      defaultValue={initialValue}
      ref={myRef}
      type={type}
    />
  );
};

export default CustomInput;
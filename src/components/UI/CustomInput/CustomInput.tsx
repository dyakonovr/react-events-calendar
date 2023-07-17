import classes from './CustomInput.module.scss';

function CustomInput({placeholder}: {placeholder: string}) {
  return (
    <input className={classes.input} placeholder={placeholder} />
  );
};

export default CustomInput;
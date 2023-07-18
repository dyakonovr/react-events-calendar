import { ChangeEvent, RefObject, useState } from 'react';
import TimeField from 'react-simple-timefield';
import classes from './TimePickerInput.module.scss';

interface ITimePickerInputProps {
  myRef: RefObject<TimeField>
}

function TimePickerInput({ myRef }: ITimePickerInputProps) {
  const [value, setValue] = useState("12:00");

  // Функции
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    setValue(input.value);
  }
  // Функции END
  
  return <TimeField
    input={<input className={classes.time_picker_input} />}
    value={value}
    ref={myRef}
    onChange={(e) => { handleInput(e) }}
   />
};

export default TimePickerInput;
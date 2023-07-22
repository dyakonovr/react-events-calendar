import { ChangeEvent, RefObject, useState } from 'react';
import TimeField from 'react-simple-timefield';
import classes from './TimePickerInput.module.scss';

interface ITimePickerInputProps {
  myRef: RefObject<TimeField>,
  initialTime: string,
}

function TimePickerInput({ myRef, initialTime }: ITimePickerInputProps) {
  const [value, setValue] = useState( initialTime || getInitialTime() );

  // Функции
  function getInitialTime() {
    const hours = new Date().getHours();

    if (hours === 23) return `00:00`;
    if (hours < 10) return `0${hours + 1}:00`;
    return `${hours + 1}:00`
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    setValue(input.value);
  }
  // Функции END
  
  return <TimeField
    input={<input className={classes.time_picker_input} />}
    value={value}
    ref={myRef}
    onChange={(e) => handleInput(e)}
   />
};

export default TimePickerInput;
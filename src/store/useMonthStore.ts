import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';

interface IMonthState {
  month: number,
  setNextMonth: () => void,
  setPrevMonth: () => void,
  setCurrentMonth: () => void,
}

export const useMonthStore = create<IMonthState>()(immer((set) => ({
  month: new Date().getMonth(),
  setNextMonth: () => set(state => {
    if (state.month !== 11) state.month += 1; // Счет месяцев начинается с 0
    else state.month = 0;
  }),
  setPrevMonth: () => set(state => { 
    if (state.month !== 0) state.month -= 1; // Счет месяцев начинается с 0
    else state.month = 11;
  }),
  setCurrentMonth: () => set(state => { state.month = new Date().getMonth() }),
})));
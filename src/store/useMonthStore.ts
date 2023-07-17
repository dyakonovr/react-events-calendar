import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';

interface IMonthState {
  month: number,
  year: number,
  setNextMonth: () => void,
  setPrevMonth: () => void,
  setCurrentMonth: () => void,
}

const date = new Date();

export const useMonthStore = create<IMonthState>()(immer((set) => ({
  month: date.getMonth(),
  year: date.getFullYear(),
  setNextMonth: () => set(state => {
    if (state.month !== 11) state.month += 1; // Счет месяцев начинается с 0
    else {
      state.month = 0;
      state.year += 1;
    }
  }),
  setPrevMonth: () => set(state => { 
    if (state.month !== 0) state.month -= 1; // Счет месяцев начинается с 0
    else {
      state.month = 11;
      state.year -= 1;
    }
  }),
  setCurrentMonth: () => set(state => { state.month = date.getMonth() }),
})));
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { IDateObject } from "../interfaces/IDateObject";

interface IModalState {
  isOpen: boolean,
  currentDate: IDateObject,
  openModal: (dateObject: IDateObject) => void,
  closeModal: () => void,
}

const date = new Date();

export const useModalStore = create<IModalState>()(immer((set) => ({
  isOpen: false,
  currentDate: {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  },
  openModal: (dateObject: IDateObject) => set(state => {
    state.isOpen = true;
    state.currentDate = dateObject;
  }),
  closeModal: () => set(state => { state.isOpen = false; }),
})));
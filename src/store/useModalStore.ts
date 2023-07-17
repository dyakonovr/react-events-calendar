import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';

interface IModalState {
  isOpen: boolean,
  toggleVisibility: () => void;
}

export const useModalStore = create<IModalState>()(immer((set) => ({
  isOpen: false,
  toggleVisibility: () => set(state => { state.isOpen = !state.isOpen; }),
})));
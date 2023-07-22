import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { Theme } from "../enums/Theme";

interface IThemeState {
  theme: string,
  setTheme: (theme: string) => void,
}

export const useThemeStore = create<IThemeState>()(immer((set) => ({
  theme: Theme.DEFAULT,
  setTheme: (theme: string) => set(state => {
    state.theme = theme;
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }),
})));
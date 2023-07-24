import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';

interface IUserState {
  token: string | null,
  email: string | null,
  id: string | null,
  setUser: (token: string, id: string, email: string) => void,
  resetUser: () => void,
}

export const useUserStore = create<IUserState>()(immer((set) => ({
  token: null,
  id: null,
  email: null,
  setUser: (token: string, id: string, email: string) => set(state => {
    state.token = token;
    state.id = id;
    state.email = email;
  }),
  resetUser: () => set(state => {
    state.token = null;
    state.id = null;
    state.email = null;
  })
})));
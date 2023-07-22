import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { CalendarModel } from "../models/CalendarModel";

interface IMonthState {
  calendar: CalendarModel | null,
  updateCalendar: (newCalendar: CalendarModel) => void,
}

export const useCalendarStore = create<IMonthState>()(immer((set) => ({
  calendar: null,
  updateCalendar: (newCalendar: CalendarModel) => set(state => {
    state.calendar = newCalendar;
  }),
})));
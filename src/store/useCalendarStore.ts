import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { CalendarModel, IDateEvent } from "../models/CalendarModel";

interface IMonthState {
  calendar: CalendarModel | null,
  updateCalendar: (newCalendar: CalendarModel) => void,
  addEvent: (eventObject: IDateEvent) => void,
}

export const useCalendarStore = create<IMonthState>()(immer((set) => ({
  calendar: null,
  updateCalendar: (newCalendar: CalendarModel) => set(state => {
    state.calendar = newCalendar;
  }),
  addEvent: (eventObject: IDateEvent) => set(state => {
    state.calendar?.addEvent(eventObject);
  }),
})));
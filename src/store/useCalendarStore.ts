import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { CalendarModel, IDateEvent } from "../models/CalendarModel";

interface IMonthState {
  calendar: CalendarModel | null,
  events: IDateEvent[],
  updateCalendar: (newCalendar: CalendarModel) => void,
  addEvent: (eventObject: IDateEvent) => void,
}

export const useCalendarStore = create<IMonthState>()(immer((set) => ({
  calendar: null,
  events: [],
  updateCalendar: (newCalendar: CalendarModel) => set(state => {
    state.calendar = newCalendar;
  }),
  addEvent: (eventObject: IDateEvent) => set(state => {
    state.events.push(eventObject);
  }),
})));
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { IEvent } from './../interfaces/IEvent';

interface IEventsState {
  isModalForEdit: boolean,
  eventForEditId: number | null,
  currentEventId: number,
  events: IEvent[],
  setIsModalForEdit: (eventForEditId: number) => void,
  resetIsModalForEdit: () => void,
  addEvent: (eventObject: IEvent) => void,
  deleteEvent: (eventId: number) => void
}

export const useEventsStore = create<IEventsState>()(immer((set) => ({
  isModalForEdit: false,
  eventForEditId: null,
  currentEventId: 1,
  events: [],
  setIsModalForEdit: (eventForEditId: number) => set(state => {
    state.isModalForEdit = true;
    state.eventForEditId = eventForEditId;
  }),
  resetIsModalForEdit: () => set(state => {
    state.isModalForEdit = false;
    state.eventForEditId = null;
  }),
  addEvent: (eventObject: IEvent) => set(state => {
    if (state.eventForEditId !== null) state.events = state.events.filter(event => event.id !== state.eventForEditId);
    state.events.push(eventObject);
    state.currentEventId++;
  }),
  deleteEvent: (eventForDeleteId: number) => set(state => {
    state.events = state.events.filter(event => event.id !== eventForDeleteId);
  }),
})));
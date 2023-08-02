import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { IEvent } from './../interfaces/IEvent';

interface IEventsState {
  isModalForEdit: boolean,
  eventForEditId: string | null,
  setIsModalForEdit: (eventForEditId: string) => void,
  resetIsModalForEdit: () => void,
  events: IEvent[],
  addEvent: (eventObject: IEvent) => void,
  deleteEvent: (eventId: string) => void
  addEventsFromDatabase: (eventsArray: IEvent[]) => void,
}

export const useEventsStore = create<IEventsState>()(immer((set) => ({
  isModalForEdit: false,
  eventForEditId: null,
  setIsModalForEdit: (eventForEditId: string) => set(state => {
    state.isModalForEdit = true;
    state.eventForEditId = eventForEditId;
  }),
  resetIsModalForEdit: () => set(state => {
    state.isModalForEdit = false;
    state.eventForEditId = null;
  }),
  events: [],
  addEvent: (eventObject: IEvent) => set(state => {
    if (state.eventForEditId !== null) state.events = state.events.filter(event => event.id !== state.eventForEditId);
    state.events.push(eventObject);
  }),
  deleteEvent: (eventForDeleteId: string) => set(state => {
    state.events = state.events.filter(event => event.id !== eventForDeleteId);
  }),
  addEventsFromDatabase: (eventsArray: IEvent[]) => set(state => {
    state.events = eventsArray;
  }),
})));
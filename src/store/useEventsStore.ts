import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { IEvent } from './../interfaces/IEvent';

interface IEventsState {
  isModalForEdit: boolean,
  eventForEditId: string | null,
  events: IEvent[],
  setIsModalForEdit: (eventForEditId: string) => void,
  resetIsModalForEdit: () => void,
  addEventsFromDatabase: (eventsArray: IEvent[]) => void,
w  deleteEvent: (eventId: string) => void
}

export const useEventsStore = create<IEventsState>()(immer((set) => ({
  isModalForEdit: false,
  eventForEditId: null,
  events: [],
  setIsModalForEdit: (eventForEditId: string) => set(state => {
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
  }),
  addEventsFromDatabase: (eventsArray: IEvent[]) => set(state => {
    state.events = eventsArray;
  }),
  deleteEvent: (eventForDeleteId: string) => set(state => {
    state.events = state.events.filter(event => event.id !== eventForDeleteId);
  }),
})));
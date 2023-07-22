import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { IEvent } from './../interfaces/IEvent';

interface IEventsState {
  isModalForEdit: boolean,
  eventForEditId: number | null,
  currentEventId: number,
  events: IEvent[],
  setIsModalForEdit: (eventForEditId: number) => void,
  addEvent: (eventObject: IEvent) => void,
  deleteEvent: (eventId: number) => void
}

export const useEventsStore = create<IEventsState>()(immer((set) => ({
  isModalForEdit: false,
  eventForEditId: null,
  currentEventId: 0,
  events: [],
  setIsModalForEdit: (eventForEditId: number) => set(state => {
    state.isModalForEdit = true;
    state.eventForEditId = eventForEditId;    
  }),
  addEvent: (eventObject: IEvent) => set(state => {
    if (state.eventForEditId !== null) state.events = state.events.filter(event => event.id !== state.eventForEditId);
    state.events.push(eventObject);
    state.currentEventId++;
    state.isModalForEdit = false;
    state.eventForEditId = null;
  }),
  deleteEvent: (eventForDeleteId: number) => set(state => {
    state.events = state.events.filter(event => event.id !== eventForDeleteId);
    state.isModalForEdit = false;
    state.eventForEditId = null;
  }),
})));
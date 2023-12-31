import { useEventsStore } from "../store/useEventsStore";

export function getEventFromStoreById(eventId: string) {
  const events = useEventsStore(state => state.events);
  return events.find((event) => event.id === eventId) || null;
}
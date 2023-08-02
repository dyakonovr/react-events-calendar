import { IEvent } from "../interfaces/IEvent";
import { createToast } from "./createToast";

export function createEventNotification(eventObject: IEvent) {
  const { day, month, year, hours, minutes, message } = eventObject;
  const delay = new Date(year, month, day, hours, minutes).getTime() - Date.now();
  if (delay < 0) return;
  
  const notificationMessage = `${hours}:${minutes} ${message}`
  const id: ReturnType<typeof setTimeout> = setTimeout(() => {
    new Notification("Уведомление о событии", { body: notificationMessage });
    createToast(notificationMessage);
  }, delay);
  
  return id;
}
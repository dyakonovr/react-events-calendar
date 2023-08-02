export interface IEvent {
  day: number,
  month: number,
  year: number,
  hours: number,
  minutes: number,
  message: string,
  id: string,
  timeoutId?: ReturnType<typeof setTimeout>;
}
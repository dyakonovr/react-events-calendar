import { FullDaysArray } from "../enums/Days";

export function getDayName(day: number, month: number, year: number) {
  const dayNum = new Date(year, month, day).getDay();
  if (dayNum === 0) return FullDaysArray[6]; // Воскресенье даёт 0
  return FullDaysArray[dayNum - 1];
}
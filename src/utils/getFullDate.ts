import { IDateObject } from "../interfaces/IDateObject";
import { getDayName } from "./getDayName";
import { getDeclensionedMonth } from "./getDeclensionedMonth";

export function getFullDate(dateObject: IDateObject) {
  const { day, month, year } = dateObject;
  const dayName = getDayName(day, month, year);
  const monthName = getDeclensionedMonth(month);
  return `${dayName}, ${day} ${monthName}`;
}
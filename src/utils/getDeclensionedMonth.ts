import { MonthsArray } from "../enums/Months";

export function getDeclensionedMonth(month: number) {
  if (month === 2 || month === 7) { // Если текущий месяц - март или август, добавляем "А"
    return (MonthsArray[month] + "а").toLowerCase();
  } else { // Иначе заменяем последнюю букву на "Я" 
    return (MonthsArray[month].slice(0, -1) + "я").toLowerCase();
  }
}
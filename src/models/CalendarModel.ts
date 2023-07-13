import { DaysArray } from "../enums/Days";
import { getDaysInMonth } from './../utils/getDaysInMonth';
import { CellModel } from "./CellModel";

export class CalendarModel {
  cells: CellModel[];
  currentMonthId: number;
  headers = DaysArray;

  constructor(currentMonthId: number) {
    this.currentMonthId = currentMonthId;
    this.cells = [];
  }

  public initialize() {
    const daysInMonth = getDaysInMonth(this.currentMonthId);

    this.addCellsOfPrevMonth();
    this.addCellsOfCurrentMonth(daysInMonth);
    this.addCellsOfNextMonth(daysInMonth);
  }

  private addCellsOfPrevMonth() {
    const firstDayOfMonth = new Date(2023, this.currentMonthId, 1).getDay();
    // Если первый день месяца - понедельник
    if (firstDayOfMonth === 1) return; 

    // Иначе добавляем недостающие дни из прошлого месяца
    const daysInPrevMonth = getDaysInMonth(this.currentMonthId - 1);
    for (let date = daysInPrevMonth - firstDayOfMonth + 2; date <= daysInPrevMonth; date++) {
      this.cells.push(new CellModel(date, false, true));
    }
  }

  private addCellsOfCurrentMonth(daysInMonth: number) {
    const currentDate = new Date().getDate();

    for (let date = 1; date <= daysInMonth; date++) {
      const isCurrentDate = currentDate === date;
      this.cells.push(new CellModel(date, isCurrentDate, false));
    }
  }

  private addCellsOfNextMonth(daysInMonth: number) {
    const lastDayOfMonth = new Date(2023, this.currentMonthId, daysInMonth).getDay();
    // Если последний день месяца - воскресенье
    if (lastDayOfMonth === 7) return;

    // Иначе добавляем недостающие дни из следующего месяца
    for (let date = 1; date <= 7 - lastDayOfMonth; date++) {
      this.cells.push(new CellModel(date, false, true));
    }
  }
}
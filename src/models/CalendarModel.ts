import { ShortDaysArray } from "../enums/Days";
import { getDaysInMonth } from './../utils/getDaysInMonth';
import { CellModel } from "./CellModel";

export interface IDateEvent {
  day: number,
  month: number,
  year: number,
  message: string,
  time: string,
}

export class CalendarModel {
  cells: CellModel[];
  month: number;
  year: number;
  headers = ShortDaysArray;
  events: IDateEvent[];
  
  date = new Date();
  currentDate = this.date.getDate();
  currentMonth = this.date.getMonth();
  currentYear = this.date.getFullYear();

  constructor(month: number, year: number) {
    this.month = month;
    this.year = year;
    this.cells = [];
    this.events = [];
  }

  public initialize() {
    const daysInMonth = getDaysInMonth(this.month);

    this.addCellsOfPrevMonth();
    this.addCellsOfCurrentMonth(daysInMonth);
    this.addCellsOfNextMonth(daysInMonth);
  }

  private addCellsOfPrevMonth() {
    let firstDayOfMonth = new Date(2023, this.month, 1).getDay();

    // Если первый день месяца - понедельник
    if (firstDayOfMonth === 1) return;
    
    // Воскресенье даст 0 => for не запустится
    firstDayOfMonth = firstDayOfMonth || 7;
    
    // Иначе добавляем недостающие дни из прошлого месяца
    const daysInPrevMonth = getDaysInMonth(this.month - 1);
    
    for (let day = daysInPrevMonth - firstDayOfMonth + 2; day <= daysInPrevMonth; day++) {
      this.cells.push(new CellModel(day, this.month - 1, this.year, false, true));
    }
  }

  private addCellsOfCurrentMonth(daysInMonth: number) {
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDate = this.currentDate === day
        && this.currentMonth === this.month
        && this.currentYear === this.year;
      
      this.cells.push(new CellModel(day, this.month, this.year, isCurrentDate, false));
    }
  }

  private addCellsOfNextMonth(daysInMonth: number) {
    const lastDayOfMonth = new Date(2023, this.month, daysInMonth).getDay();
    // Если последний день месяца - воскресенье
    if (lastDayOfMonth === 0) return;

    // Иначе добавляем недостающие дни из следующего месяца
    for (let day = 1; day <= 7 - lastDayOfMonth; day++) {
      this.cells.push(new CellModel(day, this.month + 1, this.year, false, true));
    }
  }
}
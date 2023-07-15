import { DaysArray } from "../enums/Days";
import { getDaysInMonth } from './../utils/getDaysInMonth';
import { CellModel } from "./CellModel";

export class CalendarModel {
  cells: CellModel[];
  monthId: number;
  headers = DaysArray;

  constructor(monthId: number) {
    this.monthId = monthId;
    this.cells = [];
  }

  public initialize() {
    const daysInMonth = getDaysInMonth(this.monthId);

    this.addCellsOfPrevMonth();
    this.addCellsOfCurrentMonth(daysInMonth);
    this.addCellsOfNextMonth(daysInMonth);
  }

  private addCellsOfPrevMonth() {
    let firstDayOfMonth = new Date(2023, this.monthId, 1).getDay();

    // console.log("month:", this.monthId, "firstDay:", firstDayOfMonth);
    // Если первый день месяца - понедельник
    if (firstDayOfMonth === 1) return;
    
    // Воскресенье даст нам 0 => for не запустится
    firstDayOfMonth = firstDayOfMonth || 7;
    
    // Иначе добавляем недостающие дни из прошлого месяца
    const daysInPrevMonth = getDaysInMonth(this.monthId - 1);
    // console.log(firstDayOfMonth, daysInPrevMonth);
    for (let date = daysInPrevMonth - firstDayOfMonth + 2; date <= daysInPrevMonth; date++) {
      this.cells.push(new CellModel(date, false, true));
    }
  }

  private addCellsOfCurrentMonth(daysInMonth: number) {
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth();

    for (let date = 1; date <= daysInMonth; date++) {
      const isCurrentDate = currentMonth === this.monthId && currentDate === date;
      this.cells.push(new CellModel(date, isCurrentDate, false));
    }
  }

  private addCellsOfNextMonth(daysInMonth: number) {
    const lastDayOfMonth = new Date(2023, this.monthId, daysInMonth).getDay();
    // Если последний день месяца - воскресенье
    if (lastDayOfMonth === 0) return;

    console.log(lastDayOfMonth);

    // Иначе добавляем недостающие дни из следующего месяца
    for (let date = 1; date <= 7 - lastDayOfMonth; date++) {
      this.cells.push(new CellModel(date, false, true));
    }
  }
}
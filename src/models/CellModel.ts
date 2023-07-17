export class CellModel {
  day: number;
  month: number;
  year: number;
  isCurrentDate: boolean;
  isInactiveDate: boolean;

  constructor(day: number, month: number, year: number, isCurrentDate: boolean, isInactiveDate: boolean = false) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.isCurrentDate = isCurrentDate;
    this.isInactiveDate = isInactiveDate;
  }
}
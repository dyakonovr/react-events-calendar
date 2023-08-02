export class CellModel {
  day: number;
  month: number;
  year: number;
  isInactiveDate: boolean;

  constructor(day: number, month: number, year: number, isInactiveDate: boolean = false) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.isInactiveDate = isInactiveDate;
  }
}
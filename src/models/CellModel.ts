export class CellModel {
  date: number;
  isCurrentDate: boolean;
  isInactiveDate: boolean;

  constructor(date: number, isCurrentDate: boolean, isInactiveDate: boolean = false) {
    this.date = date;
    this.isCurrentDate = isCurrentDate;
    this.isInactiveDate = isInactiveDate;
  }
}
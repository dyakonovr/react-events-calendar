export function getDaysInMonth(month: number) {
  return new Date(2023, month + 1, 0).getDate();
};
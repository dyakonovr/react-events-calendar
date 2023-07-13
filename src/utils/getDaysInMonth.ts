export function getDaysInMonth(monthId: number) {
  return new Date(2023, monthId - 1, 0).getDate()
}
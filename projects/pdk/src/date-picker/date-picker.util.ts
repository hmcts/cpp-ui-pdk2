export const getCalendarMonth = (dateLike: Date | string | number) => {
  const date = new Date(dateLike);

  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][date.getMonth()];
};

export const getDaysInMonth = (originalDate: Date) => {
  const date = new Date(originalDate.getTime());
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const lastDayOfMonth = new Date(0);

  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
};

export const isSameDay = (date1: Date | string | number, date2: Date | string | number) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const isSameMonth = (date1: Date | string | number, date2: Date | string | number) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
};

export const isWeekend = (value: Date | string): boolean => {
  const date = value instanceof Date ? value : new Date(value);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

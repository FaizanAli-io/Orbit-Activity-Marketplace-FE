import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstWords(text: string, count = 10) {
  return text.split(/\s+/).slice(0, count).join(' ');
}

export const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

export function mergeDateAndTime(dateObj: Date, timeObj: Date) {
  const merged = new Date(dateObj); // copy the date

  merged.setHours(timeObj.getHours(), timeObj.getMinutes(), 0, 0);

  return merged;
}

function getTimeSinceMidnight(date: Date) {
  return (
    date.getHours() * 3600000 +
    date.getMinutes() * 60000 +
    date.getSeconds() * 1000 +
    date.getMilliseconds()
  );
}

export function compareTimes(date1: Date, date2: Date) {
  const time1 = getTimeSinceMidnight(date1);
  const time2 = getTimeSinceMidnight(date2);

  if (time1 < time2) return -1; // date1 time is earlier
  if (time1 > time2) return 1; // date1 time is later
  return 0; // times are equal
}

export function timeToDate(time: string) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(`${year}-0${month}-0${day}T${time}:00`);
}

export function getFormatedTime(date: Date) {
  if (!date) return undefined;

  const hour = date.getHours();
  const mins = date.getMinutes();

  const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;

  return `${formattedHour}:${formattedMins}`;
}

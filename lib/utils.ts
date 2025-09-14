import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstWords(text: string, count = 10) {
  return text.split(/\s+/).slice(0, count).join(' ');
}

export const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'HKD',
  });

  // Format the currency and replace HK$ with HKD
  return formatter.format(amount).replace('HK$', 'HKD');
};

export function mergeDateAndTime(dateObj: Date, timeString: string) {
  const merged = new Date(dateObj); // copy the date

  // Parse the time string (HH:mm format)
  const [hours, minutes] = timeString.split(':').map(Number);

  merged.setHours(hours, minutes, 0, 0);

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

export function formatQuantity(
  num: number,
  options: {
    decimals?: number; // decimal places (default 0)
    locale?: string; // e.g. "en-US"
    pad?: number; // total length to pad with zeros
  } = {}
): string {
  const { decimals = 0, locale = 'en-US', pad } = options;

  let formatted = num.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (pad) {
    // Remove commas before padding, then add them back if needed
    const noCommas = formatted.replace(/,/g, '');
    const padded = noCommas.padStart(pad, '0');

    // Reinsert commas if number is large
    const withCommas = Number(padded).toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return withCommas.length >= padded.length ? withCommas : padded;
  }

  return formatted;
}

// Convert UTC time string (HH:mm) to local time string
export const convertUTCTimeToLocal = (utcTimeString: string): string => {
  const today = new Date();
  const [hours, minutes] = utcTimeString.split(':').map(Number);

  // Create a UTC date with today's date and the provided time
  const utcDate = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      hours,
      minutes
    )
  );

  // Convert to local time and format as HH:mm
  return utcDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

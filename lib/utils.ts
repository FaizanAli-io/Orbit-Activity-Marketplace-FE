import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstWords(text: string, count = 10) {
  return text.split(/\s+/).slice(0, count).join(' ');
}

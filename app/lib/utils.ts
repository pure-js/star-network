import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIdbyUrl(url: string) {
  const personUrlParts = url.split('/').filter(Boolean);
  const personId = Number(personUrlParts[personUrlParts.length - 1]);
  return personId;
}

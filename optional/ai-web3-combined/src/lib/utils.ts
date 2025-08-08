import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate the time left for a countdown
 * @param targetDate is the date to count down to
 * @returns an object with the days, hours, minutes, and seconds left
 */
export const calculateTimeLeft = (targetDate: number | string | Date) => {
  const now = new Date();
  const endDate =
    targetDate instanceof Date ? targetDate : new Date(targetDate);

  // Calculate if the countdown is finished
  const diffTime = endDate.getTime() - now.getTime();
  if (diffTime <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // Return the time left if the countdown is not finished
  return {
    days: Math.floor(diffTime / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diffTime % (1000 * 60)) / 1000),
  };
};

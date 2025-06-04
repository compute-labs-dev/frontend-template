import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPublicKey = (publicKey?: string) => {
  if (!publicKey) return '';
  return `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
};

// Simple base58 encoding function
export const base58Encode = (buffer: Uint8Array) => {
  const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

  const digits = [0];
  for (let i = 0; i < buffer.length; i++) {
    let carry = buffer[i];
    for (let j = 0; j < digits.length; j++) {
      carry += digits[j] << 8;
      digits[j] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry > 0) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }

  let result = '';
  // Leading zeros
  for (let i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) {
    result += ALPHABET[0];
  }
  // Convert digits to characters
  for (let i = digits.length - 1; i >= 0; i--) {
    result += ALPHABET[digits[i]];
  }
  return result;
};

export const formatCurrency = (value: number) => {
  // For zero values, just show $0
  if (value === 0) {
    return '$0';
  }
  
  // For very small values (less than $1), show up to 4 decimal places
  // For larger values, use standard 2 decimal places
  const decimalPlaces = Math.abs(value) < 1 ? 4 : 2;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
};

/**
 * Calculate the thaw date for the user's unstake
 * @param unstakeTime is the the timestamp user initiated the unstake function
 * @returns thawDate as a Date object - 30 days after unstake initiation the user can claim their tokens
 */
export const calculateStakeThawDate = (unstakeTime: number) => {
  const unstakeInitDate = new Date(unstakeTime);
  const thawDate = new Date(unstakeInitDate);
  thawDate.setDate(thawDate.getDate() + 30);

  // For testing purposes, the thaw date is 5 minutes after the unstake initiation
  // thawDate.setMinutes(thawDate.getMinutes() + 5);
  return thawDate;
};

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

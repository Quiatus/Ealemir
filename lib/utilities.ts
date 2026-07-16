import { headers } from 'next/headers';

export function randomResourceRange(res: number, min: number, max: number) {
    return Math.floor(Math.random() * (res * max - res * min) + res * min)
}

export async function getServerLocale(): Promise<string> {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  return acceptLanguage ? acceptLanguage.split(',')[0] : 'en-US';
}

export function formatResourceNumber(num: number, locale: string = 'en-US'): string {
  let formatted: string;

  if (num < 10000) {
    formatted = num.toLocaleString(locale);
  } else if (num < 1000000) {
    formatted = (Math.floor(num / 100) / 10).toFixed(1) + 'k';
  } else if (num < 1000000000) {
    formatted = (Math.floor(num / 10000) / 100).toFixed(2) + 'M';
  }  else if (num < 1000000000000) {
    formatted = (Math.floor(num / 10000000) / 100).toFixed(2) + 'B';
  } else {
    formatted = (Math.floor(num / 10000000000) / 100).toFixed(2) + 'T';
  } 

  return formatted;
}
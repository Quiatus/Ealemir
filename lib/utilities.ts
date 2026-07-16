import en from '@/locales/en.json';

const resourceFormatter = new Intl.NumberFormat('en-US');

export function text(key: string): string {
  const result = key.split('.').reduce((obj: unknown, currentKey: string) => {
    if (obj !== null && typeof obj === 'object' && currentKey in obj) {
      return (obj as Record<string, unknown>)[currentKey];
    }
    return undefined;
  }, en);
  return typeof result === 'string' ? result : key;
}

export function randomResourceRange(res: number, min: number, max: number) {
  return Math.floor(Math.random() * (res * max - res * min) + res * min)
}

export function formatNumber(num: number, long = true): string {
  let formatted: string;

  if (long) {
    return resourceFormatter.format(num)
  }

  if (num < 10000) {
    formatted = resourceFormatter.format(num)
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
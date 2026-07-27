import en from '@/locales/en.json';

type numberFormats = 'full' | 'short' | 'year'

const resourceFormatter = new Intl.NumberFormat('en-US');

export function text(key: string, variables?: Record<string, string | number>): string {
  const result = key.split('.').reduce((obj: unknown, currentKey: string) => {
    if (obj !== null && typeof obj === 'object' && currentKey in obj) {
      return (obj as Record<string, unknown>)[currentKey];
    }
    return undefined;
  }, en);

  const rawString = typeof result === 'string' ? result : key;

  if (!variables) return rawString;

  return rawString.replace(/\{(\w+)\}/g, (match, paramKey) => {
    return variables[paramKey] !== undefined ? String(variables[paramKey]) : match;
  });
}

export function randomResourceRange(res: number, min: number, max: number) {
  return Math.floor(Math.random() * (res * max - res * min) + res * min)
}

export function formatNumber(num: number, formatting: numberFormats = 'short'): string {
  if (formatting === 'full') {
    return resourceFormatter.format(num);
  } 
  
  if (formatting === 'short') {
    if (num < 10000) return resourceFormatter.format(num);
    if (num < 1000000) return (Math.floor(num / 100) / 10).toFixed(1) + 'k';
    if (num < 1000000000) return (Math.floor(num / 10000) / 100).toFixed(2) + 'M';
    if (num < 1000000000000) return (Math.floor(num / 10000000) / 100).toFixed(2) + 'B';
    
    return (Math.floor(num / 10000000000) / 100).toFixed(2) + 'T';
  }

  if (formatting === 'year') {
    const year = Math.floor(num / 12)
    const month = num % 12

    if (num === 0) return '0 months'; 

    const parts = [];

    if (year > 0) {
      parts.push(`${year} year${year === 1 ? '' : 's'}`);
    }

    if (month > 0) {
      parts.push(`${month} month${month === 1 ? '' : 's'}`);
    }

    return parts.join(' and ');
  }

  return num.toString(); 
}
import en from '@/locales/en.json';

type numberFormats = 'full' | 'short' | 'year'

const resourceFormatter = new Intl.NumberFormat('en-US');

function getNestedValue(obj: unknown, path: string[]): unknown {
  return path.reduce<unknown>((acc, segment) => {
    if (acc !== null && typeof acc === 'object' && segment in acc) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, obj);
}

function interpolate(str: string, variables: Record<string, string | number>): string {
  return str.replace(/\{(\w+)\}/g, (match, paramKey) =>
    variables[paramKey] !== undefined ? String(variables[paramKey]) : match
  );
}

export function text(key: string, variables?: Record<string, string | number>): string {
  const result = getNestedValue(en, key.split('.'));
  const rawString = typeof result === 'string' ? result : key;
  return variables ? interpolate(rawString, variables) : rawString;
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
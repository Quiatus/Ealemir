import { text } from '@/lib/utilities';
import React from 'react';

const HIGHLIGHT_STYLES: Record<string, string> = {
  high: 'text-orange',
  bold: 'text-bold',
  norm: 'text-primary',
  pos: 'text-green',
  neg: 'text-red',
  food: 'text-yellow',
  wood: 'text-brown',
  stone: 'text-gray'
};

export function richText(key: string, variables?: Record<string, string | number>): React.ReactNode {
  const processedText = text(key, variables);

  const regex = /<(\w+)>(.*?)<\/\1>/g;
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(processedText)) !== null) {
    const [fullMatch, tagName, innerContent] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(processedText.substring(lastIndex, matchIndex));
    }

    if (tagName in HIGHLIGHT_STYLES) {
      parts.push(
        <span key={matchIndex} className={HIGHLIGHT_STYLES[tagName]}>
          {innerContent}
        </span>
      );
    } else {
      parts.push(innerContent);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < processedText.length) {
    parts.push(processedText.substring(lastIndex));
  }

  return parts.length > 0 ? parts : processedText;
}
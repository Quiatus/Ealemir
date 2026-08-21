import { text } from '@/lib/utilities';
import React from 'react';
import Image from 'next/image';

const HIGHLIGHT_STYLES: Record<string, string> = {
  high: 'text-orange',
  bold: 'text-bold',
  italic: 'text-italic',
  norm: 'text-primary',
  pos: 'text-green',
  neg: 'text-red',
  food: 'text-yellow',
  wood: 'text-brown',
  stone: 'text-gray',
  gold: 'text-gold',
  purple: 'text-purple',
  green: 'text-green',
  gb: 'text-green text-bold',
  rb: 'text-red text-bold'
};

export function richText(key: string, variables?: Record<string, string | number>): React.ReactNode {
  const raw = text(key, variables);
  const parts = raw.split(/(<[\w]+>.*?<\/[\w]+>|\{icon_[\w]+\})/g);

  return parts.map((part, i) => {
    if (part.startsWith('<')) {
      const match = part.match(/<(\w+)>(.*?)<\/\1>/);
      if (!match) return part;
      const [_, tag, content] = match;
      return <span key={i} className={HIGHLIGHT_STYLES[tag]}>{content}</span>;
    }
    if (part.startsWith('{icon_')) {
      const icon = part.replace(/{icon_|}/g, '');
      return <Image 
        key={i} 
        src={`/icons/resources/${icon}.png`} 
        alt={''} 
        width={20} 
        height={20} 
        className="inline-icon" />;
      }
    return part;
  });
}
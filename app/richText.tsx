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
  purple: 'text-purple'
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
//   const processedText = text(key, variables);

//   const regex = /<(\w+)>(.*?)<\/\1>|\{icon_(\w+)\}/g;
  
//   const parts: React.ReactNode[] = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = regex.exec(processedText)) !== null) {
//     const [fullMatch, tagName, innerContent, iconName] = match;
//     const matchIndex = match.index;

//     if (matchIndex > lastIndex) {
//       parts.push(processedText.substring(lastIndex, matchIndex));
//     }

//     if (tagName && tagName in HIGHLIGHT_STYLES) {
//       parts.push(
//         <span key={matchIndex} className={HIGHLIGHT_STYLES[tagName]}>
//           {innerContent}
//         </span>
//       );
//     } else if (iconName) {
//       parts.push(
//         <span key={matchIndex} className="inline-icon-wrapper">
//           <Image 
//             src={`/icons/resources/${iconName}.png`} 
//             alt={iconName} 
//             width={20} 
//             height={20} 
//             className="inline-icon" 
//           />
//         </span>
//       );
//     } else if (tagName) {
//       parts.push(innerContent);
//     }

//     lastIndex = regex.lastIndex;
//   }

//   if (lastIndex < processedText.length) {
//     parts.push(processedText.substring(lastIndex));
//   }

//   return parts.length > 0 ? parts : processedText;
// }

// import { text } from '@/lib/utilities';
// import React from 'react';

// const HIGHLIGHT_STYLES: Record<string, string> = {
//   high: 'text-orange',
//   bold: 'text-bold',
//   norm: 'text-primary',
//   pos: 'text-green',
//   neg: 'text-red',
//   food: 'text-yellow',
//   wood: 'text-brown',
//   stone: 'text-gray',
//   gold: 'text-gold',
//   purple: 'text-purple'
// };

// export function richText(key: string, variables?: Record<string, string | number>): React.ReactNode {
//   const processedText = text(key, variables);

//   const regex = /<(\w+)>(.*?)<\/\1>/g;
  
//   const parts: React.ReactNode[] = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = regex.exec(processedText)) !== null) {
//     const [fullMatch, tagName, innerContent] = match;
//     const matchIndex = match.index;

//     if (matchIndex > lastIndex) {
//       parts.push(processedText.substring(lastIndex, matchIndex));
//     }

//     if (tagName in HIGHLIGHT_STYLES) {
//       parts.push(
//         <span key={matchIndex} className={HIGHLIGHT_STYLES[tagName]}>
//           {innerContent}
//         </span>
//       );
//     } else {
//       parts.push(innerContent);
//     }

//     lastIndex = regex.lastIndex;
//   }

//   if (lastIndex < processedText.length) {
//     parts.push(processedText.substring(lastIndex));
//   }

//   return parts.length > 0 ? parts : processedText;
// }
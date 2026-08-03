import{ ReactNode } from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps {
  title?: string;
  style?: 'normal' | 'elevated';
  width?: 'full' | 'fit' | 'w-50' | 'w-25' | 'w-38' | 'w-42';
  height?: 'height-fit' | '';
  children: ReactNode;
}

export default function Card({ title, style='normal', width='full', height='', children }: CardProps) {
  const cardClasses = clsx(
    styles[style],
    styles[width],
    styles[height])

  return (
    <div className={cardClasses}>
      <h2 className="text-forged text-bold">{title}</h2>
      {children}
    </div>
  );
}
import{ ReactNode } from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps {
  title?: string;
  style?: 'normal' | 'elevated';
  width?: 'full' | 'fit' | 'w-50' | 'w-25' | 'w-33';
  children: ReactNode;
}

export default function Card({ title, style='normal', width='full', children }: CardProps) {
  const cardClasses = clsx(
    styles[style],
    styles[width])

  return (
    <div className={cardClasses}>
      <h2 className="text-forged text-bold">{title}</h2>
      {children}
    </div>
  );
}
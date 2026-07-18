import{ ReactNode } from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps {
  title?: string;
  width?: 'full' | 'fit';
  children: ReactNode;
}

export default function Card({ title, width='full', children }: CardProps) {
  const cardClasses = clsx(
    styles.elevatedCard,
    styles[width])

  return (
    <div className={cardClasses}>
      <h2 className="text-forged text-bold">{title}</h2>
      {children}
    </div>
  );
}
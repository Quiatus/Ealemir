import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  fullWidth?: boolean;
}

export default function Button({children, variant='primary', ...props}: ButtonProps) {
  const buttonClasses = [
    styles.buttonPrimary,
    styles[variant],
  ].join(' ');

  return <button className={buttonClasses} {...props}>{children}</button>
}
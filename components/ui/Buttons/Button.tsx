import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx';
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'turn' | 'plus';
  isLoading?: boolean
}

export default function Button({children, variant='primary', className, isLoading=false, disabled, ...props}: ButtonProps) {
  const buttonClasses = clsx(
    styles.buttonBase,
    styles[variant],
    className
  )

  return <button className={buttonClasses} disabled={disabled || isLoading} {...props}>{children}</button>
}
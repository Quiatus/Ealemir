import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx';
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'turn' | 'plus' | 'active';
  isLoading?: boolean
}

export default function Button({children, variant='primary', className, isLoading=false, disabled, ...props}: ButtonProps) {
  const buttonClasses = clsx(
    styles.buttonBase,
    styles[variant],
    className
  )

  return <button className={buttonClasses} disabled={disabled} {...props}>{isLoading ? "Decreeing..." : children}</button>
}
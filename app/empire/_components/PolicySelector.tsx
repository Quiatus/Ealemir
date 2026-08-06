'use client'

import Button from '@/components/ui/Buttons/Button'
import { useOptimistic, useTransition } from 'react'
import styles from "./PolicySelector.module.css"
import { PolicyOption } from '@/types/game';

interface PolicySelectorProps<T extends string> {
  currentValue: T;
  options: PolicyOption<T>[];
  onSelect: (value: T) => Promise<void>;
}

export default function PolicySelector<T extends string>({ currentValue, options, onSelect }: PolicySelectorProps<T>) {
  const [isPending, startTransition] = useTransition()
  const [optimisticValue, setOptimisticValue] = useOptimistic(currentValue, (_, newValue: T) => newValue)

  const handleSelect = (value: T) => {
    if (isPending || optimisticValue === value) return
    
    startTransition(async () => {
      setOptimisticValue(value)
      await onSelect(value)
    })
  }

  return (
    <div className={styles.wrapper}>
      {options.map((option) => (
        <div key={option.id} className={styles.row}>
          <Button 
            variant={optimisticValue === option.id ? 'active' : 'primary'}
            onClick={() => handleSelect(option.id)}
          >
            {option.label}
          </Button>
          <p>{option.description}</p>
        </div>
      ))}
    </div>
  )
}
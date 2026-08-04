'use client'

import Button from '@/components/ui/Buttons/Button'
import { updateTaxPolicy } from '@/lib/actions/empireActions'
import { text } from '@/lib/utilities'
import { Taxes } from '@/types/game'
import { useOptimistic, useTransition } from 'react'
import styles from "./Selectors.module.css"
import { richText } from '@/app/richText'
import { TAXES_MODIFIER } from '@/config/empire'

interface TaxSelectorProps {
  currentTaxes: Taxes;
}

export function TaxSelector({ currentTaxes }: TaxSelectorProps) {
  const [isPending, startTransition] = useTransition()

  const [optimisticTaxes, setOptimisticTaxes] = useOptimistic(
    currentTaxes, 
    (_, newPolicy: Taxes) => newPolicy 
  )

  const handleSelect = (policy: Taxes) => {
    if (isPending) return
    startTransition(async () => {
      setOptimisticTaxes(policy)
      await updateTaxPolicy(policy)
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <Button 
          variant={optimisticTaxes === 'oppressive' ? 'active' : 'primary'}
          onClick={() => handleSelect('oppressive')}
        >
          {text('feature_empire.card_taxes.text_oppressive')}
        </Button>
        <p>
          {richText('feature_empire.card_taxes.effect_oppressive', 
            {
              tax: (TAXES_MODIFIER.oppressive.income) * 100 - 100, 
              happiness: Math.abs(TAXES_MODIFIER.oppressive.happiness)
            })}
        </p>
      </div>
      <div className={styles.row}>
        <Button 
          variant={optimisticTaxes === 'standard' ? 'active' : 'primary'}
          onClick={() => handleSelect('standard')}
        >
          {text('feature_empire.card_taxes.text_standard')}
        </Button>
        <p>
          {richText('feature_empire.card_taxes.effect_standard')}
        </p>
      </div>
      <div className={styles.row}>
        <Button 
          variant={optimisticTaxes === 'lenient' ? 'active' : 'primary'}
          onClick={() => handleSelect('lenient')}
        >
          {text('feature_empire.card_taxes.text_lenient')}
        </Button>
        <p>
          {richText('feature_empire.card_taxes.effect_lenient', 
            {
              tax: (TAXES_MODIFIER.lenient.income) * 100, 
              happiness: TAXES_MODIFIER.lenient.happiness
            })}
        </p>
      </div>
    </div>
  )
}

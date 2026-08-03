'use client'

import Button from '@/components/ui/Buttons/Button'
import { updateTaxPolicy } from '@/lib/actions/empireActions'
import { text } from '@/lib/utilities'
import { Taxes } from '@/types/game'
import { useOptimistic, useTransition } from 'react'

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
    <div className="buttons-row">
      <Button 
        variant={optimisticTaxes === 'lenient' ? 'active' : 'primary'}
        onClick={() => handleSelect('lenient')}
      >
        {text('feature_empire.card_taxes.text_lenient')}
      </Button>

      <Button 
        variant={optimisticTaxes === 'standard' ? 'active' : 'primary'}
        onClick={() => handleSelect('standard')}
      >
        {text('feature_empire.card_taxes.text_standard')}
      </Button>

      <Button 
        variant={optimisticTaxes === 'oppressive' ? 'active' : 'primary'}
        onClick={() => handleSelect('oppressive')}
      >
        {text('feature_empire.card_taxes.text_oppressive')}
      </Button>
    </div>
  )
}

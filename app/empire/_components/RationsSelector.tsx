'use client'

import Button from '@/components/ui/Buttons/Button'
import { updateRationPolicy } from '@/lib/actions/empireActions'
import { text } from '@/lib/utilities'
import { Rations } from '@/types/game'
import { useOptimistic, useTransition } from 'react'

interface RationsSelectorProps {
  currentRations: Rations;
}

export default function RationsSelector({ currentRations }: RationsSelectorProps) {
  const [isPending, startTransition] = useTransition()

  const [optimisticRations, setOptimisticRations] = useOptimistic(
    currentRations, 
    (_, newPolicy: Rations) => newPolicy 
  )

  const handleSelect = (policy: Rations) => {
    if (isPending) return
    startTransition(async () => {
      setOptimisticRations(policy)
      await updateRationPolicy(policy)
    })
  }

  return (
    <div className="buttons-row">
      <Button 
        variant={optimisticRations === 'meager' ? 'active' : 'primary'}
        onClick={() => handleSelect('meager')}
      >
        {text('feature_empire.card_rations.text_meager')}
      </Button>

      <Button 
        variant={optimisticRations === 'standard' ? 'active' : 'primary'}
        onClick={() => handleSelect('standard')}
      >
        {text('feature_empire.card_rations.text_standard')}
      </Button>

      <Button 
        variant={optimisticRations === 'bountiful' ? 'active' : 'primary'}
        onClick={() => handleSelect('bountiful')}
      >
        {text('feature_empire.card_rations.text_bountiful')}
      </Button>
    </div>
  )
}

'use client'

import Button from '@/components/ui/Buttons/Button'
import { updateRationPolicy } from '@/lib/actions/empireActions'
import { text } from '@/lib/utilities'
import { Rations } from '@/types/game'
import { useOptimistic, useTransition } from 'react'
import styles from "./Selectors.module.css"
import { richText } from '@/app/richText'
import { RATIONS_MODIFIER } from '@/config/empire'

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
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <Button 
          variant={optimisticRations === 'meager' ? 'active' : 'primary'}
          onClick={() => handleSelect('meager')}
        >
          {text('feature_empire.card_rations.text_meager')}
        </Button>
        <p>
          {richText('feature_empire.card_rations.effect_meager', 
            {
              food: RATIONS_MODIFIER.meager.consumption, 
              people: (RATIONS_MODIFIER.meager.populationGrowth) * 100, 
              happiness: Math.abs(RATIONS_MODIFIER.meager.happiness)
            })}
        </p>
      </div>   
      <div className={styles.row}>
        <Button 
          variant={optimisticRations === 'standard' ? 'active' : 'primary'}
          onClick={() => handleSelect('standard')}
        >
          {text('feature_empire.card_rations.text_standard')}
        </Button>
        <p>
          {richText('feature_empire.card_rations.effect_standard')}
        </p>
      </div>
      <div className={styles.row}>
        <Button 
          variant={optimisticRations === 'bountiful' ? 'active' : 'primary'}
          onClick={() => handleSelect('bountiful')}
        >
          {text('feature_empire.card_rations.text_bountiful')}
        </Button>
        <p>
          {richText('feature_empire.card_rations.effect_bountiful', 
            {
              food: RATIONS_MODIFIER.bountiful.consumption, 
              people: (RATIONS_MODIFIER.bountiful.populationGrowth) * 100 - 100, 
              happiness: RATIONS_MODIFIER.bountiful.happiness
            })}
        </p>
      </div>
    </div>
  )
}

'use client'

import { useTransition } from 'react'
import { progressTurn } from '@/lib/actions/systemActions'
import Button from './Button'
import { dynamicInfoTooltip } from '@/lib/adapters/tooltips'
import styles from './EndTurnButton.module.css'
import InfoTooltip from './Tooltip/InfoTooltip'

export default function EndTurnButton() {
  const [isPending, startTransition] = useTransition()
  const infoTooltip = dynamicInfoTooltip()

  function handleNextTurn() {
    startTransition(async () => {
      const result = await progressTurn()

      if (!result.success) {
        alert(result.message) 
      }
    })
  }

  return (
    <div>
      <InfoTooltip data={infoTooltip.buttonNextMonth}>
        <Button variant='turn' onClick={handleNextTurn} disabled={isPending}>
          <img 
          src="/icons/resources/turn.png" 
          alt="" 
          className={styles.buttonIcon} 
        />
        </Button>
      </InfoTooltip>
    </div>
  )
}
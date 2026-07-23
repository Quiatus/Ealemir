'use client'

import { useTransition } from 'react'
import { progressTurn } from '@/lib/actions/systemActions'
import Button from './Button'
import Tooltip from './Tooltip/Tooltip'
import { dynamicInfoTooltip } from '@/lib/adapters/tooltips'
import styles from './EndTurnButton.module.css'

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
      <Tooltip data={infoTooltip.buttonNextMonth}>
        <Button variant='turn' onClick={handleNextTurn} disabled={isPending}>
          <img 
          src="/icons/resources/turn.png" 
          alt="" 
          className={styles.buttonIcon} 
        />
        </Button>
      </Tooltip>
    </div>
  )
}
'use client'

import { useTransition } from 'react'
import { progressTurn } from '@/lib/actions/systemActions'
import Button from './Button'
import Tooltip from './Tooltip/Tooltip'
import { dynamicInfoTooltip } from '@/lib/adapters/tooltips'


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
    <div  className="space-l">
      <Tooltip data={infoTooltip.buttonNextMonth}>
        <Button variant='turn' onClick={handleNextTurn} disabled={isPending}>
          
        </Button>
      </Tooltip>
    </div>
  )
}
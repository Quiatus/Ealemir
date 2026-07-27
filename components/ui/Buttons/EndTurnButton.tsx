'use client'

import { useTransition } from 'react'
import { progressTurn } from '@/lib/actions/systemActions'
import Button from './Button'
import Image from 'next/image'

export default function EndTurnButton() {
  const [isPending, startTransition] = useTransition()

  function handleNextTurn() {
    startTransition(async () => {
      const result = await progressTurn()
  
        if (!result.success) {
          alert(result.message) 
        }
      })
    }
  
  return (
    <Button variant='turn' onClick={handleNextTurn} disabled={isPending}>
      <Image src="/icons/resources/turn.png" alt="" width={50} height={50} />
    </Button>
  )
}

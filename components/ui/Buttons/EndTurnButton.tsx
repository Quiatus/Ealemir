'use client'

import { useState, useTransition } from 'react'
import { progressTurn } from '@/lib/actions/systemActions'
import Button from './Button'
import Image from 'next/image'
import ErrorModal from '../ErrorModal'
import { text } from '@/lib/utilities'

export default function EndTurnButton() {
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  function handleNextTurn() {
    startTransition(async () => {
      const result = await progressTurn()
  
      if (result && !result.success) {
        setIsErrorModalOpen(true)
        setErrorMessage(result.message || text("errors.progress_turn_failed_message"))
      }
    })
  }
  
  return (
    <>
      <Button variant='turn' onClick={handleNextTurn} disabled={isPending}>
        <Image src="/icons/resources/turn.png" alt="" width={50} height={50} />
      </Button>
      <ErrorModal 
        isOpen={isErrorModalOpen}
        title={text("errors.progress_turn_failed_title")}
        message={errorMessage} 
        onConfirm={() => {
          setIsErrorModalOpen(false)
          setErrorMessage(null) 
        }}
      />
    </>
  )
}

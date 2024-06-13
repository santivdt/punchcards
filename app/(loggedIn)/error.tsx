'use client'

import { Button } from '@/components/ui/button'
import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
    Sentry.captureException(error)
  }, [error])

  return (
    <div>
      <h1 className='text-lg mt-12 font-bold'>Oh no, Something went wrong!</h1>
      <Button className='mt-4' onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}

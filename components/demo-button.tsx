'use client'

import { demoSignIn } from '@/app/(website)/login/actions'
import { Button } from './ui/button'

const DemoButton = () => {
  return (
    <Button
      size='xxl'
      variant='outline'
      className='rounded-full text-lg '
      onClick={async (event) => {
        event.preventDefault()
        try {
          await demoSignIn()
        } catch (error) {
          console.error(error)
        }
      }}
    >
      View demo{' '}
    </Button>
  )
}

export default DemoButton

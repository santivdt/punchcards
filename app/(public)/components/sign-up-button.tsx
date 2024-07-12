'use client'

import { Button } from '@/components/ui/button'
import { Link } from 'nextjs13-progress'

const SignUpButton = () => {
  return (
    <Button size='xxl' asChild className='rounded-full mr-4 text-lg'>
      <Link href='/signup'>Get started</Link>
    </Button>
  )
}

export default SignUpButton

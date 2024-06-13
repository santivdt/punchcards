'use client'

import DemoButton from '@/components/demo-button'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Link } from 'nextjs13-progress'

const Hero = () => {
  return (
    <motion.div
      initial={{ y: '20px', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className='flex gap-8'
    >
      <div className='w-1/2'>
        <h1 className='text-bold text-7xl text-balance'>
          Manage your prepaid hours with ease
        </h1>
        <p className='mt-8 text-xl'>
          Easily keep track of prepaid hours, open hours while providing your
          clients with unmatched transparency. Win, win.
        </p>
        <div className='flex mt-6'>
          <Button size='xxl' asChild className='rounded-full mr-4 text-lg'>
            <Link href='/signup'>Get started</Link>
          </Button>
          <DemoButton />
        </div>
      </div>
      <motion.div className='w-1/2 flex justify-center items-center'>
        {/* <Image src='/card.jpg' width='400' height='400' alt='Punchcard' /> */}
      </motion.div>
    </motion.div>
  )
}

export default Hero

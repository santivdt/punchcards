'use client'

import DemoButton from '@/app/(public)/components/demo-button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SignUpButton from './sign-up-button'

const Hero = () => {
  return (
    <>
      <motion.section
        initial={{ y: '20px', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className='flex flex-col lg:flex-row gap-20 w-full lg:mx-0 max-w-7xl py-20 px-8'
      >
        <div className='w-full lg:w-3/5'>
          <h1 className='text-bold text-5xl md:text-7xl text-balance'>
            Manage your prepaid hours with ease
          </h1>
          <p className='mt-8 text-xl'>
            Easily keep track of prepaid hours, open hours and income while
            providing your clients with unmatched transparency. Win, win.
          </p>
          <div className='flex flex-col md:flex-row mt-6'>
            <SignUpButton />
            <DemoButton />
          </div>
        </div>
        <motion.div className='w-auto flex justify-center items-center'>
          <Image
            src='/demo.png'
            width='800'
            height='800'
            alt='Punchcard'
            priority
          />
        </motion.div>
      </motion.section>
    </>
  )
}

export default Hero

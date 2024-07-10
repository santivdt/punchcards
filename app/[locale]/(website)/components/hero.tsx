'use client'

import DemoButton from '@/app/[locale]/(website)/components/demo-button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import SignUpButton from './sign-up-button'

const Hero = () => {
  const { t } = useTranslation()
  return (
    <>
      <motion.section
        initial={{ y: '20px', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className='flex flex-col lg:flex-row gap-20 w-full mx-8 lg:mx-0'
      >
        <div className='w-full lg:w-3/5'>
          <h1 className='text-bold text-5xl md:text-7xl text-balance'>
            {t('header')}
          </h1>
          <p className='mt-8 text-xl'>{t('intro')}</p>
          <div className='flex flex-col md:flex-row mt-6'>
            <SignUpButton />
            <DemoButton />
          </div>
        </div>
        <motion.div className='w-auto flex justify-center items-center'>
          <Image src='/demo.png' width='800' height='800' alt='Punchcard' />
        </motion.div>
      </motion.section>
    </>
  )
}

export default Hero

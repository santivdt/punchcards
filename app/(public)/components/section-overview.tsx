'use client'

import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const FeatureCard = ({
  title,
  description,
  delay,
  icon,
}: {
  title: string
  description: string
  delay: number
  icon?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className='p-8 bg-purple-200 rounded w-1/3 flex flex-col items-center min-h-[200px] justify-start'
  >
    <Sparkles className='text-neutral-700 mb-4' />
    <h3 className='text-2xl text-neutral-700 font-bold mb-8'>{title}</h3>
    <p className='text-neutral-700 text-center'>{description}</p>
  </motion.div>
)

const FeaturesSection = () => {
  return (
    <section className='bg-gradient-to-b from-black via-purple-800 to-purple-300 py-32 w-full flex justify-center'>
      <div className='max-w-7xl w-full flex flex-col items-center px-8'>
        <h2 className='text-5xl mb-12 text-white'>Features</h2>
        <div className='flex w-full justify-between gap-16'>
          <FeatureCard
            title='Track with ease'
            description='Easily keep track of your hours and cards'
            delay={0.2}
          />
          <FeatureCard
            title='Report like a pro'
            description='Easily keep track of your hours and cards'
            delay={0.4}
          />
          <FeatureCard
            title='Manage your cards'
            description='Easily keep track of your hours and cards'
            delay={0.6}
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

'use client'

import { demoSignIn } from '@/app/(website)/login/actions'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Link } from 'nextjs13-progress'

const IndexPage = () => {
  return (
    <>
      <div className='h-[calc(100vh-200px)]  flex items-center'>
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
              Easily keep track of prepaid hours, open hours while providing
              your clients with unmatched transparency. Win, win.
            </p>
            <div className='flex mt-6'>
              <Button size='xxl' asChild className='rounded-full mr-4 text-lg'>
                <Link href='/signup'>Get started</Link>
              </Button>
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
            </div>
          </div>
          {/* <motion.div className='w-1/2 flex justify-center items-center'>
            <Image src='/card.jpg' width='400' height='400' alt='Punchcard' />
          </motion.div> */}
        </motion.div>
        ,
      </div>
    </>
  )
}

export default IndexPage

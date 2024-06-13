'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Link } from 'nextjs13-progress'

const Nav = () => {
  return (
    <motion.nav
      initial={{ y: '-20px', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className='navbar'
    >
      <nav className='w-full flex justify-between items-center py-4'>
        <div className='font-bold text-3xl'>Punchy</div>
        <div>
          <Button variant='secondary' className='mr-2' asChild>
            <Link href='/login'>Login</Link>
          </Button>
          <Button asChild>
            <Link href='/signup'>Sign Up</Link>
          </Button>
        </div>
      </nav>
    </motion.nav>
  )
}

export default Nav

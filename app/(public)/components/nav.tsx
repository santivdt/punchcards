'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { motion } from 'framer-motion'
import { BadgeEuro, Info, LogIn, Mail, Menu, UserPlus } from 'lucide-react'
import { Link } from 'nextjs13-progress'
import { User } from '@supabase/supabase-js'

const menuItems = [
  { title: 'About', href: '/about' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Contact', href: '/contact' },
]

const Nav = ({ user }: { user: User | undefined }) => {
  const mobileMenu = [
    { name: 'About', href: '/about', icon: <Info /> },
    { name: 'Pricing', href: '/pricing', icon: <BadgeEuro /> },
    { name: 'Contact', href: '/contact', icon: <Mail /> },
    { name: 'Sign in', href: '/login', icon: <LogIn /> },
    { name: 'Sign up', href: '/signup', icon: <UserPlus /> },
  ]

  return (
    <motion.header
      initial={{ y: '-20px', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <nav className='w-full flex justify-between items-center py-4 max-w-7xl mx-auto px-4'>
        <div className='font-bold text-3xl relative'>
          <Link href='/'>Punch it!</Link>
          <Badge className='ml-2 text-sm absolute top-0 bg-purple-900 hover:bg-purple-900 hover:cursor-default'>
            Beta
          </Badge>
        </div>
        <div className='hidden lg:flex'>
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className='mr-10 font-semibold dark:hover:text-white'
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className='hidden lg:flex'>
          {user ? (
            <Button asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant='secondary' className='mr-2' asChild>
                <Link href='/login'>Login</Link>
              </Button>
              <Button asChild>
                <Link href='/signup'>Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <div className='lg:hidden'>
          <div className='lg:hidden ml-2]'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[150px]'>
                {mobileMenu.map((item) => (
                  <DropdownMenuItem asChild key={item.name}>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Nav

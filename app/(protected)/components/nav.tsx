import { getOrganisation, getProfile } from '@/app/(protected)/settings/actions'
import { signOut } from '@/app/(public)/login/actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  CircleGauge,
  FileClock,
  FilePlus2,
  LogOut,
  Settings,
  Users,
} from 'lucide-react'
import { Link } from 'nextjs13-progress'
import ThemeSwitcher from '@/components/theme-switcher'
import FeedbackButton from './feedback-button'

const Nav = async () => {
  const [{ data: userProfile }, { data: organisation }] = await Promise.all([
    getProfile(),
    getOrganisation(),
  ])

  //TODO how to render the icons?
  const mobileMenu = [
    { name: 'Dashboard', href: '/dashboard', icon: <CircleGauge /> },
    { name: 'Clients', href: '/clients', icon: <Users /> },
    { name: 'Cards', href: '/cards', icon: <FilePlus2 /> },
    { name: 'Hours', href: '/hours', icon: <FileClock /> },
    { name: 'Settings', href: '/settings/profile', icon: <Settings /> },
  ]

  return (
    <div className='lg:hidden justify-between lg:justify-end h-[50px] flex items-center px-4 py-8 border-b dark:border-neutral-800'>
      <p className='lg:hidden flex items-center text-lg font-bold dark:text-white'>
        {userProfile && (
          <Link href='/settings/profile'>
            {organisation ? organisation.name : 'Hi there!'}
          </Link>
        )}
      </p>
      <div className='flex items-center gap-2'>
        <FeedbackButton />
        <ThemeSwitcher />
        <div className='lg:hidden ml-2]'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <HamburgerMenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[150px]'>
              {mobileMenu.map((item) => (
                <DropdownMenuItem asChild key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <form action={signOut} className='flex gap-1'>
                  <LogOut size={14} />
                  <button>Logout</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Nav

import { signOut } from '@/app/login/actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tables } from '@/types/supabase'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Link } from 'nextjs13-progress'
import ThemeSwitcher from './theme-switcher'

type NavProps = {
  userProfile: Tables<'profiles'> | null
}

const Nav = ({ userProfile }: NavProps) => {
  const mobileMenu = [
    { name: 'Dashboard', href: '/u/dashboard' },
    { name: 'Clients', href: '/u/clients' },
    { name: 'Cards', href: '/u/cards' },
    { name: 'Hours', href: '/u/hours' },
    { name: 'Profile', href: '/u/profile' },
  ]

  return (
    <div className='justify-between lg:justify-end h-[50px] flex items-center px-4 py-8 border-b dark:border-neutral-800'>
      <p className='lg:hidden flex items-center text-lg font-bold dark:text-white'>
        {userProfile && (
          <Link href='/u/profile'>{userProfile.company ?? 'Hi there!'}</Link>
        )}
      </p>
      <div className='flex items-center '>
        <ThemeSwitcher />
        <div className='lg:hidden ml-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <HamburgerMenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {mobileMenu.map((item) => (
                <DropdownMenuContent key={item.name}>
                  <DropdownMenuItem asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ))}
              <DropdownMenuItem asChild>
                <form action={signOut}>
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

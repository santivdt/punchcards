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
              <DropdownMenuItem asChild>
                <Link href='/u/dashboard'>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/u/clients'>Clients</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/u/cards'>Cards</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/u/hours'>Hours</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/u/profile'>Profile</Link>
              </DropdownMenuItem>
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

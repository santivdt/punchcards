import { signOut } from '@/app/login/actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tables } from '@/types/supabase'
import { ChevronDown, UserRound } from 'lucide-react'
import { Link } from 'nextjs13-progress'
import ThemeSwitcher from './theme-switcher'

type NavProps = {
  userProfile: Tables<'profiles'> | null
}

const Nav = ({ userProfile }: NavProps) => {
  return (
    <div className=' h-[50px] flex items-center px-6 py-8'>
      <div className='flex-1 '>
        <h1 className='flex flex-1 items-center h-10 text-lg font-bold dark:text-white'>
          {userProfile && (
            <Link href='/u/profile'>{userProfile.company ?? 'Hi there!'}</Link>
          )}
        </h1>
      </div>
      <div className='flex items-center '>
        <div className='overflow-hidden rounded-full mr-1'>
          <Link href='/u/profile'>
            <UserRound size='22' />
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ChevronDown size='18' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild className='lg:hidden'>
              <Link href='/u/dashboard'>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='lg:hidden'>
              <Link href='/u/clients'>Clients</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='lg:hidden'>
              <Link href='/u/cards'>Cards</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='lg:hidden'>
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
            <DropdownMenuItem>
              <ThemeSwitcher>
                <span>Switch mode</span>
              </ThemeSwitcher>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Nav

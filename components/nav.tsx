import { getProfile } from '@/app/(loggedIn)/profile/actions'
import { signOut } from '@/app/(website)/login/actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Link } from 'nextjs13-progress'
import FeedbackButton from './feedback-button'
import ThemeSwitcher from './theme-switcher'

const Nav = async () => {
  const { data: userProfile } = await getProfile()

  const mobileMenu = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Clients', href: '/clients' },
    { name: 'Cards', href: '/cards' },
    { name: 'Hours', href: '/hours' },
    { name: 'Profile', href: '/profile' },
  ]

  return (
    <div className='justify-between lg:justify-end h-[50px] flex items-center px-4 py-8 border-b dark:border-neutral-800'>
      <p className='lg:hidden flex items-center text-lg font-bold dark:text-white'>
        {userProfile && (
          <Link href='/profile'>{userProfile.company ?? 'Hi there!'}</Link>
        )}
      </p>
      <div className='flex items-center '>
        <FeedbackButton />
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

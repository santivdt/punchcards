import { signOut } from '@/app/login/actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'
import { Link } from 'nextjs13-progress'
import ThemeSwitcher from './theme-switcher'

type HeaderProps = {
  title: string
  children?: React.ReactNode
}

const Header = ({ title, children }: HeaderProps) => {
  return (
    <header className='flex items-center py-4 mb-8 border-b dark:border-neutral-800'>
      <div className='flex items-center flex-1'>
        <div className='lg:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu size='24' className='mr-2' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href='/u/dashboard'>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/u/clients'>Clients</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/u/cards'>Cards</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/u/hours'>Hours</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href='/u/profile'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ThemeSwitcher children='Switch mode' />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <form action={signOut}>
                  <button>Logout</button>
                </form>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h2 className='flex items-center flex-1 h-10 text-lg font-bold'>
          {title}
        </h2>
      </div>
      {children && <div>{children}</div>}
    </header>
  )
}

export default Header

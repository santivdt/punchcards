import { signOut } from '@/app/login/actions'
import Item from '@/components/sidebar/item'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tables } from '@/types/supabase'
import { Settings } from 'lucide-react'
import { Link } from 'nextjs13-progress'

export const loggedInItems = [
  { href: '/u/dashboard', label: 'Dashboard' },
  { href: '/u/clients', label: 'Clients' },
  { href: '/u/cards', label: 'Cards' },
  { href: '/u/hours', label: 'Hours' },
]
export const loggedOutItems = [{ href: '/login', label: 'Login' }]

type SideBarProps = {
  userProfile: Tables<'profiles'> | null
}
const Sidebar = async ({ userProfile }: SideBarProps) => {
  return (
    <aside className='w-full max-w-[200px] p-4 flex flex-col border-r'>
      <div className='flex items-center mb-4 pl-4'>
        <h1 className='flex flex-1 items-center h-10 text-lg font-bold'>
          {userProfile ? (
            <Link href='/u/profile'>{userProfile.company ?? 'Hi there!'}</Link>
          ) : (
            <Link href='/u/profile'>Edit profile</Link>
          )}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Settings size='18' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
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

      <>
        <ul className='flex-1'>
          {loggedInItems.map((item) => (
            <li key={item.href} className='mb-2'>
              <Item {...item} />
            </li>
          ))}
        </ul>
      </>
    </aside>
  )
}

export default Sidebar

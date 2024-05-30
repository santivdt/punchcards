import Item from '@/components/sidebar/item'
import { Tables } from '@/types/supabase'

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
    <aside className='hidden lg:flex w-full max-w-[200px] p-4 flex-col border-r dark:border-neutral-800'>
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

import { signOut } from '@/app/login/actions'
import { getProfile } from '@/app/u/profile/actions'
import Item from '@/components/sidebar/item'
import { useOptionalUser } from '@/utils/auth'
import Link from 'next/link'

export const loggedInItems = [
  { href: '/u/dashboard', label: 'Dashboard' },
  { href: '/u/clients', label: 'Clients' },
  { href: '/u/cards', label: 'Cards' },
  { href: '/u/hours', label: 'Hours' },
]
// TODO GIEL hoe kan ik hier user info krijgen? Dan krijg je dus die error die wij hadden
export const loggedOutItems = [{ href: '/login', label: 'Login' }]

const Sidebar = async () => {
  return (
    <aside className='w-full max-w-[200px] p-4 flex flex-col border-r'>
      <h1 className='flex items-center h-10 px-4 mb-4 text-lg font-bold'>
        {/* {userProfile ? (
          <Link href='/u/profile'>
            {userProfile.company.length > 0 ? userProfile.company : 'Hi there!'}
          </Link>
        ) : (
          ''
        )} */}{' '}
        Hi there
      </h1>

      <>
        <ul className='flex-1'>
          {loggedInItems.map((item) => (
            <li key={item.href} className='mb-2'>
              <Item {...item} />
            </li>
          ))}
        </ul>
        <form action={signOut}>
          <button>Logout</button>
        </form>
      </>
    </aside>
  )
}

export default Sidebar

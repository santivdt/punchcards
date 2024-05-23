import { signOut } from '@/app/login/actions'
import { getProfile } from '@/app/profile/actions'
import Item from '@/components/sidebar/item'
import { requireUser, useOptionalUser } from '@/utils/auth'
import Link from 'next/link'
import CompanyName from './company-name'

export const loggedInItems = [
  { href: '/clients', label: 'Clients' },
  { href: '/cards', label: 'Cards' },
  { href: '/hours', label: 'Hours' },
]

export const loggedOutItems = [{ href: '/login', label: 'Login' }]

export default async function Sidebar() {
  const user = await requireUser()
  const userProfile = await getProfile(user.id)

  return (
    <aside className='w-full max-w-[200px] p-4 flex flex-col border-r'>
      <h1 className='flex items-center h-10 px-4 mb-4 text-lg font-bold'>
        <CompanyName userProfile={userProfile}></CompanyName>
      </h1>

      {user ? (
        <>
          <ul className='flex-1'>
            {loggedInItems.map((item) => (
              <li key={item.href}>
                <Item {...item} />
              </li>
            ))}
          </ul>
          <form action={signOut}>
            <button>Logout</button>
          </form>
        </>
      ) : (
        <ul className='flex-1'>
          {loggedOutItems.map((item) => (
            <li key={item.href}>
              <Item {...item} />
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

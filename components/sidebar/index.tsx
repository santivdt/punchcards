import { signOut } from '@/app/login/actions'
import { getProfile } from '@/app/profile/actions'
import Item from '@/components/sidebar/item'
import { useOptionalUser } from '@/utils/auth'
import CompanyName from './company-name'

export const loggedInItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/clients', label: 'Clients' },
  { href: '/cards', label: 'Cards' },
  { href: '/hours', label: 'Hours' },
]

export const loggedOutItems = [{ href: '/login', label: 'Login' }]

export default async function Sidebar() {
  let userProfile = undefined
  const user = await useOptionalUser()

  if (user) {
    userProfile = await getProfile(user.id)
  }

  return (
    <aside className='w-full max-w-[200px] p-4 flex flex-col border-r'>
      <h1 className='flex items-center h-10 px-4 mb-4 text-lg font-bold'>
        {userProfile ? <CompanyName userProfile={userProfile} /> : ''}
      </h1>

      {user && (
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
      )}
    </aside>
  )
}

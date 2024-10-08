import Item from '@/app/(protected)/components/sidebar/item'
import { getOrganisation, getProfile } from '@/app/(protected)/settings/actions'
import { requireUser } from '@/utils/auth'
import { Circle } from 'lucide-react'
import Image from 'next/image'
import { Link } from 'nextjs13-progress'
import DropDownMenuSidebar from './dropdown-menu'

export const loggedInItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/clients', label: 'Clients' },
  { href: '/cards', label: 'Cards' },
  { href: '/hours', label: 'Track time' },
  { href: '/settings/profile', label: 'Settings' },
]

const Sidebar = async () => {
  const [{ data: userProfile }, { data: organisation }, user] =
    await Promise.all([getProfile(), getOrganisation(), requireUser()])

  return (
    <aside className='hidden lg:flex w-full max-w-[250px] bg-slate-1 h-screen px-5 py-5 flex-col border-r dark:border-neutral-800'>
      <div className='flex items-center h-10 text-lg font-bold dark:text-white mb-8 lg:pl-2 gap-2'>
        {organisation && organisation.logo && (
          <Image
            src={organisation.logo}
            width='30'
            height='30'
            alt='Logo'
            className='rounded-full'
          />
        )}
        <Link href='/settings/profile'>
          {organisation ? organisation.name : 'Hi there!'}
        </Link>
      </div>
      <ul className='flex-1'>
        {loggedInItems.map((item) => (
          <li
            key={item.href}
            className=' hover:bg-neutral-700 hover:rounded-md'
          >
            <Item {...item} />
          </li>
        ))}
        {(!userProfile?.first_name ||
          !userProfile?.last_name ||
          !organisation?.name) && (
          <li>
            <div className='mb-2 px-2 py-1 gap-2 flex rounded-md border border-purple-500 items-center hover:text-black hover:bg-neutral-200 text-neutral-500 hover:dark:bg-neutral-900 dark:hover:text-white dark:text-neutral-400'>
              <Link href='/settings/profile' className='flex items-center'>
                <Circle size='14' className='text-purple-500 mr-2' />
                Finish onboarding
              </Link>
            </div>
          </li>
        )}
      </ul>
      <div className='flex justify-between items-center'>
        <div className='flex items-center overflow-hidden mr-2'>
          {userProfile && userProfile.avatar ? (
            <Image
              src={userProfile?.avatar}
              width='25'
              height='25'
              alt='Avatar'
            />
          ) : (
            <svg
              width='20'
              height='20'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z'
                fill='currentColor'
                fillRule='evenodd'
                clipRule='evenodd'
              ></path>
            </svg>
          )}
          <span className='ml-2 overflow-hidden whitespace-nowrap w-fit'>
            {user?.email}
          </span>
        </div>
        <DropDownMenuSidebar />
      </div>
    </aside>
  )
}

export default Sidebar

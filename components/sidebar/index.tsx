import { getOrganisation, getProfile } from '@/app/(loggedIn)/settings/actions'
import { signOut } from '@/app/(website)/login/actions'
import Item from '@/components/sidebar/item'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { requireUser } from '@/utils/auth'
import { Circle } from 'lucide-react'
import Image from 'next/image'
import { Link } from 'nextjs13-progress'

export const loggedInItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/clients', label: 'Clients' },
  { href: '/cards', label: 'Cards' },
  { href: '/hours', label: 'Track time' },
]

const Sidebar = async () => {
  const { data: userProfile } = await getProfile()
  const { data: organisation } = await getOrganisation()
  const user = await requireUser()

  return (
    <aside className='hidden lg:flex w-full max-w-[250px] bg-slate-1 h-screen px-5 py-3 flex-col border-r dark:border-neutral-800'>
      <p className='flex items-center h-10 text-lg font-bold dark:text-white mb-8 lg:pl-2 gap-2'>
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
      </p>
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
              <Circle size='14' className='text-purple-500' />
              Finish onboarding
            </div>
          </li>
        )}
      </ul>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
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
          <span className='ml-2'>{user?.email}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <svg
              width='15'
              height='15'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z'
                fill='currentColor'
                fillRule='evenodd'
                clipRule='evenodd'
              ></path>
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild className='lg:hidden'>
              <Link href='/dashboard'>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='lg:hidden'>
              <Link href='/clients'>Clients</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='lg:hidden'>
              <Link href='/cards'>Cards</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='lg:hidden'>
              <Link href='/hours'>Hours</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/settings/profile'>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form action={signOut}>
                <button>Logout</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}

export default Sidebar

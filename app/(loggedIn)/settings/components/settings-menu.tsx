'use client'
import { cn } from '@/utils'
import { usePathname } from 'next/navigation'
import { Link } from 'nextjs13-progress'

const SettingsMenu = () => {
  const pathname = usePathname()

  const menuItems = [
    { label: 'Profile', path: '/settings/profile' },
    { label: 'Organisation', path: '/settings/organisation' },
    { label: 'Team', path: '/settings/team' },
  ]

  return (
    <div dir='ltr' className='mb-16'>
      <div className='relative mb-4 flex items-center gap-2 overflow-auto scroll-pb-6 outline-none'>
        {menuItems.map((item) => (
          <div key={item.label} className='relative'>
            <div
              className={cn(
                'text-neutral-500 inline-flex cursor-pointer select-none items-center text-sm font-semibold hover:bg-neutral-200 h-8 rounded-md px-2',
                pathname === item.path &&
                  'bg-neutral-200 dark:text-white dark:bg-neutral-900 text-slate-120'
              )}
            >
              <Link href={item.path}>{item.label}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SettingsMenu

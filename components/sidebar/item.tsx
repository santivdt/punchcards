'use client'

import { cn } from '@/utils'
import { CircleGauge, FileClock, ScrollText, Users } from 'lucide-react'
import { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { Link } from 'nextjs13-progress'

export type ItemProps = {
  label: string
  href: LinkProps['href']
}

const Item = ({ href, label }: ItemProps) => {
  const pathname = usePathname()

  const RenderIcon = () => {
    switch (label) {
      case 'Dashboard':
        return <CircleGauge size='14' className='mr-2' />
      case 'Clients':
        return <Users size='14' className='mr-2' />
      case 'Cards':
        return <ScrollText size='14' className='mr-2' />
      case 'Track time':
        return <FileClock size='14' className='mr-2' />
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        ' mb-2 px-2 py-1 flex rounded-md items-center hover:text-black hover:bg-neutral-200 text-neutral-500 hover:dark:bg-neutral-900 dark:hover:text-white dark:text-neutral-400  ',
        pathname === href &&
          'bg-neutral-200 dark:text-white text-black dark:bg-neutral-900  '
      )}
    >
      <RenderIcon />
      <Link href={href}>{label}</Link>
    </div>
  )
}

export default Item

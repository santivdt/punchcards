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
      case 'Hours':
        return <FileClock size='14' className='mr-2' />
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        'flex rounded-xl items-center text-neutral-500 hover:text-black dark:hover:text-white dark:text-neutral-400  transition-colors',
        pathname === href && 'dark:text-white text-black  '
      )}
    >
      <RenderIcon />
      <Link href={href}>{label}</Link>
    </div>
  )
}

export default Item

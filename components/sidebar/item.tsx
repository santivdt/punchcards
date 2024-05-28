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
        'flex py-2 px-4 rounded-xl items-center hover:bg-neutral-100 text-neutral-500 transition-colors',
        pathname === href &&
          'bg-neutral-100 hover:bg-neutral-200 text-foreground'
      )}
    >
      <RenderIcon />
      <Link href={href}>{label}</Link>
    </div>
  )
}

export default Item

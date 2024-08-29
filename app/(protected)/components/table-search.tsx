'use client'

import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'

export default function TableSearch() {
  const searchParams = useSearchParams()

  const defaultValue = searchParams.get('q') || ''

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.currentTarget.value

    const params = new URLSearchParams(searchParams.toString())
    params.set('q', newQuery)

    window.history.pushState(null, '', `?${params.toString()}`)
  }

  return (
    <Input
      placeholder='Search...'
      onChange={handleSearchChange}
      className='max-w-sm w-[250px]'
      defaultValue={defaultValue}
    />
  )
}

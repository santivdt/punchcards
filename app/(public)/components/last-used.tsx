import { Badge } from '@/components/ui/badge'

const LastUsed = () => {
  return (
    <div className='absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap ml-1 px-4 py-1 rounded-md text-xs'>
      <Badge className='bg-green-600'>Last used</Badge>
    </div>
  )
}

export default LastUsed

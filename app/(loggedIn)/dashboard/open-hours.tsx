import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils'
import { FileClock } from 'lucide-react'

type OpenHoursProps = {
  openHours: number | undefined
}

const OpenHours = ({ openHours }: OpenHoursProps) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className=' font-medium'>Open hours</CardTitle>
        <FileClock className='h-4 w-4 ' />
      </CardHeader>
      <CardContent>
        <div
          className={cn('', {
            'font-bold text-2xl': openHours && openHours > 0,
          })}
        >
          {openHours && openHours > 0 ? `€${openHours}` : 'No open hours'}
        </div>
      </CardContent>
    </Card>
  )
}

export default OpenHours

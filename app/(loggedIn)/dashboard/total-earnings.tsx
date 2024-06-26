import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils'
import { Banknote } from 'lucide-react'
type TotalEarningsProps = {
  totalEarnings: number | undefined
}

const TotalEarnings = ({ totalEarnings }: TotalEarningsProps) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className=' font-medium'>Total earnings</CardTitle>
        <Banknote className='h-4 w-4 ' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'></div>
        <div
          className={cn('', {
            'font-bold text-2xl': totalEarnings && totalEarnings > 0,
          })}
        >
          {totalEarnings && totalEarnings > 0
            ? `€${totalEarnings}`
            : 'No earnings yet'}
        </div>
      </CardContent>
    </Card>
  )
}

export default TotalEarnings

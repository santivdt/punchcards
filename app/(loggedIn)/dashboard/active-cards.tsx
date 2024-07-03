import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tables } from '@/types/supabase'
import { cn } from '@/utils'
import { Link } from 'nextjs13-progress'

type ActiveCardProps = {
  cards: Tables<'cards'>[] | null
}

const ActiveCards = ({ cards }: ActiveCardProps) => {
  return (
    <Link href='/cards'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='font-medium'>Active cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn('', {
              'font-bold text-2xl': cards && cards.length > 0,
            })}
          >
            {cards && cards.length > 0 ? cards.length : 'No active cards'}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ActiveCards

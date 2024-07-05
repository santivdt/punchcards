import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CardWithClient } from '@/types/custom-types'
import { Link } from 'nextjs13-progress'

type RecentActiveCardsProps = {
  cards: CardWithClient[] | null
}

const RecentActiveCards = ({ cards }: RecentActiveCardsProps) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className=' font-medium'>Recent cards</CardTitle>
      </CardHeader>
      <CardContent>
        {cards && cards.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[50px]'>#</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead className='text-right'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className='font-medium'>
                    <Link href={`/cards/${card.id}`}>{card.readable_id}</Link>
                  </TableCell>
                  <TableCell>
                    <div className='font-medium'>
                      <Link href={`/clients/${card.clients?.id}`}>
                        {card.clients?.name}
                      </Link>
                    </div>
                    <div className='hidden md:inline'>
                      {card.clients?.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    {card.hours_left}/{card.hours}
                  </TableCell>
                  <TableCell className='text-right'></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          'No recent cards found'
        )}
      </CardContent>
    </Card>
  )
}

export default RecentActiveCards

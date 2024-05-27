import Header from '@/components/header'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { requireUser } from '@/utils/auth'
import { Banknote, FileClock } from 'lucide-react'
import {
  getActiveCards,
  getTotalEarnings,
  getOpenHours,
  getTopClients,
} from './actions'

const Page = async () => {
  requireUser()
  const { data: cards } = await getActiveCards()
  const { data: openHours } = await getOpenHours()
  const { data: totalEarnings } = await getTotalEarnings()
  const topClients = await getTopClients()

  return (
    <div>
      <Header title='Dashboard' />
      <div className='flex min-h-screen w-full flex-col'>
        <main className='flex flex-1 flex-col gap-4 md:gap-8'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active cards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {cards && cards.length > 0 ? cards.length : 'Nope'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Open hours
                </CardTitle>
                <FileClock className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{openHours} hours</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total earnings
                </CardTitle>
                <Banknote className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>€{totalEarnings}</div>
              </CardContent>
            </Card>
          </div>
          <div className='grid gap-4 md:gap-8 lg:grid-cols-1 xl:grid-cols-2'>
            <Card className='xl:col-span-2'>
              <CardHeader className='flex flex-row items-center'>
                <div className='grid gap-2'>
                  <CardTitle>Top 5 customers</CardTitle>
                  <CardDescription>By earnings </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className='text-right'>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topClients.map((topClient) => (
                      <TableRow key={topClient.id}>
                        <TableCell>
                          <div className='font-medium'>{topClient.name}</div>
                          <div className='hidden text-sm text-muted-foreground md:inline'>
                            {topClient.email}
                          </div>
                        </TableCell>
                        <TableCell className='text-right'>
                          €{topClient.totalPrice}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page

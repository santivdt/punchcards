import LoadingHeader from '@/components/loading-header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
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
import { Link } from 'nextjs13-progress'
import {
  getActiveCards,
  getOpenHours,
  getTopClients,
  getTotalEarnings,
} from './actions'

const Page = async () => {
  requireUser()
  const { data: cards } = await getActiveCards()
  const { data: openHours } = await getOpenHours()
  const { data: totalEarnings } = await getTotalEarnings()
  const topClients = await getTopClients()

  return (
    <div>
      <LoadingHeader />
      <div className='flex w-full flex-col'>
        <main className='flex flex-1 flex-col gap-4 md:gap-8'>
          <div className='grid gap-4 md:grid-cols-3 md:gap-8 '>
            <Link href='/u/cards'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='font-medium'>Active cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    <Skeleton className='w-[40px] h-[60px]' />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='font-medium'>Open hours</CardTitle>
                <FileClock className='h-4 w-4 ' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-[90px] h-[30px]' />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='font-medium'>Total earnings</CardTitle>
                <Banknote className='h-4 w-4 ' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-[90px] h-[30px]' />
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
                {topClients && topClients.length > 0 ? (
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
                            <div className='hidden   md:inline'>
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
                ) : (
                  <p>Your topclients will appear here.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page

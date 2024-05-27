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
import { getActiveCards, getTotalEarnings, getOpenHours } from './actions'

const Page = async () => {
  requireUser()
  const { data: cards } = await getActiveCards()
  const { data: openHours } = await getOpenHours()
  const { data: totalEarnings } = await getTotalEarnings()

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
                  <CardTitle>Top customers</CardTitle>
                  <CardDescription>By cards </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className='hidden xl:table-column'>
                        Type
                      </TableHead>
                      <TableHead className='hidden xl:table-column'>
                        Status
                      </TableHead>
                      <TableHead className='hidden xl:table-column'>
                        Date
                      </TableHead>
                      <TableHead className='text-right'>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Liam Johnson</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          liam@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Sale
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-23
                      </TableCell>
                      <TableCell className='text-right'>$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Olivia Smith</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          olivia@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Refund
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Declined
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-24
                      </TableCell>
                      <TableCell className='text-right'>$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Noah Williams</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          noah@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Subscription
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-25
                      </TableCell>
                      <TableCell className='text-right'>$350.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Emma Brown</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          emma@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Sale
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-26
                      </TableCell>
                      <TableCell className='text-right'>$450.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Liam Johnson</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          liam@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Sale
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-27
                      </TableCell>
                      <TableCell className='text-right'>$550.00</TableCell>
                    </TableRow>
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

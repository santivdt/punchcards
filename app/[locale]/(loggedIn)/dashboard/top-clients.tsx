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
import { TopClient } from '@/types/custom-types'

type TopClientProps = {
  topClients: TopClient[]
}

const TopClients = ({ topClients }: TopClientProps) => {
  return (
    <Card>
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
                    <div className='hidden md:inline'>{topClient.email}</div>
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
  )
}

export default TopClients

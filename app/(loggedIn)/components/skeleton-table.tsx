import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const SkeletonTable = () => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className='h-4 w-[25px]' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-4 w-[100px]' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-4 w-[100px]' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-4 w-[100px]' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-4 w-[100px]' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-4 w-[100px]' />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className='h-4 w-[25px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-4 w-[25px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-4 w-[25px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-[100px]' />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default SkeletonTable

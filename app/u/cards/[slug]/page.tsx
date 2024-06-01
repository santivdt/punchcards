import { getCardFromSlug } from '@/app/u/cards/actions'
import { getHoursFromCard } from '@/app/u/hours/actions'
import { DataTable } from '@/app/u/hours/table'
import { columns } from '@/app/u/hours/table/columns'
import Header from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { requireUser } from '@/utils/auth'
import { ArrowDownToLine } from 'lucide-react'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  requireUser()
  const { data: card } = await getCardFromSlug(slug)
  const { data: hours } = await getHoursFromCard(slug)

  console.log(card)

  return (
    <>
      <Header title={`Hours for card #${card?.readable_id}`}>
        <Button variant='outline'>
          <ArrowDownToLine />
          Export
        </Button>
      </Header>
      <div className='flex justify-end w-full mb-2'>
        {card?.is_active ? (
          <Badge variant='outline' className=' bg-indigo-700'>
            Active
          </Badge>
        ) : (
          <Badge variant='outline' className=' bg-red-900'>
            Expired
          </Badge>
        )}
      </div>
      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default Page

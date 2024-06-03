import { getCardFromSlug } from '@/app/u/cards/actions'
import { getHoursFromCard } from '@/app/u/hours/actions'
import { DataTable } from '@/app/u/hours/table'
import { columns } from '@/app/u/hours/table/columns'
import Header from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { requireUser } from '@/utils/auth'
import { ArrowDownToLine } from 'lucide-react'
import { getClientsFromUser } from '../../clients/actions'
import InterMediateCreateHour from '../../hours/intermediate-create-hour'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  requireUser()
  const { data: card } = await getCardFromSlug(slug)
  const { data: hours } = await getHoursFromCard(slug)
  const { data: clients } = await getClientsFromUser()

  console.log(card)

  return (
    <>
      <Header
        title={`Hours for card #${card?.readable_id} - ${card?.clients?.name}`}
      >
        <Button
          variant='default'
          className='mr-2 text-sm h-8 pl-3 pr-3 rounded-md gap-1 font-semibold bg-black dark:bg-white text-white dark:text-black border-slate-6 hover:bg-black/90 dark:hover:bg-white/90 focus-visible:ring-2 dark:focus-visible:ring-white/40 focus-visible:ring-black/40 focus-visible:outline-none dark:focus-visible:bg-white/90 focus-visible:bg-black/90 disabled:hover:bg-black dark:disabled:hover:bg-white inline-flex items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 cursor-pointer'
        >
          <ArrowDownToLine size={16} /> Export
        </Button>
        <InterMediateCreateHour clients={clients} type='secondary' />
      </Header>
      <div className='flex justify-end w-full mb-2'>
        {card?.is_active ? (
          <Badge variant='outline' className='bg-indigo-700 text-white'>
            Active
          </Badge>
        ) : (
          <Badge variant='outline' className='bg-red-900 text-white'>
            Expired
          </Badge>
        )}
      </div>
      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default Page

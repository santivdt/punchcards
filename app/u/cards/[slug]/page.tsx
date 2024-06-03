import { getCardFromSlug } from '@/app/u/cards/actions'
import { getHoursFromCard } from '@/app/u/hours/actions'
import { DataTable } from '@/app/u/hours/table'
import { columns } from '@/app/u/hours/table/columns'
import Header from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { requireUser } from '@/utils/auth'
import 'jspdf-autotable'
import { getClientsFromUser } from '../../clients/actions'
import InterMediateCreateHour from '../../hours/intermediate-create-hour'
import GeneratePDFButton from './generate-pdf'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  requireUser()
  const { data: card } = await getCardFromSlug(slug)
  const { data: hours } = await getHoursFromCard(slug)
  const { data: clients } = await getClientsFromUser()

  return (
    <>
      <Header
        title={`Hours for card #${card?.readable_id} - ${card?.clients?.name}`}
      >
        {card && hours && <GeneratePDFButton card={card} hours={hours} />}
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

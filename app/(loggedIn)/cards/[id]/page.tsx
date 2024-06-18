import {
  getActiveCardsFromUser,
  getCardFromId,
} from '@/app/(loggedIn)/cards/actions'
import { getHoursFromCard } from '@/app/(loggedIn)/hours/actions'
import { DataTable } from '@/app/(loggedIn)/hours/table'
import { columns } from '@/app/(loggedIn)/hours/table/columns'
import Header from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { requireUser } from '@/utils/auth'
import 'jspdf-autotable'
import InterMediateCreateHour from '../../hours/intermediate-create-hour'
import GeneratePDFButton from './generate-pdf'

type PageProps = { id: string }

const Page = async ({ params: { id } }: { params: PageProps }) => {
  requireUser()
  const { data: card } = await getCardFromId(id)
  const { data: hours } = await getHoursFromCard(id)
  const { data: activeCards } = await getActiveCardsFromUser()

  return (
    <>
      <Header
        title={`Hours for card #${card?.readable_id} - ${card?.clients?.name}`}
      >
        {card && hours && <GeneratePDFButton card={card} hours={hours} />}
        <InterMediateCreateHour
          activeCards={activeCards}
          type='secondary'
          cardId={id}
        />
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

import {
  getActiveCardsFromUser,
  getCardFromId,
} from '@/app/(protected)/cards/actions'
import { getHoursFromCard } from '@/app/(protected)/hours/actions'
import { DataTable } from '@/app/(protected)/hours/table'
import { columns } from '@/app/(protected)/hours/table/columns'
import Header from '@/components/header'
import { Badge } from '@/components/ui/badge'
import InterMediateCreateHour from '../../hours/intermediate-create-hour'
import { getOrganisation } from '@/app/(protected)/settings/actions'
import GeneratePdfNew from './generate-pdf'

type PageProps = { id: string }

const CardDetailPage = async ({ params: { id } }: { params: PageProps }) => {
  const [
    { data: card },
    { data: hours },
    { data: activeCards },
    { data: organisation },
  ] = await Promise.all([
    getCardFromId(id),
    getHoursFromCard(id),
    getActiveCardsFromUser(),
    getOrganisation(),
  ])

  return (
    <>
      {/* {card && hours && card.clients && organisation && (
        <ViewPdf card={card} hours={hours} organisation={organisation} />
      )} */}
      <Header
        title={`Card #${card?.readable_id} - ${card?.clients?.name}`}
        subPageName={card?.clients?.name}
      >
        {card && hours && card.clients && (
          <GeneratePdfNew
            card={card}
            hours={hours}
            organisation={organisation}
          />
        )}
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

export default CardDetailPage

import Header from '@/components/header'
import { getActiveCardsFromUser } from '../cards/actions'
import { getClientsFromUser } from '../clients/actions'
import QuickAddHours from '../components/quick-add-hours'
import { getHoursFromUser } from './actions'
import InterMediateCreateHour from './intermediate-create-hour'
import { DataTable } from './table'
import { columns } from './table/columns'

const HourPage = async () => {
  const [{ data: hours }, { data: activeCards }, { data: clients }] =
    await Promise.all([
      getHoursFromUser(),
      getActiveCardsFromUser(),
      getClientsFromUser(),
    ])

  return (
    <>
      <Header title='Hours'>
        <InterMediateCreateHour activeCards={activeCards} />
      </Header>
      <QuickAddHours activeCards={activeCards} />
      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default HourPage

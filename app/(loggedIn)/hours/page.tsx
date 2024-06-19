import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getActiveCardsFromUser } from '../cards/actions'
import { getHoursFromUser } from './actions'
import InterMediateCreateHour from './intermediate-create-hour'
import { DataTable } from './table'
import { columns } from './table/columns'

const HourPage = async () => {
  const { data: hours } = await getHoursFromUser()
  const { data: activeCards } = await getActiveCardsFromUser()

  return (
    <>
      <Header title='Hours'>
        <InterMediateCreateHour activeCards={activeCards} />
      </Header>
      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default HourPage

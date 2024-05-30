import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getClientsFromUser } from '../clients/actions'
import { getHoursFromUser } from './actions'
import InterMediateCreateHour from './intermediate-create-hour'
import { DataTable } from './table'
import { columns } from './table/columns'

const HourPage = async () => {
  requireUser()
  const { data: hours } = await getHoursFromUser()
  const { data: clients } = await getClientsFromUser()

  return (
    <>
      <Header title='Hours'>
        <InterMediateCreateHour clients={clients} />
      </Header>
      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default HourPage

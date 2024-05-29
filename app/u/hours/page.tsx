import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { requireUser } from '@/utils/auth'
import { getClientsFromUser } from '../clients/actions'
import { getHoursFromUser } from './actions'
import CreateHourDialog from './create'
import { DataTable } from './table'
import { columns } from './table/columns'

const HourPage = async () => {
  requireUser()
  const { data: hours } = await getHoursFromUser()
  const { data: clients } = await getClientsFromUser()

  return (
    <>
      <Header title='Hours'>
        <CreateHourDialog clients={clients}>
          <Button>Track time</Button>
        </CreateHourDialog>
      </Header>
      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default HourPage

import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { requireUser } from '@/utils/auth'
import CreateHourDialog from './create'
import { getClientsFromUser } from '../clients/actions'
import { DataTable } from './table'
import { columns } from './table/columns'
import { getHoursFromUser } from './actions'

const HourPage = async () => {
  const user = await requireUser()
  const { data: hours } = await getHoursFromUser(user.id)
  const { data: clients } = await getClientsFromUser(user.id)

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

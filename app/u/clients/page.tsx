import { getClientsFromUser } from '@/app/u/clients/actions'
import CreateClientDialog from '@/app/u/clients/create'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { requireUser } from '@/utils/auth'
import { DataTable } from './table'
import { columns } from './table/columns'

const ClientsPage = async () => {
  const user = await requireUser()
  const { data: clients } = await getClientsFromUser(user.id)

  return (
    <>
      <Header title='Clients'>
        <CreateClientDialog>
          <Button>Add Client</Button>
        </CreateClientDialog>
      </Header>
      <DataTable columns={columns} data={clients} />
    </>
  )
}

export default ClientsPage

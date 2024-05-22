import { getClientsFromUser } from '@/app/clients/actions'
import CreateClientDialog from '@/app/clients/create'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { requireUser } from '@/utils/auth'
import { DataTable } from './Table/data-table'
import { columns } from './Table/columns'

export default async function ClientsPage() {
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

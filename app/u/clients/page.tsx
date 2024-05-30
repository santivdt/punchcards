import { getClientsFromUser } from '@/app/u/clients/actions'
import CreateClientDialog from '@/app/u/clients/create'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { requireUser } from '@/utils/auth'
import { SquarePlus } from 'lucide-react'
import { DataTable } from './table'
import { columns } from './table/columns'

const ClientsPage = async () => {
  requireUser()
  const { data: clients } = await getClientsFromUser()

  return (
    <>
      <Header title='Clients'>
        <CreateClientDialog>
          <Button variant='ghost'>
            <SquarePlus className='dark:text-white mr-2' size={16} /> Add client
          </Button>
        </CreateClientDialog>
      </Header>
      <DataTable columns={columns} data={clients} />
    </>
  )
}

export default ClientsPage

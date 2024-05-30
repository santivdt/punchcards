import { getClientsFromUser } from '@/app/u/clients/actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import InterMediateCreateClient from './intermediate-create-client'
import { DataTable } from './table'
import { columns } from './table/columns'

const ClientsPage = async () => {
  requireUser()
  const { data: clients } = await getClientsFromUser()

  return (
    <>
      <Header title='Clients'>
        <InterMediateCreateClient />
      </Header>
      <DataTable columns={columns} data={clients} />
    </>
  )
}

export default ClientsPage

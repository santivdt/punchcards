import { getClientsFromUser } from '@/app/(loggedIn)/clients/actions'
import Header from '@/components/header'
import InterMediateCreateClient from './intermediate-create-client'
import { DataTable } from './table'
import { columns } from './table/columns'

const ClientsPage = async () => {
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

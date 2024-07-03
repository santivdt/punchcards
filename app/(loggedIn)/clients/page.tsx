import { getClientsFromUserNew } from '@/app/(loggedIn)/clients/actions'
import Header from '@/components/header'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import InterMediateCreateClient from './intermediate-create-client'
import { DataTable } from './table'
import { columns } from './table/columns'

const ClientsPage = async () => {
  //TODO this is now because i am using try catch in the other file and using catch error message but not sure.
  const response = await getClientsFromUserNew()

  // TODO now i have to load like this where as i have generic loading in the other file?
  if (!response) {
    ;<p>Could not get clients</p>
  }
  // TODO this should be typed correctly?
  const clients = (response as PostgrestSingleResponse<any>).data

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

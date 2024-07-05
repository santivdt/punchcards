import { getCardsFromUser } from '@/app/(loggedIn)/cards/actions'
import { getClientsFromUser } from '@/app/(loggedIn)/clients/actions'
import Header from '@/components/header'
import InterMediateCreateCard from './intermediate-create-card'
import { DataTable } from './table'
import { columns } from './table/columns'

const CardsPage = async () => {
  const [{ data: cards }, { data: clients }] = await Promise.all([
    getCardsFromUser(),
    getClientsFromUser(),
  ])

  return (
    <>
      <Header title='Cards'>
        <InterMediateCreateCard clients={clients} />
      </Header>
      <DataTable columns={columns} data={cards} />
    </>
  )
}

export default CardsPage

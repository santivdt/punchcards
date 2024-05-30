import { getCardsFromUser } from '@/app/u/cards/actions'
import { getClientsFromUser } from '@/app/u/clients/actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import InterMediateCreateCard from './intermediate-create-card'
import { DataTable } from './table'
import { columns } from './table/columns'

const CardsPage = async () => {
  requireUser()
  const { data: cards } = await getCardsFromUser()
  const { data: clients } = await getClientsFromUser()

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

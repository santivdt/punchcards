import { getCardsFromUser } from '@/app/cards/actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { DataTable } from './table'
import { columns } from './table/columns'
import { Button } from '@/components/ui/button'
import CreateCardDialog from './create'
import { getClientsFromUser } from '../clients/actions'

const CardsPage = async () => {
  const user = await requireUser()
  const { data: cards } = await getCardsFromUser(user.id)
  const { data: clients } = await getClientsFromUser(user.id)

  return (
    <>
      <Header title='Cards'>
        <CreateCardDialog clients={clients}>
          <Button>Add card</Button>
        </CreateCardDialog>
      </Header>
      <DataTable columns={columns} data={cards} />
    </>
  )
}

export default CardsPage

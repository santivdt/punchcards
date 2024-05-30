import { getCardsFromUser } from '@/app/u/cards/actions'
import { getClientsFromUser } from '@/app/u/clients/actions'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { requireUser } from '@/utils/auth'
import { SquarePlus } from 'lucide-react'
import CreateCardDialog from './create'
import { DataTable } from './table'
import { columns } from './table/columns'

const CardsPage = async () => {
  requireUser()
  const { data: cards } = await getCardsFromUser()
  const { data: clients } = await getClientsFromUser()

  return (
    <>
      <Header title='Cards'>
        <CreateCardDialog clients={clients}>
          <Button variant='ghost'>
            <SquarePlus className='dark:text-white mr-2' size={16} /> Add card
          </Button>
        </CreateCardDialog>
      </Header>
      <DataTable columns={columns} data={cards} />
    </>
  )
}

export default CardsPage

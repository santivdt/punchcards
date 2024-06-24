import { getCardsFromUser } from '@/app/(loggedIn)/cards/actions'
import { getClientsFromUser } from '@/app/(loggedIn)/clients/actions'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import CreateCardDialog from './create'
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
        <CreateCardDialog clients={clients}>
          <Button
            variant='default'
            className='text-md h-12 px-3 rounded-md gap-1 font-semibold bg-black dark:bg-white text-white dark:text-black border-slate-6 hover:bg-black/90 dark:hover:bg-white/90 focus-visible:ring-2 dark:focus-visible:ring-white/40 focus-visible:ring-black/40 focus-visible:outline-none dark:focus-visible:bg-white/90 focus-visible:bg-black/90 disabled:hover:bg-black dark:disabled:hover:bg-white inline-flex items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 cursor-pointer'
          >
            <Plus size={16} className='mr-1' /> New
          </Button>
        </CreateCardDialog>
      </Header>
      <DataTable columns={columns} data={cards} />
    </>
  )
}

export default CardsPage

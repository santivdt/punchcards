import { getCardsFromClient } from '@/app/u/cards/actions'
import { DataTable } from '@/app/u/cards/table'
import { columns } from '@/app/u/cards/table/columns'
import { getClientFromId } from '@/app/u/clients/actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'

type PageProps = { id: string }

const Page = async ({ params: { id } }: { params: PageProps }) => {
  requireUser()
  const { data: cards } = await getCardsFromClient(id)
  const { data: client } = await getClientFromId(id)

  return (
    <>
      <Header title={`Cards from ${client?.name}`} />
      <DataTable columns={columns} data={cards} />
    </>
  )
}

export default Page

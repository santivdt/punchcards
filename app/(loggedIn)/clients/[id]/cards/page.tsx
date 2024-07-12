import { getCardsFromClient } from '@/app/(loggedIn)/cards/actions'
import { DataTable } from '@/app/(loggedIn)/cards/table'
import { columns } from '@/app/(loggedIn)/cards/table/columns'
import { getClientFromId } from '@/app/(loggedIn)/clients/actions'
import Header from '@/components/header'

type PageProps = { id: string }

const Page = async ({ params: { id } }: { params: PageProps }) => {
  const [{ data: cards }, { data: client }] = await Promise.all([
    getCardsFromClient(id),
    getClientFromId(id),
  ])

  return (
    <>
      <Header title={`Cards from ${client?.name}`} />
      <DataTable columns={columns} data={cards} />
    </>
  )
}

export default Page

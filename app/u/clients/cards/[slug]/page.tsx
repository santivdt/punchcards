import { getCardsFromClient } from '@/app/u/cards/actions'
import { DataTable } from '@/app/u/cards/table'
import { columns } from '@/app/u/cards/table/columns'
import { getClientFromSlug } from '@/app/u/clients/actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  const user = await requireUser()
  const { data: cards } = await getCardsFromClient(slug)
  const { data: client } = await getClientFromSlug(slug)

  return (
    <>
      <Header title={`Cards from ${client?.name}`} />
      <DataTable columns={columns} data={cards} />
    </>
  )
}

export default Page

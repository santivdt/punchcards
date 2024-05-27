import { DataTable } from '@/app/u/cards/table'
import { columns } from '@/app/u/cards/table/columns'
import { getCardsFromClient } from '@/app/u/cards/actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getClientFromSlug } from '@/app/u/clients/actions'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  const user = await requireUser()
  const { data: cards } = await getCardsFromClient(slug, user.id)
  const { data: client } = await getClientFromSlug(slug, user.id)

  return (
    <>
      <Header title={`Cards from ${client?.name}`} />
      <DataTable columns={columns} data={cards} />
    </>
  )
}

export default Page

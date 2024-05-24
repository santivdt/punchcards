import { DataTable } from '@/app/cards/table'
import { columns } from '@/app/cards/table/columns'
import { getCardsfromClient } from './actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  const user = await requireUser()
  const { data: cards } = await getCardsfromClient(slug)

  return (
    <>
      {cards && <Header title={`${cards[0].clients.name}`} />}
      <DataTable columns={columns} data={cards} />
    </>
  )
}

export default Page

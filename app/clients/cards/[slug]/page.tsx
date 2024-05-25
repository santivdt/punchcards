import { DataTable } from '@/app/cards/table'
import { columns } from '@/app/cards/table/columns'
import { getCardsFromClient } from './actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  const user = await requireUser()
  const { data: cards } = await getCardsFromClient(slug)
  // TODO hier gaat iets mis met ophalen data en laten zien van no results found in the table
  return (
    <>
      {cards && cards.length > 0 ? (
        <>
          <Header title={`Cards from ${cards[0].clients.name}`} />
          <DataTable columns={columns} data={cards} />
        </>
      ) : (
        <p>No results found</p>
      )}
    </>
  )
}

export default Page

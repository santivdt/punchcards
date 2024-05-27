import { DataTable } from '@/app/u/hours/table'
import { columns } from '@/app/u/hours/table/columns'
import { getCardFromSlug } from '@/app/u/cards/actions'
import { getHoursFromCard } from '@/app/u/hours/actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  const user = await requireUser()
  const readable_id = await getCardFromSlug(slug)
  const { data: hours } = await getHoursFromCard(slug)

  return (
    <>
      <Header title={`Hours for card #${readable_id}`} />

      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default Page

import { DataTable } from '@/app/u/hours/table'
import { columns } from '@/app/u/hours/table/columns'
import { getCardFromSlug, getHoursFromCard } from './actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  requireUser()
  const readable_id = await getCardFromSlug(slug)
  const hours = (await getHoursFromCard(slug)).data

  return (
    <>
      <Header title={`Hours for card #${readable_id}`} />

      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default Page

import { DataTable } from '@/app/hours/table'
import { columns } from '@/app/hours/table/columns'
import { getHoursFromCard } from './actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  requireUser()
  const { data: hours } = await getHoursFromCard(slug)

  return (
    <>
      {hours && hours.length > 0 && (
        <Header title={`Hours for card #${hours[0].cards.readable_id}`} />
      )}
      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default Page

import { DataTable } from '@/app/u/hours/table'
import { columns } from '@/app/u/hours/table/columns'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getHoursFromClient } from '@/app/u/hours/actions'
import { getClientFromSlug } from '../../actions'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  await requireUser()
  const { data: hours } = await getHoursFromClient(slug)
  const { data: client } = await getClientFromSlug(slug)

  return (
    <>
      <Header title={`Hours from ${client?.name}`} />
      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default Page

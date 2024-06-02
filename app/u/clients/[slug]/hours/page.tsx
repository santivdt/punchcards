import { getHoursFromClient } from '@/app/u/hours/actions'
import { DataTable } from '@/app/u/hours/table'
import { columns } from '@/app/u/hours/table/columns'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getClientFromSlug } from '../../actions'

type PageProps = { id: string }

const Page = async ({ params: { id } }: { params: PageProps }) => {
  requireUser()
  const { data: hours } = await getHoursFromClient(id)
  const { data: client } = await getClientFromSlug(id)

  return (
    <>
      <Header title={`Hours from ${client?.name}`} />
      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default Page

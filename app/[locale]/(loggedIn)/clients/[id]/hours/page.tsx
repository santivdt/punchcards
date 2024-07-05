import { getHoursFromClient } from '@/app/[locale]/(loggedIn)/hours/actions'
import { DataTable } from '@/app/[locale]/(loggedIn)/hours/table'
import { columns } from '@/app/[locale]/(loggedIn)/hours/table/columns'
import Header from '@/components/header'
import { getClientFromId } from '../../actions'

type PageProps = { id: string }

const Page = async ({ params: { id } }: { params: PageProps }) => {
  const [{ data: hours }, { data: client }] = await Promise.all([
    getHoursFromClient(id),
    getClientFromId(id),
  ])

  return (
    <>
      <Header title={`Hours from ${client?.name}`} />
      <DataTable columns={columns} data={hours} />
    </>
  )
}

export default Page

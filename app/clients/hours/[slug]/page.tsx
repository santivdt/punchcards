import { DataTable } from '@/app/hours/table'
import { columns } from '@/app/hours/table/columns'
import { getHoursFromClient } from './actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  const user = await requireUser()
  const { data: hours } = await getHoursFromClient(slug)
  // TODO hier gaat iets mis met ophalen data en laten zien van no results found in the table
  return (
    <>
      {hours && hours.length > 0 ? (
        <>
          <Header title={`Hours from ${hours[0].clients.name}`} />
          <DataTable columns={columns} data={hours} />
        </>
      ) : (
        <p>No results found</p>
      )}
    </>
  )
}

export default Page

import { getClient } from '@/app/(loggedIn)/clients/actions'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { requireUser } from '@/utils/auth'
import Link from 'next/link'

type PageProps = { id: string }

const Page = async ({ params: { id } }: { params: PageProps }) => {
  requireUser()
  const { data: client } = await getClient(id)
  return (
    <>
      <Header title={`Detail page of ${client?.name}`} />
      <div>{client?.email}</div>
      <div className='my-4 space-x-2'>
        <Button variant='outline' asChild>
          <Link href={`/(loggedIn)/clients/${id}/cards`}>View cards</Link>
        </Button>
        <Button variant='outline' asChild>
          <Link href={`/(loggedIn)/clients/${id}/hours`}>View hours</Link>
        </Button>
      </div>
    </>
  )
}

export default Page

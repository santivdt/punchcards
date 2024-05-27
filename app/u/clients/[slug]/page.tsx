import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getClient } from '@/app/u/clients/actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type PageProps = { slug: string }

const Page = async ({ params: { slug } }: { params: PageProps }) => {
  const user = await requireUser()
  const { data: client } = await getClient(slug)
  return (
    <>
      <Header title={`Detail page of ${client?.name}`} />
      <div>{client?.email}</div>
      <div className='my-4 space-x-2'>
        <Button variant='outline' asChild>
          <Link href={`/u/clients/cards/${slug}`}>View cards</Link>
        </Button>
        <Button variant='outline' asChild>
          <Link href={`/u/clients/hours/${slug}`}>View hours</Link>
        </Button>
      </div>
    </>
  )
}

export default Page

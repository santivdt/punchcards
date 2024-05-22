import Header from '@/components/header'
import { requireUser } from '@/utils/auth'

export default async function ClientsPage() {
  await requireUser()

  return (
    <>
      <Header title='Hours' />
    </>
  )
}

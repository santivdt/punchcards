import { getCardsFromUser } from '@/app/cards/actions'
import Header from '@/components/header'
import { requireUser } from '@/utils/auth'

export default async function ClientsPage() {
  const user = await requireUser()
  const { data: cards } = await getCardsFromUser(user.id)

  console.log(cards)

  return (
    <>
      <Header title='Cards' />
    </>
  )
}

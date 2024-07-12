import { Button } from '@/components/ui/button'
import { useOptionalUser } from '@/utils/auth'

const DashBoardButton = async () => {
  const user = await useOptionalUser()
  return <>{user && <Button>Dashboard</Button>}</>
}

export default DashBoardButton

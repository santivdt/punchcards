import Sidebar from '@/components/sidebar'
import { getProfile } from './profile/actions'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { data: userProfile } = await getProfile()

  return (
    <div className='flex max-w-4xl gap-4 mx-auto min-h-dvh'>
      <Sidebar userProfile={userProfile} />
      <div className='flex-1 px-4'>{children}</div>
    </div>
  )
}

export default Layout

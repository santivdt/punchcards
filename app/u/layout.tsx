import Nav from '@/components/nav'
import Sidebar from '@/components/sidebar'
import { getProfile } from './profile/actions'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { data: userProfile } = await getProfile()

  return (
    <div className='w-full max-w-7xl'>
      <Nav userProfile={userProfile} />
      <div className='flex gap-4 mx-auto h-[calc(100vh-80px)]'>
        <Sidebar userProfile={userProfile} />
        <div className='flex-1 px-4 overflow-scroll'>{children}</div>
      </div>
    </div>
  )
}

export default Layout

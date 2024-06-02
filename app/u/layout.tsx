import Nav from '@/components/nav'
import Sidebar from '@/components/sidebar'
import { requireUser } from '@/utils/auth'
import { getProfile } from './profile/actions'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { data: userProfile } = await getProfile()
  const user = await requireUser()

  return (
    <div className='flex w-full min-[1800px]:max-w-7xl'>
      <Sidebar userProfile={userProfile} user={user} />
      <div className='flex flex-col mx-auto w-full  '>
        <Nav userProfile={userProfile} />
        <div className='flex-1 px-4 overflow-scroll h-[calc(100vh-80px)] lg:min-w-[1000px] lg:mx-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout

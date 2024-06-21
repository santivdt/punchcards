import Nav from '@/app/(loggedIn)/components/nav'
import Sidebar from '@/app/(loggedIn)/components/sidebar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex justify-center'>
      <div className='flex w-full min-[1800px]:max-w-7xl'>
        <Sidebar />
        <div className='flex flex-col mx-auto w-full'>
          <Nav />
          <div className='flex-1 px-4 overflow-scroll h-[calc(100vh-80px)] lg:min-w-[1000px] lg:mx-auto'>
            <div className='2xl:pl-28'>{children}</div>
          </div>
        </div>
      </div>
      <SpeedInsights />
      <Analytics />
    </main>
  )
}

export default RootLayout

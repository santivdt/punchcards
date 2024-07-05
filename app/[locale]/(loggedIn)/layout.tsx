import Nav from '@/app/[locale]/(loggedIn)/components/nav'
import Sidebar from '@/app/[locale]/(loggedIn)/components/sidebar'
import ThemeSwitcher from '@/components/theme-switcher'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'
import FeedbackButton from './components/feedback-button'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex justify-center'>
      <div className='flex w-full'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <Nav />
          <div className='flex-1 px-8 overflow-scroll h-[calc(100vh-80px)] '>
            <div className=''>{children}</div>
          </div>
        </div>
      </div>
      <SpeedInsights />
      <Analytics />
      <div className='hidden md:flex absolute bottom-3 right-3'>
        <FeedbackButton />
        <ThemeSwitcher />
      </div>
    </main>
  )
}

export default RootLayout

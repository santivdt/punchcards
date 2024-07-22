import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'
import Footer from './components/footer'
import Nav from './components/nav'
import { useOptionalUser } from '@/utils/auth'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await useOptionalUser()

  return (
    <>
      <Nav user={user} />
      <main className='flex flex-col flex-1 max-w-7xl mx-auto px-4 justify-center'>
        {children}
        <SpeedInsights />
        <Analytics />
      </main>
      <Footer />
    </>
  )
}

export default RootLayout

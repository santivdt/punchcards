import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'
import Footer from './components/footer'
import Nav from './components/nav'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <main className='flex flex-col h-[calc(100vh-100px)] max-w-7xl mx-auto px-4 justify-center'>
        {children}
        <SpeedInsights />
        <Analytics />
      </main>
      <Footer />
    </>
  )
}

export default RootLayout

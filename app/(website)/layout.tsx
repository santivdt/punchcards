import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Coffee } from 'lucide-react'
import '../globals.css'
import Nav from './components/nav'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex flex-col h-screen  max-w-7xl mx-auto '>
      <Nav />
      <div className='flex-1 flex flex-col'>
        {children}
        <footer className='mt-auto w-full py-4 text-center flex items-center justify-center'>
          Made with <Coffee className='mx-1' size={16} /> in Amsterdam
        </footer>
      </div>
      <SpeedInsights />
      <Analytics />
    </main>
  )
}

export default RootLayout

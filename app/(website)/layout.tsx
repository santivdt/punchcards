import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import { Next13NProgress } from 'nextjs13-progress'

import ToastProvider from '@/components/toast-provider'
import { Coffee } from 'lucide-react'
import '../globals.css'
import Nav from './components/nav'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Punchcards - Santi van den Toorn',
  description: 'Portfolio project of Santi van den Toorn',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='antialiased dark:bg-black dark:text-neutral-300 h-screen'>
        <ThemeProvider attribute='class'>
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
          <Next13NProgress
            color='#6D49FF'
            height={3}
            options={{ showSpinner: false }}
          />
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout

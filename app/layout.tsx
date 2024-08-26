import ToastProvider from '@/components/toast-provider'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import { Next13NProgress } from 'nextjs13-progress'
import { Metadata } from 'next'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Punch it!',
  description: 'Track your time with Punchcards',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='antialiased bg-white dark:bg-black dark:text-neutral-300 h-screen flex flex-col'>
        <ThemeProvider attribute='class'>
          {children}
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

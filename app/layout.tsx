import ToastProvider from '@/components/toast-provider'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import { Next13NProgress } from 'nextjs13-progress'

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

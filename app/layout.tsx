import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import { Next13NProgress } from 'nextjs13-progress'

import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Freelance front-end developer',
  description: 'Portfolio project of Santi van den Toorn',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='antialiased dark:bg-black dark:text-neutral-300'>
        <ThemeProvider attribute='class'>
          <main className='flex justify-center'>
            {children}
            <SpeedInsights />
          </main>
          <Next13NProgress color='#6D49FF' height={3} />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout

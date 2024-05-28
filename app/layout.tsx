import { GeistSans } from 'geist/font/sans'
import { Next13NProgress } from 'nextjs13-progress'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Hire me :)!',
  description: 'Manage your clients and their prepaid hours',
  icons: {
    icon: '/icon.png',
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={GeistSans.className}>
      <body>
        <main className='hidden lg:flex'>{children}</main>
        <main className='flex justify-center mx-10 lg:hidden'>
          <p className='mt-6'>
            For now this app only works on desktop. You can visit my website at{' '}
            <a className='underline' href='https://santi.tech'>
              santi.tech.
            </a>
          </p>
        </main>
        <Next13NProgress color='#6D49FF' height={3} />
      </body>
    </html>
  )
}

export default RootLayout

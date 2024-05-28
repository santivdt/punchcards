import { GeistSans } from 'geist/font/sans'
import { Next13NProgress } from 'nextjs13-progress'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Prepaid hours app',
  description: 'Manage your clients and their prepaid hours',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={GeistSans.className}>
      <body>
        <main>{children}</main>
        <Next13NProgress color='#6D49FF' height={3} />
      </body>
    </html>
  )
}

export default RootLayout

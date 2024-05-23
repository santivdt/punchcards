import Sidebar from '@/components/sidebar'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Prepaid hours app',
  description: 'Manage your clients and their prepaid hours',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body>
        <main className='flex max-w-4xl gap-4 mx-auto min-h-dvh'>
          <Sidebar />
          <div className='flex-1 px-4'>{children}</div>
        </main>
      </body>
    </html>
  )
}

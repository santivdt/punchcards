import Sidebar from '@/components/sidebar'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
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

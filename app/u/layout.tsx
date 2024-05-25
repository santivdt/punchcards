import Sidebar from '@/components/sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex max-w-4xl gap-4 mx-auto min-h-dvh'>
      <Sidebar />
      <div className='flex-1 px-4'>{children}</div>
    </div>
  )
}

export default Layout

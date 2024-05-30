import Breadcrumbs from './breadcrumb'

type HeaderProps = {
  title: string
  children?: React.ReactNode
}

const Header = ({ title, children }: HeaderProps) => {
  return (
    <header className='flex flex-col w-full pb-2 '>
      <div className='flex items-center justify-between  pt-4 pb-2  border-b dark:border-neutral-800 flex-1 '>
        <div className=' flex flex-row  items-center'>
          <h2 className='flex items-center flex-1  text-md font-bold'>
            {title}
          </h2>
        </div>
        {children && <div>{children}</div>}
      </div>
      <Breadcrumbs />
    </header>
  )
}

export default Header

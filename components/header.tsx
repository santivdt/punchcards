import Breadcrumbs from './breadcrumb'

type HeaderProps = {
  title: string
  children?: React.ReactNode
}

const Header = ({ title, children }: HeaderProps) => {
  return (
    <header className='flex flex-col w-full py-4 pl-5 lg:pl-0 '>
      <div className='flex items-center justify-between  pt-4 pb-2   flex-1 '>
        <div className=' flex flex-row  items-center'>
          <h1 className='flex items-center flex-1  text-md text-[28px] leading-[34px] tracking-[-0.416px] text-slate-12 font-bold'>
            {title}
          </h1>
        </div>
        {children && <div>{children}</div>}
      </div>
      <Breadcrumbs />
    </header>
  )
}

export default Header

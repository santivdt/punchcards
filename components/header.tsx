import Breadcrumbs from '@/app/(protected)/components/breadcrumb'

type HeaderProps = {
  title: string
  children?: React.ReactNode
  crumbs?: boolean
  subPageName?: string | null
}

const Header = ({
  title,
  crumbs = true,
  subPageName,
  children,
}: HeaderProps) => {
  return (
    <header className='flex flex-col w-full pb-4'>
      <div className='flex items-center justify-between pt-4 pb-2 flex-1'>
        <div className=' flex flex-row  items-center'>
          <h1 className='flex items-center flex-1 text-md text-[28px] leading-[34px] tracking-[-0.416px] text-slate-12 font-bold'>
            {title}
          </h1>
        </div>
        {children && <div className='flex'>{children}</div>}
      </div>
      {crumbs && <Breadcrumbs subPageName={subPageName} />}
    </header>
  )
}

export default Header

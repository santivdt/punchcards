type HeaderProps = {
  title: string
  children?: React.ReactNode
}

export default function Header({ title, children }: HeaderProps) {
  return (
    <header className='flex items-center py-4 border-b'>
      <div className='flex items-center flex-1'>
        <h2 className='flex items-center flex-1 h-10 text-lg font-bold'>
          {title}
        </h2>
      </div>
      {children && <div>{children}</div>}
    </header>
  )
}

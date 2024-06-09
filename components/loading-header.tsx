import { Skeleton } from '@/components/ui/skeleton'

const LoadingHeader = () => {
  return (
    <header className='flex flex-col w-full py-4  '>
      <div className='flex items-center justify-between  pt-4 pb-2   flex-1 '>
        <div className=' flex flex-row  items-center'>
          <h1 className='flex items-center flex-1  text-md text-[28px] leading-[34px] tracking-[-0.416px] text-slate-12 font-bold'>
            <Skeleton className='w-[200px] h-[40px] ' />
          </h1>
        </div>
      </div>
      <Skeleton className='w-[100px] h-[20px]' />
    </header>
  )
}

export default LoadingHeader

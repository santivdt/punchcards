import SkeletonTable from '@/app/(protected)/components/skeleton-table'
import { Skeleton } from '@/components/ui/skeleton'

const loading = () => {
  return (
    <>
      <header className='flex flex-col w-full'>
        <div className='flex items-center justify-between pt-4 pb-2 flex-1 '>
          <div className=' flex flex-row  items-center'>
            <h1 className='flex items-center flex-1  text-md text-[28px] leading-[34px] tracking-[-0.416px] text-slate-12 font-bold'>
              Cards
            </h1>
          </div>
        </div>
        <Skeleton className='h-4 w-[250px]' />
      </header>
      <div className='mt-32'>
        <SkeletonTable />
      </div>
    </>
  )
}

export default loading

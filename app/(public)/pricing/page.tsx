'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

const Pricing = () => {
  const searchParams = useSearchParams()
  const billingInterval = searchParams.get('billing') || 'month'

  return (
    <section className='bg-white dark:bg-black'>
      <div className='max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:flex-col sm:align-center'>
          <h1 className='text-4xl font-extrabold text-black dark:text-white text-center'>
            Pricing Plans
          </h1>
          <p className='max-w-2xl m-auto mt-5 text-black dark:text-zinc-200 sm:text-center text-lg'>
            For less than the price of a cup of coffee you can manage your
            prepaid hours with ease. Don&#39;t hesitate, get a subscription
            today.
          </p>
          <div className='relative self-center mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800'>
            <Link href='/pricing?billing=month'>
              <button
                type='button'
                className={`${
                  billingInterval === 'month'
                    ? 'relative w-1/2 bg-white border-zinc-800 shadow-sm text-zinc-800'
                    : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-500'
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                Monthly billing
              </button>
            </Link>
            <Link href='/pricing?billing=year'>
              <button
                type='button'
                className={`${
                  billingInterval === 'year'
                    ? 'relative w-1/2 bg-white border-zinc-800 shadow-sm text-zinc-800'
                    : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-500'
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            </Link>
          </div>
        </div>
        <div className='mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0'>
          <div className='flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-gray-100 dark:bg-zinc-900 flex-1 basis-1/3 max-w-xs'>
            <div className='p-6'>
              <h2 className='text-2xl font-semibold leading-6 text-black dark:text-white'>
                Freelancer
              </h2>
              <ul className='mt-4 text-zinc-800 dark:text-zinc-300'>
                <li>Easy time tracking</li>
                <li>Export cards to pdf</li>
                <li>Unlimited clients</li>
                <li>10 active cards at any time</li>
              </ul>
              <p className='mt-8'>
                <span className='text-5xl font-extrabold text-zinc-800 dark:text-zinc-300'>
                  {billingInterval === 'month' ? '€3' : '€30'}
                </span>
                <span className='text-base font-medium text-zinc-500 dark:text-zinc-100'>
                  {billingInterval === 'month' ? '/month' : '/year'}
                </span>
              </p>
              <Button
                variant='outline'
                disabled
                type='button'
                className='block w-full py-2 mt-8 text-sm font-semibold text-center text-black dark:text-white rounded-md dark:hover:bg-zinc-900'
              >
                Subscribe
              </Button>
            </div>
          </div>
          <div className='flex flex-col justify-between rounded-lg shadow-sm divide-y divide-zinc-600 bg-gray-100 dark:bg-zinc-900 flex-1 basis-1/3 max-w-xs'>
            <div className='p-6'>
              <h2 className='text-2xl font-semibold leading-6 text-black dark:text-white'>
                Agency
              </h2>
              <ul className='mt-4 text-zinc-800 dark:text-zinc-300'>
                <li>Everything in freelancer +</li>
                <li>Unlimited active cards</li>
              </ul>
            </div>
            <div className='p-6 border-none'>
              <p className='mt-8'>
                <span className='text-5xl font-extrabold text-zinc-800 dark:text-zinc-300'>
                  {billingInterval === 'month' ? '€25' : '€250'}
                </span>
                <span className='text-base font-medium text-zinc-500 dark:text-zinc-100'>
                  {billingInterval === 'month' ? '/month' : '/year'}
                </span>
              </p>
              <Button
                variant='outline'
                type='button'
                disabled
                className='block w-full py-2 mt-8 text-sm font-semibold text-center text-black dark:text-white rounded-md dark:hover:bg-zinc-900'
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing

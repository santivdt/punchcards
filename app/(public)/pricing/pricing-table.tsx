'use client'

import { Button } from '@/components/ui/button'
import { getStripe } from '@/utils/stripe/client'
import { checkoutWithStripe } from '@/utils/stripe/server'
import { getErrorRedirect } from '@/utils/helpers'
import { User } from '@supabase/supabase-js'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Tables } from '@/types/supabase'

type Subscription = Tables<'subscriptions'>
type Product = Tables<'products'>
type Price = Tables<'prices'>

interface ProductWithPrices extends Product {
  prices: Price[]
}
interface PriceWithProduct extends Price {
  products: Product | null
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null
}

interface Props {
  user: User | null | undefined
  products: ProductWithPrices[]
  subscription: SubscriptionWithProduct | null
}

const PricingTable = ({ user, products, subscription }: Props) => {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  )
  const router = useRouter()
  const searchParams = useSearchParams()
  const billingInterval = searchParams.get('billing') || 'month'
  const [priceIdLoading, setPriceIdLoading] = useState<string>()
  const currentPath = usePathname()

  //TODO i think this one should be in sep file, can it be server action?
  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id)

    if (!user) {
      setPriceIdLoading(undefined)
      return router.push('/signup')
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    )

    if (errorRedirect) {
      setPriceIdLoading(undefined)
      return router.push(errorRedirect)
    }

    if (!sessionId) {
      setPriceIdLoading(undefined)
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      )
    }

    const stripe = await getStripe()
    stripe?.redirectToCheckout({ sessionId })

    setPriceIdLoading(undefined)
  }

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
          <div className='relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800'>
            {intervals.includes('month') && (
              <button
                onClick={() => router.push('/pricing?billing=month')}
                type='button'
                className={`${
                  billingInterval === 'month'
                    ? 'relative w-1/2 bg-white border-zinc-800 shadow-sm text-zinc-800'
                    : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-200'
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                Monthly billing
              </button>
            )}
            {intervals.includes('year') && (
              <button
                onClick={() => router.push('/pricing?billing=year')}
                type='button'
                className={`${
                  billingInterval === 'year'
                    ? 'relative w-1/2 bg-white border-zinc-800 shadow-sm text-zinc-800'
                    : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-200'
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            )}
          </div>
        </div>
        <div className='mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0'>
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            )
            if (!price) return null
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100)
            return (
              <div
                key={product.id}
                className={
                  'flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900 flex-1 basis-1/3 max-w-xs'
                }
              >
                <div className='p-6'>
                  <h2 className='text-2xl font-semibold leading-6 text-white'>
                    {product.name}
                  </h2>
                  {product.name === 'Freelancer' && (
                    <ul className='mt-4 text-zinc-200 dark:text-zinc-300'>
                      <li>Easy time tracking</li>
                      <li>Export cards to pdf</li>
                      <li>Unlimited clients</li>
                      <li>10 active cards at any time</li>
                    </ul>
                  )}
                  <p className='mt-4 text-zinc-300'>{product.description}</p>
                  <p className='mt-8'>
                    <span className='text-5xl font-extrabold text-white'>
                      {priceString}
                    </span>
                    <span className='text-base font-medium text-zinc-100'>
                      /{billingInterval}
                    </span>
                  </p>
                  <Button
                    variant='outline'
                    type='button'
                    onClick={() => handleStripeCheckout(price)}
                    className='block w-full py-2 mt-8 text-sm font-semibold text-center text-black dark:text-white hover:text-white rounded-md hover:bg-zinc-900'
                  >
                    {subscription ? 'Manage' : 'Subscribe'}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingTable

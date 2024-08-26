import { getProducts, getSubscription, getUser } from '@/utils/supabase/queries'
import PricingTable from './pricing-table'

const Pricing = async () => {
  const [user, products, subscription] = await Promise.all([
    getUser(),
    getProducts(),
    getSubscription(),
  ])

  return (
    <PricingTable
      products={products ?? []}
      user={user}
      subscription={subscription}
    />
  )
}

export default Pricing

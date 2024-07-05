import Header from '@/components/header'
import { getRecentCardsFromUser } from '../cards/actions'
import {
  getActiveCards,
  getOpenHours,
  getTopClients,
  getTotalEarnings,
} from './actions'
import ActiveCards from './active-cards'
import OpenHours from './open-hours'
import RecentActiveCards from './recent-active-cards'
import TopClients from './top-clients'
import TotalEarnings from './total-earnings'

const Page = async () => {
  const [
    { data: cards },
    { data: openHours },
    { data: totalEarnings },
    { data: recentActiveCards },
    topClients,
  ] = await Promise.all([
    getActiveCards(),
    getOpenHours(),
    getTotalEarnings(),
    getRecentCardsFromUser(),
    getTopClients(),
  ])

  return (
    <div>
      <Header title='Dashboard' />
      <div className='flex w-full flex-col'>
        <main className='flex flex-1 flex-col gap-4 md:gap-8'>
          <div className='grid gap-4 grid-cols-2 md:grid-cols-6 md:gap-4 '>
            <ActiveCards cards={cards} />
            <OpenHours openHours={openHours} />
            <TotalEarnings totalEarnings={totalEarnings} />
          </div>
          <div className='grid gap-4 md:gap-8 md:grid-cols-2 xl:grid-cols-2'>
            <TopClients topClients={topClients} />
            <RecentActiveCards cards={recentActiveCards} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page

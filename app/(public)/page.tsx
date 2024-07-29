import Hero from './components/hero'
import FeaturesSection from './components/section-overview'

export default async function IndexPage() {
  return (
    <>
      <div className='flex flex-col items-start lg:justify-center lg:items-center'>
        <Hero />
        <FeaturesSection />
      </div>
    </>
  )
}

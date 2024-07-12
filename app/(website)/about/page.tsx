import Header from '@/components/header'
import PromoText from '../login/promo-text'

const AboutPage = () => {
  return (
    <div className='text-pretty w-4/5 lg:w-3/5'>
      <Header title='About' crumbs={false} />
      <PromoText />
    </div>
  )
}

export default AboutPage

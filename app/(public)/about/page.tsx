import Header from '@/components/header'
import PromoText from '../login/promo-text'

const AboutPage = () => {
  return (
    <div className='max-w-3xl px-4 py-8 mx-auto text-pretty'>
      <Header title='About' crumbs={false} />
      <PromoText />
    </div>
  )
}

export default AboutPage

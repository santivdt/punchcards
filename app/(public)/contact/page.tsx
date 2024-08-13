import Header from '@/components/header'
import ContactForm from './contact-form'

const ContactPage = () => {
  return (
    <div className='max-w-3xl mx-auto'>
      <Header title='Contact' crumbs={false} />
      <ContactForm />
    </div>
  )
}

export default ContactPage

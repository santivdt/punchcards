import Header from '@/components/header'
import ContactForm from './contact-form'

const ContactPage = () => {
  return (
    <>
      <Header title='Contact' crumbs={false} />
      <ContactForm />
    </>
  )
}

export default ContactPage

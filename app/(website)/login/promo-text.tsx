import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Github, Linkedin, LucideGlobe, Mail } from 'lucide-react'

const PromoText = () => {
  return (
    <>
      <p className='mb-4'>
        Punch it started as a portfolio project but has become so much more. I
        use it everyday to manage my punch cards and hope others will do so too!
      </p>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            How do I login with the demo account?
          </AccordionTrigger>
          <AccordionContent>
            With email: demo@demo.email and password: demopassword. You can do
            everything except delete dummycontent. Feel free to add your own,
            every night the dummyaccount is automatically cleaned up.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>What stack did you use?</AccordionTrigger>
          <AccordionContent>
            <ul className='list-disc'>
              <li>NextJS</li>
              <li>Tailwind</li>
              <li>Vercel</li>
              <li>Supabase</li>
              <li>ShadCN UI</li>
              <li>Typescript</li>
              <li>Sentry</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type='single' collapsible className='mb-8'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>How can I contact you?</AccordionTrigger>
          <AccordionContent>
            You can contact me via the contactform on my{' '}
            <a href='https://santi.tech/contact' className='underline mb-2'>
              website
            </a>
            .
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className='flex flex-row mt-4'>
        <a
          href='https://www.linkedin.com/in/santi-van-den-toorn-99378020/'
          target='_blank'
        >
          <Linkedin className='mr-4' size={18} />
        </a>

        <a href='https://santi.tech' target='_blank'>
          <LucideGlobe className=' mr-4' size={18} />
        </a>
        <a
          href='https://santi.tech/contact?utm_source=punch_card&utm_campaign=punch_card'
          target='_blank'
        >
          <Mail className='' size={18} />
        </a>
        <a href='https://github.com/santivdt' target='_blank'>
          <Github className='ml-4' size={18} />
        </a>
      </p>
    </>
  )
}

export default PromoText

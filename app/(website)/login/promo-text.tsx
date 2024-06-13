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
      <h1 className='text-white text-lg font-bold mb-4'>
        Portfolio project by Santi van den Toorn - Punchcards
      </h1>
      <p className='mb-4'>
        Hi there, welcome to my little app to manage prepaid punch cards (in
        Dutch: strippenkaarten) for freelancers. I built this because I needed
        it myself and as a portfolio project to showcase my abilities.
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
            <ul>
              <li>NextJS</li>
              <li>Tailwind</li>
              <li>Vercel</li>
              <li>Supabase</li>
              <li>ShadCN UI</li>
              <li>Typescript</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>What are you looking for?</AccordionTrigger>
          <AccordionContent>
            <p className='mb-4'>
              I am looking for a job as a front-end developer where I can work
              and learn in a team. I have 10+ years of experience in tech as a
              project manager, product owner and consultant. I worked as a
              front-end dev some years ago and am looking to pick it up again. I
              am extremely motivated and a quick learner so I am confident I can
              contribute to your team and project in a meaningful way.
            </p>
            <div className=' mb-4'>
              The perfect job would be:
              <ul className='list-disc'>
                <li>Fully remote or at least hybrid (I am Amsterdam based)</li>
                <li>Max 32 but preferably 24 hours/week</li>
                <li>Freelance or contract both fine</li>
              </ul>
            </div>
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

      <p>Santi van den Toorn</p>
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
      <p className=' mt-4'>
        Ps. I am not a designer so don&apos;t judge me on the UI/UX ;).
      </p>
    </>
  )
}

export default PromoText

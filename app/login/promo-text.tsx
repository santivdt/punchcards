import { Linkedin, LucideGlobe, Mail } from 'lucide-react'

const PromoText = () => {
  return (
    <>
      <h1 className='text-white text-lg font-bold mb-4'>
        Freelance front-end developer looking for a job
      </h1>
      <p className='mb-4'>
        Hi there, welcome to my little app to manage prepaid punch cards (in
        Dutch: strippenkaarten) for freelancers. I built this 'cause I needed it
        myself and because I needed a portfolio project to apply for jobs as a
        front-end developer.
      </p>
      <p className=' mb-4'>
        The stack I used is NextJS, Typescript, Tailwind, ShadCN UI, Vercel and
        Supabase. You can signup or login with the demo credentials.
        <span className='ml-2 text-purple-300'>
          demo@demo.email, demopassword
        </span>
        . In the demo account you can do everything except delete the dummydata.
        Every night the account is automatically cleaned up. You can also signup
        with your own (fake) account of course.
      </p>
      <p className=' mb-4'>
        I am not a designer so the UI/UX is definitey not optimal but it should
        work.
      </p>
      <p className='mb-4 text-yellow-500 font-bold'>
        I am looking for a job as a front-end developer where I can work and
        learn in a team. I have extensive experience in tech as a project
        manager, product owner and consultant. I have worked as a front-end dev
        some years ago and am looking to pick it up again. I am exremely
        motivated and a quick learner. Any opportunity would be great.
      </p>
      <div className=' mb-4'>
        The perfect place would be:
        <ul className='list-disc'>
          <li>Fully remote or at least hybrid (I am Amsterdam based)</li>
          <li>Max 32 hours but preferably 24</li>
          <li>Freelance or contract both fine for me</li>
        </ul>
      </div>
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
      </p>
    </>
  )
}

export default PromoText

import { Github, Linkedin, LucideGlobe, Mail } from 'lucide-react'

const PromoText = () => {
  return (
    <>
      <h1 className='text-white text-lg font-bold mb-4'>
        Freelance front-end developer looking for a job
      </h1>
      <p className='mb-4'>
        Hi there, welcome to my little app to manage prepaid punch cards (in
        Dutch: strippenkaarten) for freelancers. I built this because I needed
        it myself and as a portfolio project to showcase my abilities.
      </p>
      <p className=' mb-4'>
        I used NextJS, Typescript, Tailwind, ShadCN UI, Vercel and Supabase. You
        can signup with your own email or login with the demo credentials.
        <span className='ml-2 text-purple-300'>
          demo@demo.email, demopassword
        </span>
        . In the demo account you can do everything except delete the dummydata.
        Every night the account is automatically cleaned up.
      </p>
      <p className='mb-4'>
        I am looking for a job as a front-end developer where I can work and
        learn in a team. I have 10+ years of experience in tech as a project
        manager, product owner and consultant. I worked as a front-end dev some
        years ago and am looking to pick it up again. I am extremely motivated
        and a quick learner so I am confident I can contribute to your team and
        project in a meaningful way.
      </p>
      <div className=' mb-4'>
        The perfect job would be:
        <ul className='list-disc'>
          <li>Fully remote or at least hybrid (I am Amsterdam based)</li>
          <li>Max 32 but preferably 24 hours/week</li>
          <li>Freelance or contract both fine</li>
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
        <a href='https://github.com/santivdt/punchcards' target='_blank'>
          <Github className='ml-4' size={18} />
        </a>
      </p>
      <p className=' mt-4'>
        Ps. I am not a designer so don't judge me on the UI/UX ;).
      </p>
    </>
  )
}

export default PromoText

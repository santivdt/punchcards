const Footer = () => {
  return (
    <footer className='flex flex-col mt-auto text-center items-center bg-gradient-to-r from-purple-500 via-yellow-500 to-orange-500 text-white px-4 '>
      <div className='w-full max-w-7xl text-white py-12 flex text-left justify-between'>
        <div>
          <h2 className='text-l mb-2 font-bold uppercase'>Social</h2>
          <ul>
            <li>Github</li>
            <li>LinkedIn</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h2 className='text-l mb-2 font-bold uppercase'>Punchit.work</h2>
          <ul>
            <li>About</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <h2 className='text-l mb-2 font-bold uppercase'>Legal</h2>
          <ul>
            <li>Privacy</li>
            <li>Terms of service</li>
          </ul>
        </div>
      </div>
      <div className='h-auto py-4 w-full '>
        Made in Amsterdam by{' '}
        <a
          href='https://santi.tech/?utm_source=client_footer&utm_campaign=punchy'
          target='_blank'
          className='ml-1 underline decoration-1 underline-offset-4'
        >
          Santi
        </a>
      </div>
    </footer>
  )
}

export default Footer
